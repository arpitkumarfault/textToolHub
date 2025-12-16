"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  Check,
  Sparkles,
  Settings2,
  FileText,
  Zap,
} from "lucide-react";
import { Button } from "../../../components/ui";
import Badge from "../../../components/shared/Badge";
import { Tooltip } from "../../../components/ui/Tooltip";
import { Textarea } from "../../../components/ui";
import { ToggleGroup,ToggleGroupItem } from "../../../components/ui/ToggleGroup";
type Mode = "all" | "paragraphs" | "smart" | "join";

export default function RemoveLineBreaksUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("all");
  const [copied, setCopied] = useState(false);

  // Options
  const [options, setOptions] = useState({
    addSpaces: true,
    cleanExtraSpaces: true,
    trimLines: true,
    removeEmptyLines: false,
  });

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = input;

    // Normalize line breaks (Windows → Unix)
    result = result.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    switch (mode) {
      case "all":
        // Remove ALL line breaks
        result = options.addSpaces
          ? result.replace(/\n+/g, " ")
          : result.replace(/\n+/g, "");
        break;

      case "paragraphs":
        // Keep paragraph breaks (double newlines), remove single newlines
        result = result.replace(/\n\n+/g, "<<<PARAGRAPH>>>");
        result = options.addSpaces
          ? result.replace(/\n/g, " ")
          : result.replace(/\n/g, "");
        result = result.replace(/<<<PARAGRAPH>>>/g, "\n\n");
        break;

      case "smart":
        // Smart mode: keep sentences together, preserve intentional breaks
        result = result.replace(/\n\n+/g, "<<<PARAGRAPH>>>");
        result = result.replace(/([.!?])\n/g, "$1<<<SENTENCE>>>");
        result = options.addSpaces
          ? result.replace(/\n/g, " ")
          : result.replace(/\n/g, "");
        result = result.replace(/<<<PARAGRAPH>>>/g, "\n\n");
        result = result.replace(/<<<SENTENCE>>>/g, "\n");
        break;

      case "join":
        // Join all lines without any spaces
        result = result.replace(/\n+/g, "");
        break;
    }

    // Trim each line if enabled
    if (options.trimLines) {
      result = result
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    // Remove empty lines if enabled
    if (options.removeEmptyLines) {
      result = result
        .split("\n")
        .filter((line) => line.trim() !== "")
        .join("\n");
    }

    // Clean extra spaces
    if (options.cleanExtraSpaces) {
      result = result.replace(/[ \t]+/g, " ");
    }

    // Final trim
    result = result.trim();

    setOutput(result);
  }, [input, mode, options]);

  useEffect(() => {
    processText();
  }, [processText]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsFile = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "single-line-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  // Statistics
  const stats = {
    inputLines: input ? input.split("\n").length : 0,
    outputLines: output ? output.split("\n").length : 0,
    inputChars: input.length,
    outputChars: output.length,
    linesRemoved: input ? input.split("\n").length - (output ? output.split("\n").length : 0) : 0,
    charsSaved: input.length - output.length,
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Mode Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Removal Mode</h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as Mode)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <ToggleGroupItem value="all" className="font-medium text-xs">
            Remove All
          </ToggleGroupItem>
          <ToggleGroupItem value="paragraphs" className="font-medium text-xs">
            Keep Paragraphs
          </ToggleGroupItem>
          <ToggleGroupItem value="smart" className="font-medium text-xs">
            Smart Mode
          </ToggleGroupItem>
          <ToggleGroupItem value="join" className="font-medium text-xs">
            Join (No Spaces)
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Options */}
      <details className="mb-8 rounded-xl border border-border bg-muted/30 p-4">
        <summary className="cursor-pointer font-semibold flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Advanced Options
        </summary>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.addSpaces}
              onChange={(e) => setOptions({ ...options, addSpaces: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
              disabled={mode === "join"}
            />
            <span>Add space where line breaks are removed</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.cleanExtraSpaces}
              onChange={(e) => setOptions({ ...options, cleanExtraSpaces: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
            />
            <span>Remove extra spaces</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.trimLines}
              onChange={(e) => setOptions({ ...options, trimLines: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
            />
            <span>Trim whitespace from lines</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.removeEmptyLines}
              onChange={(e) => setOptions({ ...options, removeEmptyLines: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
            />
            <span>Remove empty lines</span>
          </label>
        </div>
      </details>

      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-3 md:grid-cols-6 gap-3 rounded-xl bg-muted/50 p-4">
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {stats.inputLines}
          </div>
          <div className="text-xs text-muted-foreground">Input Lines</div>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-green-600">
            {stats.outputLines}
          </div>
          <div className="text-xs text-muted-foreground">Output Lines</div>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-orange-600">
            {stats.linesRemoved}
          </div>
          <div className="text-xs text-muted-foreground">Lines Removed</div>
        </div>
        <div className="text-center hidden md:block">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {stats.inputChars.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Input Chars</div>
        </div>
        <div className="text-center hidden md:block">
          <div className="text-xl md:text-2xl font-bold text-green-600">
            {stats.outputChars.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Output Chars</div>
        </div>
        <div className="text-center hidden md:block">
          <div className="text-xl md:text-2xl font-bold text-orange-600">
            {stats.charsSaved > 0 ? `-${stats.charsSaved}` : stats.charsSaved}
          </div>
          <div className="text-xs text-muted-foreground">Chars Saved</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Multi-Line Text
            </label>
            <Badge variant="secondary">{stats.inputLines} lines</Badge>
          </div>
          <Textarea
            placeholder="Paste your multi-line text here...&#10;&#10;Line 1&#10;Line 2&#10;Line 3&#10;&#10;Each line will be merged based on your selected mode."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-80 md:min-h-96 font-mono text-sm resize-none bg-background/50 border-border"
            spellCheck={false}
          />
          <Button onClick={clearAll} variant="outline" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Result
            </label>
            <Badge variant="outline" className="text-green-600 border-green-600">
              {stats.outputLines} line{stats.outputLines !== 1 ? "s" : ""}
            </Badge>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Your single-line text will appear here..."
            className="min-h-80 md:min-h-96 font-mono text-sm resize-none bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-foreground"
          />

          <div className="flex gap-3">
            <Button onClick={copyToClipboard} disabled={!output} className="flex-1">
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  Copy Result
                </>
              )}
            </Button>
            <Button onClick={downloadAsFile} disabled={!output} variant="secondary" className="flex-1">
              <Download className="w-5 h-5 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {output && stats.linesRemoved > 0 && (
        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 p-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xl font-bold text-green-700 dark:text-green-400">
            <Sparkles className="w-7 h-7" />
            <span>
              Removed {stats.linesRemoved} line break{stats.linesRemoved !== 1 ? "s" : ""}!
            </span>
            <Sparkles className="w-7 h-7" />
          </div>
          <p className="mt-2 text-green-600 dark:text-green-300">
            Your text is now {stats.outputLines === 1 ? "a single line" : `${stats.outputLines} lines`} 
            {stats.charsSaved > 0 && ` — saved ${stats.charsSaved} characters`}
          </p>
        </div>
      )}

      {/* Quick Examples */}
      <div className="mt-8 rounded-xl bg-muted/50 border border-border/50 p-6">
        <p className="font-semibold text-lg mb-4">Try these examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              label: "PDF Text",
              text: "This is a sentence that was\ncopied from a PDF and\nhas unwanted line breaks.",
            },
            {
              label: "Address",
              text: "John Doe\n123 Main Street\nNew York, NY 10001\nUSA",
            },
            {
              label: "Code Comment",
              text: "// This is a multi-line\n// comment that needs to\n// be on one line.",
            },
            {
              label: "Poem to Prose",
              text: "Roses are red,\nViolets are blue,\nSugar is sweet,\nAnd so are you.",
            },
          ].map((example) => (
            <Button
              key={example.label}
              variant="ghost"
              className="justify-start text-left h-auto py-3 px-4 text-sm hover:bg-primary/10 font-mono"
              onClick={() => setInput(example.text)}
            >
              <span className="font-bold mr-2">{example.label}:</span>
              <span className="truncate">{example.text.substring(0, 30)}...</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {!input && (
        <div className="mt-8 text-center py-12 rounded-xl bg-muted/30 border-2 border-dashed border-border">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-2">
            Ready to remove line breaks?
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Paste multi-line text above to convert it to a single line or clean paragraphs
          </p>
        </div>
      )}
    </div>
  );
}