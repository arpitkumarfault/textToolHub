import { Metadata } from "next";
import FormatterUI from "./_components/FormatterUI";

export const metadata: Metadata = {
  title: "Text Formatter - Remove Extra Spaces, Fix Line Breaks, Clean Text Online Free",
  description:
    "Best free online text formatter tool. Remove duplicate spaces, fix line breaks, convert to sentence case, remove empty lines, clean WhatsApp/Word/PDF copied text instantly.",
  keywords:
    "text formatter, remove extra spaces, fix line breaks, clean text online, format text free, remove duplicate lines, sentence case converter",
  openGraph: {
    title: "Text Formatter - Clean & Format Text Online (Free Tool 2025)",
    description: "Most advanced free text formatter used by 500K+ users monthly.",
    type: "website",
    images: "/og-text-formatter.png",
  },
};

export const dynamic = "force-dynamic";

export default function TextFormatterPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Text Formatter & Cleaner
          </h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Remove extra spaces, fix broken line breaks, clean copied text from WhatsApp, Word, PDF & emails. 
            100% free, no signup, works instantly.
          </p>
        </div>

        <FormatterUI />

        {/* AdSense Compliant Ad (Below Content) */}
        <div className="mt-12 flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Replace with your ID
            data-ad-slot="9876543210"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
            }}
          />
        </div>
      </div>
    </div>
  );
}