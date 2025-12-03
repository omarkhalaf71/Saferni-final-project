import express from 'express';
import { createOffice, getOffices, updateOffice, deleteOffice } from '../controllers/officeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware(['admin']), upload.single('logo'), createOffice);
router.get('/', getOffices);
router.put('/:id', authMiddleware(['admin']), upload.single('logo'), updateOffice);
router.delete('/:id', authMiddleware(['admin']), deleteOffice);

export default router;
