"use client";

import { useState, useCallback } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui";
import { Textarea } from "../../../components/ui";

const FormatterUI = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const format = useCallback((type: string) => {
    let result = text;

    switch (type) {
      case "spaces":
        result = text.replace(/\s+/g, " ").trim();
        break;
      case "lines":
        result = text.replace(/\n\s*\n/g, "\n\n").replace(/\n{3,}/g, "\n\n");
        break;
      case "trim":
        result = text.split("\n").map((l) => l.trim()).join("\n");
        break;
      case "empty-lines":
        result = text.split("\n").filter((l) => l.trim() !== "").join("\n");
        break;
      case "sentence-case":
        result = text
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "title-case":
        result = text.replace(/\w\S*/g, (txt) =>
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "duplicate-lines":
        const lines = text.split("\n");
        result = [...new Set(lines)].join("\n");
        break;
      case "smart-clean":
        result = text
          .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width chars
          .replace(/[\r\n]+/g, "\n")             // Normalize line breaks
          .replace(/\s+/g, " ")                  // Collapse spaces
          .replace(/ ?\n ?/g, "\n")              // Clean spaces around newlines
          .trim();
        break;
    }

    setText(result);
  }, [text]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const charCount = text.length;
  const wordCount = text ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").filter(l => l.trim() !== "").length : 0;

  return (
    <div className="space-y-8 rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-lg">
      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-lg font-semibold text-primary">Your Text</label>
          <div className="flex gap-4 text-sm text-secondary">
            <span>Characters: <strong>{charCount}</strong></span>
            <span>Words: <strong>{wordCount}</strong></span>
            <span>Lines: <strong>{lineCount}</strong></span>
          </div>
        </div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your messy text here... (WhatsApp forward, PDF copy, Word doc, etc.)"
          className="min-h-96 font-mono text-sm resize-none"
        />
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Button onClick={() => format("smart-clean")} variant="primary" className="font-medium">
          ✨ Smart Clean (Best)
        </Button>
        <Button onClick={() => format("spaces")} variant="secondary">
          Remove Extra Spaces
        </Button>
        <Button onClick={() => format("lines")} variant="secondary">
          Fix Line Breaks
        </Button>
        <Button onClick={() => format("trim")} variant="secondary">
          Trim All Lines
        </Button>
        <Button onClick={() => format("empty-lines")} variant="secondary">
          Remove Empty Lines
        </Button>
        <Button onClick={() => format("duplicate-lines")} variant="secondary">
          Remove Duplicate Lines
        </Button>
        <Button onClick={() => format("sentence-case")} variant="outline">
          Sentence case
        </Button>
        <Button onClick={() => format("title-case")} variant="outline">
          Title Case
        </Button>
        <Button onClick={() => format("uppercase")} variant="outline">
          UPPERCASE
        </Button>
        <Button onClick={() => format("lowercase")} variant="outline">
          lowercase
        </Button>
      </div>

      {/* Copy Button */}
      {text && (
        <div className="flex justify-center">
          <Button onClick={copyToClipboard} size="lg" className="gap-2">
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" /> Copy Cleaned Text
              </>
            )}
          </Button>
        </div>
      )}

      {/* Popular Use Cases */}
      <div className="mt-10 rounded-lg bg-surface-hover/50 border border-border p-6 text-sm">
        <h3 className="font-semibold text-primary mb-3">Perfect for:</h3>
        <ul className="space-y-2 text-secondary">
          <li>✔ Cleaning copied text from WhatsApp / Telegram forwards</li>
          <li>✔ Fixing messed up text from PDF or Microsoft Word</li>
          <li>✔ Preparing content for blogs, emails, or social media</li>
          <li>✔ Removing duplicate lines from lists</li>
          <li>✔ Converting messy text to proper sentences</li>
        </ul>
      </div>
    </div>
  );
};

export default FormatterUI;