import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { BlogPost } from "../types/blog";

export function useBlogPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, isAdmin } = useAppContext();
  const { toast } = useToast();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
  }, [isAdmin, navigate]);

  // Fetch pending blog data
  useEffect(() => {
    const fetchPendingBlog = async () => {
      if (!id || !isAdmin) return;
      setLoading(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/blogs/pending/${id}`);
        if (response.data.success) {
          const blogData = response.data.blog;
          setPost({
            id: blogData.id,
            title: blogData.title,
            content: blogData.content,
            excerpt: blogData.excerpt,
            author: blogData.author,
            submittedAt: blogData.submittedAt,
            wordCount: blogData.wordCount,
            tags: blogData.tags || [],
            coverImage: blogData.featured_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop",
            status: blogData.status
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load article preview.",
          variant: "destructive",
        });
        navigate("/admin-dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingBlog();
  }, [id, backendUrl, isAdmin, toast, navigate]);

  const handleApprove = useCallback(async () => {
    if (!post) return;
    setApproving(true);
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendUrl}/blogs/${post.id}/approve`);
      toast({
        title: "Article approved",
        description: "The article has been published successfully.",
      });
      navigate("/admin-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve article.",
        variant: "destructive",
      });
    } finally {
      setApproving(false);
    }
  }, [post, backendUrl, toast, navigate]);

  const handleReject = useCallback(async () => {
    if (!post) return;
    setRejecting(true);
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendUrl}/blogs/${post.id}/reject`);
      toast({
        title: "Article rejected",
        description: "The author has been notified of the rejection.",
        variant: "destructive"
      });
      navigate("/admin-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject article.",
        variant: "destructive",
      });
    } finally {
      setRejecting(false);
    }
  }, [post, backendUrl, toast, navigate]);

  return {
    post,
    loading,
    approving,
    rejecting,
    handleApprove,
    handleReject,
    isAdmin,
    navigate,
  };
}
