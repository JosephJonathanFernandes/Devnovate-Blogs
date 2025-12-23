
import Header from "@/components/Header";
import { TrendingSearchBar } from "@/components/TrendingSearchBar";
import { TrendingList } from "@/components/TrendingList";
import { useTrendingPage } from "@/hooks/useTrendingPage";
import { TrendingUp } from "lucide-react";


const TrendingPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    blogs,
    loading,
    navigate,
  } = useTrendingPage();

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Trending Blogs</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular and engaging content from our community
          </p>
        </div>
        <div className="max-w-md mx-auto mb-10">
          <TrendingSearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="space-y-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trending blogs...</p>
              </div>
            </div>
          ) : (
            <TrendingList blogs={blogs} onBlogClick={handleBlogClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
