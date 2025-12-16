// app/tools/remove-line-breaks/page.tsx
import { Metadata } from "next";
import RemoveLineBreaksUI from "./_components/RemoveLineBreaksUI";
import { generateToolSchema } from "../../lib/seo";
import SidebarAd from "../../components/ads/SidebarAd";
import ShareButtons from "../../components/shared/ShareButtons";
import AdBanner from "../../components/ads/AdBanner";
import TableOfContents from "../../components/shared/TableOfContents";
import Breadcrumb from "../../components/shared/Breadcrumb";
import StructuredData from "../../components/seo/StructuredData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Remove Line Breaks Online - Convert Multi-Line to Single Line (Free 2025)",
  description:
    "Best free tool to remove line breaks from text. Convert multi-line text to single line instantly. Perfect for cleaning PDF text, formatting data, and merging lines. 100% free, no signup.",
  keywords: [
    "remove line breaks",
    "remove newlines",
    "single line text",
    "merge lines",
    "convert multi-line to single line",
    "clean pdf text",
    "remove line breaks online",
    "text line break remover",
  ],
  openGraph: {
    title: "Remove Line Breaks Online - Free Text Line Break Remover",
    description:
      "Convert multi-line text to single line instantly. Perfect for cleaning PDF text and formatting data.",
    type: "website",
    url: "https://yourdomain.com/tools/remove-line-breaks",
  },
};

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Remove Line Breaks", href: "/tools/remove-line-breaks" },
];

const tableOfContents = [
  { id: "tool", title: "Remove Line Breaks Tool" },
  { id: "features", title: "Key Features" },
  { id: "how-to-use", title: "How to Use" },
  { id: "use-cases", title: "Use Cases" },
  { id: "faq", title: "FAQ" },
];

const structuredData = generateToolSchema({
  name: "Remove Line Breaks",
  description: "Free online tool to remove line breaks from text and convert multi-line to single line",
  url: "/tools/remove-line-breaks",
});

export default function RemoveLineBreaksPage() {
  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Breadcrumb items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="mt-10 mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Remove <span className="text-primary">Line Breaks</span> Online
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Convert multi-line text to single line instantly. Perfect for
              <strong> cleaning PDF text</strong>, formatting data, and merging lines.
              <strong> 100% free, no signup required.</strong>
            </p>
            <div className="mt-8">
              <ShareButtons
                url="/tools/remove-line-breaks"
                title="Remove Line Breaks Online - Free Text Line Break Remover"
              />
            </div>
          </div>

          <AdBanner slot="toolPageTop" format="horizontal" />

          {/* Main Grid */}
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <main className="lg:col-span-8 space-y-16">
              {/* Tool */}
              <section id="tool">
                <RemoveLineBreaksUI />
              </section>

              {/* Features */}
              <section id="features">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Key Features
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    { emoji: "🚀", title: "4 Modes", desc: "Remove All, Keep Paragraphs, Smart Mode, Join (No Spaces)" },
                    { emoji: "⚡", title: "Instant Processing", desc: "See results in real-time as you type or paste" },
                    { emoji: "🔧", title: "Advanced Options", desc: "Control spaces, extra whitespace, and empty lines" },
                    { emoji: "📊", title: "Live Statistics", desc: "Track lines removed, characters saved, and more" },
                    { emoji: "📋", title: "One-Click Copy", desc: "Copy your cleaned text instantly to clipboard" },
                    { emoji: "💾", title: "Download Result", desc: "Save your processed text as a file" },
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
                    "Paste your multi-line text in the input box",
                    "Select a removal mode (Remove All, Keep Paragraphs, etc.)",
                    "Adjust advanced options if needed",
                    "See the result update instantly",
                    "Copy or download your cleaned text",
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

              {/* Use Cases */}
              <section id="use-cases">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Perfect For
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { icon: "📄", title: "PDF Text Cleaning", desc: "Remove unwanted line breaks from copied PDF text" },
                    { icon: "📧", title: "Email Formatting", desc: "Clean up email content for better readability" },
                    { icon: "💻", title: "Code Formatting", desc: "Convert multi-line strings to single line" },
                    { icon: "📊", title: "Data Processing", desc: "Prepare text for spreadsheets and databases" },
                    { icon: "🔗", title: "URL Fixing", desc: "Fix URLs that were split across multiple lines" },
                    { icon: "📝", title: "Content Editing", desc: "Clean up articles and blog posts" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="text-4xl">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                      </div>
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
                    { q: "What's the difference between the modes?", a: "Remove All: converts everything to one line. Keep Paragraphs: preserves paragraph breaks. Smart Mode: keeps sentences together. Join: removes all breaks without adding spaces." },
                    { q: "Will spaces be added between merged lines?", a: "Yes, by default. You can disable this in Advanced Options if you want lines joined directly." },
                    { q: "Does it work with PDF text?", a: "Absolutely! This tool is perfect for cleaning text copied from PDFs which often have unwanted line breaks." },
                    { q: "Is there a character limit?", a: "No! You can process large documents with thousands of lines." },
                    { q: "Is my text private?", a: "Yes, 100%. All processing happens in your browser — your text is never sent to any server." },
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
    </>
  );
}