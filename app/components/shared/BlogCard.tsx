import Link from "next/link";
import Image from "next/image"; // Highly recommended for performance
import { BlogPost } from "../../types/blog";
import { formatDate } from "../../lib/utils";

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    // Fallback pattern if no image
                    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                    </div>
                )}
                
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                        {post.category}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-6">
                {/* Meta Info */}
                <div className="mb-3 flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span>{post.readingTime} min read</span>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mb-6 flex-1 text-base leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.excerpt}
                </p>

                {/* Footer: Author & Action */}
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div className="flex items-center gap-2.5">
                        {post.author.avatar ? (
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs font-bold text-blue-600 dark:text-blue-400">
                                {post.author.name.charAt(0)}
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {post.author.name}
                        </span>
                    </div>

                    <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        Read
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;