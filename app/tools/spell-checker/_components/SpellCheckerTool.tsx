"use client";

import { useState, useCallback, useRef } from "react";
import { Textarea } from "../../../components/ui";
import { Button } from "../../../components/ui";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  Sparkles,
  Download,
  Trash2,
  Check,
  RefreshCw,
  Eye,
  Edit2,
  XCircle, // New icon for Stop
} from "lucide-react";

interface SpellingError {
  word: string;
  suggestions: string[];
}

interface Stats {
  charCount: number;
  wordCount: number;
  errorCount: number;
}

export default function SpellCheckerTool() {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<SpellingError[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"edit" | "highlight">("edit");

  // Ref to store the abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  const checkSpelling = useCallback(async () => {
    if (!text.trim()) return;

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setChecked(false);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/spell-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: controller.signal, // Attach signal
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to check spelling");
      }

      setErrors(data.errors || []);
      setStats(data.stats || null);
      setChecked(true);
      
      if (data.errors.length > 0) {
        setViewMode("highlight");
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log("Request cancelled by user");
        return; // Don't show error for cancellation
      }
      console.error("Error:", err);
      setErrorMsg(err.message || "Failed to check spelling. Please try again.");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [text]);

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const replaceWord = (oldWord: string, newWord: string) => {
    const regex = new RegExp(`\\b${oldWord}\\b`, "g");
    setText((prev) => prev.replace(regex, newWord));
    setErrors((prev) => prev.filter((e) => e.word !== oldWord));
    if (stats) {
      setStats({ ...stats, errorCount: stats.errorCount - 1 });
    }
  };

  const replaceAll = () => {
    let newText = text;
    errors.forEach((error) => {
      if (error.suggestions.length > 0) {
        const regex = new RegExp(`\\b${error.word}\\b`, "g");
        newText = newText.replace(regex, error.suggestions[0]);
      }
    });
    setText(newText);
    setErrors([]);
    setStats(prev => prev ? { ...prev, errorCount: 0 } : null);
    setViewMode("edit");
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "corrected-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    handleStop(); // Stop any pending request first
    setText("");
    setErrors([]);
    setChecked(false);
    setStats(null);
    setErrorMsg(null);
    setViewMode("edit");
  };

  const renderHighlightedText = () => {
    if (!text) return null;
    if (errors.length === 0) return <div className="whitespace-pre-wrap">{text}</div>;

    const errorWords = errors.map(e => e.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`\\b(${errorWords})\\b`, 'g');
    
    let match;
    const elements = [];
    let currentIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      elements.push(text.slice(currentIndex, match.index));
      const word = match[0];
      const error = errors.find(e => e.word === word);
      
      elements.push(
        <span key={match.index} className="group relative inline-block">
          <span className="bg-red-200 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-b-2 border-red-500 cursor-pointer rounded px-0.5 font-semibold">
            {word}
          </span>
          <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] hidden group-hover:block">
            <div className="bg-gray-900 text-white text-xs rounded shadow-lg p-2 flex flex-col gap-1">
              <span className="font-bold border-b border-gray-700 pb-1 mb-1 block">Suggestions:</span>
              {error?.suggestions.length ? (
                error.suggestions.slice(0, 3).map(s => (
                  <button 
                    key={s}
                    onClick={() => replaceWord(word, s)}
                    className="text-left hover:text-green-400 transition-colors"
                  >
                    {s}
                  </button>
                ))
              ) : (
                <span className="italic text-gray-500">No suggestions</span>
              )}
            </div>
            <div className="w-2 h-2 bg-gray-900 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
          </div>
        </span>
      );
      currentIndex = regex.lastIndex;
    }
    
    elements.push(text.slice(currentIndex));
    return <div className="whitespace-pre-wrap font-medium text-lg leading-relaxed">{elements}</div>;
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-xl">
      {/* Stats Bar */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-xl bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {text.length.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Characters</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {wordCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Words</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {text.split(/[.!?]+/).filter(Boolean).length}
          </div>
          <div className="text-xs text-gray-500">Sentences</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${errors.length > 0 ? "text-red-600" : "text-green-600"}`}>
            {errors.length}
          </div>
          <div className="text-xs text-gray-500">Errors Found</div>
        </div>
      </div>

      {/* View Toggle */}
      {checked && (
        <div className="flex justify-end mb-2">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setViewMode("edit")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "edit" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => setViewMode("highlight")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === "highlight" 
                  ? "bg-white dark:bg-gray-600 text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              <Eye className="w-4 h-4" /> Review
            </button>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="mb-6 relative min-h-[300px]">
        {viewMode === "edit" ? (
          <>
            <Textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (checked) setChecked(false);
              }}
              placeholder="Paste your text here (paragraphs supported)..."
              className="w-full h-[400px] text-lg p-4 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 resize-none"
              spellCheck={false}
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded backdrop-blur-sm">
              {text.length}/50,000
            </div>
          </>
        ) : (
          <div className="w-full h-[400px] overflow-y-auto p-6 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900">
            {renderHighlightedText()}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {loading ? (
          <Button
            onClick={handleStop}
            variant="destructive"
            size="lg"
            className="px-8 animate-pulse"
          >
            <XCircle className="mr-2 h-5 w-5" /> Stop Checking
          </Button>
        ) : (
          <Button
            onClick={checkSpelling}
            disabled={!text.trim()}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            <Check className="mr-2 h-5 w-5" /> Check Spelling
          </Button>
        )}

        {errors.length > 0 && (
          <Button onClick={replaceAll} variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            <RefreshCw className="mr-2 h-5 w-5" /> Auto Fix All
          </Button>
        )}

        <div className="ml-auto flex gap-2">
            <Button onClick={copyText} variant="ghost" size="icon" title="Copy Text">
              {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
            </Button>
            <Button onClick={downloadText} variant="ghost" size="icon" title="Download Text">
              <Download className="h-5 w-5" />
            </Button>
            <Button onClick={clearAll} variant="ghost" size="icon" title="Clear Text" className="text-red-500 hover:text-red-600 hover:bg-red-50">
              <Trash2 className="h-5 w-5" />
            </Button>
        </div>
      </div>

      {/* Status Messages */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          {errorMsg}
        </div>
      )}

      {checked && errors.length === 0 && !errorMsg && !loading && (
        <div className="mb-6 p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-800 mb-3">
            <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200">No Errors Found!</h3>
          <p className="text-green-600 dark:text-green-400">Your text is clean and ready to go.</p>
        </div>
      )}

      {/* Error List */}
      {errors.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-500 h-5 w-5" />
            Suggested Corrections ({errors.length})
          </h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {errors.map((err, i) => (
              <div key={i} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-sm transition">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-red-600 dark:text-red-400 line-through">{err.word}</span>
                  <span className="text-xs text-gray-400">#{i + 1}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {err.suggestions.slice(0, 3).map((s) => (
                    <button
                      key={s}
                      onClick={() => replaceWord(err.word, s)}
                      className="text-sm px-2 py-1 rounded bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-green-700 dark:text-green-400 hover:border-green-500 hover:text-green-800 transition"
                    >
                      {s}
                    </button>
                  ))}
                  {err.suggestions.length === 0 && <span className="text-xs text-gray-400 italic">No suggestions</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}