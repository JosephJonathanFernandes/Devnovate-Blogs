import { Card } from "@/components/ui/card";
import React from "react";

export const GuidelinesCard: React.FC = () => (
  <Card className="p-6 bg-gradient-card shadow-soft">
    <h3 className="font-semibold mb-4">Writing Guidelines</h3>
    <ul className="text-sm text-muted-foreground space-y-2">
      <li>• Keep your title clear and descriptive</li>
      <li>• Add relevant tags to help readers find your article</li>
      <li>• Write a compelling excerpt</li>
      <li>• Use markdown formatting and code blocks</li>
      <li>• Include examples and practical insights</li>
      <li>• All articles are reviewed before publishing</li>
    </ul>
  </Card>
);
