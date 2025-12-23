import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { UserProfile } from "@/types/blog";

interface ProfileHeaderProps {
  displayUser: {
    name: string;
    email: string;
    bio: string;
    joinedDate: string;
    location: string;
    website: string;
    isAdmin: boolean;
    stats: {
      articles: number;
      totalBlogs: number;
      followers: number;
      following: number;
      totalViews: number;
      totalLikes: number;
    };
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ displayUser }) => (
  <Card className="p-8 bg-gradient-card shadow-medium">
    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
      <Avatar className="h-24 w-24">
        <AvatarFallback className="text-2xl bg-muted">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{displayUser.name}</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/profile/edit">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {displayUser.bio ? (
          <p className="text-muted-foreground mb-4 max-w-2xl">{displayUser.bio}</p>
        ) : (
          <p className="text-muted-foreground/60 mb-4 max-w-2xl italic">
            No bio available. <Link to="/profile/edit" className="text-primary hover:underline">Add one</Link>
          </p>
        )}
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-muted-foreground">Joined:</span>
            <span className="ml-2 font-medium">{displayUser.joinedDate}</span>
          </div>
          {displayUser.location && (
            <div>
              <span className="text-muted-foreground">Location:</span>
              <span className="ml-2 font-medium">{displayUser.location}</span>
            </div>
          )}
          {displayUser.website && (
            <div>
              <span className="text-muted-foreground">Website:</span>
              <span className="ml-2 font-medium text-primary">{displayUser.website}</span>
            </div>
          )}
          <div>
            <span className="text-muted-foreground">Email:</span>
            <span className="ml-2 font-medium">{displayUser.email}</span>
          </div>
          {displayUser.isAdmin && (
            <div>
              <Badge variant="destructive">Admin</Badge>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t">
      <div className="text-center">
        <div className="text-2xl font-bold">{displayUser.stats.articles}</div>
        <div className="text-sm text-muted-foreground">Articles</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{displayUser.stats.followers.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Followers</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{displayUser.stats.following}</div>
        <div className="text-sm text-muted-foreground">Following</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{displayUser.stats.totalViews.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">Total Views</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{displayUser.stats.totalLikes}</div>
        <div className="text-sm text-muted-foreground">Total Likes</div>
      </div>
    </div>
  </Card>
);
