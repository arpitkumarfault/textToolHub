// app/tools/json-formatter/page.tsx
import { Metadata } from "next";
import JsonFormatterUI from "./_components/JsonFormatterUI";
import TableOfContents from "../../components/shared/TableOfContents";
import ShareButtons from "../../components/shared/ShareButtons";
import StructuredData from "../../components/seo/StructuredData";
import Breadcrumb from "../../components/shared/Breadcrumb";
import SidebarAd from "../../components/ads/SidebarAd";
import AdBanner from "../../components/ads/AdBanner";
import InArticleAd from "../../components/ads/InArticleAd";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 86400;

const TOOL_NAME = "JSON Formatter & Validator";
const TOOL_URL = "/tools/json-formatter";
const TOOL_DESCRIPTION =
    "Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting, tree view, minification, and error detection.";

export const metadata: Metadata = {
    title: `${TOOL_NAME} - Free Online JSON Beautifier Tool`,
    description: TOOL_DESCRIPTION,
    keywords: [
        "json formatter",
        "json beautifier",
        "json validator",
        "json minifier",
        "json pretty print",
        "format json online",
        "json tree view",
        "json parser",
    ],
    alternates: { canonical: TOOL_URL },
    openGraph: {
        title: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        url: TOOL_URL,
        type: "website",
    },
};

const faqs = [
    {
        q: "What is JSON formatting?",
        a: "JSON formatting (or beautifying) adds proper indentation and line breaks to JSON data, making it human-readable. This tool converts compact JSON into a well-structured, easy-to-read format.",
    },
    {
        q: "How do I validate JSON?",
        a: "Simply paste your JSON into the input field. The tool automatically validates it and shows any syntax errors with helpful error messages pointing to the issue.",
    },
    {
        q: "What's the difference between format and minify?",
        a: "Formatting adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace to reduce file size, ideal for production use.",
    },
    {
        q: "Is my JSON data secure?",
        a: "Yes, all processing happens locally in your browser. Your JSON data is never sent to any server, ensuring complete privacy.",
    },
    {
        q: "What is the Tree View?",
        a: "Tree View displays your JSON as an interactive hierarchical structure, making it easier to navigate complex nested data and understand the relationships between elements.",
    },
    {
        q: "Can I upload JSON files?",
        a: "Yes! Click 'Upload File' to select a .json file from your computer. The contents will be automatically loaded into the editor.",
    },
];

const features = [
    { icon: "✨", title: "Format & Beautify", desc: "Convert minified JSON to readable, indented format" },
    { icon: "🔍", title: "Validate JSON", desc: "Instant validation with detailed error messages" },
    { icon: "📦", title: "Minify JSON", desc: "Remove whitespace to reduce file size" },
    { icon: "🌳", title: "Tree View", desc: "Visual hierarchical representation of JSON structure" },
    { icon: "📊", title: "JSON Statistics", desc: "View size, depth, keys, objects, and arrays count" },
    { icon: "🔒", title: "100% Private", desc: "All processing happens in your browser" },
];

const useCases = [
    { title: "API Development", desc: "Format API responses for debugging and documentation" },
    { title: "Configuration Files", desc: "Validate and beautify config.json, package.json, etc." },
    { title: "Data Analysis", desc: "Explore complex JSON data structures with tree view" },
    { title: "Code Review", desc: "Make JSON readable for easier code reviews" },
];

const relatedTools = [
    { title: "Markdown to HTML", href: "/tools/markdown-to-html" },
    { title: "Text Diff Checker", href: "/tools/text-diff" },
];

