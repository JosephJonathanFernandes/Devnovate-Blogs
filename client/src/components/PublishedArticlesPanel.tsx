import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, EyeOff } from "lucide-react";

export function PublishedArticlesPanel() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Published Articles Management</h2>
        <Button variant="outline">
          <EyeOff className="h-4 w-4 mr-2" />
          Bulk Actions
        </Button>
      </div>
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Published Articles</h3>
          <p className="text-muted-foreground">
            Manage visibility and moderate published content
          </p>
          <Button variant="outline" className="mt-4">
            View All Published Articles
          </Button>
        </div>
      </Card>
    </>
  );
}
