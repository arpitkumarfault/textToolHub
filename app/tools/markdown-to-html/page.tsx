// app/tools/markdown-to-html/page.tsx
import { Metadata } from "next";
import MarkdownToHtmlUI from "./_components/MarkdownToHtmlUI";
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

const TOOL_NAME = "Markdown to HTML Converter";
const TOOL_URL = "/tools/markdown-to-html";
const TOOL_DESCRIPTION = "Convert Markdown to clean HTML instantly. Free online tool supporting GitHub Flavored Markdown, tables, code blocks, and more.";

export const metadata: Metadata = {
    title: `${TOOL_NAME} - Free Online MD to HTML Tool`,
    description: TOOL_DESCRIPTION,
    keywords: ["markdown to html", "md to html", "markdown converter", "html generator", "gfm converter", "online markdown tool"],
    alternates: { canonical: TOOL_URL },
    openGraph: {
        title: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        url: TOOL_URL,
        type: "website",
    },
};

const faqs = [
    { q: "What Markdown syntax is supported?", a: "We support standard Markdown plus GitHub Flavored Markdown (GFM) including tables, task lists, strikethrough, and fenced code blocks." },
    { q: "Is this tool free?", a: "Yes, completely free with no limits, signups, or watermarks." },
    { q: "Is my content private?", a: "Yes, all conversion happens in your browser. Nothing is sent to any server." },
    { q: "Can I use the HTML output commercially?", a: "Absolutely! The generated HTML is yours to use however you want." },
    { q: "Does it support code syntax highlighting?", a: "It generates proper code blocks with language classes. Add Prism.js or Highlight.js for colored highlighting." },
];

const features = [
    { icon: "📄", title: "Full Markdown Support", desc: "Headers, bold, italic, links, images, lists, code blocks, tables & more" },
    { icon: "⚡", title: "Real-Time Conversion", desc: "See HTML output instantly as you type" },
    { icon: "✨", title: "Clean HTML Output", desc: "Semantic, valid HTML5 ready for production" },
    { icon: "👁", title: "Live Preview", desc: "Toggle between code view and rendered preview" },
    { icon: "📊", title: "GFM Support", desc: "GitHub Flavored Markdown including tables & task lists" },
    { icon: "🔒", title: "100% Private", desc: "Everything runs in your browser" },
];

const syntaxExamples = [
    { element: "Heading", md: "# H1 / ## H2", html: "<h1> / <h2>" },
    { element: "Bold", md: "**text**", html: "<strong>" },
    { element: "Italic", md: "*text*", html: "<em>" },
    { element: "Link", md: "[text](url)", html: "<a href>" },
    { element: "Image", md: "![alt](url)", html: "<img>" },
    { element: "Code", md: "`code`", html: "<code>" },
    { element: "List", md: "- item", html: "<ul><li>" },
    { element: "Quote", md: "> text", html: "<blockquote>" },
];

const relatedTools = [
    { title: "HTML to Markdown", href: "/tools/html-to-markdown" },
    { title: "JSON Formatter", href: "/tools/json-formatter" },
    { title: "Case Converter", href: "/tools/case-converter" },
    { title: "Word Counter", href: "/tools/word-counter" },
];

export default function MarkdownToHtmlPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Converter" },
        { id: "features", title: "Features" },
        { id: "how-to-use", title: "How to Use" },
        { id: "syntax", title: "Syntax Reference" },
        { id: "faq", title: "FAQ" },
    ];

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        url: TOOL_URL,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
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

                            <AdBanner slot="md-top" format="horizontal" className="mb-6" />

                            {/* Tool */}
                            <section id="tool" className="mb-12">
                                <MarkdownToHtmlUI />
                            </section>

                            <InArticleAd slot="md-middle" className="my-8" />

                            {/* Features */}
                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Key Features
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {features.map((f, i) => (
                                        <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <div className="text-2xl mb-2">{f.icon}</div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
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
                                        "Enter or paste Markdown in the left panel",
                                        "View real-time HTML output on the right",
                                        "Switch to Preview tab to see rendered result",
                                        "Copy or download the HTML for your project",
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                                {i + 1}
                                            </span>
                                            <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Syntax Reference */}
                            <section id="syntax" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Syntax Reference
                                </h2>
                                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Element</th>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Markdown</th>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">HTML</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                                            {syntaxExamples.map((s, i) => (
                                                <tr key={i}>
                                                    <td className="px-4 py-3 text-gray-900 dark:text-white">{s.element}</td>
                                                    <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">{s.md}</td>
                                                    <td className="px-4 py-3 font-mono text-gray-600 dark:text-gray-400">{s.html}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <InArticleAd slot="md-bottom" className="my-8" />

                            {/* FAQ */}
                            <section id="faq" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {faqs.map((faq, i) => (
                                        <details key={i} className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-gray-900 dark:text-white">
                                                {faq.q}
                                                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
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
                                <SidebarAd slot="md-sidebar-1" />
                                
                                {/* Quick Tips */}
                                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">💡 Quick Tips</h3>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li>• Use # for headings</li>
                                        <li>• **text** for bold</li>
                                        <li>• *text* for italic</li>
                                        <li>• `code` for inline code</li>
                                        <li>• - or * for bullet lists</li>
                                    </ul>
                                </div>
                                
                                <SidebarAd slot="md-sidebar-2" />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}