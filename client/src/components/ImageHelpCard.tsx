import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";
import React from "react";

export const ImageHelpCard: React.FC = () => (
  <Card className="p-6 bg-gradient-card shadow-soft">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <Image className="h-4 w-4" />
      Image Upload
    </h3>
    <ul className="text-sm text-muted-foreground space-y-2">
      <li>• Click "Upload Image" or drag & drop images</li>
      <li>• Supported formats: JPEG, PNG, GIF, WebP</li>
      <li>• Maximum file size: 5MB</li>
      <li>• Images are automatically inserted as markdown</li>
      <li>• You can also paste image URLs directly</li>
    </ul>
  </Card>
);
