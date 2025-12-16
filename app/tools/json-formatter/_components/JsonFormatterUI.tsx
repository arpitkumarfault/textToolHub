// app/tools/json-formatter/_components/JsonFormatterUI.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

interface JsonStats {
    size: number;
    keys: number;
    depth: number;
    arrays: number;
    objects: number;
}

type IndentSize = 2 | 4 | 8;

export default function JsonFormatterUI() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [indentSize, setIndentSize] = useState<IndentSize>(2);
    const [activeTab, setActiveTab] = useState<"formatted" | "minified" | "tree">("formatted");

    const calculateStats = useCallback((obj: unknown, depth = 0): JsonStats => {
        const stats: JsonStats = { size: 0, keys: 0, depth, arrays: 0, objects: 0 };

        if (Array.isArray(obj)) {
            stats.arrays = 1;
            obj.forEach((item) => {
                const childStats = calculateStats(item, depth + 1);
                stats.keys += childStats.keys;
                stats.depth = Math.max(stats.depth, childStats.depth);
                stats.arrays += childStats.arrays;
                stats.objects += childStats.objects;
            });
        } else if (obj !== null && typeof obj === "object") {
            stats.objects = 1;
            const keys = Object.keys(obj);
            stats.keys = keys.length;
            keys.forEach((key) => {
                const childStats = calculateStats((obj as Record<string, unknown>)[key], depth + 1);
                stats.keys += childStats.keys;
                stats.depth = Math.max(stats.depth, childStats.depth);
                stats.arrays += childStats.arrays;
                stats.objects += childStats.objects;
            });
        }

        return stats;
    }, []);

    const formatJson = useCallback((json: string, indent: number): string => {
        const parsed = JSON.parse(json);
        return JSON.stringify(parsed, null, indent);
    }, []);

    const minifyJson = useCallback((json: string): string => {
        const parsed = JSON.parse(json);
        return JSON.stringify(parsed);
    }, []);

    const processJson = useCallback(() => {
        if (!input.trim()) {
            setOutput("");
            setError(null);
            return;
        }

        try {
            let result: string;
            if (activeTab === "minified") {
                result = minifyJson(input);
            } else {
                result = formatJson(input, indentSize);
            }
            setOutput(result);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Invalid JSON";
            setError(errorMessage);
            setOutput("");
        }
    }, [input, activeTab, indentSize, formatJson, minifyJson]);

    useEffect(() => {
        const timer = setTimeout(processJson, 150);
        return () => clearTimeout(timer);
    }, [processJson]);

    const stats = useMemo((): JsonStats | null => {
        if (!output || error) return null;
        try {
            const parsed = JSON.parse(output);
            const baseStats = calculateStats(parsed);
            return {
                ...baseStats,
                size: new Blob([output]).size,
            };
        } catch {
            return null;
        }
    }, [output, error, calculateStats]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "formatted.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setInput(content);
        };
        reader.readAsText(file);
        e.target.value = "";
    };

    const loadSample = () => {
        const sample = {
            name: "John Doe",
            age: 30,
            email: "john@example.com",
            isActive: true,
            address: {
                street: "123 Main St",
                city: "New York",
                country: "USA",
            },
            hobbies: ["reading", "gaming", "coding"],
            projects: [
                { name: "Project A", status: "completed" },
                { name: "Project B", status: "in-progress" },
            ],
        };
        setInput(JSON.stringify(sample));
    };

    const renderTree = useCallback((data: unknown, level = 0): React.ReactNode => {
        const indent = level * 16;

        if (data === null) {
            return <span className="text-gray-500 dark:text-gray-400">null</span>;
        }

        if (typeof data === "boolean") {
            return <span className="text-purple-600 dark:text-purple-400">{data.toString()}</span>;
        }

        if (typeof data === "number") {
            return <span className="text-blue-600 dark:text-blue-400">{data}</span>;
        }

        if (typeof data === "string") {
            return <span className="text-green-600 dark:text-green-400">&quot;{data}&quot;</span>;
        }

        if (Array.isArray(data)) {
            if (data.length === 0) {
                return <span className="text-gray-500 dark:text-gray-400">[]</span>;
            }
            return (
                <div style={{ marginLeft: indent }}>
                    <span className="text-gray-600 dark:text-gray-400">[</span>
                    {data.map((item, index) => (
                        <div key={index} className="ml-4">
                            <span className="text-gray-400">{index}: </span>
                            {renderTree(item, level + 1)}
                            {index < data.length - 1 && <span className="text-gray-400">,</span>}
                        </div>
                    ))}
                    <span className="text-gray-600 dark:text-gray-400">]</span>
                </div>
            );
        }

        if (typeof data === "object") {
            const entries = Object.entries(data as Record<string, unknown>);
            if (entries.length === 0) {
                return <span className="text-gray-500 dark:text-gray-400">{"{}"}</span>;
            }
            return (
                <div style={{ marginLeft: indent }}>
                    <span className="text-gray-600 dark:text-gray-400">{"{"}</span>
                    {entries.map(([key, value], index) => (
                        <div key={key} className="ml-4">
                            <span className="text-red-600 dark:text-red-400">&quot;{key}&quot;</span>
                            <span className="text-gray-600 dark:text-gray-400">: </span>
                            {renderTree(value, level + 1)}
                            {index < entries.length - 1 && <span className="text-gray-400">,</span>}
                        </div>
                    ))}
                    <span className="text-gray-600 dark:text-gray-400">{"}"}</span>
                </div>
            );
        }

        return null;
    }, []);

    const parsedData = useMemo(() => {
        if (!output || error) return null;
        try {
            return JSON.parse(output);
        } catch {
            return null;
        }
    }, [output, error]);

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    {stats ? (
                        <>
                            <span>
                                <strong className="text-gray-900 dark:text-white">{stats.size}</strong> bytes
                            </span>
                            <span>
                                <strong className="text-gray-900 dark:text-white">{stats.keys}</strong> keys
                            </span>
                            <span>
                                <strong className="text-gray-900 dark:text-white">{stats.depth}</strong> depth
                            </span>
                            <span>
                                <strong className="text-gray-900 dark:text-white">{stats.objects}</strong> objects
                            </span>
                            <span>
                                <strong className="text-gray-900 dark:text-white">{stats.arrays}</strong> arrays
                            </span>
                        </>
                    ) : (
                        <span>Enter JSON to see stats</span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <label className="relative cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        Upload File
                        <input
                            type="file"
                            accept=".json,application/json"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </label>
                    <button
                        onClick={loadSample}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Load Sample
                    </button>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                    {/* Input */}
                    <div>
                        <label className="block mb-2 font-semibold text-gray-900 dark:text-white">
                            JSON Input
                        </label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='{"key": "value"}'
                            className={`w-full h-96 p-4 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:ring-2 focus:border-transparent outline-none ${
                                error
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                            }`}
                            spellCheck={false}
                        />
                        {error && (
                            <div className="mt-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                                <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                                    ❌ {error}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Output */}
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                                {(["formatted", "minified", "tree"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition capitalize ${
                                            activeTab === tab
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            {activeTab === "formatted" && (
                                <select
                                    value={indentSize}
                                    onChange={(e) => setIndentSize(Number(e.target.value) as IndentSize)}
                                    className="px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                    <option value={2}>2 spaces</option>
                                    <option value={4}>4 spaces</option>
                                    <option value={8}>8 spaces</option>
                                </select>
                            )}
                        </div>

                        {activeTab === "tree" && parsedData ? (
                            <div className="w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 overflow-auto font-mono text-sm">
                                {renderTree(parsedData)}
                            </div>
                        ) : (
                            <textarea
                                value={output}
                                readOnly
                                placeholder="Formatted output will appear here..."
                                className="w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
                            />
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                            copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {copied ? "✓ Copied!" : "📋 Copy"}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!output}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ⬇ Download
                    </button>
                    <button
                        onClick={handleClear}
                        disabled={!input}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        🗑 Clear
                    </button>
                </div>

                {/* Validation Status */}
                {input && !error && (
                    <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-600 dark:text-green-400">
                            ✓ Valid JSON
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}