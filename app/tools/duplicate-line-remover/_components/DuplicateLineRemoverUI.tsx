// app/tools/duplicate-line-remover/_components/DuplicateLineRemoverUI.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

export default function DuplicateLineRemoverUI() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [trimWhitespace, setTrimWhitespace] = useState(true);
    const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
    const [stats, setStats] = useState({ original: 0, unique: 0, removed: 0 });
    const [copied, setCopied] = useState(false);

    const processText = useCallback(() => {
        if (!input) {
            setOutput("");
            setStats({ original: 0, unique: 0, removed: 0 });
            return;
        }

        const lines = input.split("\n");
        const seen = new Set<string>();
        const uniqueLines: string[] = [];
        let duplicates = 0;

        lines.forEach((line) => {
            let compareLine = line;

            if (trimWhitespace) {
                compareLine = line.trim();
            }

            if (removeEmptyLines && compareLine === "") {
                return; // Skip empty lines entirely
            }

            const checkLine = caseSensitive ? compareLine : compareLine.toLowerCase();

            if (!seen.has(checkLine)) {
                seen.add(checkLine);
                uniqueLines.push(line);
            } else {
                duplicates++;
            }
        });

        setOutput(uniqueLines.join("\n"));
        setStats({
            original: lines.length,
            unique: uniqueLines.length,
            removed: lines.length - uniqueLines.length
        });
    }, [input, caseSensitive, trimWhitespace, removeEmptyLines]);

    useEffect(() => {
        const timer = setTimeout(processText, 150);
        return () => clearTimeout(timer);
    }, [processText]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
    };

    const loadSample = () => {
        setInput(`Apple
Banana
Orange
Apple
Banana
Grape
apple
   Orange   
`);
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            {/* Controls */}
            <div className="mb-6 space-y-3">
                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={caseSensitive}
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            Case Sensitive
                        </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={trimWhitespace}
                            onChange={(e) => setTrimWhitespace(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            Trim Whitespace
                        </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={removeEmptyLines}
                            onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            Remove Empty Lines
                        </span>
                    </label>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-gray-900 dark:text-white">
                            Original Text
                        </label>
                        <button 
                            onClick={loadSample}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Load Sample
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your list here..."
                        className="flex-1 min-h-[400px] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition"
                        spellCheck={false}
                    />
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Lines: {stats.original}
                    </div>
                </div>

                {/* Output */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-gray-900 dark:text-white">
                            Unique Lines
                        </label>
                        {stats.removed > 0 && (
                            <span className="text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">
                                Removed {stats.removed} duplicates
                            </span>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Unique lines will appear here..."
                        className="flex-1 min-h-[400px] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
                    />
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Lines: {stats.unique}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                <button
                    onClick={handleCopy}
                    disabled={!output}
                    className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                        copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {copied ? (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy Result
                        </>
                    )}
                </button>
                <button
                    onClick={handleClear}
                    disabled={!input}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-2.5 font-semibold text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                </button>
            </div>
        </div>
    );
}