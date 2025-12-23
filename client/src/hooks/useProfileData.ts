import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { UserProfile, BlogPost } from "@/types/blog";

export function useProfileData() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user, backendUrl } = useAppContext();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchUserData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/users/me`);
        if (response.data.success) {
          setProfileData(response.data.user);
        }
      } catch (error: unknown) {
        toast({
          title: "Error loading profile",
          description: "Failed to load profile data. Using cached information.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [isLoggedIn, backendUrl, toast]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchUserBlogs = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/blogs/my-blogs`);
        if (response.data.success) {
          setUserBlogs(response.data.blogs);
        }
      } catch (error: unknown) {
        // Optionally handle error
      }
    };
    fetchUserBlogs();
  }, [isLoggedIn, backendUrl]);

  return {
    profileData,
    userBlogs,
    loading,
    isLoggedIn,
    user,
  };
}
