import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEditProfile } from "@/hooks/useEditProfile";
import { EditProfileForm } from "@/components/EditProfileForm";


const EditProfile = () => {
  const navigate = useNavigate();
  const {
    formData,
    setFormData,
    loading,
    saving,
    handleInputChange,
    handleSubmit,
    isLoggedIn,
  } = useEditProfile();

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading profile data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/profile")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-4xl font-bold mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your profile information
          </p>
        </div>
        <EditProfileForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          saving={saving}
        />
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate("/profile")}
          disabled={saving}
          className="mt-4"
        >
          Cancel
        </Button>
      </main>
    </div>
  );
};

export default EditProfile;
