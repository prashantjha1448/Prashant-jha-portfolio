import Profile from "../models/Profile.js";

// @desc Get main profile
// @route GET /api/profile
// @access Public
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    return res.json(profile || {});
  } catch (error) {
    console.error("[Get Profile Error]:", error);
    return res.status(500).json({ message: "Server error fetching profile." });
  }
};
