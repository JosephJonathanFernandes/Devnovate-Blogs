import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Heart, MessageCircle, Eye, TrendingUp } from "lucide-react";

interface TrendingBlogCardProps {
  blog: {
    id: string;
    title: string;
    excerpt: string;
    author_name: string;
    tags: string[];
    featured_image: string;
    views: number;
    likes: number;
    comments_count: number;
    trending_points: number;
    published_at: string;
  };
  onClick: (id: string) => void;
}

export function TrendingBlogCard({ blog, onClick }: TrendingBlogCardProps) {
  return (
    <Card className="mb-6 cursor-pointer hover:shadow-lg transition" onClick={() => onClick(blog.id)}>
      <CardHeader className="p-0">
        <div className="aspect-video w-full overflow-hidden rounded-t-xl">
          <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span><TrendingUp className="inline h-4 w-4 mr-1 text-orange-500" />{blog.trending_points}</span>
          <span><Eye className="inline h-4 w-4 mr-1" />{blog.views}</span>
          <span><Heart className="inline h-4 w-4 mr-1 text-red-500" />{blog.likes}</span>
          <span><MessageCircle className="inline h-4 w-4 mr-1" />{blog.comments_count}</span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">By {blog.author_name} • {blog.published_at}</div>
      </CardContent>
    </Card>
  );
}
