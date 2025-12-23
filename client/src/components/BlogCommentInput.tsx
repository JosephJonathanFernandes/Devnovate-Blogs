import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

interface BlogCommentInputProps {
  newComment: string;
  setNewComment: (val: string) => void;
  submitting: boolean;
  onSubmit: () => void;
  isLoggedIn: boolean;
}

export function BlogCommentInput({ newComment, setNewComment, submitting, onSubmit, isLoggedIn }: BlogCommentInputProps) {
  return (
    <div className="mb-8">
      <Textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder={isLoggedIn ? "Write a comment..." : "Log in to comment"}
        disabled={!isLoggedIn || submitting}
        className="mb-2"
      />
      <Button
        onClick={onSubmit}
        disabled={!isLoggedIn || submitting || !newComment.trim()}
        variant="default"
      >
        {submitting ? "Posting..." : "Post Comment"}
      </Button>
    </div>
  );
}
