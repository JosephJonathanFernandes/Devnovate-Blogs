import { Card } from "@/components/ui/card";
import { Save, Send, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface WriteSidebarProps {
  isSubmitting: boolean;
  isLoggedIn: boolean;
  onSaveDraft: () => void;
  onSubmitForReview: () => void;
  onPreview: () => void;
}

export const WriteSidebar: React.FC<WriteSidebarProps> = ({
  isSubmitting,
  isLoggedIn,
  onSaveDraft,
  onSubmitForReview,
  onPreview,
}) => (
  <Card className="p-6 bg-gradient-card shadow-soft">
    <h3 className="font-semibold mb-4">Publish Settings</h3>
    <div className="space-y-3">
      <Button
        onClick={onSaveDraft}
        variant="outline"
        className="w-full"
        disabled={isSubmitting || !isLoggedIn}
      >
        <Save className="h-4 w-4 mr-2" />
        {isSubmitting ? "Saving..." : "Save Draft"}
      </Button>
      <Button
        onClick={onSubmitForReview}
        variant="default"
        className="w-full"
        disabled={isSubmitting || !isLoggedIn}
      >
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting ? "Submitting..." : "Submit for Review"}
      </Button>
      <Button
        variant="ghost"
        className="w-full"
        disabled={isSubmitting}
        onClick={onPreview}
      >
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>
    </div>
  </Card>
);
