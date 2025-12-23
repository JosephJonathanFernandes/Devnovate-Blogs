export interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string; // 'pending' | 'approved' | 'rejected' | 'Draft' | etc.
  createdAt?: string;
  updatedAt?: string;
  lastModified?: string;
  author: {
    id?: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  excerpt?: string;
  readTime?: number;
  likes?: number;
  views?: number;
  comments?: number;
  coverImage?: string;
  submittedAt?: string;
  wordCount?: number;
}

export interface UserProfile {
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
