import { Request, Response } from 'express';
import {
	createBlogService,
	listApprovedBlogsService,
	listPendingBlogsService,
	getUserBlogsService,
} from '../services/blogService';
import {
	getBlogService,
	updateBlogService,
	deleteBlogService,
	toggleLikeService,
} from '../services/blogService2';
import {
	addCommentService,
	approveBlogService,
	rejectBlogService,
} from '../services/blogService3';

export const createBlog = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blog = await createBlogService({ ...req.body, userId });
		return res.status(201).json({ success: true, blog });
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Failed to create blog' });
	}
};

export const listApprovedBlogs = async (_req: Request, res: Response) => {
	try {
		const blogs = await listApprovedBlogsService();
		return res.status(200).json({ success: true, blogs });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message || 'Failed to list blogs' });
	}
};

export const listPendingBlogs = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blogs = await listPendingBlogsService(userId);
		return res.status(200).json({ success: true, blogs });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to list pending blogs' });
	}
};

export const getUserBlogs = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blogs = await getUserBlogsService(userId);
		return res.status(200).json({ success: true, blogs });
	} catch (error: any) {
		return res.status(500).json({ success: false, message: error.message || 'Failed to get user blogs' });
	}
};

export const getBlog = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		const blog = await getBlogService(id, userId);
		return res.status(200).json({ success: true, blog });
	} catch (error: any) {
		return res.status(404).json({ success: false, message: error.message || 'Blog not found' });
	}
};

export const updateBlog = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blog = await updateBlogService(id, userId, req.body);
		return res.status(200).json({ success: true, blog });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to update blog' });
	}
};

export const deleteBlog = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		await deleteBlogService(id, userId);
		return res.status(200).json({ success: true, message: 'Blog deleted' });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to delete blog' });
	}
};

export const toggleLike = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blog = await toggleLikeService(id, userId);
		return res.status(200).json({ success: true, likesCount: blog.likes_coll.length });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to toggle like' });
	}
};

export const addComment = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { text } = req.body;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const comment = await addCommentService(id, userId, text);
		return res.status(201).json({ success: true, comment });
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Failed to add comment' });
	}
};

export const approveBlog = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blog = await approveBlogService(id, userId);
		return res.status(200).json({ success: true, blog });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to approve blog' });
	}
};

export const rejectBlog = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const blog = await rejectBlogService(id, userId);
		return res.status(200).json({ success: true, blog });
	} catch (error: any) {
		return res.status(403).json({ success: false, message: error.message || 'Failed to reject blog' });
	}
};
