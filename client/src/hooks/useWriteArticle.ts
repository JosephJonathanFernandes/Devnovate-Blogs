import { useState } from "react";
import { AxiosError } from "axios";
import apiClient from "@/services/apiClient";
import { useToast } from "@/hooks/use-toast";

export interface UseWriteArticleProps {
  initialTitle?: string;
  initialExcerpt?: string;
  initialContent?: string;
  initialTags?: string[];
  initialFeaturedImage?: string;
}

export function useWriteArticle({
  initialTitle = "",
  initialExcerpt = "",
  initialContent = "# Your Article Title\n\nStart writing your markdown content here...",
  initialTags = [],
  initialFeaturedImage = "",
}: UseWriteArticleProps = {}) {
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [currentTag, setCurrentTag] = useState("");
  const [featuredImage, setFeaturedImage] = useState(initialFeaturedImage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
    setCurrentTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await apiClient.post("/upload/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.success) {
        const imageUrl = response.data.url;
        const markdownImage = `![${file.name}](${imageUrl})`;
        setContent((prev) => prev + "\n" + markdownImage);
        toast({
          title: "Image uploaded successfully",
          description: "Image has been inserted into your content",
        });
      }
    } catch (error: unknown) {
      let message = "Failed to upload image";
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      }
      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  return {
    title,
    setTitle,
    excerpt,
    setExcerpt,
    content,
    setContent,
    tags,
    setTags,
    currentTag,
    setCurrentTag,
    featuredImage,
    setFeaturedImage,
    isSubmitting,
    setIsSubmitting,
    uploadingImage,
    setUploadingImage,
    isDragOver,
    setIsDragOver,
    addTag,
    removeTag,
    handleImageUpload,
    toast,
  };
}
