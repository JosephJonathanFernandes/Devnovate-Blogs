import Blog from "../models/blogmodel";
import mongoose from "mongoose";

export async function getBlogService(id: string, userId?: string) {
  const blog = await Blog.findById(id).populate("comments_coll.user_id", "name");
  if (!blog) throw new Error("Blog not found");
  if (blog.status !== "approved") {
    if (!userId || blog.user_id.toString() !== userId) {
      throw new Error("Blog not available");
    }
  } else {
    blog.views += 1;
    await blog.save();
  }
  return blog;
}

export async function updateBlogService(id: string, userId: string, data: any) {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  if (blog.user_id.toString() !== userId) throw new Error("Forbidden");
  const { title, content, excerpt, tags, featured_image } = data;
  if (title) blog.title = title;
  if (content) blog.content = content;
  if (excerpt) blog.excerpt = excerpt;
  if (tags) blog.tags = tags;
  if (featured_image !== undefined) blog.featured_image = featured_image;
  if (blog.status === "rejected") blog.status = "pending";
  await blog.save();
  return blog;
}

export async function deleteBlogService(id: string, userId: string) {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  if (blog.user_id.toString() !== userId) throw new Error("Forbidden");
  await blog.deleteOne();
  return true;
}

export async function toggleLikeService(id: string, userId: string) {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");
  if (blog.status !== "approved") throw new Error("Cannot like unpublished blog");
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const hasLiked = blog.likes_coll.includes(userObjectId);
  if (hasLiked) {
    blog.likes_coll.pull(userObjectId);
  } else {
    blog.likes_coll.push(userObjectId);
  }
  await blog.save();
  return blog;
}
