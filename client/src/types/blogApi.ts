export interface BlogFromAPI {
  id: string;
  title: string;
  excerpt: string;
  author_name: string;
  published_at: string;
  tags?: string[];
  likes?: number;
  comments_count?: number;
  views?: number;
  featured_image?: string;
}
