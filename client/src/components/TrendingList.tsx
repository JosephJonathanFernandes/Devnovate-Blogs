import { TrendingBlogCard } from "./TrendingBlogCard";

interface TrendingListProps {
  blogs: any[];
  onBlogClick: (id: string) => void;
}

export function TrendingList({ blogs, onBlogClick }: TrendingListProps) {
  if (!blogs.length) {
    return <div className="text-center text-muted-foreground py-12">No trending articles found.</div>;
  }
  return (
    <div>
      {blogs.map(blog => (
        <TrendingBlogCard key={blog.id} blog={blog} onClick={onBlogClick} />
      ))}
    </div>
  );
}
