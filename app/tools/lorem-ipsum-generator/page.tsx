// app/tools/lorem-ipsum-generator/page.tsx
import { Metadata } from "next";
import LoremIpsumUI from "./_components/LoremIpsumUI";
import { generateToolSchema, generateFAQSchema } from "../../lib/seo";
import AdBanner from "../../components/ads/AdBanner";
import TableOfContents from "../../components/shared/TableOfContents";
import SidebarAd from "../../components/ads/SidebarAd";
import ShareButtons from "../../components/shared/ShareButtons";
import Breadcrumb from "../../components/shared/Breadcrumb";
import StructuredData from "../../components/seo/StructuredData";
import InArticleAd from "../../components/ads/InArticleAd";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 1 day

const TOOL_NAME = "Lorem Ipsum Generator";
const TOOL_URL = "/tools/lorem-ipsum-generator";
const TOOL_DESCRIPTION = "Generate custom Lorem Ipsum placeholder text for web design, mockups, and printing. Choose paragraphs, sentences, or words.";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator - Free Placeholder Text Tool",
    description: TOOL_DESCRIPTION,
    keywords: [
        "lorem ipsum generator",
        "placeholder text",
        "dummy text generator",
        "lipsum generator",
        "latin filler text",
        "web design text",
        "mockup text"
    ],
    alternates: {
        canonical: TOOL_URL,
    },
    openGraph: {
        title: "Lorem Ipsum Generator - Free Dummy Text Tool",
        description: "Instantly generate Lorem Ipsum placeholder text for your design projects.",
        url: TOOL_URL,
        type: "website",
        images: [
            {
                url: "/images/og/lorem-ipsum.png",
                width: 1200,
                height: 630,
                alt: "Lorem Ipsum Generator Tool",
            },
        ],
    },
};

const faqs = [
    {
        q: "What is Lorem Ipsum?",
        a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s."
    },
    {
        q: "Why do we use it?",
        a: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum has a more-or-less normal distribution of letters."
    },
    {
        q: "Is it free to use?",
        a: "Yes, our Lorem Ipsum generator is 100% free to use for any personal or commercial project. There are no limits on usage."
    },
    {
        q: "Does it mean anything?",
        a: "Not really. It is rooted in a piece of classical Latin literature from 45 BC, making it over 2000 years old, but the words are altered to be nonsensical."
    }
];

export default function LoremIpsumPage() {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: TOOL_NAME, href: TOOL_URL },
    ];

    const tocItems = [
        { id: "tool", title: "Generator Tool" },
        { id: "about", title: "About Lorem Ipsum" },
        { id: "features", title: "Key Features" },
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
                                    Create professional placeholder text for your layouts instantly. 
                                    Customize by paragraphs, sentences, or word count.
                                </p>
                                <ShareButtons url={TOOL_URL} title={TOOL_NAME} />
                            </header>

                            <AdBanner slot="lorem-top" format="horizontal" className="mb-8" />

                            <section id="tool" className="mb-12">
                                <LoremIpsumUI />
                            </section>

                            <section id="about" className="mb-12 prose dark:prose-invert max-w-none">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    What is Lorem Ipsum?
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Lorem Ipsum is placeholder text commonly used in the graphic, print, and publishing industries 
                                    for previewing layouts and visual mockups. It essentially allows you to see what a block of text 
                                    will look like on a page without being distracted by the content itself.
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 mt-4">
                                    The standard passage starts with: <em>"Lorem ipsum dolor sit amet, consectetur adipiscing elit..."</em>
                                </p>
                            </section>

                            <InArticleAd slot="lorem-middle" className="my-8" />

                            <section id="features" className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Why Use Our Generator?
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FeatureCard 
                                        icon="⚡" 
                                        title="Instant Generation" 
                                        desc="Get dummy text immediately without page reloads." 
                                    />
                                    <FeatureCard 
                                        icon="🎛️" 
                                        title="Fully Customizable" 
                                        desc="Choose exact number of paragraphs, sentences, or words." 
                                    />
                                    <FeatureCard 
                                        icon="📋" 
                                        title="One-Click Copy" 
                                        desc="Copy the generated text to your clipboard instantly." 
                                    />
                                    <FeatureCard 
                                        icon="🌙" 
                                        title="Dark Mode Ready" 
                                        desc="Comfortable interface for late-night coding sessions." 
                                    />
                                </div>
                            </section>

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

                            <InArticleAd slot="lorem-bottom" className="my-8" />

                            <section className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Related Tools
                                </h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <RelatedToolLink title="Word Counter" href="/tools/word-counter" />
                                    <RelatedToolLink title="Text Case Converter" href="/tools/case-converter" />
                                    <RelatedToolLink title="Text to Speech" href="/tools/text-to-speech" />
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tocItems} />
                                <SidebarAd slot="lorem-sidebar" />
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