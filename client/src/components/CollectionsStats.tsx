import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, TrendingUp, Clock } from 'lucide-react';

interface CollectionsStatsProps {
  stats: {
    totalCollections: number;
    publicCollections: number;
    totalArticles: number;
    totalFollowers: number;
    totalReadingTime: number;
  };
}

export function CollectionsStats({ stats }: CollectionsStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Collections</p>
              <p className="text-xl font-bold">{stats.totalCollections}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Public</p>
              <p className="text-xl font-bold">{stats.publicCollections}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Articles</p>
              <p className="text-xl font-bold">{stats.totalArticles}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Followers</p>
              <p className="text-xl font-bold">{stats.totalFollowers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Reading Time</p>
              <p className="text-xl font-bold">{Math.floor(stats.totalReadingTime / 60)}h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
