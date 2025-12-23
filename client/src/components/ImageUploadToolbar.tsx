import { Button } from "@/components/ui/button";
import { Upload, Loader2, Image } from "lucide-react";
import React from "react";

interface ImageUploadToolbarProps {
  uploadingImage: boolean;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
}

export const ImageUploadToolbar: React.FC<ImageUploadToolbarProps> = ({
  uploadingImage,
  handleFileSelect,
  onUploadClick,
}) => (
  <div className="mt-2 mb-3 flex items-center gap-2">
    <input
      type="file"
      accept="image/*"
      onChange={handleFileSelect}
      className="hidden"
      id="image-upload"
    />
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={uploadingImage}
      className="cursor-pointer"
      onClick={onUploadClick}
    >
      {uploadingImage ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Upload className="h-4 w-4 mr-2" />
      )}
      {uploadingImage ? "Uploading..." : "Upload Image"}
    </Button>
    <span className="text-sm text-muted-foreground">
      or drag & drop images here
    </span>
  </div>
);
