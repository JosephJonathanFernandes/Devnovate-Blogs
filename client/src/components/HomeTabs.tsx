import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Clock, Star } from "lucide-react";
import BlogCard from "@/components/BlogCard";

interface HomeTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  allBlogs: any[];
  loading: boolean;
}

export function HomeTabs({ activeTab, setActiveTab, allBlogs, loading }: HomeTabsProps) {
  if (loading) {
    return <div className="text-center py-16 text-muted-foreground">Loading articles...</div>;
  }
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Discover Amazing Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore the latest insights, tutorials, and stories from our community of developers
          </p>
        </div>
        <TabsList className="bg-white shadow-lg border border-gray-200 p-1 rounded-xl">
          <TabsTrigger 
            value="latest" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
          >
            <Clock className="h-4 w-4" />
            Latest
          </TabsTrigger>
          <TabsTrigger 
            value="trending" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger 
            value="featured" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
          >
            <Star className="h-4 w-4" />
            Featured
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="latest" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="trending" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.slice().sort((a, b) => b.likes - a.likes).map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="featured" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBlogs.filter(blog => blog.likes > 200).map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
