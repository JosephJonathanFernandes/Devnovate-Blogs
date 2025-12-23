import Blog from "../models/blogmodel";
import User from "../models/usermodel";
import mongoose from "mongoose";

export async function addCommentService(id: string, userId: string, text: string) {
  if (!text || text.trim().length === 0) throw new Error("Comment text is required");
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  if (blog.status !== "approved") throw new Error("Cannot comment on unpublished blog");
  const comment = {
    user_id: new mongoose.Types.ObjectId(userId),
    text: text.trim(),
    created_at: new Date(),
  };
  blog.comments_coll.push(comment);
  await blog.save();
  await blog.populate("comments_coll.user_id", "name");
  const newComment = blog.comments_coll[blog.comments_coll.length - 1];
  return newComment;
}

export async function approveBlogService(id: string, userId: string) {
  const user = await User.findById(userId);
  if (!user || !user.isAdmin) throw new Error("Admin access required");
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  blog.status = "approved";
  blog.published_at = new Date();
  await blog.save();
  return blog;
}

export async function rejectBlogService(id: string, userId: string) {
  const user = await User.findById(userId);
  if (!user || !user.isAdmin) throw new Error("Admin access required");
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  blog.status = "rejected";
  await blog.save();
  return blog;
}
