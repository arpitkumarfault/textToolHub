// app/tools/sort-lines/_components/SortLinesUI.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

type SortOrder = "asc" | "desc";
type SortType = "alphabetical" | "numerical" | "length";

export default function SortLinesUI() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const [sortType, setSortType] = useState<SortType>("alphabetical");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [removeDuplicates, setRemoveDuplicates] = useState(false);
    const [removeEmpty, setRemoveEmpty] = useState(true);
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState({ total: 0, unique: 0 });

    const processLines = useCallback(() => {
        if (!input) {
            setOutput("");
            setStats({ total: 0, unique: 0 });
            return;
        }

        let lines = input.split("\n");

        if (removeEmpty) {
            lines = lines.filter(line => line.trim() !== "");
        }

        if (removeDuplicates) {
            // Case insensitive duplicate removal if needed
            if (!caseSensitive) {
                const seen = new Set();
                lines = lines.filter(line => {
                    const lower = line.toLowerCase();
                    if (seen.has(lower)) return false;
                    seen.add(lower);
                    return true;
                });
            } else {
                lines = [...new Set(lines)];
            }
        }

        const sortedLines = [...lines].sort((a, b) => {
            let valA = a;
            let valB = b;

            if (sortType === "length") {
                return sortOrder === "asc" 
                    ? a.length - b.length || a.localeCompare(b)
                    : b.length - a.length || b.localeCompare(a);
            }

            if (!caseSensitive) {
                valA = a.toLowerCase();
                valB = b.toLowerCase();
            }

            if (sortType === "numerical") {
                // Extract numbers for comparison
                const numA = parseFloat(valA.match(/-?\d+(\.\d+)?/)?.[0] || "0");
                const numB = parseFloat(valB.match(/-?\d+(\.\d+)?/)?.[0] || "0");
                return sortOrder === "asc" ? numA - numB : numB - numA;
            }

            // Alphabetical natural sort (handles "Item 2" before "Item 10")
            return sortOrder === "asc"
                ? valA.localeCompare(valB, undefined, { numeric: true, sensitivity: 'base' })
                : valB.localeCompare(valA, undefined, { numeric: true, sensitivity: 'base' });
        });

        setOutput(sortedLines.join("\n"));
        setStats({ total: lines.length, unique: new Set(lines).size });

    }, [input, sortOrder, sortType, caseSensitive, removeDuplicates, removeEmpty]);

    // Debounce processing
    useEffect(() => {
        const timer = setTimeout(processLines, 150);
        return () => clearTimeout(timer);
    }, [processLines]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const loadSample = () => {
        setInput(`Banana
Apple
10. Orange
2. Grape
Cherry
apple
5. Mango`);
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            {/* Controls */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sort Order
                        </label>
                        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                            {(["asc", "desc"] as const).map((order) => (
                                <button
                                    key={order}
                                    onClick={() => setSortOrder(order)}
                                    className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all ${
                                        sortOrder === order
                                            ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                                >
                                    {order === "asc" ? "Ascending (A-Z)" : "Descending (Z-A)"}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sort Method
                        </label>
                        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                            {(["alphabetical", "numerical", "length"] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSortType(type)}
                                    className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all capitalize ${
                                        sortType === type
                                            ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Options
                    </label>
                    <div className="grid gap-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={removeDuplicates}
                                onChange={(e) => setRemoveDuplicates(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                Remove Duplicates
                            </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={removeEmpty}
                                onChange={(e) => setRemoveEmpty(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                Remove Empty Lines
                            </span>
                        </label>
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
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-gray-900 dark:text-white">
                            Original List
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
                        className="flex-1 min-h-[300px] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition"
                        spellCheck={false}
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-semibold text-gray-900 dark:text-white">
                            Sorted List
                        </label>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {stats.total} lines
                        </span>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Sorted result..."
                        className="flex-1 min-h-[300px] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100 resize-none focus:outline-none"
                    />
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
                            Copy Sorted List
                        </>
                    )}
                </button>
                <button
                    onClick={() => { setInput(""); setOutput(""); }}
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