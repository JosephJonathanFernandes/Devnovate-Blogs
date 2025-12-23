import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export interface EditProfileFormData {
  name: string;
  bio: string;
  location: string;
  website: string;
}

export function useEditProfile() {
  const [formData, setFormData] = useState<EditProfileFormData>({
    name: "",
    bio: "",
    location: "",
    website: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { isLoggedIn, user, backendUrl, setUser } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to edit your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate, toast]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) return;
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/users/me`);
        if (response.data.success) {
          const userData = response.data.user;
          setFormData({
            name: userData.name || "",
            bio: userData.bio || "",
            location: userData.location || "",
            website: userData.website || ""
          });
        }
      } catch (error: any) {
        toast({
          title: "Error loading profile",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [isLoggedIn, backendUrl, toast]);

  const handleInputChange = (field: keyof EditProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.put(`${backendUrl}/users/me`, formData);
      if (response.data.success) {
        if (user && formData.name !== user.name) {
          setUser({ ...user, name: formData.name });
        }
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        navigate("/profile");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to update profile";
      toast({
        title: "Error updating profile",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    saving,
    handleInputChange,
    handleSubmit,
    isLoggedIn,
  };
}
