import express from 'express';
import { createBus, getBuses, updateBus, deleteBus } from '../controllers/busController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware(['admin','officeEmployee']), createBus);
router.get('/', getBuses);
router.put('/:id', authMiddleware(['admin','officeEmployee']), updateBus);
router.delete('/:id', authMiddleware(['admin','officeEmployee']), deleteBus);

export default router;
