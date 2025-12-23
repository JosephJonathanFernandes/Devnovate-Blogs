import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogArticleContentProps {
  content: string;
}

export function BlogArticleContent({ content }: BlogArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
