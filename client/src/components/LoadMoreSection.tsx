import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function LoadMoreSection() {
  return (
    <div className="text-center mt-16">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
        <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Want to see more articles?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Discover thousands of articles from our growing community of developers and tech enthusiasts.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-white hover:bg-gray-50 border-2 border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800 px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Load More Articles</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
