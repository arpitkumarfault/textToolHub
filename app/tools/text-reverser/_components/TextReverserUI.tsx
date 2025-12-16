"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Download, RefreshCw, Sparkles, Check, Shuffle } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";
import { Tooltip } from "../../../components/ui/Tooltip";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/ToggleGroup";

type Mode = "full" | "words" | "lines" | "sentences" | "random";

export default function TextReverserUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("full");
  const [copied, setCopied] = useState(false);

  const reverseText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = "";

    switch (mode) {
      case "full":
        result = input.split("").reverse().join("");
        break;

      case "words":
        result = input
          .split(" ")
          .map(word => word.split("").reverse().join(""))
          .join(" ");
        break;

      case "lines":
        result = input
          .split("\n")
          .reverse()
          .join("\n");
        break;

      case "sentences":
        result = input
          .split(/(?<=[.!?])\s+/)
          .reverse()
          .join(" ");
        break;

      case "random":
        const chars = input.split("");
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        result = chars.join("");
        break;
    }

    setOutput(result);
  }, [input, mode]);

  useEffect(() => {
    reverseText();
  }, [reverseText]);

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
    a.download = `reversed-${mode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regenerate = () => {
    reverseText();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Mode Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Reverse Mode</h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as Mode)}
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          <ToggleGroupItem value="full" className="font-medium text-xs">
            Full Text
          </ToggleGroupItem>
          <ToggleGroupItem value="words" className="font-medium text-xs">
            Words Only
          </ToggleGroupItem>
          <ToggleGroupItem value="lines" className="font-medium text-xs">
            Lines
          </ToggleGroupItem>
          <ToggleGroupItem value="sentences" className="font-medium text-xs">
            Sentences
          </ToggleGroupItem>
          <ToggleGroupItem value="random" className="font-medium text-xs">
            Shuffle!
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Original Text</label>
            <Badge variant="secondary">{input.length} chars</Badge>
          </div>
          <Textarea
            placeholder="Type or paste text to reverse..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-96 font-mono text-base resize-none bg-background/50 border-border focus:ring-primary"
            spellCheck={false}
          />
          <Button onClick={() => setInput("")} variant="outline" className="w-full">
            Clear All
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Reversed Text</label>
            <Badge variant="outline">{output.length} chars</Badge>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Reversed text appears here instantly..."
            className="min-h-96 font-mono text-lg resize-none bg-background/70 text-foreground selection:bg-primary/20 leading-relaxed tracking-wide"
          />

          <div className="flex gap-3">
            <Button onClick={copyToClipboard} disabled={!output} className="flex-1 text-base">
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" /> Copy Text
                </>
              )}
            </Button>

            <Button onClick={downloadAsFile} disabled={!output} variant="secondary" className="flex-1">
              <Download className="w-5 h-5 mr-2" /> Download
            </Button>

            {mode === "random" && (
              <Tooltip content="Shuffle again!" position="top">
                <Button onClick={regenerate} variant="outline" size="icon">
                  <Shuffle className="w-5 h-5" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Fun Examples */}
      <div className="mt-10 rounded-xl bg-muted/50 border border-border/50 p-6">
        <p className="font-semibold text-lg mb-4">Try these:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "The quick brown fox jumps over the lazy dog",
            "Hello World! This is a test.",
            "Racecar is a palindrome",
            "Never odd or even",
            "Was it a car or a cat I saw?",
            "Able was I ere I saw Elba",
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