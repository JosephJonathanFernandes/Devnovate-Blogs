import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
      });
    }, 2000);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reset link resent",
        description: "A new password reset link has been sent to your email.",
      });
    }, 2000);
  };

  return {
    email,
    setEmail,
    isSubmitted,
    isLoading,
    handleSubmit,
    handleResend,
  };
}
