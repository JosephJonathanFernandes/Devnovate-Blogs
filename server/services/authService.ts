import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not configured');
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export async function registerUserService({ name, email, password }: { name: string; email: string; password: string }) {
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const verifyOtp = generateOTP();
  const verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAccountVerified: true, // or false if you want to require verification
    verifyOtp,
    verifyOtpExpireAt,
  });
  return user;
}

export async function loginUserService({ email, password }: { email: string; password: string }) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  if (!user.isAccountVerified) {
    throw new Error('Account not verified');
  }
  const token = generateToken(user._id.toString());
  return { user, token };
}
