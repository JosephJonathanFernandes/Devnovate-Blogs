import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { loginUser, registerUser } from "@/services/authService";

export interface LoginFormData {
  email: string;
  password: string;
  name?: string;
}

export function useLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    name: ""
  });
  const { toast } = useToast();
  const { setUser, setIsLoggedIn, setIsAdmin, setLoading, loading } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await registerUser({
          name: formData.name || "",
          email: formData.email,
          password: formData.password
        });
      }
      if (response.success && response.user) {
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isAdmin: response.user.isAdmin
        });
        setIsLoggedIn(true);
        setIsAdmin(response.user.isAdmin || false);
        if (response.user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
      toast({
        title: isLogin ? "Login successful" : "Account created",
        description: isLogin
          ? `Welcome back${response?.user?.name ? ", " + response.user.name : ""}!`
          : "You can now verify (if needed) and start writing.",
      });
    } catch (err: any) {
      let msg = "Action failed";
      if (err.message) {
        msg = err.message;
      }
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    handleSubmit,
    loading,
  };
}
