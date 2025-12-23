export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  pendingReviews: number;
  monthlyViews: number;
}

export interface PendingArticle {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  submittedAt: string;
  wordCount: number;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
}
