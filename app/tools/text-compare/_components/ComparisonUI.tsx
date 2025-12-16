"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Textarea } from "../../../components/ui";

type DiffSegment = {
  text: string;
  type: "same" | "added" | "removed";
};

type DiffLine = {
  lineNumber: number;
  left: DiffSegment[];
  right: DiffSegment[];
  hasDifference: boolean;
};

const tokenize = (value: string) => value.split(/(\s+)/).filter(Boolean);

const mergeSegment = (segments: DiffSegment[], next: DiffSegment) => {
  const last = segments[segments.length - 1];
  if (last && last.type === next.type) {
    last.text += next.text;
  } else {
    segments.push(next);
  }
};

const buildWordDiff = (leftText: string, rightText: string) => {
  const a = tokenize(leftText);
  const b = tokenize(rightText);

  if (a.length === 0 && b.length === 0) {
    return {
      left: [{ text: "", type: "same" }],
      right: [{ text: "", type: "same" }],
    };
  }

  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const leftSegments: DiffSegment[] = [];
  const rightSegments: DiffSegment[] = [];

  const backtrack = (i: number, j: number): void => {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      backtrack(i - 1, j - 1);
      mergeSegment(leftSegments, { text: a[i - 1], type: "same" });
      mergeSegment(rightSegments, { text: b[j - 1], type: "same" });
      return;
    }

    if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      backtrack(i, j - 1);
      mergeSegment(rightSegments, { text: b[j - 1], type: "added" });
      return;
    }

    if (i > 0) {
      backtrack(i - 1, j);
      mergeSegment(leftSegments, { text: a[i - 1], type: "removed" });
    }
  };

  backtrack(a.length, b.length);

  return { left: leftSegments, right: rightSegments };
};

const ComparisonUI = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffLines, setDiffLines] = useState<DiffLine[]>([]);

  // Auto-recalculate diff whenever text1 or text2 changes (optional – you can keep button too)
  useEffect(() => {
    if (text1 || text2) {
      handleCompare();
    } else {
      setDiffLines([]);
    }
  }, [text1, text2]);

  const handleCompare = useCallback(() => {
    const leftLines = text1.split("\n");
    const rightLines = text2.split("\n");
    const maxLines = Math.max(leftLines.length, rightLines.length);

    const result: DiffLine[] = [];

    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] ?? "";
      const rightLine = rightLines[i] ?? "";
      const { left, right } = buildWordDiff(leftLine, rightLine);

      result.push({
        lineNumber: i + 1,
        left,
        right,
        hasDifference: leftLine !== rightLine,
      });
    }

    setDiffLines(result);
  }, [text1, text2]);

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiffLines([]);
  };

  // FIXED SWAP FUNCTIONALITY
  const handleSwap = () => {
    setText1(text2);
    setText2(text1);
    // No need to manually trigger compare – useEffect will do it automatically
  };

  const renderSegments = (segments: DiffSegment[]) =>
    segments.map((segment, idx) => {
      const base = "rounded px-0.5";

      if (segment.type === "added") {
        return (
          <span
            key={idx}
            className={`${base} bg-emerald-500/20 text-emerald-700 dark:text-emerald-300`}
          >
            {segment.text || "\u00A0"}
          </span>
        );
      }

      if (segment.type === "removed") {
        return (
          <span
            key={idx}
            className={`${base} bg-rose-500/20 text-rose-700 dark:text-rose-300`}
          >
            {segment.text || "\u00A0"}
          </span>
        );
      }

      return (
        <span key={idx} className="text-secondary">
          {segment.text || "\u00A0"}
        </span>
      );
    });

  const differingLineCount = diffLines.filter((line) => line.hasDifference).length;
  const hasContent = text1.trim() || text2.trim();

  return (
    <div className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold text-primary">Text 1 (Original)</label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="min-h-[280px] font-mono text-sm"
            placeholder="Paste or type the first text..."
          />
        </div>
        <div>
          <label className="mb-2 block font-semibold text-primary">Text 2 (Modified)</label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="min-h-[280px] font-mono text-sm"
            placeholder="Paste or type the second text..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCompare} variant="primary" disabled={!hasContent}>
          Highlight Differences
        </Button>
        <Button onClick={handleSwap} variant="secondary" disabled={!hasContent}>
          ↔ Swap Texts
        </Button>
        <Button onClick={handleClear} variant="outline">
          Clear All
        </Button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block h-4 w-8 rounded bg-emerald-500/20"></span>
          Added
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-4 w-8 rounded bg-rose-500/20"></span>
          Removed
        </span>
        {diffLines.length > 0 && (
          <span className="ml-auto font-semibold text-primary">
            {differingLineCount} / {diffLines.length} line{differingLineCount !== 1 ? "s" : ""} changed
          </span>
        )}
      </div>

      {/* Diff Result */}
      {diffLines.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border bg-surface-hover/50">
          <div className="max-h-96 overflow-y-auto md:max-h-[600px]">
            <div className="space-y-3 p-4">
              {diffLines.map((line) => (
                <div
                  key={line.lineNumber}
                  className="grid gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm sm:grid-cols-2"
                >
                  {/* Left Side */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-secondary">
                      <span>Line {line.lineNumber}</span>
                      <span className={line.hasDifference ? "text-rose-600 dark:text-rose-400" : ""}>
                        Text 1
                      </span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words rounded-md bg-surface-hover/60 p-3 font-mono text-sm leading-relaxed text-text-primary">
                      {renderSegments(line.left)}
                    </pre>
                  </div>

                  {/* Right Side */}
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-secondary">
                      <span>Line {line.lineNumber}</span>
                      <span className={line.hasDifference ? "text-emerald-600 dark:text-emerald-400" : ""}>
                        Text 2
                      </span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words rounded-md bg-surface-hover/60 p-3 font-mono text-sm leading-relaxed text-text-primary">
                      {renderSegments(line.right)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonUI;