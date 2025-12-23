import { Card } from "../components/ui/card";
import { MessageCircle } from "lucide-react";

interface BlogCommentsSectionProps {
  comments: any[];
}

export function BlogCommentsSection({ comments }: BlogCommentsSectionProps) {
  return (
    <Card className="p-6 mb-8">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <MessageCircle className="h-5 w-5" /> Comments ({comments.length})
      </h3>
      {comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, idx) => (
            <li key={idx} className="border-b pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{comment.author || 'Anonymous'}</span>
                <span className="text-xs text-muted-foreground">{comment.date || ''}</span>
              </div>
              <p className="text-sm">{comment.text}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
