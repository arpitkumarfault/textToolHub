"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Download, Sparkles, Check, Trash2, Zap } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";
import { Tooltip } from "../../../components/ui/Tooltip";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/ToggleGroup";

type Mode = "smart" | "aggressive" | "spaces-only" | "lines-only";

export default function RemoveExtraSpacesUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("smart");
  const [savedChars, setSavedChars] = useState(0);
  const [copied, setCopied] = useState(false);

  const cleanText = useCallback(() => {
    if (!input) {
      setOutput("");
      setSavedChars(0);
      return;
    }

    let cleaned = input;

    switch (mode) {
      case "smart":
        cleaned = input
          .replace(/[\t\r\n]+/g, " ")           // Tabs & line breaks → single space
          .replace(/\s+/g, " ")                 // Multiple spaces → one
          .replace(/\s+([.,!?;:])/g, "$1")      // Remove space before punctuation
          .replace(/([.,!?;:])\s+/g, "$1 ")     // Ensure one space after punctuation
          .replace(/^\s+|\s+$/g, "")            // Trim
          .replace(/ +/g, " ");                 // Final cleanup
        break;

      case "aggressive":
        cleaned = input
          .replace(/[\t\r\n\s]+/g, " ")         // ALL whitespace → single space
          .replace(/\s+([.,!?;:])/g, "$1")
          .replace(/([.,!?;:])\s+/g, "$1 ")
          .trim();
        break;

      case "spaces-only":
        cleaned = input.replace(/ +/g, " ").trim();
        break;

      case "lines-only":
        cleaned = input
          .split("\n")
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join("\n");
        break;
    }

    setOutput(cleaned);
    setSavedChars(input.length - cleaned.length);
  }, [input, mode]);

  useEffect(() => {
    cleanText();
  }, [cleanText]);

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
    a.download = "cleaned-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const percentageSaved = input.length > 0 ? Math.round((savedChars / input.length) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Mode Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Cleaning Mode</h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as Mode)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <ToggleGroupItem value="smart" className="font-medium text-xs">
            ✨ Smart Clean (Best)
          </ToggleGroupItem>
          <ToggleGroupItem value="aggressive" className="font-medium text-xs">
            🔥 Aggressive
          </ToggleGroupItem>
          <ToggleGroupItem value="spaces-only" className="font-medium text-xs">
            Spaces Only
          </ToggleGroupItem>
          <ToggleGroupItem value="lines-only" className="font-medium text-xs">
            Lines Only
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Original Text</label>
            <Badge variant="outline">{input.length} chars</Badge>
          </div>
          <Textarea
            placeholder="Paste messy text from PDF, Word, WhatsApp, email..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-96 font-mono text-sm resize-none bg-background/50 border-border focus:ring-primary"
            spellCheck={false}
          />
          <Button onClick={() => setInput("")} variant="outline" className="w-full">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Clean Text</label>
            <div className="flex gap-3">
              <Badge variant="secondary">{output.length} chars</Badge>
              {savedChars > 0 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  -{savedChars} ({percentageSaved}%)
                </Badge>
              )}
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Perfectly cleaned text appears here..."
            className="min-h-96 font-mono text-sm resize-none bg-green-50/50 dark:bg-green-950/20 border-green-300 dark:border-green-800 text-foreground selection:bg-green-200"
          />

          <div className="flex gap-3">
            <Button onClick={copyToClipboard} disabled={!output} className="flex-1">
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" /> Copy Clean Text
                </>
              )}
            </Button>

            <Button onClick={downloadAsFile} disabled={!output} variant="secondary" className="flex-1">
              <Download className="w-5 h-5 mr-2" /> Download
            </Button>
          </div>
        </div>
      </div>

      {/* Stats & Quick Tips */}
      {savedChars > 0 && (
        <div className="mt-10 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border border-green-200 dark:border-green-800 p-8 text-center">
          <div className="flex items-center justify-center gap-3 text-2xl font-bold text-green-700 dark:text-green-400">
            <Sparkles className="w-8 h-8" />
            <span>Magic! You saved {savedChars} characters</span>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="mt-3 text-lg text-green-600 dark:text-green-300">
            That’s a {percentageSaved}% reduction — your text is now clean, professional, and SEO-friendly.
          </p>
        </div>
      )}

      {/* Quick Examples */}
      <div className="mt-10 rounded-xl bg-muted/50 border border-border/50 p-6">
        <p className="font-semibold text-lg mb-4">Try these messy texts:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "This     has     too    many     spaces    and    tabs\t\t\t!!!",
            "Copied   from   PDF    with    weird     line     breaks\n\n\n\nand    extra    spaces",
            "Hello        world!      This     is      a      test.       Yes!!!",
            "Remove   all   extra   spaces   from   this   text   please   thanks",
          ].map((text) => (
            <Button
              key={text}
              variant="ghost"
              className="justify-start text-left h-auto py-3 px-4 text-sm hover:bg-primary/10 font-mono"
              onClick={() => setInput(text)}
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}