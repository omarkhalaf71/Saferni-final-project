import express from "express"
import {
  createBooking,
  getBookings,
  cancelBooking,
} from "../controllers/bookingController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { upload } from "../middleware/uploadMiddleware.js"
const router = express.Router()

router.post(
  "/",
  authMiddleware(["customer"]),
  upload.single("proof_image"),
  createBooking
)
router.get(
  "/",
  authMiddleware(["admin", "officeEmployee", "customer"]),
  getBookings
)
router.put(
  "/cancel/:id",
  authMiddleware(["admin", "officeEmployee", "customer"]),
  cancelBooking
)

export default router
