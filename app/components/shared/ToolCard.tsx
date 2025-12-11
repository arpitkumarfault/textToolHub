"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "../../types/tools";
import { HiArrowRight, HiStar } from "react-icons/hi";
import { Badge } from "../ui";

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

const ToolCard = ({ tool, index = 0 }: ToolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group block h-full"
      >
        <div className="h-full rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg flex flex-col relative overflow-hidden">

          {/* Header: Icon & Category */}
          {/* Header components (Category & Popular) - No Icon */}
          <div className="flex items-center justify-between mb-4">
            {tool.category ? (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-secondary/10 text-secondary uppercase tracking-wider border border-secondary/20">
                {tool.category}
              </span>
            ) : <div />}

            {tool.featured && (
              <div className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                <HiStar className="h-3 w-3" />
                <span>Popular</span>
              </div>
            )}
          </div>

          {/* Title - Highlighter Style */}
          <h3 className="mb-3 text-2xl font-black text-text-primary leading-tight group-hover:text-primary transition-colors">
            {/* Simple highlight effect on hover */}
            <span className="decoration-primary/30 underline-offset-4 group-hover:underline">
              {tool.title}
            </span>
          </h3>

          {/* Description */}
          <p className="mb-6 text-sm text-text-secondary line-clamp-3 leading-relaxed flex-grow">
            {tool.description}
          </p>

          {/* Footer: Action */}
          <div className="flex items-center text-primary font-bold mt-auto pt-4 border-t border-border/40">
            <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
              Open Tool <HiArrowRight className="h-4 w-4" />
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default ToolCard;