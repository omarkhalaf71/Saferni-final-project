import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware(['admin']), getUsers);
router.get('/:id', authMiddleware(['admin','officeEmployee','customer']), getUserById);
router.put('/:id', authMiddleware(['admin','officeEmployee','customer']), upload.single('profile_image'), updateUser);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

export default router;
