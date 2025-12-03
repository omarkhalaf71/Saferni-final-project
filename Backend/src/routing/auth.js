import express from "express"
import { register, login } from "../controllers/authController.js"
import { upload } from "../middleware/uploadMiddleware.js"
const router = express.Router()

router.post("/register", upload.single("profile_image"), register)
router.post("/login", login)

export default router
