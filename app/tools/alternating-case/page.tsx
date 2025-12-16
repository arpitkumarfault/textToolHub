import { Metadata } from "next";
import AlternatingCaseUI from "./_components/AlternatingCaseUI";
import { generateToolSchema } from "../../lib/seo";
import StructuredData from "../../components/seo/StructuredData";
import Breadcrumb from "../../components/shared/Breadcrumb";
import TableOfContents from "../../components/shared/TableOfContents";
import ShareButtons from "../../components/shared/ShareButtons";
import SidebarAd from "../../components/ads/SidebarAd";
import AdBanner from "../../components/ads/AdBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alternating Case Generator - sPoNgEbOb & Mock Text Maker (Free 2025)",
  description:
    "Best free alternating case generator. Create sPoNgEbOb text, mocking meme text, random case, zalgo mini — perfect for Discord, Twitter, Instagram, TikTok memes.",
  keywords: [
    "alternating case",
    "spongebob text generator",
    "mock text",
    "mocking spongebob",
    "meme text",
    "zalgo text mini",
    "random case",
    "sarcastic text",
  ],
  openGraph: {
    title: "Alternating Case Generator - sPoNgEbOb Text Maker",
    description: "Create hilarious mocking text instantly — the #1 meme text generator",
    url: "https://yourdomain.com/tools/alternating-case",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og/alternating-case.png",
        width: 1200,
        height: 630,
        alt: "Alternating Case Generator - Mock Text Tool",
      },
    ],
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Alternating Case", href: "/tools/alternating-case" },
];

const tableOfContents = [
  { id: "tool", title: "Alternating Case Tool" },
  { id: "features", title: "Features" },
  { id: "how-to-use", title: "How to Use" },
  { id: "faq", title: "FAQ" },
];

const structuredData = generateToolSchema({
  name: "Alternating Case Generator",
  description: "Free online tool to create spongebob case, mocking text, and random case",
  url: "/tools/alternating-case",
});

export default function AlternatingCasePage() {
  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">

          <Breadcrumb items={breadcrumbItems} />

          {/* MAIN HEADER — ALWAYS VISIBLE AT TOP */}
          <div className="mt-10 mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              aLtErNaTiNg cAsE
              <br className="sm:hidden" /> <span className="text-primary">Generator</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Create <strong>sPoNgEbOb text</strong>, mocking memes, random case & mini zalgo — 
              instantly. The funniest text tool on the internet.
            </p>
            <div className="mt-8">
              <ShareButtons
                url="/tools/alternating-case"
                title="Free Alternating Case & Spongebob Text Generator"
              />
            </div>
          </div>

          <AdBanner slot="toolPageTop" format="horizontal" />

          {/* MAIN GRID */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            {/* TOOL + CONTENT */}
            <main className="lg:col-span-8 space-y-16">
              <section id="tool">
                <AlternatingCaseUI />
              </section>

              {/* Features */}
              <section id="features" className="mt-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Why This Tool Is The Best
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {[
                    { emoji: "😂", title: "5 Meme Styles", desc: "Spongebob, Mocking, Random, Zalgo Mini, Alternating" },
                    { emoji: "⚡", title: "Real-time Preview", desc: "See results as you type — no delay" },
                    { emoji: "🎨", title: "Start with UPPERCASE", desc: "Toggle starting case for perfect memes" },
                    { emoji: "🔄", title: "Regenerate Random", desc: "Click shuffle for new variation" },
                    { emoji: "📱", title: "Mobile Perfect", desc: "Works flawlessly on phone & tablet" },
                    { emoji: "🌙", title: "Dark Mode Ready", desc: "Beautiful in light & dark themes" },
                  ].map((feature) => (
                    <div key={feature.title} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
                      <div className="text-5xl mb-4">{feature.emoji}</div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* How to Use */}
              <section id="how-to-use" className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  How to Create Mocking Text
                </h2>
                <div className="space-y-8 max-w-4xl mx-auto">
                  {[
                    "Type or paste your text",
                    "Choose your meme style (Spongebob, Random, etc.)",
                    "Toggle 'Start with UPPERCASE' if needed",
                    "Click Copy or Download",
                    "Paste into Discord, Twitter, Instagram, or TikTok",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                        {i + 1}
                      </div>
                      <p className="text-xl text-gray-700 dark:text-gray-200 font-medium">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section id="faq" className="mt-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6 max-w-4xl mx-auto">
                  {[
                    { q: "What is spongebob text called?", a: "It's called 'alternating case' or 'mocking spongebob text'. The style comes from a meme where Spongebob mocks someone by repeating their words in alternating caps." },
                    { q: "Is this free?", a: "100% free. No signup, no limits, no ads in the tool." },
                    { q: "Can I use this on mobile?", a: "Yes! Works perfectly on iPhone, Android, iPad, and desktop." },
                    { q: "Does it work with non-English text?", a: "Yes! Works with Spanish, French, German, Arabic, and any language with upper/lowercase letters." },
                  ].map((faq) => (
                    <details key={faq.q} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                      <summary className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                        {faq.q}
                        <span className="ml-4 text-2xl transition-transform group-open:rotate-180">▼</span>
                      </summary>
                      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </main>

            {/* SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                <TableOfContents items={tableOfContents} />
                <SidebarAd slot="toolPageSidebar" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}