import express from "express"
import { authUser, registerUser, updateUserProfile } from "../controllers/userController"
import { protect } from "../middleware/authMiddleware"
const router = express.Router()

router.route("/").post(registerUser)
router.post("/login", authUser)
router.route("/profile").post(protect, updateUserProfile)

export default router