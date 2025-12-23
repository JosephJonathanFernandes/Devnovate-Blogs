import { Separator } from "../components/ui/separator";

interface ArticleExcerptProps {
  excerpt: string;
}

export function ArticleExcerpt({ excerpt }: ArticleExcerptProps) {
  if (!excerpt) return null;
  return (
    <>
      <div className="bg-gradient-card p-6 rounded-xl shadow-soft mb-8">
        <h3 className="text-lg font-semibold mb-3">Article Excerpt</h3>
        <p className="text-muted-foreground italic">{excerpt}</p>
      </div>
      <Separator className="mb-8" />
    </>
  );
}
