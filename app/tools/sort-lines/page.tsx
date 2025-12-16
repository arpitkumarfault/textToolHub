// app/tools/sort-lines/page.tsx
import { Metadata } from "next";
import SortLinesUI from "./_components/SortLinesUI";
import TableOfContents from "../../components/shared/TableOfContents";
import ShareButtons from "../../components/shared/ShareButtons";
import StructuredData from "../../components/seo/StructuredData";
import Breadcrumb from "../../components/shared/Breadcrumb";
import SidebarAd from "../../components/ads/SidebarAd";
import AdBanner from "../../components/ads/AdBanner";
import InArticleAd from "../../components/ads/InArticleAd";
import { generateToolSchema } from "../../lib/seo";
import  { generateFAQSchema } from "../../lib/seo";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 86400;

const TOOL_NAME = "Sort Lines Alphabetically";
const TOOL_URL = "/tools/sort-lines";
const TOOL_DESCRIPTION = "Sort text lines alphabetically, numerically, or by length. Fast, free online list sorter with deduplication and case sensitivity options.";

export const metadata: Metadata = {
    title: "Sort Lines Alphabetically & Numerically - Free Online List Sorter",
    description: TOOL_DESCRIPTION,
    keywords: [
        "sort lines alphabetically",
        "alphabetize list online",
        "sort text list",
        "numerical sort",
        "sort by length",
        "remove duplicates",
        "list organizer tool"
    ],
    alternates: { canonical: TOOL_URL },
    openGraph: {
        title: "Sort Lines - Free Online List Organizer",
        description: "Sort any list alphabetically, numerically, or by length instantly.",
        url: TOOL_URL,
        type: "website",
        images: [
            {
                url: "/images/og/sort-lines.png",
                width: 1200,
                height: 630,
                alt: "Sort Lines Tool Interface",
            },
        ],
    },
};

const faqs = [
    {
        q: "What is 'Natural Sort'?",
        a: "Natural sort treats multi-digit numbers as a single character. For example, it sorts 'Item 2' before 'Item 10', whereas standard sorting would put 'Item 10' first because '1' comes before '2'."
    },
    {
        q: "Can I sort by line length?",
        a: "Yes! Select the 'Length' sort method to order your lines from shortest to longest (or vice versa)."
    },
    {
        q: "How does numerical sort work?",
        a: "It extracts the first number found in each line and sorts based on that value. Perfect for lists like '1. Apple', '10. Banana', '2. Cherry'."
    },
    {
        q: "Is my data saved?",
        a: "No. All sorting happens locally in your browser using JavaScript. Your data is never sent to any server."
    }
];

export default function SortLinesPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Sorting Tool" },
        { id: "features", title: "Features" },
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
                                    Organize your lists instantly. Sort alphabetically, numerically, 
                                    or by length. Clean up duplicates and empty lines in seconds.
                                </p>
                                <ShareButtons url={TOOL_URL} title={TOOL_NAME} />
                            </header>

                            <AdBanner slot="sort-top" format="horizontal" className="mb-8" />

                            <section id="tool" className="mb-12">
                                <SortLinesUI />
                            </section>

                            <InArticleAd slot="sort-middle" className="my-8" />

                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Powerful Sorting Options
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FeatureCard 
                                        icon="🔤" 
                                        title="Natural Sorting" 
                                        desc="Sorts 'Item 2' before 'Item 10' correctly, unlike basic tools." 
                                    />
                                    <FeatureCard 
                                        icon="📏" 
                                        title="Sort by Length" 
                                        desc="Organize lines based on character count (shortest to longest)." 
                                    />
                                    <FeatureCard 
                                        icon="🔢" 
                                        title="Smart Numerical" 
                                        desc="Extracts numbers from text lines for accurate numerical ordering." 
                                    />
                                    <FeatureCard 
                                        icon="✨" 
                                        title="Clean & Deduplicate" 
                                        desc="Automatically remove empty lines and duplicates while sorting." 
                                    />
                                </div>
                            </section>

                            <section id="how-to" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    How to Use
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        "Paste your list into the 'Original List' box.",
                                        "Select 'Ascending' (A-Z) or 'Descending' (Z-A).",
                                        "Choose a method: Alphabetical, Numerical, or Length.",
                                        "Enable options like 'Remove Duplicates' if needed.",
                                        "Copy your perfectly sorted list from the output box."
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

                            <InArticleAd slot="sort-bottom" className="my-8" />

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
                                    <RelatedToolLink title="Duplicate Remover" href="/tools/duplicate-line-remover" />
                                    <RelatedToolLink title="Text Case Converter" href="/tools/case-converter" />
                                    <RelatedToolLink title="Word Counter" href="/tools/word-counter" />
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tocItems} />
                                <SidebarAd slot="sort-sidebar" />
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