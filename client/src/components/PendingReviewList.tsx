import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Check, X, Eye } from "lucide-react";
import { PendingArticle } from "../types/admin";

interface PendingReviewListProps {
  articles: PendingArticle[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPreview: (id: string) => void;
}

export function PendingReviewList({ articles, onApprove, onReject, onPreview }: PendingReviewListProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card key={article.id} className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <Badge variant="secondary">Pending</Badge>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>
                      {article.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{article.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {article.submittedAt} • {article.wordCount} words
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onPreview(article.id)}>
                    <Eye className="h-4 w-4 mr-2" />Preview
                  </Button>
                  <Button variant="default" size="sm" onClick={() => onApprove(article.id)}>
                    <Check className="h-4 w-4 mr-2" />Approve
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onReject(article.id)}>
                    <X className="h-4 w-4 mr-2" />Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      {articles.length === 0 && (
        <Card className="p-12 text-center bg-gradient-card shadow-soft">
          <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
          <p className="text-muted-foreground">No articles are currently pending review.</p>
        </Card>
      )}
    </div>
  );
}
