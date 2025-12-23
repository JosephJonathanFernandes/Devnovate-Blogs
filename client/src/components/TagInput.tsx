import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import React from "react";

interface TagInputProps {
  tags: string[];
  currentTag: string;
  setCurrentTag: (tag: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  currentTag,
  setCurrentTag,
  addTag,
  removeTag,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  return (
    <div>
      <Input
        id="tags"
        placeholder="Add tags (press Enter to add)"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-3 py-1">
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 hover:text-destructive"
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
