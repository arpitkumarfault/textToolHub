import { Metadata } from "next";
import TextToSpeechUI from "./_components/TextToSpeechUI";
import { generateToolSchema } from "../../lib/seo";
import TableOfContents from "../../components/shared/TableOfContents";
import ShareButtons from "../../components/shared/ShareButtons";
import StructuredData from "../../components/seo/StructuredData";
import Breadcrumb from "../../components/shared/Breadcrumb";
import SidebarAd from "../../components/ads/SidebarAd";
import AdBanner from "../../components/ads/AdBanner";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Text to Speech Converter - Free Online Tool",
    description:
        "Convert text to speech instantly using your browser. Free text-to-speech tool with multiple voices and languages. No download required, works offline.",
    keywords: [
        "text to speech",
        "tts",
        "read aloud",
        "speech synthesis",
        "text reader",
        "voice generator",
    ],
    openGraph: {
        title: "Free Text to Speech - Convert Text to Audio Online",
        description: "Convert any text to natural speech instantly. Multiple voices available.",
        url: "/tools/text-to-speech",
        type: "website",
    },
};

const TextToSpeechPage = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: "Text to Speech", href: "/tools/text-to-speech" },
    ];

    const tableOfContents = [
        { id: "tool", title: "Text to Speech Tool" },
        { id: "features", title: "Features" },
        { id: "how-to-use", title: "How to Use" },
        { id: "benefits", title: "Benefits" },
        { id: "faq", title: "FAQ" },
    ];

    const structuredData = generateToolSchema({
        name: "Text to Speech",
        description: "Free online text-to-speech converter tool",
        url: "/tools/text-to-speech",
    });

    return (
        <>
            <StructuredData data={structuredData} />

            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-8">
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="mt-6 grid gap-8 lg:grid-cols-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="mb-8">
                                <h1 className="mb-4 text-4xl font-bold text-text-primary">
                                    Free Text to Speech Converter
                                </h1>
                                <p className="text-xl text-text-secondary">
                                    Convert any text to natural-sounding speech instantly. Use multiple
                                    voices and languages right in your browser. Perfect for
                                    accessibility, learning, and content consumption.
                                </p>
                                <ShareButtons
                                    url="/tools/text-to-speech"
                                    title="Free Text to Speech Tool"
                                />
                            </div>

                            <AdBanner slot="toolPageTop" format="horizontal" />

                            <div id="tool" className="my-8">
                                <TextToSpeechUI />
                            </div>

                            {/* Features */}
                            <section id="features" className="my-12">
                                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                                    Key Features
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FeatureBox
                                        icon="🎙️"
                                        title="Multiple Voices"
                                        description="Choose from various male and female voices in different accents and languages."
                                    />
                                    <FeatureBox
                                        icon="🌍"
                                        title="Multi-Language Support"
                                        description="Supports dozens of languages including English, Spanish, French, German, and more."
                                    />
                                    <FeatureBox
                                        icon="⚡"
                                        title="Instant Conversion"
                                        description="Convert text to speech immediately with no processing delays or uploads."
                                    />
                                    <FeatureBox
                                        icon="🎚️"
                                        title="Adjustable Settings"
                                        description="Control speech rate, pitch, and volume to customize the audio output."
                                    />
                                    <FeatureBox
                                        icon="🔒"
                                        title="Privacy First"
                                        description="All processing happens in your browser. Your text never leaves your device."
                                    />
                                    <FeatureBox
                                        icon="💰"
                                        title="Completely Free"
                                        description="No limits, no subscriptions, no hidden fees. Use as much as you need."
                                    />
                                </div>
                            </section>

                            {/* How to Use */}
                            <section id="how-to-use" className="my-12">
                                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                                    How to Use
                                </h2>
                                <div className="space-y-4">
                                    <StepCard
                                        number={1}
                                        title="Enter Your Text"
                                        description="Type or paste the text you want to convert to speech into the text area."
                                    />
                                    <StepCard
                                        number={2}
                                        title="Select Voice & Language"
                                        description="Choose your preferred voice, language, and adjust speed and pitch settings."
                                    />
                                    <StepCard
                                        number={3}
                                        title="Play Audio"
                                        description="Click the play button to hear your text read aloud instantly."
                                    />
                                    <StepCard
                                        number={4}
                                        title="Download (Optional)"
                                        description="Some browsers support downloading the audio for offline use."
                                    />
                                </div>
                            </section>

                            {/* Benefits */}
                            <section id="benefits" className="my-12">
                                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                                    Benefits
                                </h2>
                                <div className="space-y-4 rounded-lg border border-border bg-surface p-6">
                                    <BenefitItem
                                        title="Accessibility"
                                        description="Help visually impaired users or those with reading difficulties access written content."
                                    />
                                    <BenefitItem
                                        title="Multitasking"
                                        description="Listen to articles, documents, or emails while doing other tasks."
                                    />
                                    <BenefitItem
                                        title="Language Learning"
                                        description="Improve pronunciation and listening skills by hearing text in different languages."
                                    />
                                    <BenefitItem
                                        title="Reduce Eye Strain"
                                        description="Give your eyes a rest by listening instead of reading long documents."
                                    />
                                    <BenefitItem
                                        title="Content Creation"
                                        description="Create voiceovers for videos, presentations, or podcasts quickly."
                                    />
                                </div>
                            </section>

                            {/* FAQ */}
                            <section id="faq" className="my-12">
                                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-4">
                                    <FAQItem
                                        question="Is this text to speech tool really free?"
                                        answer="Yes! Our text-to-speech tool is 100% free to use with no limitations. All features are available to everyone without registration or payment."
                                    />
                                    <FAQItem
                                        question="What voices are available?"
                                        answer="The available voices depend on your browser and operating system. Most modern browsers provide multiple male and female voices in various languages and accents."
                                    />
                                    <FAQItem
                                        question="Can I download the audio?"
                                        answer="Some browsers support audio recording and downloading. The availability of this feature depends on your browser's capabilities and settings."
                                    />
                                    <FAQItem
                                        question="Is my text stored or shared?"
                                        answer="No, all text-to-speech conversion happens locally in your browser using the Web Speech API. Your text is never uploaded to our servers or shared."
                                    />
                                    <FAQItem
                                        question="Which languages are supported?"
                                        answer="Support varies by browser, but typically includes English, Spanish, French, German, Italian, Japanese, Chinese, Korean, and many others. Check the voice selector to see available options."
                                    />
                                    <FAQItem
                                        question="Does it work offline?"
                                        answer="Yes! Once the page is loaded, the text-to-speech functionality works entirely in your browser and doesn't require an internet connection."
                                    />
                                </div>
                            </section>

                            {/* Related Tools */}
                            <section className="my-12">
                                <h2 className="mb-6 text-3xl font-bold text-text-primary">
                                    Related Tools
                                </h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <RelatedToolCard title="Word Counter" href="/tools/word-counter" />
                                    <RelatedToolCard title="Text Formatter" href="/tools/text-formatter" />
                                    <RelatedToolCard title="Character Counter" href="/tools/character-counter" />
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-4 space-y-6">
                                <TableOfContents items={tableOfContents} />
                                <SidebarAd slot="toolPageSidebar" />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

// Helper Components
const FeatureBox = ({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) => (
    <div className="rounded-lg border border-border bg-surface p-6 transition hover:shadow-lg">
        <div className="mb-2 text-3xl">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold text-text-primary">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);

const StepCard = ({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) => (
    <div className="flex gap-4 rounded-lg border border-border bg-surface p-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
            {number}
        </div>
        <div>
            <h3 className="mb-1 font-semibold text-text-primary">{title}</h3>
            <p className="text-text-secondary">{description}</p>
        </div>
    </div>
);

const BenefitItem = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => (
    <div className="border-l-4 border-primary pl-4">
        <h3 className="mb-1 font-semibold text-text-primary">{title}</h3>
        <p className="text-text-secondary">{description}</p>
    </div>
);

const FAQItem = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => (
    <details className="group rounded-lg border border-border bg-surface p-4">
        <summary className="flex cursor-pointer items-center justify-between font-semibold text-text-primary list-none">
            {question}
            <span className="transition group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-3 text-text-secondary">{answer}</p>
    </details>
);

const RelatedToolCard = ({ title, href }: { title: string; href: string }) => (
    <a
        href={href}
        className="block rounded-lg border border-border bg-surface p-4 transition hover:border-primary hover:shadow-md"
    >
        <h3 className="font-semibold text-text-primary">{title}</h3>
    </a>
);

export default TextToSpeechPage;