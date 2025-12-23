import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/authService';

// // Generate random OTP
// const generateOTP = (): string => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // NOTE: Simplified error handling per request: just console.log errors in each catch block.

// // Generate JWT token with safety checks
// const generateToken = (userId: string): string => {
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//         throw new Error('JWT_SECRET is not configured');
//     }
//     try {
//         return jwt.sign({ userId }, secret, { expiresIn: '7d' });
//     } catch (err) {
//         throw new Error('Failed to sign JWT token');
//     }
// };

export const register = async (req: Request, res: Response) => {
	try {
		const user = await registerUserService(req.body);
		// Generate JWT token
		const token = user._id ? require('../services/authService').generateToken(user._id.toString()) : null;
		// Set cookie
		if (token) {
			res.cookie('token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
				maxAge: 7 * 24 * 60 * 60 * 1000
			});
		}
		// TODO: Send verification email with OTP
		res.status(201).json({
			success: true,
			message: 'User registered successfully. Please verify your email.',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				isAccountVerified: user.isAccountVerified,
				isAdmin: user.isAdmin
			}
		});
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Registration failed' });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { user, token } = await loginUserService(req.body);
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		res.status(200).json({
			success: true,
			message: 'Login successful',
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
				isAccountVerified: user.isAccountVerified,
				isAdmin: user.isAdmin
			}
		});
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Login failed' });
	}
};

// // Logout user
// export const logout = async (req: Request, res: Response) => {
//     try {
//         // Clear the token cookie
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
//         });

//         res.status(200).json({
//             success: true,
//             message: 'Logout successful'
//         });

//     } catch (error) {
//         console.error('logout error:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

// // Verify account with OTP
// export const verifyAccount = async (req: Request, res: Response) => {
//     try {
//         const { email, otp } = req.body;

//         // Validation
//         if (!email || !otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Email and OTP are required'
//             });
//         }

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }

//         // Check if account is already verified
//         if (user.isAccountVerified) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Account is already verified'
//             });
//         }

//         // Check OTP and expiry
//         if (user.verifyOtp !== otp) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid OTP'
//             });
//         }

//         if (user.verifyOtpExpireAt < Date.now()) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'OTP has expired'
//             });
//         }

//         // Verify account
//         user.isAccountVerified = true;
//         user.verifyOtp = null;
//         user.verifyOtpExpireAt = 0;
//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: 'Account verified successfully'
//         });

//     } catch (error) {
//         console.error('verifyAccount error:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

import { sendPasswordResetOTPService, resetPasswordService, getProfileService } from '../services/authService2';

export const sendPasswordResetOTP = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
		await sendPasswordResetOTPService(email);
		res.status(200).json({ success: true, message: 'Password reset OTP sent to your email' });
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Failed to send password reset OTP' });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { email, otp, newPassword } = req.body;
		if (!email || !otp || !newPassword) {
			return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
		}
		await resetPasswordService(email, otp, newPassword);
		res.status(200).json({ success: true, message: 'Password reset successfully' });
	} catch (error: any) {
		return res.status(400).json({ success: false, message: error.message || 'Failed to reset password' });
	}
};

export const getProfile = async (req: Request, res: Response) => {
	try {
		const userId = (req as any).userId;
		const user = await getProfileService(userId);
		res.status(200).json({ success: true, user });
	} catch (error: any) {
		return res.status(404).json({ success: false, message: error.message || 'User not found' });
	}
};

