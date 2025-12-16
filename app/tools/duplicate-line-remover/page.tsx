// app/tools/duplicate-line-remover/page.tsx
import { Metadata } from "next";
import DuplicateLineRemoverUI from "./_components/DuplicateLineRemoverUI";
import { generateToolSchema ,generateFAQSchema} from "../../lib/seo";
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

const TOOL_NAME = "Duplicate Line Remover";
const TOOL_URL = "/tools/duplicate-line-remover";
const TOOL_DESCRIPTION = "Instantly remove duplicate lines from text lists. Keep unique entries, preserve order, and clean up your data for free.";

export const metadata: Metadata = {
    title: "Remove Duplicate Lines Online - Free Text Deduplication Tool",
    description: TOOL_DESCRIPTION,
    keywords: [
        "remove duplicate lines",
        "delete duplicate text",
        "deduplicate list",
        "unique line finder",
        "text cleaner online",
        "remove duplicates from list",
        "list deduplication"
    ],
    alternates: { canonical: TOOL_URL },
    openGraph: {
        title: "Duplicate Line Remover - Clean Text Lists Online",
        description: "Remove duplicate lines and clean up your text lists instantly. Free, fast, and secure.",
        url: TOOL_URL,
        type: "website",
        images: [
            {
                url: "/images/og/duplicate-remover.png",
                width: 1200,
                height: 630,
                alt: "Duplicate Line Remover Tool",
            },
        ],
    },
};

const faqs = [
    {
        q: "How does it handle duplicates?",
        a: "It keeps the first occurrence of every line and removes subsequent repeats, preserving the original order of your unique items."
    },
    {
        q: "What does 'Trim Whitespace' do?",
        a: "It ignores spaces at the start and end of lines. So ' Apple ' and 'Apple' will be treated as duplicates and cleaned up."
    },
    {
        q: "Is case sensitivity supported?",
        a: "Yes. By default, 'Apple' and 'apple' are treated as the same item (duplicates). Enable 'Case Sensitive' if you want to keep both."
    },
    {
        q: "Is my data private?",
        a: "Yes. All processing happens 100% in your browser using JavaScript. No text is ever sent to our servers."
    }
];

export default function DuplicateLineRemoverPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Deduplication Tool" },
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
                                    Clean up your lists by automatically removing repeated lines. 
                                    Perfect for email lists, data cleaning, and inventory management.
                                </p>
                                <ShareButtons url={TOOL_URL} title={TOOL_NAME} />
                            </header>

                            <AdBanner slot="dedup-top" format="horizontal" className="mb-8" />

                            <section id="tool" className="mb-12">
                                <DuplicateLineRemoverUI />
                            </section>

                            <InArticleAd slot="dedup-middle" className="my-8" />

                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Why Use This Tool?
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FeatureCard 
                                        icon="✨" 
                                        title="Smart Cleaning" 
                                        desc="Automatically detects and removes exact duplicates instantly." 
                                    />
                                    <FeatureCard 
                                        icon="📊" 
                                        title="Live Statistics" 
                                        desc="See exactly how many duplicate lines were found and removed." 
                                    />
                                    <FeatureCard 
                                        icon="✂️" 
                                        title="Whitespace Trimming" 
                                        desc="Intelligently handles messy data with extra spaces." 
                                    />
                                    <FeatureCard 
                                        icon="🔒" 
                                        title="100% Secure" 
                                        desc="Data never leaves your device. Everything runs locally." 
                                    />
                                </div>
                            </section>

                            <section id="how-to" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    How to Use
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Paste your list of items into the 'Original Text' box.",
                                        "The tool automatically processes your text.",
                                        "Adjust settings like 'Case Sensitive' if needed.",
                                        "Review the result in the 'Unique Lines' box.",
                                        "Click 'Copy Result' to use your clean list."
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

                            <InArticleAd slot="dedup-bottom" className="my-8" />

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
                                    <RelatedToolLink title="Sort Lines" href="/tools/sort-lines" />
                                    <RelatedToolLink title="Word Counter" href="/tools/word-counter" />
                                    <RelatedToolLink title="Case Converter" href="/tools/case-converter" />
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tocItems} />
                                <SidebarAd slot="dedup-sidebar" />
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