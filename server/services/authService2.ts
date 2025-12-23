import User from '../models/usermodel';
import bcrypt from 'bcryptjs';
import { generateOTP } from './authService';

export async function sendPasswordResetOTPService(email: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found with this email');
  const resetOtp = generateOTP();
  const resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
  user.resetOtp = resetOtp;
  user.resetOtpExpireAt = resetOtpExpireAt;
  await user.save();
  // TODO: Send password reset email with OTP
  return resetOtp;
}

export async function resetPasswordService(email: string, otp: string, newPassword: string) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  if (user.resetOtp !== otp) throw new Error('Invalid OTP');
  if (user.resetOtpExpireAt < Date.now()) throw new Error('OTP has expired');
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.resetOtp = '';
  user.resetOtpExpireAt = 0;
  await user.save();
  return true;
}

export async function getProfileService(userId: string) {
  const user = await User.findById(userId).select('-password -verifyOtp -resetOtp');
  if (!user) throw new Error('User not found');
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isAccountVerified: user.isAccountVerified,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };
}
