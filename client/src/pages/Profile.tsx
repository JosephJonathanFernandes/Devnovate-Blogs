import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Edit, Eye, Clock, Heart, MessageCircle, Loader2, User, FileText, Trash2, Shield, MapPin, ExternalLink, Calendar } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

// TypeScript interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  isAdmin?: boolean;
  createdAt?: string;
  stats?: {
    articles?: number;
    totalBlogs?: number;
    followers?: number;
    following?: number;
    totalViews?: number;
    totalLikes?: number;
  };
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'Draft';
  createdAt: string;
  updatedAt: string;
  lastModified?: string;
  author: {
    id: string;
    name: string;
  };
  tags?: string[];
  excerpt?: string;
  readTime?: number;
  likes?: number;
  views?: number;
  comments?: number;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [userBlogs, setUserBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user, backendUrl } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please log in to view your profile.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
  }, [isLoggedIn, navigate, toast]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) return;
      
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${backendUrl}/users/me`);
        
        if (response.data.success) {
          setProfileData(response.data.user);
        }
      } catch (error: unknown) {
        console.error('Error fetching user data:', error);
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

  // Fetch user's own blogs
  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!isLoggedIn) return;
      
      try {

        import { useNavigate, Link } from "react-router-dom";
        import Header from "@/components/Header";
        import { Button } from "@/components/ui/button";
        import { Card } from "@/components/ui/card";
        import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
        import { Edit, Eye, Heart, Loader2 } from "lucide-react";
        import BlogCard from "@/components/BlogCard";
        import { useProfileData } from "@/hooks/useProfileData";
        import { ProfileHeader } from "@/components/ProfileHeader";
        import { StatusBadge } from "@/components/StatusBadge";

        const Profile = () => {
          const { profileData, userBlogs, loading, isLoggedIn, user } = useProfileData();
          const navigate = useNavigate();

          if (!isLoggedIn) {
            return null;
          }

          if (loading) {
            return (
              <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8">
                  <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Loading profile...</p>
                    </div>
                  </div>
                </main>
              </div>
            );
          }

          const displayUser = {
            name: profileData?.name || user?.name || "John Doe",
            email: profileData?.email || user?.email || "john.doe@example.com",
            bio: profileData?.bio || "",
            joinedDate: profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2024",
            location: profileData?.location || "",
            website: profileData?.website || "",
            isAdmin: profileData?.isAdmin || false,
            stats: {
              articles: profileData?.stats?.articles || 0,
              totalBlogs: profileData?.stats?.totalBlogs || 0,
              followers: profileData?.stats?.followers || 0,
              following: profileData?.stats?.following || 0,
              totalViews: profileData?.stats?.totalViews || 0,
              totalLikes: profileData?.stats?.totalLikes || 0
            }
          };

          const publishedArticles = userBlogs.filter(blog => blog.status === 'approved');
          const draftArticles = userBlogs.filter(blog => blog.status === 'pending');
          const rejectedArticles = userBlogs.filter(blog => blog.status === 'rejected');
              <Heart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
                    <TabsContent value="published" className="space-y-6">
                <div className="mb-8">
                  <ProfileHeader displayUser={displayUser} />
                </div>
                            <h4 className="text-lg font-semibold">{article.title}</h4>
                            <StatusBadge status={article.status} />
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.tags?.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Last modified: {article.lastModified}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Revise & Resubmit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              
              {draftArticles.length === 0 && rejectedArticles.length === 0 && (
                <Card className="p-12 text-center bg-gradient-card shadow-soft">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No drafts or submissions</h3>
                  <p className="text-muted-foreground mb-4">
                    All your articles have been published. Keep writing!
                  </p>
                  <Button variant="gradient" asChild>
                    <Link to="/write">Write New Article</Link>
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-6">
            <h2 className="text-2xl font-bold">Drafts & Submissions</h2>
            <div className="space-y-4">
              {draftArticles.map((article) => (
                <Card key={article.id} className="p-6 bg-gradient-card shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <Badge variant={article.status === "Draft" ? "secondary" : "default"}>
                          {article.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Last modified {article.lastModified}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">This Month's Views</div>
                  </div>
                  <Eye className="h-8 w-8 text-primary" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">This Month's Likes</div>
                  </div>
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">23</div>
                    <div className="text-sm text-muted-foreground">This Month's Comments</div>
                  </div>
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
              </Card>
              <Card className="p-6 bg-gradient-card shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">New Followers</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">+</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;