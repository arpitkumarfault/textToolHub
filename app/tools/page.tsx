import { Metadata } from "next";
import { tools } from "../data/tools";
import ToolCard from "../components/shared/ToolCard";
import AdBanner from "../components/ads/AdBanner";
import { generateMetadata as genMeta } from "../lib/seo";

export const metadata: Metadata = genMeta({
  title: "Free Online Text Tools",
  description:
    "Browse our collection of free online text editing tools. Grammar checker, word counter, spell checker, and more. No registration required.",
  url: "/tools",
});

const ToolsPage = () => {
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-surface to-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
              Free Online Text Tools
            </h1>
            <p className="text-xl text-text-secondary">
              Professional text editing and analysis tools. All free, no
              registration required.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AdBanner slot="homepageTop" format="horizontal" />

        <div className="mt-12">
          {categories.map((category) => {
            const categoryTools = tools.filter(
              (tool) => tool.category === category
            );

            return (
              <section key={category} className="mb-16">
                <h2 className="mb-6 text-2xl font-bold text-text-primary">
                  {category} Tools
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;