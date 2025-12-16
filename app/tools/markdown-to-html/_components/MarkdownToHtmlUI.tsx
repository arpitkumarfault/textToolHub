// app/tools/markdown-to-html/_components/MarkdownToHtmlUI.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// Move regex patterns outside component to prevent Tailwind CSS scanning issues
const PATTERNS = {
    codeBlock: /```(\w*)\n([\s\S]*?)```/g,
    inlineCode: /`([^`]+)`/g,
    h6: /^#{6}\s(.+)$/gm,
    h5: /^#{5}\s(.+)$/gm,
    h4: /^#{4}\s(.+)$/gm,
    h3: /^#{3}\s(.+)$/gm,
    h2: /^#{2}\s(.+)$/gm,
    h1: /^#{1}\s(.+)$/gm,
    hr: /^(?:---|\*\*\*|___)$/gm,
    image: /!\[([^\]]*)\]\(([^)]+)\)/g,
    link: /\[([^\]]+)\]\(([^)]+)\)/g,
    boldAsterisk: /\*\*([^*]+)\*\*/g,
    boldUnderscore: /__([^_]+)__/g,
    italicAsterisk: /\*([^*]+)\*/g,
    italicUnderscore: /_([^_]+)_/g,
    strikethrough: /~~([^~]+)~~/g,
    unorderedList: /^[-*+]\s(.+)$/gm,
    orderedList: /^\d+\.\s(.+)$/gm,
    listWrap: /((?:<li>.*<\/li>\n?)+)/g,
    blockquote: /^>\s(.+)$/gm,
    emptyParagraph: /<p>\s*<\/p>/g,
};

// Table pattern stored separately to avoid Tailwind scanning
const TABLE_PATTERN = new RegExp(
    "^\\|(.+)\\|\\n\\|[\\-:\\s\\|]+\\|\\n((?:\\|.+\\|\\n?)+)",
    "gm"
);

export default function MarkdownToHtmlUI() {
    const [markdown, setMarkdown] = useState("");
    const [html, setHtml] = useState("");
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<"html" | "preview">("html");

    const escapeHtml = useCallback((text: string) => {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }, []);

    const convertMarkdownToHtml = useCallback((md: string): string => {
        if (!md.trim()) return "";

        let result = md;
        const codeBlocks: string[] = [];
        const inlineCodes: string[] = [];

        // Preserve code blocks
        result = result.replace(PATTERNS.codeBlock, (_, lang, code) => {
            const langAttr = lang ? ` class="language-${lang}"` : "";
            codeBlocks.push(`<pre><code${langAttr}>${escapeHtml(code.trim())}</code></pre>`);
            return `%%CODE${codeBlocks.length - 1}%%`;
        });

        // Preserve inline code
        result = result.replace(PATTERNS.inlineCode, (_, code) => {
            inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
            return `%%INLINE${inlineCodes.length - 1}%%`;
        });

        // Headers
        result = result.replace(PATTERNS.h6, "<h6>$1</h6>");
        result = result.replace(PATTERNS.h5, "<h5>$1</h5>");
        result = result.replace(PATTERNS.h4, "<h4>$1</h4>");
        result = result.replace(PATTERNS.h3, "<h3>$1</h3>");
        result = result.replace(PATTERNS.h2, "<h2>$1</h2>");
        result = result.replace(PATTERNS.h1, "<h1>$1</h1>");

        // Horizontal rules
        result = result.replace(PATTERNS.hr, "<hr />");

        // Images & Links
        result = result.replace(PATTERNS.image, '<img src="$2" alt="$1" />');
        result = result.replace(PATTERNS.link, '<a href="$2">$1</a>');

        // Text formatting
        result = result.replace(PATTERNS.boldAsterisk, "<strong>$1</strong>");
        result = result.replace(PATTERNS.boldUnderscore, "<strong>$1</strong>");
        result = result.replace(PATTERNS.italicAsterisk, "<em>$1</em>");
        result = result.replace(PATTERNS.italicUnderscore, "<em>$1</em>");
        result = result.replace(PATTERNS.strikethrough, "<del>$1</del>");

        // Lists
        result = result.replace(PATTERNS.unorderedList, "<li>$1</li>");
        result = result.replace(PATTERNS.orderedList, "<li>$1</li>");
        result = result.replace(PATTERNS.listWrap, "<ul>$1</ul>");

        // Blockquotes
        result = result.replace(PATTERNS.blockquote, "<blockquote>$1</blockquote>");

        // Tables
        result = result.replace(TABLE_PATTERN, (_, header, body) => {
            const headers = header
                .split("|")
                .filter(Boolean)
                .map((h: string) => `<th>${h.trim()}</th>`)
                .join("");
            const rows = body
                .trim()
                .split("\n")
                .map((row: string) => {
                    const cells = row
                        .split("|")
                        .filter(Boolean)
                        .map((c: string) => `<td>${c.trim()}</td>`)
                        .join("");
                    return `<tr>${cells}</tr>`;
                })
                .join("");
            return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        });

        // Paragraphs
        result = result
            .split("\n\n")
            .map((block) => {
                const trimmed = block.trim();
                if (!trimmed) return "";
                if (/^<(h[1-6]|ul|ol|blockquote|pre|table|hr)/.test(trimmed)) {
                    return trimmed;
                }
                if (/%%CODE\d+%%/.test(trimmed)) {
                    return trimmed;
                }
                return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
            })
            .filter(Boolean)
            .join("\n");

        // Restore code blocks and inline codes
        codeBlocks.forEach((block, i) => {
            result = result.replace(`%%CODE${i}%%`, block);
        });
        inlineCodes.forEach((code, i) => {
            result = result.replace(`%%INLINE${i}%%`, code);
        });

        return result.replace(PATTERNS.emptyParagraph, "").trim();
    }, [escapeHtml]);

    useEffect(() => {
        const timer = setTimeout(() => setHtml(convertMarkdownToHtml(markdown)), 150);
        return () => clearTimeout(timer);
    }, [markdown, convertMarkdownToHtml]);

    const stats = useMemo(
        () => ({
            chars: markdown.length,
            words: markdown.trim() ? markdown.trim().split(/\s+/).length : 0,
            lines: markdown ? markdown.split("\n").length : 0,
        }),
        [markdown]
    );

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(html);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "output.html";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setMarkdown("");
        setHtml("");
    };

    const loadSample = () => {
        const sample = [
            "# Welcome to Markdown",
            "",
            "This is **bold** and *italic* text.",
            "",
            "## Features",
            "- Easy to write",
            "- Real-time preview",
            "- Code block support",
            "",
            "```javascript",
            'console.log("Hello World!");',
            "```",
            "",
            "> A blockquote example",
            "",
            "| Header 1 | Header 2 |",
            "|----------|----------|",
            "| Cell 1   | Cell 2   |",
            "",
            "Visit [Google](https://google.com)",
        ].join("\n");
        setMarkdown(sample);
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>
                        <strong className="text-gray-900 dark:text-white">{stats.chars}</strong> chars
                    </span>
                    <span>
                        <strong className="text-gray-900 dark:text-white">{stats.words}</strong> words
                    </span>
                    <span>
                        <strong className="text-gray-900 dark:text-white">{stats.lines}</strong> lines
                    </span>
                </div>
                <button
                    onClick={loadSample}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Load Sample
                </button>
            </div>

            <div className="p-4 md:p-6">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                    {/* Input */}
                    <div>
                        <label className="block mb-2 font-semibold text-gray-900 dark:text-white">
                            Markdown Input
                        </label>
                        <textarea
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            placeholder="# Enter Markdown here..."
                            className="w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            spellCheck={false}
                        />
                    </div>

                    {/* Output */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() => setActiveTab("html")}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                                    activeTab === "html"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                            >
                                HTML Code
                            </button>
                            <button
                                onClick={() => setActiveTab("preview")}
                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
                                    activeTab === "preview"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                }`}
                            >
                                Preview
                            </button>
                        </div>

                        {activeTab === "html" ? (
                            <textarea
                                value={html}
                                readOnly
                                className="w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
                            />
                        ) : (
                            <div
                                className="w-full h-96 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 overflow-auto prose dark:prose-invert prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={handleCopy}
                        disabled={!html}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                            copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {copied ? "✓ Copied!" : "📋 Copy HTML"}
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!html}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ⬇ Download
                    </button>
                    <button
                        onClick={handleClear}
                        disabled={!markdown}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        🗑 Clear
                    </button>
                </div>
            </div>
        </div>
    );
}