import LineCounterUI from "./_components/LineCounterUI";
import AdBanner from "../../components/ads/AdBanner";
import TableOfContents from "../../components/shared/TableOfContents";
import SidebarAd from "../../components/ads/SidebarAd";
import ShareButtons from "../../components/shared/ShareButtons";
import Breadcrumb from "../../components/shared/Breadcrumb";
import StructuredData from "../../components/seo/StructuredData";
import { generateToolSchema } from "../../lib/seo";
import { metadata } from "./metadata";

export const dynamic = 'force-dynamic';


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Line Counter", href: "/tools/line-counter" },
];

const tableOfContents = [
  { id: "tool", title: "Line Counter Tool" },
  { id: "features", title: "Features" },
  { id: "faq", title: "FAQ" },
];

const structuredData = generateToolSchema({
  name: "Line Counter",
  description: "Free online line, sentence, and paragraph counter",
  url: "/tools/line-counter",
});

export default function LineCounterPage() {
  return (
    <>
      <StructuredData data={structuredData} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="mb-8">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">
                  Free Line Counter
                </h1>
                <p className="text-xl text-gray-600">
                  Count lines, sentences, and paragraphs in your text instantly. Perfect for developers, writers, and students.
                </p>
                <ShareButtons url="/tools/line-counter" title="Free Line Counter Tool" />
              </div>

              <AdBanner slot="toolPageTop" format="horizontal" />

              <div id="tool" className="my-8">
                <LineCounterUI />
              </div>

              <section id="features" className="my-12">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">Key Features</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border bg-white p-6 text-center">
                    <div className="text-4xl mb-2">📏</div>
                    <h3 className="font-semibold">Line Count</h3>
                    <p className="text-sm text-gray-600 mt-2">Count non-empty lines accurately</p>
                  </div>
                  <div className="rounded-lg border bg-white p-6 text-center">
                    <div className="text-4xl mb-2">✍️</div>
                    <h3 className="font-semibold">Sentences</h3>
                    <p className="text-sm text-gray-600 mt-2">Detect sentences by punctuation</p>
                  </div>
                  <div className="rounded-lg border bg-white p-6 text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <h3 className="font-semibold">Paragraphs</h3>
                    <p className="text-sm text-gray-600 mt-2">Count by blank line separation</p>
                  </div>
                </div>
              </section>

              <section id="faq" className="my-12">
                <h2 className="mb-6 text-3xl font-bold text-gray-900">FAQ</h2>
                <div className="space-y-4">
                  <FAQ question="Does it count empty lines?" answer="No, empty lines are ignored for accurate results." />
                  <FAQ question="Can I use it for code?" answer="Yes! Perfect for counting lines in source code, logs, or scripts." />
                  <FAQ question="Is my text saved?" answer="No. Everything runs in your browser. Your text never leaves your device." />
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
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

const FAQ = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group rounded-lg border bg-white p-4">
    <summary className="flex cursor-pointer justify-between font-semibold list-none">
      {question}
      <span className="transition group-open:rotate-180">▼</span>
    </summary>
    <p className="mt-3 text-gray-600">{answer}</p>
  </details>
);