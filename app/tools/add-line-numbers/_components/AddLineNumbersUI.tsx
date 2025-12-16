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
  Hash,
  Zap,
} from "lucide-react";
import { Button } from "../../../components/ui";
import { Textarea } from "../../../components/ui";
import Badge from "../../../components/shared/Badge";
import { ToggleGroup,ToggleGroupItem } from "../../../components/ui/ToggleGroup";

type NumberFormat = "decimal" | "padded" | "roman" | "alpha" | "bullet";
type Separator = "dot" | "colon" | "pipe" | "bracket" | "parenthesis" | "tab" | "space";

export default function AddLineNumbersUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Settings
  const [startNumber, setStartNumber] = useState(1);
  const [numberFormat, setNumberFormat] = useState<NumberFormat>("decimal");
  const [separator, setSeparator] = useState<Separator>("dot");

  // Advanced Options
  const [options, setOptions] = useState({
    skipEmptyLines: false,
    rightAlign: false,
    prefix: "",
    suffix: "",
    step: 1,
  });

  // Roman numeral converter
  const toRoman = (num: number): string => {
    const romanNumerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
    ];
    let result = "";
    let remaining = num;
    for (const [value, symbol] of romanNumerals) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result || "0";
  };

  // Alpha converter (A, B, C... AA, AB...)
  const toAlpha = (num: number): string => {
    let result = "";
    let n = num;
    while (n > 0) {
      n--;
      result = String.fromCharCode(65 + (n % 26)) + result;
      n = Math.floor(n / 26);
    }
    return result || "A";
  };

  // Get separator string
  const getSeparator = (sep: Separator): string => {
    switch (sep) {
      case "dot": return ". ";
      case "colon": return ": ";
      case "pipe": return " | ";
      case "bracket": return "] ";
      case "parenthesis": return ") ";
      case "tab": return "\t";
      case "space": return " ";
      default: return ". ";
    }
  };

  // Get prefix for bracket/parenthesis
  const getPrefix = (sep: Separator): string => {
    if (sep === "bracket") return "[";
    if (sep === "parenthesis") return "(";
    return "";
  };

  const processText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    const lines = input.split("\n");
    const totalLines = lines.filter(l => !options.skipEmptyLines || l.trim() !== "").length;
    const maxDigits = String(startNumber + (totalLines - 1) * options.step).length;

    let currentNumber = startNumber;
    let lineIndex = 0;

    const numberedLines = lines.map((line) => {
      // Skip empty lines if option enabled
      if (options.skipEmptyLines && line.trim() === "") {
        return line;
      }

      let lineNum: string;

      switch (numberFormat) {
        case "decimal":
          lineNum = String(currentNumber);
          break;
        case "padded":
          lineNum = String(currentNumber).padStart(maxDigits, "0");
          break;
        case "roman":
          lineNum = toRoman(currentNumber);
          break;
        case "alpha":
          lineNum = toAlpha(currentNumber);
          break;
        case "bullet":
          lineNum = "•";
          break;
        default:
          lineNum = String(currentNumber);
      }

      // Right align numbers
      if (options.rightAlign && numberFormat !== "bullet") {
        lineNum = lineNum.padStart(maxDigits, " ");
      }

      const prefix = options.prefix || getPrefix(separator);
      const suffix = options.suffix || "";
      const sep = getSeparator(separator);

      currentNumber += options.step;
      lineIndex++;

      return `${prefix}${lineNum}${sep}${suffix}${line}`;
    });

    setOutput(numberedLines.join("\n"));
  }, [input, startNumber, numberFormat, separator, options]);

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
    a.download = "numbered-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  // Statistics
  const stats = {
    totalLines: input ? input.split("\n").length : 0,
    nonEmptyLines: input ? input.split("\n").filter((l) => l.trim() !== "").length : 0,
    characters: input.length,
    outputChars: output.length,
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Number Format Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Hash className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Number Format</h3>
        </div>
        <ToggleGroup
          type="single"
          value={numberFormat}
          onValueChange={(v) => v && setNumberFormat(v as NumberFormat)}
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          <ToggleGroupItem value="decimal" className="font-medium text-xs">
            1, 2, 3...
          </ToggleGroupItem>
          <ToggleGroupItem value="padded" className="font-medium text-xs">
            01, 02, 03...
          </ToggleGroupItem>
          <ToggleGroupItem value="roman" className="font-medium text-xs">
            I, II, III...
          </ToggleGroupItem>
          <ToggleGroupItem value="alpha" className="font-medium text-xs">
            A, B, C...
          </ToggleGroupItem>
          <ToggleGroupItem value="bullet" className="font-medium text-xs">
            • Bullet
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Separator Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Separator Style</h3>
        </div>
        <ToggleGroup
          type="single"
          value={separator}
          onValueChange={(v) => v && setSeparator(v as Separator)}
          className="grid grid-cols-3 md:grid-cols-7 gap-2"
        >
          <ToggleGroupItem value="dot" className="font-mono text-xs">
            1.
          </ToggleGroupItem>
          <ToggleGroupItem value="colon" className="font-mono text-xs">
            1:
          </ToggleGroupItem>
          <ToggleGroupItem value="pipe" className="font-mono text-xs">
            1 |
          </ToggleGroupItem>
          <ToggleGroupItem value="bracket" className="font-mono text-xs">
            [1]
          </ToggleGroupItem>
          <ToggleGroupItem value="parenthesis" className="font-mono text-xs">
            (1)
          </ToggleGroupItem>
          <ToggleGroupItem value="tab" className="font-mono text-xs">
            Tab
          </ToggleGroupItem>
          <ToggleGroupItem value="space" className="font-mono text-xs">
            Space
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Quick Settings */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Number</label>
          <input
            type="number"
            value={startNumber}
            onChange={(e) => setStartNumber(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Step</label>
          <input
            type="number"
            value={options.step}
            onChange={(e) => setOptions({ ...options, step: Math.max(1, Number(e.target.value)) })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prefix</label>
          <input
            type="text"
            value={options.prefix}
            onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
            placeholder="e.g., Line "
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Suffix</label>
          <input
            type="text"
            value={options.suffix}
            onChange={(e) => setOptions({ ...options, suffix: e.target.value })}
            placeholder="e.g., → "
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Advanced Options */}
      <details className="mb-8 rounded-xl border border-border bg-muted/30 p-4">
        <summary className="cursor-pointer font-semibold flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Advanced Options
        </summary>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.skipEmptyLines}
              onChange={(e) => setOptions({ ...options, skipEmptyLines: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
            />
            <span>Skip empty lines (don't number them)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={options.rightAlign}
              onChange={(e) => setOptions({ ...options, rightAlign: e.target.checked })}
              className="w-5 h-5 rounded text-primary"
            />
            <span>Right-align line numbers</span>
          </label>
        </div>
      </details>

      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-xl bg-muted/50 p-4">
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {stats.totalLines}
          </div>
          <div className="text-xs text-muted-foreground">Total Lines</div>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-green-600">
            {stats.nonEmptyLines}
          </div>
          <div className="text-xs text-muted-foreground">Non-Empty</div>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-primary">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Input Chars</div>
        </div>
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold text-orange-600">
            {stats.outputChars.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Output Chars</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Original Text
            </label>
            <Badge variant="secondary">{stats.totalLines} lines</Badge>
          </div>
          <Textarea
            placeholder="Paste your text or code here...&#10;&#10;Each line will be numbered&#10;automatically based on your&#10;selected format."
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
              Numbered Text
            </label>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Ready to copy
            </Badge>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Numbered text will appear here..."
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
      {output && stats.totalLines > 0 && (
        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 p-6 text-center">
          <div className="flex items-center justify-center gap-3 text-xl font-bold text-green-700 dark:text-green-400">
            <Sparkles className="w-7 h-7" />
            <span>Added numbers to {stats.totalLines} lines!</span>
            <Sparkles className="w-7 h-7" />
          </div>
          <p className="mt-2 text-green-600 dark:text-green-300">
            Using {numberFormat} format with "{getSeparator(separator).trim() || "space"}" separator
          </p>
        </div>
      )}

      {/* Quick Examples */}
      <div className="mt-8 rounded-xl bg-muted/50 border border-border/50 p-6">
        <p className="font-semibold text-lg mb-4">Try these examples:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              label: "Code Snippet",
              text: "function hello() {\n  console.log('Hello');\n  return true;\n}",
            },
            {
              label: "Shopping List",
              text: "Milk\nBread\nEggs\nButter\nCheese",
            },
            {
              label: "To-Do List",
              text: "Complete project report\nSend email to client\nReview pull requests\nUpdate documentation",
            },
            {
              label: "Meeting Agenda",
              text: "Introduction\nProject Updates\nBudget Review\nQ&A Session\nAction Items",
            },
          ].map((example) => (
            <Button
              key={example.label}
              variant="ghost"
              className="justify-start text-left h-auto py-3 px-4 text-sm hover:bg-primary/10 font-mono"
              onClick={() => setInput(example.text)}
            >
              <span className="font-bold mr-2">{example.label}:</span>
              <span className="truncate">{example.text.substring(0, 25)}...</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {!input && (
        <div className="mt-8 text-center py-12 rounded-xl bg-muted/30 border-2 border-dashed border-border">
          <Hash className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-2">
            Ready to add line numbers?
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Paste your text or code above to automatically add line numbers in your chosen format
          </p>
        </div>
      )}
    </div>
  );
}