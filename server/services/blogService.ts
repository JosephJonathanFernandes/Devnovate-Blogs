import Blog from "../models/blogmodel";
import User from "../models/usermodel";

export async function createBlogService({ title, content, excerpt, tags, featured_image, userId }: any) {
  if (!title || !content || !excerpt) {
    throw new Error("Title, content, and excerpt are required");
  }
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const blog = await Blog.create({
    title,
    content,
    excerpt,
    user_id: userId,
    author_name: user.name,
    tags: tags || [],
    featured_image: featured_image || undefined,
  });
  return blog;
}

export async function listApprovedBlogsService() {
  const blogs = await Blog.find({ status: "approved" })
    .populate("user_id", "name")
    .sort({ published_at: -1 });
  return blogs.map((blog: any) => ({
    id: blog._id,
    title: blog.title,
    excerpt: blog.excerpt,
    author_name: blog.author_name,
    tags: blog.tags,
    featured_image: blog.featured_image,
    views: blog.views,
    likes: blog.likes_coll.length,
    comments_count: blog.comments_coll.length,
    published_at: blog.published_at.toISOString().split("T")[0],
  }));
}

export async function listPendingBlogsService(userId: string) {
  const user = await User.findById(userId);
  if (!user || !user.isAdmin) throw new Error("Admin access required");
  const blogs = await Blog.find({ status: "pending" })
    .populate("user_id", "name")
    .sort({ created_at: -1 });
  return blogs.map((blog: any) => ({
    id: blog._id,
    title: blog.title,
    excerpt: blog.excerpt,
    author: {
      name: blog.author_name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`,
    },
    submittedAt: new Date(blog.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    tags: blog.tags || [],
    wordCount: blog.content ? blog.content.split(" ").length : 0,
  }));
}

export async function getUserBlogsService(userId: string) {
  const blogs = await Blog.find({ user_id: userId }).sort({ created_at: -1 });
  return blogs.map((blog: any) => ({
    id: blog._id,
    title: blog.title,
    excerpt: blog.excerpt,
    author: blog.author_name,
    status: blog.status,
    created_at: blog.created_at,
    published_at: blog.published_at,
    tags: blog.tags,
    featured_image: blog.featured_image,
  }));
}
