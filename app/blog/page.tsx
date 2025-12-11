import { Metadata } from "next";
import { blogPosts } from "../data/blog-posts";
import AdBanner from "../components/ads/AdBanner";
import BlogCard from "../components/shared/BlogCard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog - Writing Tips & Guides",
  description: "Learn writing tips, grammar rules, and content creation strategies from our expert guides.",
};

const BlogPage = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-surface to-background py-16">
        <div className="container-custom">
          <h1 className="mb-4 text-4xl font-bold text-text-primary md:text-5xl">
            Writing Tips & Guides
          </h1>
          <p className="text-xl text-text-secondary">
            Expert advice on grammar, writing, and content creation
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <AdBanner slot="homepageTop" format="horizontal" />

        {/* Featured Posts */}
        {/* All Posts Grid (Showing {blogPosts.length} articles) */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            All Articles ({blogPosts.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;