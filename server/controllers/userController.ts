import { Request, Response } from 'express';
import { getCurrentUserService } from '../services/userService';

export const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
		const user = await getCurrentUserService(userId);
		return res.status(200).json({ success: true, user });
	} catch (error: any) {
		return res.status(404).json({ success: false, message: error.message || 'User not found' });
	}
};

// // PUT /api/users/me - update current user profile
// export const updateUserProfile = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     }

//     const { name, bio, location, website } = req.body;

//     // Validate input
//     if (bio && bio.length > 500) {
//       return res.status(400).json({ success: false, message: 'Bio must be 500 characters or less' });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Update fields
//     if (name !== undefined) user.name = name.trim();
//     if (bio !== undefined) user.bio = bio.trim();
//     if (location !== undefined) user.location = location.trim();
//     if (website !== undefined) user.website = website.trim();

//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Profile updated successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         bio: user.bio,
//         location: user.location,
//         website: user.website,
//         isAdmin: user.isAdmin,
//         isAccountVerified: user.isAccountVerified,
//         createdAt: user.createdAt
//       }
//     });
//   } catch (error) {
//     console.error('updateUserProfile error:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
