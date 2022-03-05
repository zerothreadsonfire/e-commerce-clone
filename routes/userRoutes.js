import express from "express";
import { authUser, getUserProfile, registerUser, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.post("/", registerUser).post("/login", authUser);
router.put("/profile", protect, updateUserProfile);

export default router;

