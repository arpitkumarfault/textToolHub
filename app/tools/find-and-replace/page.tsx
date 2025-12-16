// app/tools/find-and-replace/page.tsx
import { Metadata } from "next";
import FindAndReplaceUI from "./_components/FindAndReplaceUI";
import TableOfContents from "../../components/shared/TableOfContents";
import ShareButtons from "../../components/shared/ShareButtons";
import StructuredData from "../../components/seo/StructuredData";
import Breadcrumb from "../../components/shared/Breadcrumb";
import SidebarAd from "../../components/ads/SidebarAd";
import AdBanner from "../../components/ads/AdBanner";
import { generateToolSchema, generateFAQSchema } from "../../lib/seo";
import InArticleAd from "../../components/ads/InArticleAd";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 86400;

const TOOL_NAME = "Find and Replace Tool";
const TOOL_URL = "/tools/find-and-replace";
const TOOL_DESCRIPTION = "Search and replace text instantly. Supports bulk replacement, case sensitivity, and whole word matching. Free online text editor tool.";

export const metadata: Metadata = {
    title: "Find and Replace Text Online - Free Bulk Replacer Tool",
    description: TOOL_DESCRIPTION,
    keywords: [
        "find and replace online",
        "search and replace text",
        "bulk text replacer",
        "string replacer",
        "replace multiple words",
        "text editor tool",
        "find replace case sensitive"
    ],
    alternates: { canonical: TOOL_URL },
    openGraph: {
        title: "Find and Replace - Free Online Bulk Text Tool",
        description: "Instantly find and replace text in large documents. Fast, secure, and free.",
        url: TOOL_URL,
        type: "website",
        images: [
            {
                url: "/images/og/find-and-replace.png",
                width: 1200,
                height: 630,
                alt: "Find and Replace Tool Interface",
            },
        ],
    },
};

const faqs = [
    {
        q: "How does 'Replace All' work?",
        a: "It scans your entire text for every occurrence of your search term and replaces them simultaneously with your specified replacement text."
    },
    {
        q: "Is case sensitivity supported?",
        a: "Yes! You can toggle 'Case Sensitive' to distinguish between 'Word' and 'word', ensuring you only replace exactly what you intend."
    },
    {
        q: "What does 'Whole Words' mean?",
        a: "This option ensures you only match complete words. For example, searching for 'cat' won't accidentally match part of 'category' or 'scatter'."
    },
    {
        q: "Is my text data secure?",
        a: "Absolutely. All processing happens locally in your browser using JavaScript. Your text is never uploaded to any server."
    }
];

export default function FindAndReplacePage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Find & Replace Tool" },
        { id: "features", title: "Key Features" },
        { id: "how-to", title: "How to Use" },
        { id: "faq", title: "FAQ" },
    ];

    const toolSchema = generateToolSchema({
        name: TOOL_NAME,
        description: TOOL_DESCRIPTION,
        url: TOOL_URL,
    });

    const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })));

    return (
        <>
            <StructuredData data={toolSchema} />
            <StructuredData data={faqSchema} />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="mt-6 grid gap-8 lg:grid-cols-12">
                        {/* Main Content */}
                        <main className="lg:col-span-8">
                            <header className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    {TOOL_NAME}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    Quickly search and replace text in documents, code, or strings. 
                                    Perfect for bulk editing, correcting typos, or updating content.
                                </p>
                                <ShareButtons url={TOOL_URL} title={TOOL_NAME} />
                            </header>

                            <AdBanner slot="find-top" format="horizontal" className="mb-8" />

                            <section id="tool" className="mb-12">
                                <FindAndReplaceUI />
                            </section>

                            <InArticleAd slot="find-middle" className="my-8" />

                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Powerful Features
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FeatureCard 
                                        icon="🔍" 
                                        title="Instant Search" 
                                        desc="See match counts update in real-time as you type." 
                                    />
                                    <FeatureCard 
                                        icon="🔄" 
                                        title="Bulk Replacement" 
                                        desc="Update thousands of occurrences in a single click." 
                                    />
                                    <FeatureCard 
                                        icon="Aa" 
                                        title="Case Control" 
                                        desc="Toggle case sensitivity for precise matching." 
                                    />
                                    <FeatureCard 
                                        icon="📝" 
                                        title="Whole Word Mode" 
                                        desc="Prevent accidental partial matches within other words." 
                                    />
                                    <FeatureCard 
                                        icon="🔒" 
                                        title="100% Private" 
                                        desc="Data stays in your browser. No server uploads." 
                                    />
                                    <FeatureCard 
                                        icon="⚡" 
                                        title="Fast Processing" 
                                        desc="Optimized for large texts and code snippets." 
                                    />
                                </div>
                            </section>

                            <section id="how-to" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    How to Use
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Paste your text into the main content area.",
                                        "Type the word or phrase you want to find.",
                                        "Enter the new text you want to replace it with.",
                                        "Use the checkboxes to enable Case Sensitive or Whole Word matching if needed.",
                                        "Click 'Replace All' to update your text instantly.",
                                        "Copy the result to your clipboard."
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                                                {i + 1}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <InArticleAd slot="find-bottom" className="my-8" />

                            <section id="faq" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    {faqs.map((f, i) => (
                                        <details key={i} className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 dark:text-white">
                                                {f.q}
                                                <span className="transition-transform group-open:rotate-180">▼</span>
                                            </summary>
                                            <p className="px-4 pb-4 text-gray-600 dark:text-gray-400">{f.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Related Tools
                                </h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <RelatedToolLink title="Word Counter" href="/tools/word-counter" />
                                    <RelatedToolLink title="Text Case Converter" href="/tools/case-converter" />
                                    <RelatedToolLink title="Remove Duplicate Lines" href="/tools/remove-duplicate-lines" />
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tocItems} />
                                <SidebarAd slot="find-sidebar" />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper Components
function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
    );
}

function RelatedToolLink({ title, href }: { title: string, href: string }) {
    return (
        <Link href={href} className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 transition text-center font-medium text-gray-900 dark:text-white">
            {title}
        </Link>
    );
}