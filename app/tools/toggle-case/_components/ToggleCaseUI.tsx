"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Download, RefreshCw, Sparkles, Check, RotateCw } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";
import { Tooltip } from "../../../components/ui/Tooltip";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/ToggleGroup";

type Mode = "toggle" | "invert" | "random" | "spongebob";

export default function ToggleCaseUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("toggle");
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    if (!input) {
      setOutput("");
      return;
    }

    let result = "";

    switch (mode) {
      case "toggle":
        result = input.split("").map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join("");
        break;

      case "invert":
        result = input.split("").map(char => 
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        ).join("");
        break;

      case "random":
        result = input.split("").map(char => 
          Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
        ).join("");
        break;

      case "spongebob":
        result = input.split("").map((char, i) => 
          i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join("");
        break;
    }

    setOutput(result);
  }, [input, mode]);

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
    a.download = `toggle-case-${mode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reverseCase = () => {
    setInput(output);
  };

  const randomize = () => {
    convert(); // Trigger random again
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Mode Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Choose Style</h3>
        </div>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(v) => v && setMode(v as Mode)}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          <ToggleGroupItem value="toggle" className="font-medium text-xs">
            Toggle Case
          </ToggleGroupItem>
          <ToggleGroupItem value="invert" className="font-medium text-xs">
            Invert Case
          </ToggleGroupItem>
          <ToggleGroupItem value="random" className="font-medium text-xs">
            RaNdOm CaSe
          </ToggleGroupItem>
          <ToggleGroupItem value="spongebob" className="font-medium text-xs">
            sPoNgEbOb
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Input Text</label>
            <Badge variant="secondary">{input.length} chars</Badge>
          </div>
          <Textarea
            placeholder="Type or paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-80 font-mono text-sm resize-none bg-background/50 border-border focus:ring-primary"
            spellCheck={false}
          />
          <Button onClick={() => setInput("")} variant="outline" className="w-full">
            Clear All
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Result</label>
            <div className="flex gap-2">
              <Badge variant="outline">{output.length} chars</Badge>
              {mode === "random" && (
                <Badge variant="secondary" className="animate-pulse">
                  Random!
                </Badge>
              )}
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Your flipped text appears here instantly..."
            className="min-h-80 font-mono text-sm resize-none bg-background/70 text-foreground selection:bg-primary/20"
          />

          <div className="flex gap-3">
            <Button onClick={copyToClipboard} disabled={!output} className="flex-1">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </>
              )}
            </Button>

            <Button onClick={downloadAsFile} disabled={!output} variant="secondary" className="flex-1">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>

            <Tooltip content="Use result as new input" position="top">
              <Button onClick={reverseCase} disabled={!output} variant="outline" size="icon">
                <RotateCw className="w-4 h-4" />
              </Button>
            </Tooltip>

            {mode === "random" && (
              <Tooltip content="Generate new random case" position="top">
                <Button onClick={randomize} variant="outline" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Quick Examples */}
      <div className="mt-10 rounded-lg bg-muted/50 border border-border/50 p-6">
        <p className="font-medium text-sm mb-4">Try these funny ones:</p>
        <div className="flex flex-wrap gap-3">
          {[
            "I love programming in JavaScript",
            "STOP YELLING AT ME",
            "this is fine everything is fine",
            "Mocking SpongeBob Text Generator",
            "wHy ArE wE sTiLl UsInG tHiS",
          ].map((text) => (
            <Button
              key={text}
              variant="ghost"
              size="sm"
              onClick={() => setInput(text)}
              className="text-xs hover:bg-primary/10 transition-colors"
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}