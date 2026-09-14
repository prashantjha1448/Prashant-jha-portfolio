import Education from "../models/Education.js";

// @desc Get all education entries
// @route GET /api/education
// @access Public
export const getEducation = async (req, res) => {
  try {
    const educationList = await Education.find().sort({ order: 1, createdAt: -1 });
    return res.json(educationList);
  } catch (error) {
    console.error("[Get Education Error]:", error);
    return res.status(500).json({ message: "Server error fetching education background." });
  }
};

// @desc Create education entry
// @route POST /api/education
// @access Private (Admin)
export const createEducation = async (req, res) => {
  try {
    const { institution, degree, field, period, grade, description, order } = req.body;

    if (!institution || !degree || !period) {
      return res.status(400).json({ message: "Institution, degree, and period are required." });
    }

    const edu = await Education.create({
      institution,
      degree,
      field: field || "Computer Science & Engineering",
      period,
      grade: grade || "",
      description: description || "",
      order: order !== undefined ? Number(order) : 0,
    });

    return res.status(201).json(edu);
  } catch (error) {
    console.error("[Create Education Error]:", error);
    return res.status(500).json({ message: error.message || "Server error creating education." });
  }
};

// @desc Update education entry
// @route PUT /api/education/:id
// @access Private (Admin)
export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) {
      return res.status(404).json({ message: "Education entry not found." });
    }

    const { institution, degree, field, period, grade, description, order } = req.body;

    if (institution) edu.institution = institution;
    if (degree) edu.degree = degree;
    if (field !== undefined) edu.field = field;
    if (period) edu.period = period;
    if (grade !== undefined) edu.grade = grade;
    if (description !== undefined) edu.description = description;
    if (order !== undefined) edu.order = Number(order);

    await edu.save();
    return res.json(edu);
  } catch (error) {
    console.error("[Update Education Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating education." });
  }
};

// @desc Delete education entry
// @route DELETE /api/education/:id
// @access Private (Admin)
export const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) {
      return res.status(404).json({ message: "Education entry not found." });
    }

    await edu.deleteOne();
    return res.json({ message: "Education entry removed successfully." });
  } catch (error) {
    console.error("[Delete Education Error]:", error);
    return res.status(500).json({ message: "Server error deleting education." });
  }
};
