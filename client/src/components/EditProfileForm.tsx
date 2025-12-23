import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import React from "react";
import { EditProfileFormData } from "@/hooks/useEditProfile";

interface EditProfileFormProps {
  formData: EditProfileFormData;
  onInputChange: (field: keyof EditProfileFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  saving: boolean;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  saving,
}) => (
  <Card className="p-8 bg-gradient-card shadow-soft">
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-base font-semibold">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => onInputChange('name', e.target.value)}
          placeholder="Your full name"
          className="mt-2"
          required
        />
      </div>
      {/* Bio */}
      <div>
        <Label htmlFor="bio" className="text-base font-semibold">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={e => onInputChange('bio', e.target.value)}
          placeholder="Tell us about yourself..."
          className="mt-2"
          rows={4}
          maxLength={500}
        />
        <p className="text-sm text-muted-foreground mt-1">
          {formData.bio.length}/500 characters
        </p>
      </div>
      {/* Location */}
      <div>
        <Label htmlFor="location" className="text-base font-semibold">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={e => onInputChange('location', e.target.value)}
          placeholder="Your location"
          className="mt-2"
        />
      </div>
      {/* Website */}
      <div>
        <Label htmlFor="website" className="text-base font-semibold">Website</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={e => onInputChange('website', e.target.value)}
          placeholder="https://yourwebsite.com"
          className="mt-2"
          type="url"
        />
      </div>
      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button 
          type="submit" 
          variant="gradient" 
          className="flex-1"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  </Card>
);
