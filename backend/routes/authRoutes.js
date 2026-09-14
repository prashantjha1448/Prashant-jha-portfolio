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
    const { name, email, password, avatar, city, location } = req.body;

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
      city: city || "India",
      location: location || null,
      authProvider: "email",
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        city: user.city,
        authProvider: user.authProvider,
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

const TEST_EMAIL = "playstore-reviewer@prashantjha.com";
const TEST_PASSWORD = "PlayStoreTest2026!";

// @route   POST /api/auth/login
// @desc    Authenticate visitor user & get token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Google Play Console Reviewer Hardcoded / Guaranteed Bypass
    if (normalizedEmail === TEST_EMAIL && password === TEST_PASSWORD) {
      let testUser = await User.findOne({ email: TEST_EMAIL });
      if (!testUser) {
        testUser = await User.create({
          name: "Google Play Reviewer",
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          avatar: "",
          city: "Mountain View, CA",
          authProvider: "email",
          kycStatus: "verified",
        });
      }
      return res.json({
        _id: testUser._id,
        name: testUser.name,
        email: testUser.email,
        avatar: testUser.avatar || "",
        city: testUser.city,
        authProvider: testUser.authProvider,
        role: testUser.role,
        kycStatus: testUser.kycStatus,
        token: generateToken(testUser._id),
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        city: user.city,
        authProvider: user.authProvider,
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

// @route   POST /api/auth/google
// @desc    Authenticate / register user via Google OAuth
// @access  Public
router.post("/google", async (req, res) => {
  try {
    const { name, email, avatar, city, location } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Invalid Google user payload." });
    }

    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        password: Math.random().toString(36).slice(-10) + "Aa1!", // Random secure hash
        avatar: avatar || "",
        city: city || "India",
        location: location || null,
        authProvider: "google",
        kycStatus: "verified", // Auto-verify Google OAuth users
      });
    } else {
      user.authProvider = "google";
      user.kycStatus = "verified";
      if (city && user.city === "India") user.city = city;
      await user.save();
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      city: user.city,
      authProvider: user.authProvider,
      role: user.role,
      kycStatus: user.kycStatus,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("[Google Auth Error]:", error);
    return res.status(500).json({ message: "Server error during Google authentication." });
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
