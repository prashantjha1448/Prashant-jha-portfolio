import Experience from "../models/Experience.js";

// @desc Get all experiences
// @route GET /api/experience
// @access Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    return res.json(experiences);
  } catch (error) {
    console.error("[Get Experiences Error]:", error);
    return res.status(500).json({ message: "Server error fetching experiences." });
  }
};

// @desc Create experience entry
// @route POST /api/experience
// @access Private (Admin)
export const createExperience = async (req, res) => {
  try {
    const { company, role, period, location, description, highlights, order } = req.body;

    if (!company || !role || !period) {
      return res.status(400).json({ message: "Company, role, and period are required." });
    }

    const exp = await Experience.create({
      company,
      role,
      period,
      location: location || "India",
      description: description || "",
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split("\n").map(h => h.trim()).filter(Boolean) : []),
      order: order !== undefined ? Number(order) : 0,
    });

    return res.status(201).json(exp);
  } catch (error) {
    console.error("[Create Experience Error]:", error);
    return res.status(500).json({ message: error.message || "Server error creating experience." });
  }
};

// @desc Update experience entry
// @route PUT /api/experience/:id
// @access Private (Admin)
export const updateExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experience entry not found." });
    }

    const { company, role, period, location, description, highlights, order } = req.body;

    if (company) exp.company = company;
    if (role) exp.role = role;
    if (period) exp.period = period;
    if (location !== undefined) exp.location = location;
    if (description !== undefined) exp.description = description;
    if (highlights !== undefined) {
      exp.highlights = Array.isArray(highlights) ? highlights : highlights.split("\n").map(h => h.trim()).filter(Boolean);
    }
    if (order !== undefined) exp.order = Number(order);

    await exp.save();
    return res.json(exp);
  } catch (error) {
    console.error("[Update Experience Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating experience." });
  }
};

// @desc Delete experience entry
// @route DELETE /api/experience/:id
// @access Private (Admin)
export const deleteExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) {
      return res.status(404).json({ message: "Experience entry not found." });
    }

    await exp.deleteOne();
    return res.json({ message: "Experience entry removed successfully." });
  } catch (error) {
    console.error("[Delete Experience Error]:", error);
    return res.status(500).json({ message: "Server error deleting experience." });
  }
};
