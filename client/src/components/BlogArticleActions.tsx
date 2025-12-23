import { Button } from "../components/ui/button";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface BlogArticleActionsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
}

export function BlogArticleActions({ isLiked, isBookmarked, likesCount, onLike, onBookmark, onShare }: BlogArticleActionsProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Button variant={isLiked ? "default" : "outline"} onClick={onLike} size="sm">
        <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
        {likesCount}
      </Button>
      <Button variant={isBookmarked ? "default" : "outline"} onClick={onBookmark} size="sm">
        <Bookmark className="h-4 w-4 mr-2" />
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </Button>
      <Button variant="outline" onClick={onShare} size="sm">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
