"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Download, RefreshCw, Sparkles, Check } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/ToggleGroup";
import { Tooltip } from "../../../components/ui/Tooltip";

type CaseType = "camelCase" | "PascalCase" | "snake_case" | "kebab-case";

export default function CamelCaseUI() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("camelCase");
  const [copied, setCopied] = useState(false);

  const [options, setOptions] = useState({
    preserveAcronyms: true,
    removeNumbers: false,
    prefix: "",
    suffix: "",
  });

  const convertText = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      return;
    }

    let words = input
      .trim()
      .replace(/[^a-zA-Z0-9\s\-_]/g, " ")  // Remove special chars except - and _
      .replace(/[\-_]+/g, " ")             // Replace _ and - with space
      .replace(/\s+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map(w => w.trim());

    // Remove numbers
    if (options.removeNumbers) {
      words = words.map(w => w.replace(/\d+/g, ""));
    }

    // Preserve acronyms
    if (options.preserveAcronyms) {
      words = words.map(word => {
        const upper = word.toUpperCase();
        if (["API", "ID", "URL", "HTTP", "HTTPS", "JWT", "JSON", "XML", "UI", "UX", "SEO"].includes(upper)) {
          return upper;
        }
        return word;
      });
    }

    // Filter empty
    words = words.filter(w => w.length > 0);

    if (words.length === 0) {
      setOutput("");
      return;
    }

    let result = "";

    switch (caseType) {
      case "camelCase":
        result = words[0].toLowerCase() +
          words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
        break;
      case "PascalCase":
        result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
        break;
      case "snake_case":
        result = words.join("_").toLowerCase();
        break;
      case "kebab-case":
        result = words.join("-").toLowerCase();
        break;
    }

    // Add prefix/suffix
    result = options.prefix + result + options.suffix;

    setOutput(result);
  }, [input, caseType, options]);

  useEffect(() => {
    convertText();
  }, [convertText]);

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
    a.download = `${output || "converted"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reverseToSpaces = () => {
    setInput(output
      .replace(/([a-z])([A-Z])/g, "$1 $2")  // Split camelCase
      .replace(/_/g, " ")
      .replace(/-/g, " ")
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
      {/* Case Style Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Output Style</h3>
        </div>
        <ToggleGroup
          type="single"
          value={caseType}
          onValueChange={(v) => v && setCaseType(v as CaseType)}
          className="grid grid-cols-2 md:grid-cols-4 gap-2"
        >
          <ToggleGroupItem value="camelCase" className="font-mono text-xs">camelCase</ToggleGroupItem>
          <ToggleGroupItem value="PascalCase" className="font-mono text-xs">PascalCase</ToggleGroupItem>
          <ToggleGroupItem value="snake_case" className="font-mono text-xs">snake_case</ToggleGroupItem>
          <ToggleGroupItem value="kebab-case" className="font-mono text-xs">kebab-case</ToggleGroupItem>
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
            placeholder="Paste variable name, title, filename, or any text..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-80 font-mono text-sm resize-none bg-background/50"
            spellCheck={false}
          />
          <Button onClick={() => setInput("")} variant="outline" className="w-full">
            Clear Input
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-primary">Result</label>
            <div className="flex gap-2">
              <Badge variant="outline">{output.length} chars</Badge>
              {output && <Badge variant="secondary">{caseType}</Badge>}
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            placeholder="Your converted text appears here instantly..."
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

            <Tooltip content="Convert back to readable text" position="top">
              <Button onClick={reverseToSpaces} disabled={!output} variant="outline" size="icon">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <details className="mt-10 border-t pt-6">
        <summary className="cursor-pointer font-semibold text-primary flex items-center gap-2 hover:text-primary/80">
          Advanced Options
        </summary>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={options.preserveAcronyms}
                onChange={(e) => setOptions({ ...options, preserveAcronyms: e.target.checked })}
                className="w-4 h-4 rounded text-primary"
              />
              <span>Preserve acronyms (API, ID, URL, JWT, etc.)</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={options.removeNumbers}
                onChange={(e) => setOptions({ ...options, removeNumbers: e.target.checked })}
                className="w-4 h-4 rounded text-primary"
              />
              <span>Remove numbers</span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-20">Prefix:</span>
              <input
                type="text"
                value={options.prefix}
                onChange={(e) => setOptions({ ...options, prefix: e.target.value })}
                placeholder="e.g. get, set, use"
                className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-20">Suffix:</span>
              <input
                type="text"
                value={options.suffix}
                onChange={(e) => setOptions({ ...options, suffix: e.target.value })}
                placeholder="e.g. Store, Hook, Service"
                className="flex-1 rounded border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>
          </div>
        </div>
      </details>

      {/* Quick Examples */}
      <div className="mt-8 rounded-lg bg-muted/50 p-6 border border-border/50">
        <p className="font-medium text-sm mb-3">Quick examples:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "user profile image upload component",
            "fetch user data from API endpoint",
            "login with JWT token 2025",
            "my awesome react hook v2",
            "URL shortener service backend",
          ].map((text) => (
            <Button
              key={text}
              variant="ghost"
              size="sm"
              onClick={() => setInput(text)}
              className="font-mono text-xs hover:bg-primary/10"
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}