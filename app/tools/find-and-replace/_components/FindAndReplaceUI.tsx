// app/tools/find-and-replace/_components/FindAndReplaceUI.tsx
"use client";

import { useState, useEffect, useCallback } from "react";

export default function FindAndReplaceUI() {
    const [text, setText] = useState("");
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [output, setOutput] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [wholeWord, setWholeWord] = useState(false);
    const [matchCount, setMatchCount] = useState(0);
    const [copied, setCopied] = useState(false);

    // Escape regex special characters
    const escapeRegex = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    // Calculate matches without modifying state directly during render
    const calculateMatches = useCallback(() => {
        if (!text || !findText) {
            setMatchCount(0);
            return;
        }

        try {
            const flags = caseSensitive ? "g" : "gi";
            const pattern = wholeWord 
                ? `\\b${escapeRegex(findText)}\\b` 
                : escapeRegex(findText);
            
            const regex = new RegExp(pattern, flags);
            const matches = text.match(regex);
            setMatchCount(matches ? matches.length : 0);
        } catch (e) {
            setMatchCount(0);
        }
    }, [text, findText, caseSensitive, wholeWord]);

    useEffect(() => {
        const timer = setTimeout(calculateMatches, 150); // Debounce
        return () => clearTimeout(timer);
    }, [calculateMatches]);

    const handleReplace = () => {
        if (!findText) return;

        try {
            const flags = caseSensitive ? "g" : "gi";
            const pattern = wholeWord 
                ? `\\b${escapeRegex(findText)}\\b` 
                : escapeRegex(findText);
            
            const regex = new RegExp(pattern, flags);
            const newText = text.replace(regex, replaceText);
            
            setText(newText);
            // Flash success message logic could go here
        } catch (e) {
            console.error("Replace failed:", e);
        }
    };

    const handleCopy = async () => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setText("");
        setFindText("");
        setReplaceText("");
        setMatchCount(0);
    };

    const loadSample = () => {
        setText("The quick brown fox jumps over the lazy dog. The dog barks at the fox.");
        setFindText("fox");
        setReplaceText("cat");
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            {/* Top Controls */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="find" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Find Text
                        </label>
                        <div className="relative">
                            <input
                                id="find"
                                type="text"
                                value={findText}
                                onChange={(e) => setFindText(e.target.value)}
                                placeholder="Text to find..."
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                            />
                            {matchCount > 0 && (
                                <span className="absolute right-3 top-2.5 text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                    {matchCount} match{matchCount !== 1 && 'es'}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={caseSensitive}
                                    onChange={(e) => setCaseSensitive(e.target.checked)}
                                    className="peer h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition">
                                Case Sensitive
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={wholeWord}
                                    onChange={(e) => setWholeWord(e.target.checked)}
                                    className="peer h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition">
                                Whole Words
                            </span>
                        </label>
                    </div>
                </div>

                <div>
                    <label htmlFor="replace" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Replace With
                    </label>
                    <input
                        id="replace"
                        type="text"
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder="Replacement text..."
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                    />
                </div>
            </div>

            {/* Main Text Area */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label htmlFor="main-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                    </label>
                    <button 
                        onClick={loadSample}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Load Sample
                    </button>
                </div>
                <textarea
                    id="main-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here to begin..."
                    className="h-[300px] w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-4 text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-y"
                    spellCheck={false}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                <button
                    onClick={handleReplace}
                    disabled={!text || !findText || matchCount === 0}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Replace All
                </button>

                <button
                    onClick={handleCopy}
                    disabled={!text}
                    className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                        copied ? "bg-green-600" : "bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600"
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
                            Copy Text
                        </>
                    )}
                </button>

                <button
                    onClick={handleClear}
                    disabled={!text && !findText}
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