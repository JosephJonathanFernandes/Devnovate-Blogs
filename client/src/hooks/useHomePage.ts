import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { BlogFromAPI } from "@/types/blog";

// Mock data (move to a separate file if needed)
const mockBlogs = [
  // ...existing mockBlogs array from Home.tsx...
];

export function useHomePage() {
  const [activeTab, setActiveTab] = useState("latest");
  const [realBlogs, setRealBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { backendUrl } = useAppContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/blogs`);
        if (response.data.success) {
          const transformedBlogs = response.data.blogs.map((blog: BlogFromAPI) => ({
            id: blog.id,
            title: blog.title,
            excerpt: blog.excerpt,
            author: {
              name: blog.author_name,
              avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`
            },
            publishedAt: new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            readTime: `${Math.ceil(blog.excerpt.length / 200)} min read`,
            tags: blog.tags || [],
            likes: blog.likes || 0,
            comments: blog.comments_count || 0,
            views: blog.views || 0,
            coverImage: blog.featured_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop"
          }));
          setRealBlogs(transformedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [backendUrl]);

  const allBlogs = [...mockBlogs, ...realBlogs];

  return {
    activeTab,
    setActiveTab,
    allBlogs,
    loading,
  };
}
