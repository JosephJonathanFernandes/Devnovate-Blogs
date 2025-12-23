import { Card } from "../components/ui/card";
import { Users, FileText, Clock, TrendingUp } from "lucide-react";
import { AdminStats } from "../types/admin";

interface StatsOverviewProps {
  stats: AdminStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </div>
          <Users className="h-8 w-8 text-primary" />
        </div>
      </Card>
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{stats.totalArticles.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Articles</div>
          </div>
          <FileText className="h-8 w-8 text-primary" />
        </div>
      </Card>
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-orange-500">{stats.pendingReviews}</div>
            <div className="text-sm text-muted-foreground">Pending Reviews</div>
          </div>
          <Clock className="h-8 w-8 text-orange-500" />
        </div>
      </Card>
      <Card className="p-6 bg-gradient-card shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{stats.monthlyViews.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Monthly Views</div>
          </div>
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
      </Card>
    </div>
  );
}
