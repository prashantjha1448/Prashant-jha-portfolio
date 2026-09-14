import Blog from "../models/Blog.js";

// @desc Get all blogs
// @route GET /api/blogs
// @access Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (error) {
    console.error("[Get Blogs Error]:", error);
    return res.status(500).json({ message: "Server error fetching blogs." });
  }
};

// @desc Get blog by slug
// @route GET /api/blogs/:slug
// @access Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog article not found." });
    }
    return res.json(blog);
  } catch (error) {
    console.error("[Get Blog By Slug Error]:", error);
    return res.status(500).json({ message: "Server error fetching blog details." });
  }
};

// @desc Create a blog post
// @route POST /api/blogs
// @access Private (Admin)
export const createBlog = async (req, res) => {
  try {
    const { title, slug, summary, content, coverImage, tags, readTime, published } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Title, summary, and content are required." });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const blog = await Blog.create({
      title,
      slug: generatedSlug,
      summary,
      content,
      coverImage: coverImage || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim()) : []),
      readTime: readTime || "5 min read",
      published: published !== undefined ? published : true,
    });

    return res.status(201).json(blog);
  } catch (error) {
    console.error("[Create Blog Error]:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "A blog with this slug already exists." });
    }
    return res.status(500).json({ message: error.message || "Server error creating blog post." });
  }
};

// @desc Update a blog post
// @route PUT /api/blogs/:id
// @access Private (Admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    const { title, slug, summary, content, coverImage, tags, readTime, published } = req.body;

    if (title) blog.title = title;
    if (slug) blog.slug = slug;
    if (summary) blog.summary = summary;
    if (content) blog.content = content;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim());
    }
    if (readTime) blog.readTime = readTime;
    if (published !== undefined) blog.published = published;

    await blog.save();
    return res.json(blog);
  } catch (error) {
    console.error("[Update Blog Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating blog post." });
  }
};

// @desc Delete a blog post
// @route DELETE /api/blogs/:id
// @access Private (Admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    await blog.deleteOne();
    return res.json({ message: "Blog post removed successfully." });
  } catch (error) {
    console.error("[Delete Blog Error]:", error);
    return res.status(500).json({ message: "Server error deleting blog post." });
  }
};
