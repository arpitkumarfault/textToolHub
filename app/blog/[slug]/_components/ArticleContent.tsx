import { marked } from "marked";

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  const html = marked(content);

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default ArticleContent;