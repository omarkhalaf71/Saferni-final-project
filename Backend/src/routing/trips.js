import express from 'express';
import { createTrip, getTrips, getTripById, updateTrip, deleteTrip } from '../controllers/tripController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware(['admin','officeEmployee']), createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.put('/:id', authMiddleware(['admin','officeEmployee']), updateTrip);
router.delete('/:id', authMiddleware(['admin','officeEmployee']), deleteTrip);

export default router;
