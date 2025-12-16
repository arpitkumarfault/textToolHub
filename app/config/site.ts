export const siteConfig = {
  name: "TextToolsHub",
  title: "Free Online Text Tools - Grammar, Word Counter & More | TextToolsHub",
  description: "Professional text editing tools including grammar checker, word counter, spell checker, and text formatter. 100% free, no registration required. Improve your writing instantly.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://texttoolshub.com",
  ogImage: "/images/og-image.jpg",
  keywords: [
    "text tools",
    "grammar checker",
    "word counter",
    "spell checker",
    "text editor online",
    "character counter",
    "case converter",
    "text formatter",
    "writing tools",
    "free text tools",
    "online text editor",
    "text analysis"
  ],
  author: {
    name: "TextToolsHub Team",
    email: "contact@texttoolshub.com",
    url: "https://texttoolshub.com",
  },
  creator: "@texttoolshub",
  publisher: "TextToolsHub",
  social: {
    twitter: "@texttoolshub",
    facebook: "texttoolshub",
    instagram: "texttoolshub",
    linkedin: "company/texttoolshub",
  },
};

export const toolsConfig = {
  maxTextLength: 100000,
  autosaveDelay: 2000,
  defaultLanguage: "en-US",
  enableSpellCheck: true,
  enableGrammarCheck: true,
};

export const features = {
  enableBlog: true,
  enableNewsletter: false,
  enableComments: false,
  enableSearch: true,
  enableDarkMode: false,
};