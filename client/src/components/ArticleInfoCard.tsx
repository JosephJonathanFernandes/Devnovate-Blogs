import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

interface ArticleInfoCardProps {
  submittedAt: string;
  wordCount: number;
  status: string;
}

export function ArticleInfoCard({ submittedAt, wordCount, status }: ArticleInfoCardProps) {
  return (
    <Card className="p-6 mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Article Information</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Submitted {submittedAt} • {wordCount} words • Status: {status}
          </p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Pending Review
        </Badge>
      </div>
    </Card>
  );
}
