// app/tools/spell-checker/page.tsx
import { Metadata } from "next";
import SpellCheckerTool from "./_components/SpellCheckerTool";
import SidebarAd from "../../components/ads/SidebarAd";
import Breadcrumb from "../../components/shared/Breadcrumb";
import AdBanner from "../../components/ads/AdBanner";
import ShareButtons from "../../components/shared/ShareButtons";
import TableOfContents from "../../components/shared/TableOfContents";

export const metadata: Metadata = {
  title: "Free Online Spell Checker - Fix Spelling Mistakes Instantly (2025)",
  description:
    "Best free spell checker tool online. Check spelling errors instantly with smart suggestions powered by Hunspell dictionary. Perfect for essays, emails, blogs, and professional writing. No signup required, 100% private.",
  keywords: [
    "spell checker",
    "spelling checker",
    "free spell check",
    "online spell checker",
    "grammar check",
    "spelling mistakes",
    "spell check online",
    "check spelling",
    "spelling corrector",
    "typo checker",
  ],
  openGraph: {
    title: "Free Online Spell Checker - Fix Mistakes Instantly",
    description:
      "Check spelling errors instantly with smart suggestions. 150,000+ word dictionary. Perfect for essays, emails, and blogs.",
    type: "website",
    url: "https://yourdomain.com/tools/spell-checker",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Spell Checker", href: "/tools/spell-checker" },
];

const tableOfContents = [
  { id: "tool", title: "Spell Checker Tool" },
  { id: "features", title: "Key Features" },
  { id: "how-to-use", title: "How to Use" },
  { id: "faq", title: "FAQ" },
];

export default function SpellCheckerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="mt-10 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Free Online{" "}
            <span className="text-primary">Spell Checker</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Check spelling errors instantly with intelligent suggestions powered by a
            <strong> 150,000+ word dictionary</strong>. Perfect for essays, emails, blogs, and professional writing.
            <strong> 100% free, no signup required.</strong>
          </p>
          <div className="mt-8">
            <ShareButtons
              url="/tools/spell-checker"
              title="Free Online Spell Checker - Fix Mistakes Instantly"
            />
          </div>
        </div>

        <AdBanner slot="toolPageTop" format="horizontal" />

        {/* Main Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <main className="lg:col-span-8 space-y-16">
            {/* Tool */}
            <section id="tool">
              <SpellCheckerTool />
            </section>

            {/* Features */}
            <section id="features">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Why This Spell Checker Is The Best
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { emoji: "📚", title: "150,000+ Words", desc: "Comprehensive English dictionary for accurate checking" },
                  { emoji: "⚡", title: "Lightning Fast", desc: "Check thousands of words in milliseconds" },
                  { emoji: "🎯", title: "Smart Suggestions", desc: "Intelligent corrections using Hunspell algorithm" },
                  { emoji: "🔒", title: "100% Private", desc: "Your text is never stored or shared" },
                  { emoji: "💯", title: "Completely Free", desc: "No limits, no signup, no hidden fees" },
                  { emoji: "🌙", title: "Dark Mode", desc: "Easy on your eyes, day or night" },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="text-5xl mb-4">{feature.emoji}</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Use */}
            <section id="how-to-use">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                How to Use
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
                {[
                  "Paste or type your text in the box above",
                  "Click 'Check Spelling' button",
                  "Review highlighted errors and suggestions",
                  "Click any suggestion to replace the word",
                  "Copy or download your corrected text",
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                      {i + 1}
                    </div>
                    <p className="text-xl text-gray-700 dark:text-gray-200">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {[
                  { q: "Is this spell checker really free?", a: "Yes! 100% free with no limits, no signup, and no hidden fees." },
                  { q: "Is my text private and secure?", a: "Absolutely. Your text is processed securely and never stored on our servers." },
                  { q: "How accurate is the spell checker?", a: "Our spell checker uses the Hunspell algorithm with a 150,000+ word English dictionary for maximum accuracy." },
                  { q: "Can I check long documents?", a: "Yes! You can check up to 50,000 characters at once." },
                  { q: "Does it work on mobile?", a: "Yes! Fully responsive and works perfectly on phones and tablets." },
                ].map((faq) => (
                  <details
                    key={faq.q}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 group"
                  >
                    <summary className="text-xl font-bold cursor-pointer list-none flex justify-between items-center">
                      {faq.q}
                      <span className="transition group-open:rotate-180">▼</span>
                    </summary>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <TableOfContents items={tableOfContents} />
              <SidebarAd slot="toolPageSidebar" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}