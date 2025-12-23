
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useBlogPreview } from "../hooks/useBlogPreview";
import { AdminPreviewBanner } from "../components/AdminPreviewBanner";
import { ArticleInfoCard } from "../components/ArticleInfoCard";
import { ArticleHeader } from "../components/ArticleHeader";
import { ArticleExcerpt } from "../components/ArticleExcerpt";
import { ArticleContent } from "../components/ArticleContent";
import { AdminActionsFooter } from "../components/AdminActionsFooter";


const BlogPreview = () => {
  const {
    post,
    loading,
    approving,
    rejecting,
    handleApprove,
    handleReject,
    isAdmin,
    navigate,
  } = useBlogPreview();

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminPreviewBanner
        approving={approving}
        rejecting={rejecting}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      {loading ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading article preview...</p>
            </div>
          </div>
        </div>
      ) : !post ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Preview Not Available</h1>
            <p className="text-muted-foreground">
              The article you're trying to preview may have been approved, rejected, or removed.
            </p>
            <button
              className="btn btn-outline mt-4"
              onClick={() => navigate('/admin-dashboard')}
            >
              Go Back to Admin Dashboard
            </button>
          </div>
        </div>
      ) : (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <ArticleInfoCard
            submittedAt={post.submittedAt || ''}
            wordCount={post.wordCount || 0}
            status={post.status}
          />
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video mb-8 rounded-xl overflow-hidden shadow-medium">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <ArticleHeader
            title={post.title}
            tags={post.tags}
            author={post.author}
            submittedAt={post.submittedAt || ''}
            contentLength={post.content?.length || 0}
          />
          <Separator className="mb-8" />
          <ArticleExcerpt excerpt={post.excerpt || ''} />
          <ArticleContent content={post.content} />
          <Separator className="my-8" />
          <AdminActionsFooter
            approving={approving}
            rejecting={rejecting}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </article>
      )}
    </div>
  );
};

export default BlogPreview;
