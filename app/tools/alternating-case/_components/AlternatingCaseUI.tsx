"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Download, RefreshCw, Sparkles, Check, Shuffle } from "lucide-react";

// CORRECT IMPORT PATHS (lowercase filenames – this is how shadcn/ui works)
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";
import { Tooltip } from "../../../components/ui/Tooltip";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/ToggleGroup";

type Pattern = "alternating" | "spongebob" | "mocking" | "zalgo-mini" | "random";

export default function AlternatingCaseUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [pattern, setPattern] = useState<Pattern>("alternating");
  const [startWithUpper, setStartWithUpper] = useState(false);
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let result = "";
    const chars = input.split("");

    switch (pattern) {
      case "alternating":
        result = chars
          .map((char, i) => {
            if (!/[a-zA-Z]/.test(char)) return char;
            return (i + (startWithUpper ? 1 : 0)) % 2 === 0
              ? char.toUpperCase()
              : char.toLowerCase();
          })
          .join("");
        break;

      case "spongebob":
        result = chars
          .map((char, i) => {
            if (!/[a-zA-Z]/.test(char)) return char;
            return i % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
          })
          .join("");
        break;

      case "mocking":
        result = chars
          .map((char) => {
            if (!/[a-zA-Z]/.test(char)) return char;
            return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
          })
          .join("");
        break;

      case "zalgo-mini":
        const zalgoUp = ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊", "͂", "̓", "̈́", "͊", "͋", "͌", "̃", "̂", "̌", "͐", "̀", "́", "̋", "̏", "̒"];
        const zalgoDown = ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪", "̫", "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "̣"];
        result = chars
          .map((char, i) => {
            if (!/[a-zA-Z]/.test(char)) return char;
            const isUpper = (i + (startWithUpper ? 1 : 0)) % 2 === 0;
            const base = isUpper ? char.toUpperCase() : char.toLowerCase();
            if (Math.random() > 0.7) {
              return base + zalgoUp[Math.floor(Math.random() * zalgoUp.length)] + zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
            }
            return base;
          })
          .join("");
        break;

      case "random":
        result = chars
          .map((char) => {
            if (!/[a-zA-Z]/.test(char)) return char;
            return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
          })
          .join("");
        break;
    }

    setOutput(result);
  }, [input, pattern, startWithUpper]);

  useEffect(() => {
    convert();
  }, [convert]);

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
    a.download = `mock-text-${pattern}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const regenerate = () => {
    convert();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Pattern Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Choose Meme Style</h3>
        </div>
        <ToggleGroup
          type="single"
          value={pattern}
          onValueChange={(v) => v && setPattern(v as Pattern)}
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          <ToggleGroupItem value="alternating" className="font-medium text-xs">
            aLtErNaTiNg
          </ToggleGroupItem>
          <ToggleGroupItem value="spongebob" className="font-medium text-xs">
            sPoNgEbOb
          </ToggleGroupItem>
          <ToggleGroupItem value="mocking" className="font-medium text-xs">
            RaNdOm
          </ToggleGroupItem>
          <ToggleGroupItem value="zalgo-mini" className="font-medium text-xs">
            Z̶a̴l̷g̶o̵
          </ToggleGroupItem>
          <ToggleGroupItem value="random" className="font-medium text-xs">
            cHaOtIc
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Start with Uppercase Toggle */}
      {pattern !== "mocking" && pattern !== "random" && (
        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            id="startUpper"
            checked={startWithUpper}
            onChange={(e) => setStartWithUpper(e.target.checked)}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
          <label htmlFor="startUpper" className="font-medium cursor-pointer select-none">
            Start with UPPERCASE
          </label>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Your Text</label>
            <Badge variant="secondary">{input.length} chars</Badge>
          </div>
          <Textarea
            placeholder="Type your sarcastic message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-80 font-mono text-base resize-none bg-background/50 border-border focus:ring-primary"
            spellCheck={false}
          />
          <Button onClick={() => setInput("")} variant="outline" className="w-full">
            Clear Text
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Mock Text Result</label>
            <div className="flex gap-2">
              <Badge variant="outline">{output.length} chars</Badge>
              {(pattern === "mocking" || pattern === "random") && (
                <Badge variant="secondary" className="animate-pulse">
                  {pattern === "mocking" ? "Mocking!" : "Chaos!"}
                </Badge>
              )}
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Your meme text appears here..."
            className="min-h-80 font-mono text-lg resize-none bg-background/70 text-foreground selection:bg-primary/20 leading-relaxed tracking-wide"
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

            {(pattern === "mocking" || pattern === "random" || pattern === "zalgo-mini") && (
              <Tooltip content="Generate new variation" position="top">
                <Button onClick={regenerate} variant="outline" size="icon">
                  <Shuffle className="w-5 h-5" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Instant Meme Templates */}
      <div className="mt-10 rounded-lg bg-muted/50 border border-border/50 p-6">
        <p className="font-semibold text-lg mb-4">Instant Meme Templates:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "this is fine everything is fine",
            "why are we still here just to suffer",
            "change my mind",
            "i am once again asking",
            "it's not much but it's honest work",
            "when you realize it's monday tomorrow",
            "me explaining to my mom",
            "nobody: absolutely nobody:",
          ].map((template) => (
            <Button
              key={template}
              variant="ghost"
              className="justify-start text-left h-auto py-3 px-4 text-sm hover:bg-primary/10 transition-colors font-medium"
              onClick={() => setInput(template)}
            >
              {template}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}