import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {content.includes('#') || content.includes('```') ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      ) : (
        <div className="whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      )}
    </div>
  );
}
