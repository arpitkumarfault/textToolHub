import { Metadata } from "next";
import Link from "next/link";
import { HiSparkles, HiCode, HiGlobeAlt, HiShieldCheck, HiLightningBolt, HiHeart } from "react-icons/hi";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "About Arpit Kumar Kanwar & TextToolsHub - Our Story",
    description: "Discover the detailed journey behind TextToolsHub, a project by Arpit Kumar Kanwar to revolutionize free online text tools for students and creators.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-surface to-background py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                            Est. 2026
                        </span>
                        <h1 className="mb-6 text-4xl font-bold text-text-primary md:text-6xl tracking-tight">
                            Building the Future of <br />
                            <span className="gradient-text">Text Editing, One Tool at a Time.</span>
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
                            The full story of how a single developer from India turned a personal frustration into a global utility for writers, students, and coders.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid gap-16 lg:grid-cols-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Chapter 1: The Genesis */}
                        <section>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-surface border border-border text-xl">🚀</span>
                                The Genesis: Solving a Real Problem
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-text-secondary">
                                <p>
                                    In the digital age, writing is the currency of communication. Whether you are a student submitting a thesis, a developer documenting code, or a content creator crafting the next viral post, text is the medium through which we share ideas. However, the tools we use to shape that text have often been fragmented, expensive, or cluttered with intrusive advertisements.
                                </p>
                                <p>
                                    The story of <strong>TextToolsHub</strong> begins in <strong>November 2025</strong>. I am <strong>Arpit Kumar Kanwar</strong>, a software developer based in India. Like many of you, I found myself constantly juggling multiple browser tabs just to perform simple tasks. I needed one site to count characters for a tweet, another to check grammar for an email, and yet another to format JSON data or convert case styles.
                                </p>
                                <p>
                                    The turning point came during a late-night study session. I needed a reliable grammar checker, but every "free" tool I found required a signup, had a daily limit, or bombarded me with pop-ups. I realized that the internet lacked a truly unified, high-quality, and <strong>privacy-focused</strong> toolkit that was accessible to everyone, regardless of their budget.
                                </p>
                                <p>
                                    That frustration sparked an idea: <em>"Why not build it myself?"</em>
                                </p>
                                <p>
                                    I didn't want to build just another utility site. I wanted to create a hub—a central sanctuary for text manipulation where efficiency meets aesthetics. A place where a student in a remote village and a software engineer in Silicon Valley could both find value, without barriers.
                                </p>
                            </div>
                        </section>

                        <div className="w-full h-px bg-border my-8"></div>

                        {/* Chapter 2: The Development Journey */}
                        <section>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-surface border border-border text-xl">💻</span>
                                The Journey: From Code to Deployment
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-text-secondary">
                                <p>
                                    Building TextToolsHub was not an overnight success; it was a journey of discipline and learning. As a solo developer, I wore every hat: product manager, UI/UX designer, backend engineer, and tester.
                                </p>
                                <p>
                                    Over the course of <strong>three months</strong>, from November 2025 to our official launch in <strong>January 2026</strong>, I dedicated my evenings and weekends to coding. I chose a modern technology stack not just for the sake of using new tools, but to ensure the best possible user experience:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Next.js 16 & React:</strong> For a blazing-fast, server-rendered application that loads instantly even on slower connections.</li>
                                    <li><strong>TypeScript:</strong> To ensure code reliability and minimize bugs, because reliability is paramount when you're editing important documents.</li>
                                    <li><strong>Tailwind CSS:</strong> To create a responsive, dark-mode-ready design system that feels premium and professional.</li>
                                </ul>
                                <p className="mt-4">
                                    There were challenges. Implementing complex algorithms for grammar checking and text comparison strictly within the browser—to ensure your data never leaves your device—required deep optimization. But the satisfaction of seeing the first version run smoothly was worth every sleepless night.
                                </p>
                            </div>
                        </section>

                        <div className="w-full h-px bg-border my-8"></div>

                        {/* Chapter 3: Our Core Philosophy */}
                        <section>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-surface border border-border text-xl">⚖️</span>
                                Our Philosophy: Why "Free" Matters
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-text-secondary">
                                <p>
                                    You might wonder, <em>"Why make this completely free?"</em>
                                </p>
                                <p>
                                    Growing up in India, I witnessed firsthand how economic barriers can limit access to technology. A monthly subscription for a premium writing assistant might cost the equivalent of a week's groceries for some students. I believe that <strong>basic tools for education and productivity should be a fundamental right, not a luxury</strong>.
                                </p>
                                <p>
                                    TextToolsHub is sustained by unobtrusive advertisements, specifically chosen to allow us to keep the servers running without ever charging the user. This model ensures that:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4 my-6 not-prose">
                                    <div className="p-4 rounded-xl bg-surface border border-border">
                                        <h4 className="font-semibold text-text-primary mb-2">No Paywalls</h4>
                                        <p className="text-sm">We will never lock essential features behind a premium tier.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-surface border border-border">
                                        <h4 className="font-semibold text-text-primary mb-2">No Signups</h4>
                                        <p className="text-sm">Your time is valuable. We don't need your email or data.</p>
                                    </div>
                                </div>
                                <p>
                                    This commitment extends to our operational transparency. We are an open book. We rely on the support of our community—users like you who share our tools with friends and colleagues—to grow and improve.
                                </p>
                            </div>
                        </section>

                        <div className="w-full h-px bg-border my-8"></div>

                        {/* Chapter 4: Privacy & Security */}
                        <section>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-surface border border-border text-xl">🛡️</span>
                                Privacy by Design
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-text-secondary">
                                <p>
                                    In an era where data breaches are common, trusting an online tool with your personal or professional writing is difficult. That is why privacy is not an afterthought at TextToolsHub; it is the foundation of our architecture.
                                </p>
                                <p>
                                    Unlike many other services that send your text to a remote server for processing, <strong>99% of our tools operate entirely within your browser (Client-Side)</strong>. When you paste text into our Word Counter, Case Converter, or Text Reverser, that data never leaves your computer. It is processed by JavaScript right on your device.
                                </p>
                                <p>
                                    This approach has two massive benefits:
                                </p>
                                <ol className="list-decimal pl-6 space-y-2 mt-4">
                                    <li><strong>Security:</strong> Since your sensitive drafts, legal documents, or code snippets are not transmitted over the internet, they cannot be intercepted or stored by us.</li>
                                    <li><strong>Speed:</strong> Without the need to wait for server round-trips, our tools provide instant feedback. You get results in milliseconds, not seconds.</li>
                                </ol>
                            </div>
                        </section>

                        <div className="w-full h-px bg-border my-8"></div>

                        {/* Chapter 5: The Roadmap */}
                        <section>
                            <h2 className="text-3xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-surface border border-border text-xl">🔮</span>
                                The Road Ahead
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-text-secondary">
                                <p>
                                    We are just getting started. The version of TextToolsHub you see today is just the foundation. As a solo developer, I am constantly listening to user feedback (yes, I read every email sent to our contact address) and iterating on the product.
                                </p>
                                <p>
                                    Our roadmap for 2026 and beyond includes ambitious goals:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Mobile Applications:</strong> Developing native iOS and Android apps to bring offline capability to our users.</li>
                                    <li><strong>Advanced Developer Tools:</strong> Expanding beyond text to include JSON validators, SQL formatters, and RegEx testers.</li>
                                    <li><strong>Educational Content:</strong> Launching a comprehensive blog to teach writing tips, grammar rules, and productivity hacks—turning our platform from just a tool into a learning resource.</li>
                                    <li><strong>Multilingual Support:</strong> Making our interface accessible in Spanish, French, Hindi, and other major languages to maximize our global reach.</li>
                                </ul>
                                <p className="mt-6">
                                    This is a living project. It grows as I grow as a developer, and it improves as our community grows stronger.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Profile Column */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Profile Card */}
                        <div className="sticky top-24">
                            <div className="glass-card p-8 border-border bg-gradient-to-br from-surface to-background shadow-xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1 mb-6">
                                        <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                                            <span className="text-4xl">👨‍💻</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-text-primary">Arpit Kumar Kanwar</h3>
                                    <p className="text-primary font-medium mb-4">Founder & Lead Developer</p>
                                    <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                                        "I built TextToolsHub because I believe technology should empower people, not complicate their lives. Thank you for being part of this journey."
                                    </p>

                                    <div className="w-full h-px bg-border mb-6"></div>

                                    <div className="w-full space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-secondary">Role</span>
                                            <span className="font-medium text-text-primary">Solo Developer</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-secondary">Location</span>
                                            <span className="font-medium text-text-primary">India 🇮🇳</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-text-secondary">Started</span>
                                            <span className="font-medium text-text-primary">Nov 2025</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 w-full">
                                        <Link
                                            href="/contact"
                                            className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
                                        >
                                            Contact Me
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Stack Mini-Card */}
                            <div className="mt-8 rounded-xl border border-border bg-surface p-6">
                                <h4 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-wider">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Vercel", "Framer Motion"].map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-background rounded border border-border text-xs font-mono text-text-secondary">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-20 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent p-[1px]">
                    <div className="rounded-2xl bg-surface p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
                        <h2 className="relative z-10 text-3xl font-bold text-text-primary mb-6">Ready to Optimize Your Workflow?</h2>
                        <p className="relative z-10 text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                            Join thousands of users who trust TextToolsHub for their daily tasks. No signup required—just click and create.
                        </p>
                        <Link
                            href="/tools"
                            className="relative z-10 inline-flex items-center justify-center rounded-xl bg-text-primary px-8 py-4 font-bold text-background transition hover:scale-105 hover:shadow-2xl"
                        >
                            Explore Our Tools
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
