// app/tools/lorem-ipsum-generator/_components/LoremIpsumUI.tsx
"use client";

import { useState, useCallback } from "react";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumUI() {
    const [count, setCount] = useState(3);
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);

    const generateText = useCallback(() => {
        const getWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        
        const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

        const getSentence = () => {
            const length = Math.floor(Math.random() * 10) + 5;
            const words = Array.from({ length }, getWord);
            words[0] = capitalize(words[0]);
            return words.join(" ") + ".";
        };

        const getParagraph = () => {
            const length = Math.floor(Math.random() * 3) + 3;
            return Array.from({ length }, getSentence).join(" ");
        };

        let result = "";

        if (type === "paragraphs") {
            const paragraphs = Array.from({ length: count }, getParagraph);
            if (startWithLorem && count > 0) {
                paragraphs[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + paragraphs[0].split(". ").slice(1).join(". ");
            }
            result = paragraphs.join("\n\n");
        } else if (type === "sentences") {
            const sentences = Array.from({ length: count }, getSentence);
            if (startWithLorem && count > 0) {
                sentences[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
            }
            result = sentences.join(" ");
        } else {
            const words = Array.from({ length: count }, getWord);
            if (startWithLorem && count > 0) {
                words.splice(0, 5, "lorem", "ipsum", "dolor", "sit", "amet");
            }
            result = words.join(" ");
        }

        setOutput(result);
    }, [count, type, startWithLorem]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6">
            {/* Controls */}
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Type
                        </label>
                        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
                            {(["paragraphs", "sentences", "words"] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-all ${
                                        type === t
                                            ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                    }`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            value={count}
                            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="start-lorem"
                            checked={startWithLorem}
                            onChange={(e) => setStartWithLorem(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="start-lorem" className="text-sm text-gray-700 dark:text-gray-300 select-none">
                            Start with "Lorem ipsum..."
                        </label>
                    </div>

                    <button
                        onClick={generateText}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Generate Text
                    </button>
                </div>

                {/* Output Area */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Generated Text
                    </label>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Generated text will appear here..."
                        className="h-[300px] w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 p-4 text-sm text-gray-900 dark:text-gray-100 font-serif leading-relaxed focus:outline-none"
                    />
                    
                    {output && (
                        <div className="absolute top-9 right-2 flex gap-2">
                            <button
                                onClick={handleCopy}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium text-white transition shadow-sm ${
                                    copied ? "bg-green-600" : "bg-gray-800/80 hover:bg-gray-900"
                                }`}
                            >
                                {copied ? "✓ Copied" : "Copy"}
                            </button>
                            <button
                                onClick={() => setOutput("")}
                                className="rounded-md bg-gray-800/80 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 transition shadow-sm"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Quick Stats */}
            {output && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex gap-4">
                    <span>Paragraphs: {type === 'paragraphs' ? count : Math.ceil(count / 5)}</span>
                    <span>Words: {output.split(/\s+/).filter(Boolean).length}</span>
                    <span>Characters: {output.length}</span>
                </div>
            )}
        </div>
    );
}