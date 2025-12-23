import { Request } from 'express';
import path from 'path';
import fs from 'fs';

// Service to handle file upload logic
export const uploadFileService = async (req: Request): Promise<{ url: string }> => {
  if (!req.file) {
    throw new Error('No file uploaded');
  }
  // Assuming multer is used and file is available at req.file
  // You may want to add more validation here (file type, size, etc.)
  const filePath = req.file.path;
  // Optionally, move/rename file, generate URL, etc.
  // For now, just return the relative path as URL
  return { url: `/uploads/images/${path.basename(filePath)}` };
};
