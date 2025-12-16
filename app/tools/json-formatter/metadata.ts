import { Metadata } from "next";

export const metadata: Metadata = {
  // Title: Primary Keyword + Secondary Keyword + Benefit
  title: "JSON Formatter & Validator - Free Online JSON Beautifier",
  
  // Description: Action verbs + Features + Trust signals (Secure/Client-side)
  description: "Format, validate, and beautify JSON instantly. Free online tool with syntax highlighting, tree view, minification, and error detection. Secure & client-side processing.",
  
  // Keywords: Mix of "Formatter", "Validator", "Beautifier" and "Minifier"
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "json minifier",
    "json pretty print",
    "online json tool",
    "json parser",
    "debug json",
    "json tree view",
    "format json online"
  ],

  // Canonical URL to prevent duplicate content issues
  alternates: {
    canonical: "/tools/json-formatter",
  },

  // Author/Creator info helps Google establish E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
  authors: [{ name: "YourSiteName" }],
  applicationName: "JSON Formatter & Validator",

  // Open Graph for how it looks when shared on Facebook, LinkedIn, Discord, etc.
  openGraph: {
    title: "JSON Formatter & Validator - Free Online JSON Beautifier",
    description: "Format, validate, and minify JSON data instantly. Features tree view and error debugging.",
    url: "/tools/json-formatter",
    siteName: "YourSiteName Tools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og/json-formatter.png", // Ensure you have an image here
        width: 1200,
        height: 630,
        alt: "JSON Formatter Tool Interface",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data instantly.",
    images: ["/images/og/json-formatter.png"],
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};