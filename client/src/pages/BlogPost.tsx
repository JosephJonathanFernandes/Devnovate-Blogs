import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";

import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useBlogPost } from "../hooks/useBlogPost";
import { BlogArticleHeader } from "../components/BlogArticleHeader";
import { BlogArticleContent } from "../components/BlogArticleContent";
import { BlogArticleActions } from "../components/BlogArticleActions";
import { BlogAuthorCard } from "../components/BlogAuthorCard";
import { BlogCommentsSection } from "../components/BlogCommentsSection";
import { BlogCommentInput } from "../components/BlogCommentInput";
  const [searchParams] = useSearchParams();

const BlogPost = () => {
  const {
    post,
    loading,
    isLiked,
    setIsLiked,
    isBookmarked,
    setIsBookmarked,
    likesCount,
    comments,
    newComment,
    setNewComment,
    submittingComment,
    isPreviewMode,
    isLoggedIn,
    toast,
  } = useBlogPost();

  // Handlers for actions
  const handleLike = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to like posts.",
        variant: "destructive",
      });
      return;
    }
    setIsLiked((prev: boolean) => !prev);
  };

  const handleBookmark = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to bookmark posts.",
        variant: "destructive",
      });
      return;
    }
    setIsBookmarked((prev: boolean) => !prev);
  };

  const handleShare = () => {
    // Implement share logic (e.g., copy link)
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  const handleSubmitComment = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please log in to comment.",
        variant: "destructive",
      });
      return;
    }
    // Add comment logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {isPreviewMode && (
        <div className="bg-orange-100 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-2 text-orange-800 dark:text-orange-200">
              <span className="font-medium">Preview Mode</span>
              <span className="text-sm">This article is pending approval and not yet published</span>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading article...</p>
            </div>
          </div>
        </div>
      ) : !post ? (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {isPreviewMode ? "Article Preview Not Available" : "Article Not Found"}
            </h1>
            <p className="text-muted-foreground">
              {isPreviewMode
                ? "The article you're trying to preview may have been approved, rejected, or removed from the pending list."
                : "The article you're looking for doesn't exist."
              }
            </p>
            {isPreviewMode && (
              <button
                className="btn btn-outline mt-4"
                onClick={() => window.history.back()}
              >
                Go Back to Admin Dashboard
              </button>
            )}
          </div>
        </div>
      ) : (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {post.coverImage && (
            <div className="aspect-video mb-8 rounded-xl overflow-hidden shadow-medium">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <BlogArticleHeader
            title={post.title}
            author={post.author}
            publishedAt={post.publishedAt || ''}
            readTime={post.readTime || ''}
            tags={post.tags}
            views={post.views}
          />
          <Separator className="mb-8" />
          <BlogArticleContent content={post.content} />
          <Separator className="my-8" />
          {!isPreviewMode && (
            <>
              <BlogArticleActions
                isLiked={isLiked}
                isBookmarked={isBookmarked}
                likesCount={likesCount}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
              <BlogAuthorCard author={post.author} />
              <Separator className="my-8" />
              <BlogCommentInput
                newComment={newComment}
                setNewComment={setNewComment}
                submitting={submittingComment}
                onSubmit={handleSubmitComment}
                isLoggedIn={isLoggedIn}
              />
              <BlogCommentsSection comments={comments} />
            </>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogPost;