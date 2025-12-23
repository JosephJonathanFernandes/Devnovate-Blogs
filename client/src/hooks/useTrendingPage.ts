import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/services/apiClient";
import { BlogPost } from "../types/blog";

export function useTrendingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs/trending');
        if (response.data.success) {
          const blogsWithImages = response.data.blogs.map((blog: any) => ({
            ...blog,
            featured_image: blog.featured_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
          }));
          setBlogs(blogsWithImages);
        } else {
          throw new Error('Failed to fetch trending blogs');
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || 'Failed to fetch trending blogs',
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingBlogs();
  }, [toast]);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    searchQuery,
    setSearchQuery,
    blogs: filteredBlogs,
    loading,
    navigate,
  };
}
