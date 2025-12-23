import { Request } from 'express';
import path from 'path';
import fs from 'fs';
// Service to handle file upload logic
export const uploadFileService = async (req: Request): Promise<{ url: string }> => {
  if (!req.file) {
  return { url: `/uploads/images/${path.basename(filePath)}` };
};
 
import User from '../models/usermodel';
import Blog from '../models/blogmodel';

// Service to get current user profile and stats
export const getCurrentUserService = async (userId: string) => {
  const user = await User.findById(userId).select('-password -verifyOtp -resetOtp');
  if (!user) throw new Error('User not found');

  // Get user statistics
  const totalBlogs = await Blog.countDocuments({ user_id: userId });
  const approvedBlogs = await Blog.countDocuments({ user_id: userId, status: 'approved' });

  // Get total views and likes from user's approved blogs
  const blogStats = await Blog.aggregate([
    { $match: { user_id: userId, status: 'approved' } },
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$views' },
        totalLikes: { $sum: { $size: '$likes_coll' } }
      }
    }
  ]);

  const stats = blogStats[0] || { totalViews: 0, totalLikes: 0 };

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
    website: user.website,
    isAdmin: user.isAdmin,
    isAccountVerified: user.isAccountVerified,
    createdAt: user.createdAt,
    stats: {
      articles: approvedBlogs,
      totalBlogs: totalBlogs,
      totalViews: stats.totalViews,
      totalLikes: stats.totalLikes,
      followers: 0, // TODO: Implement follower system
      following: 0  // TODO: Implement following system
    }
  };
};
import User from '../models/usermodel';
import Blog from '../models/blogmodel';

export async function getCurrentUserService(userId: string) {
  const user = await User.findById(userId).select('-password -verifyOtp -resetOtp');
  if (!user) throw new Error('User not found');
  const totalBlogs = await Blog.countDocuments({ user_id: userId });
  const approvedBlogs = await Blog.countDocuments({ user_id: userId, status: 'approved' });
  const blogStats = await Blog.aggregate([
    { $match: { user_id: user._id, status: 'approved' } },
    {
      $group: {
        _id: null,
        totalViews: { $sum: '$views' },
        totalLikes: { $sum: { $size: '$likes_coll' } }
      }
    }
  ]);
  const stats = blogStats[0] || { totalViews: 0, totalLikes: 0 };
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    location: user.location,
    website: user.website,
    isAdmin: user.isAdmin,
    isAccountVerified: user.isAccountVerified,
    createdAt: user.createdAt,
    stats: {
      articles: approvedBlogs,
      totalBlogs,
      totalViews: stats.totalViews,
      totalLikes: stats.totalLikes,
      followers: 0, // TODO: Implement follower system
      following: 0  // TODO: Implement following system
    }
  };
}
