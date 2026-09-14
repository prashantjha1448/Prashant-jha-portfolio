import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "portfolio_jwt_secret_key_123", {
    expiresIn: "30d",
  });
};

const TEST_EMAIL = "playstore-reviewer@prashantjha.com";
const TEST_PASSWORD = "PlayStoreTest2026!";

// @desc    Register a new visitor user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
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
};

// @desc    Authenticate visitor user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
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
};

// @desc    Authenticate / register user via Google OAuth
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  try {
    const { token, idToken, credential, name, email, avatar, city, location } = req.body;

    let targetEmail = email;
    let targetName = name;
    let targetAvatar = avatar;

    // Verify Google ID Token if provided from Google OAuth Client
    const rawGoogleToken = idToken || token || credential;
    if (rawGoogleToken && process.env.GOOGLE_CLIENT_ID) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: rawGoogleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload && payload.email) {
          targetEmail = payload.email;
          targetName = payload.name || targetName;
          targetAvatar = payload.picture || targetAvatar;
        }
      } catch (tokenErr) {
        console.warn("[Google Token Verify Warning]:", tokenErr.message);
      }
    }

    if (!targetEmail) {
      return res.status(400).json({ message: "Invalid Google user payload. Email address is required." });
    }

    const normalizedEmail = targetEmail.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        name: targetName || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password: Math.random().toString(36).slice(-10) + "Aa1!#",
        avatar: targetAvatar || "",
        city: city || "India",
        location: location || null,
        authProvider: "google",
        kycStatus: "verified",
      });
    } else {
      user.authProvider = "google";
      user.kycStatus = "verified";
      if (city && user.city === "India") user.city = city;
      if (targetAvatar) user.avatar = targetAvatar;
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
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req, res) => {
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
};
