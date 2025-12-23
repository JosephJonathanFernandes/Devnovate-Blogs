import { Badge } from "../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Calendar, Eye } from "lucide-react";

interface BlogArticleHeaderProps {
  title: string;
  author: { name: string; avatar?: string; bio?: string };
  publishedAt: string;
  readTime: string;
  tags: string[];
  views?: number;
}

export function BlogArticleHeader({ title, author, publishedAt, readTime, tags, views }: BlogArticleHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h1>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>
            {author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{author.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{publishedAt}</span>
            <span>•</span>
            <span>{readTime}</span>
            {typeof views === 'number' && (
              <>
                <span>•</span>
                <Eye className="h-4 w-4" />
                <span>{views} views</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
