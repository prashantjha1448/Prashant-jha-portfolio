import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "portfolio_jwt_secret_key_123", {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/register
// @desc    Register a new visitor user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all required fields (name, email, password)." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "An account with this email address already exists." });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      avatar: avatar || "",
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        kycStatus: user.kycStatus,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data provided." });
    }
  } catch (error) {
    console.error("[Register Error]:", error);
    return res.status(500).json({ message: error.message || "Server error during registration." });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate visitor user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        kycStatus: user.kycStatus,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email address or password." });
    }
  } catch (error) {
    console.error("[Login Error]:", error);
    return res.status(500).json({ message: error.message || "Server error during login." });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error fetching user profile." });
  }
});

export default router;