export default function JsonFormatterPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Formatter Tool" },
        { id: "features", title: "Features" },
        { id: "how-to-use", title: "How to Use" },
        { id: "use-cases", title: "Use Cases" },
        { id: "faq", title: "FAQ" },
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        url: TOOL_URL,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <>
            <StructuredData data={structuredData} />
            <StructuredData data={faqSchema} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="mt-6 grid gap-8 lg:grid-cols-12">
                        {/* Main Content */}
                        <main className="lg:col-span-8">
                            {/* Hero */}
                            <header className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                    {TOOL_NAME}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {TOOL_DESCRIPTION}
                                </p>
                                <ShareButtons url={TOOL_URL} title={TOOL_NAME} />
                            </header>

                            <AdBanner slot="json-top" format="horizontal" className="mb-6" />

                            {/* Tool */}
                            <section id="tool" className="mb-12">
                                <JsonFormatterUI />
                            </section>

                            <InArticleAd slot="json-middle" className="my-8" />

                            {/* Features */}
                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Key Features
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {features.map((f, i) => (
                                        <div
                                            key={i}
                                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        >
                                            <div className="text-2xl mb-2">{f.icon}</div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {f.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* How to Use */}
                            <section id="how-to-use" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    How to Use
                                </h2>
                                <div className="space-y-3">
                                    {[
                                        "Paste your JSON data into the input field or upload a JSON file",
                                        "The tool automatically validates and formats your JSON",
                                        "Switch between Formatted, Minified, or Tree view",
                                        "Adjust indentation size (2, 4, or 8 spaces) as needed",
                                        "Copy the result or download as a JSON file",
                                    ].map((step, i) => (
                                        <div
                                            key={i}
                                            className="flex gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        >
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                                {i + 1}
                                            </span>
                                            <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* JSON Syntax Guide */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    JSON Syntax Guide
                                </h2>
                                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                                                    Type
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                                                    Example
                                                </th>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                                                    Description
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">String</td>
                                                <td className="px-4 py-3 font-mono text-green-600 dark:text-green-400">
                                                    &quot;Hello&quot;
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Text in double quotes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">Number</td>
                                                <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">
                                                    42, 3.14
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Integer or floating point
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">Boolean</td>
                                                <td className="px-4 py-3 font-mono text-purple-600 dark:text-purple-400">
                                                    true, false
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Lowercase only
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">Null</td>
                                                <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-400">
                                                    null
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Empty or no value
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">Object</td>
                                                <td className="px-4 py-3 font-mono text-red-600 dark:text-red-400">
                                                    {`{"key": "value"}`}
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Key-value pairs in braces
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-900 dark:text-white">Array</td>
                                                <td className="px-4 py-3 font-mono text-orange-600 dark:text-orange-400">
                                                    [1, 2, 3]
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                                    Ordered list in brackets
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <InArticleAd slot="json-bottom" className="my-8" />

                            {/* Use Cases */}
                            <section id="use-cases" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Common Use Cases
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {useCases.map((uc, i) => (
                                        <div
                                            key={i}
                                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        >
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {uc.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{uc.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FAQ */}
                            <section id="faq" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {faqs.map((faq, i) => (
                                        <details
                                            key={i}
                                            className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        >
                                            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                                                {faq.q}
                                                <span className="ml-2 transition-transform group-open:rotate-180">
                                                    ▼
                                                </span>
                                            </summary>
                                            <p className="px-4 pb-4 text-gray-600 dark:text-gray-400">{faq.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>

                            {/* Related Tools */}
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Related Tools
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                                    {relatedTools.map((tool, i) => (
                                        <Link
                                            key={i}
                                            href={tool.href}
                                            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition font-medium text-gray-900 dark:text-white"
                                        >
                                            {tool.title}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tocItems} />
                                <SidebarAd slot="json-sidebar-1" />

                                {/* Quick Tips */}
                                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        💡 JSON Tips
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li>• Always use double quotes for strings</li>
                                        <li>• No trailing commas allowed</li>
                                        <li>• Keys must be strings</li>
                                        <li>• Use null instead of undefined</li>
                                        <li>• No comments in JSON</li>
                                    </ul>
                                </div>

                                {/* Common Errors */}
                                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                        ⚠️ Common Errors
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li>
                                            <code className="text-red-500">Single quotes</code> - Use double
                                        </li>
                                        <li>
                                            <code className="text-red-500">Trailing comma</code> - Remove it
                                        </li>
                                        <li>
                                            <code className="text-red-500">Unquoted keys</code> - Add quotes
                                        </li>
                                        <li>
                                            <code className="text-red-500">undefined</code> - Use null
                                        </li>
                                    </ul>
                                </div>

                                <SidebarAd slot="json-sidebar-2" />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}