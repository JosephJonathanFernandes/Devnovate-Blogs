import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { StatsOverview } from "../components/StatsOverview";
import { PendingReviewList } from "../components/PendingReviewList";
import { PublishedArticlesPanel } from "../components/PublishedArticlesPanel";
import { UserManagementPanel } from "../components/UserManagementPanel";


const AdminDashboard = () => {
  const {
    stats,
    pendingArticles,
    handleApprove,
    handleReject,
    handlePreview,
    loading,
    error,
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage content and users on Devnovate
            </p>
          </div>
          <Badge variant="default" className="bg-gradient-primary">
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Badge>
        </div>
        <StatsOverview stats={stats} />
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending Reviews ({stats.pendingReviews})
            </TabsTrigger>
            <TabsTrigger value="published" className="flex items-center gap-2">
              Published Articles
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              User Management
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Articles Pending Review</h2>
              <Badge variant="secondary">
                {pendingArticles.length} articles awaiting approval
              </Badge>
            </div>
            <PendingReviewList
              articles={pendingArticles}
              onApprove={handleApprove}
              onReject={handleReject}
              onPreview={handlePreview}
            />
          </TabsContent>
          <TabsContent value="published" className="space-y-6">
            <PublishedArticlesPanel />
          </TabsContent>
          <TabsContent value="users" className="space-y-6">
            <UserManagementPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;