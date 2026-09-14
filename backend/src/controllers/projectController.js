import Project from "../models/Project.js";

// @desc Get all projects
// @route GET /api/projects
// @access Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return res.json(projects);
  } catch (error) {
    console.error("[Get Projects Error]:", error);
    return res.status(500).json({ message: "Server error fetching projects." });
  }
};

// @desc Get project by slug
// @route GET /api/projects/:slug
// @access Public
export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res.json(project);
  } catch (error) {
    console.error("[Get Project By Slug Error]:", error);
    return res.status(500).json({ message: "Server error fetching project details." });
  }
};

// @desc Create a project
// @route POST /api/projects
// @access Private (Admin)
export const createProject = async (req, res) => {
  try {
    const { title, slug, tagline, description, category, image, liveUrl, githubUrl, techStack, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const project = await Project.create({
      title,
      slug: generatedSlug,
      tagline: tagline || "",
      description,
      category: category || "Full-Stack",
      image: image || "",
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(",").map(s => s.trim()) : []),
      featured: featured || false,
      order: order !== undefined ? Number(order) : 0,
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error("[Create Project Error]:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "A project with this slug already exists." });
    }
    return res.status(500).json({ message: error.message || "Server error creating project." });
  }
};

// @desc Update a project
// @route PUT /api/projects/:id
// @access Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    const { title, slug, tagline, description, category, image, liveUrl, githubUrl, techStack, featured, order } = req.body;

    if (title) project.title = title;
    if (slug) project.slug = slug;
    if (tagline !== undefined) project.tagline = tagline;
    if (description) project.description = description;
    if (category) project.category = category;
    if (image !== undefined) project.image = image;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (techStack !== undefined) {
      project.techStack = Array.isArray(techStack) ? techStack : techStack.split(",").map(s => s.trim());
    }
    if (featured !== undefined) project.featured = featured;
    if (order !== undefined) project.order = Number(order);

    await project.save();
    return res.json(project);
  } catch (error) {
    console.error("[Update Project Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating project." });
  }
};

// @desc Delete a project
// @route DELETE /api/projects/:id
// @access Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    await project.deleteOne();
    return res.json({ message: "Project removed successfully." });
  } catch (error) {
    console.error("[Delete Project Error]:", error);
    return res.status(500).json({ message: "Server error deleting project." });
  }
};
