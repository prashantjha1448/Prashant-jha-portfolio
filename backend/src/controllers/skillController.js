import Skill from "../models/Skill.js";

// @desc Get all skills
// @route GET /api/skills
// @access Public
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, createdAt: -1 });
    return res.json(skills);
  } catch (error) {
    console.error("[Get Skills Error]:", error);
    return res.status(500).json({ message: "Server error fetching skills." });
  }
};

// @desc Create a new skill
// @route POST /api/skills
// @access Private (Admin)
export const createSkill = async (req, res) => {
  try {
    const { name, category, proficiency, icon, order } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Skill name is required." });
    }

    const skill = await Skill.create({
      name,
      category: category || "Frontend",
      proficiency: proficiency !== undefined ? Number(proficiency) : 90,
      icon: icon || "",
      order: order !== undefined ? Number(order) : 0,
    });

    return res.status(201).json(skill);
  } catch (error) {
    console.error("[Create Skill Error]:", error);
    return res.status(500).json({ message: error.message || "Server error creating skill." });
  }
};

// @desc Update a skill
// @route PUT /api/skills/:id
// @access Private (Admin)
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    const { name, category, proficiency, icon, order } = req.body;

    if (name) skill.name = name;
    if (category) skill.category = category;
    if (proficiency !== undefined) skill.proficiency = Number(proficiency);
    if (icon !== undefined) skill.icon = icon;
    if (order !== undefined) skill.order = Number(order);

    await skill.save();
    return res.json(skill);
  } catch (error) {
    console.error("[Update Skill Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating skill." });
  }
};

// @desc Delete a skill
// @route DELETE /api/skills/:id
// @access Private (Admin)
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    await skill.deleteOne();
    return res.json({ message: "Skill removed successfully." });
  } catch (error) {
    console.error("[Delete Skill Error]:", error);
    return res.status(500).json({ message: "Server error deleting skill." });
  }
};
