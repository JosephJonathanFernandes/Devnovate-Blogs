import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/services/apiClient";
import { BlogPost as BlogPostType } from "../types/blog";

export function useBlogPost() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPreviewMode = searchParams.get('preview') === 'true';
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const { backendUrl, isLoggedIn } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      setLoading(true);
      try {
        if (isPreviewMode) {
          const response = await apiClient.get('/blogs/pending');
          if (response.data.success) {
            const blogData = response.data.blogs.find((blog: any) => blog.id === id || blog._id === id || String(blog.id) === id || String(blog._id) === id);
            if (!blogData) throw new Error(`Blog not found in pending list. Looking for ID: ${id}`);
            setPost({
              id: blogData._id || blogData.id,
              title: blogData.title,
              content: blogData.content,
              excerpt: blogData.excerpt,
              author: blogData.author || {
                name: blogData.author_name || blogData.author?.name || "Unknown Author",
                avatar: blogData.author?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
                bio: "Developer and content creator"
              },
              publishedAt: blogData.submittedAt || "Recently submitted",
              readTime: `${Math.ceil((blogData.content?.length || 0) / 1000)} min read`,
              tags: blogData.tags || [],
              likes: 0,
              comments: 0,
              views: 0,
              coverImage: blogData.featured_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop"
            });
          } else {
            throw new Error('Failed to fetch pending blogs');
          }
        } else {
          const response = await apiClient.get(`/blogs/${id}`);
          if (response.data.success) {
            const blogData = response.data.blog;
            setPost({
              id: blogData._id,
              title: blogData.title,
              content: blogData.content,
              excerpt: blogData.excerpt,
              author: {
                name: blogData.author_name,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
                bio: "Developer and content creator"
              },
              publishedAt: blogData.published_at ? new Date(blogData.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "Recently",
              readTime: `${Math.ceil(blogData.content.length / 1000)} min read`,
              tags: blogData.tags || [],
              likes: blogData.likes_count || 0,
              comments: blogData.comments_count || 0,
              views: blogData.views || 0,
              coverImage: blogData.featured_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop"
            });
            setLikesCount(blogData.likes_count || 0);
            setComments(blogData.comments || []);
          }
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to load blog post.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [id, isPreviewMode, toast]);

  // Add like, bookmark, comment handlers here as needed

  return {
    post,
    loading,
    isLiked,
    setIsLiked,
    isBookmarked,
    setIsBookmarked,
    likesCount,
    setLikesCount,
    comments,
    setComments,
    newComment,
    setNewComment,
    submittingComment,
    setSubmittingComment,
    isPreviewMode,
    isLoggedIn,
    toast,
  };
}
