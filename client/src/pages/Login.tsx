import { LoginForm } from "@/components/LoginForm";
import { useLogin } from "@/hooks/useLogin";


const Login = () => {
  const {
    isLogin,
    setIsLogin,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    handleSubmit,
    loading,
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 sm:p-6">
      <LoginForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default Login;