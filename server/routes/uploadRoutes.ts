// server/routes/uploadRoutes.ts
import express from 'express';
import multer from 'multer';
import { uploadImage, uploadFile } from '../controllers/uploadController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/images/');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({ storage });

router.post('/image', authMiddleware, upload.single('image'), uploadImage);
router.post('/file', authMiddleware, upload.single('file'), uploadFile);

export default router;