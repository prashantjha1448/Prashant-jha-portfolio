import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";
import Education from "../models/Education.js";
import WorkExperience from "../models/WorkExperience.js";
import SocialLink from "../models/SocialLink.js";
import TechStackItem from "../models/TechStackItem.js";
import Status from "../models/Status.js";

// @desc Get all portfolio data in a single payload
// @route GET /api/portfolio/all
// @access Public
export const getAllPortfolioData = async (req, res) => {
  try {
    const [
      profile,
      projects,
      certificates,
      education,
      experiences,
      socialLinks,
      techStack,
      status,
    ] = await Promise.all([
      Profile.findOne().sort({ createdAt: -1 }),
      Project.find().sort({ order: 1, createdAt: -1 }),
      Certificate.find().sort({ createdAt: -1 }),
      Education.find().sort({ createdAt: -1 }),
      WorkExperience.find().sort({ createdAt: -1 }),
      SocialLink.find(),
      TechStackItem.find(),
      Status.findOne({ active: true }).sort({ updatedAt: -1 }),
    ]);

    return res.json({
      profile: profile || {},
      projects: projects || [],
      certificates: certificates || [],
      education: education || [],
      experiences: experiences || [],
      socialLinks: socialLinks || [],
      techStack: techStack || [],
      status: status || {},
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Get All Portfolio Data Error]:", error);
    return res.status(500).json({ message: "Server error fetching portfolio data bundle." });
  }
};
