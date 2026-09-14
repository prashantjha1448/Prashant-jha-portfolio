import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   POST /api/auth/google
router.post("/google", googleAuth);

// @route   GET /api/auth/me
router.get("/me", protect, getUserProfile);

export default router;
