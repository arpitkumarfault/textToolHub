export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: string[];
  image?: string;
  featured: boolean;
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export type BlogCategory =
  | "Writing Tips"
  | "Grammar Guide"
  | "SEO Writing"
  | "Content Creation"
  | "Productivity"
  | "Tools & Resources"
  | "Privacy & Security"
  | "Technical Guide"
  | "Coding"
  | "Design"
  | "Development";

export interface BlogFilter {
  category?: BlogCategory;
  tag?: string;
  search?: string;
}