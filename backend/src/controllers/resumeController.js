import Resume from "../models/Resume.js";

const DEFAULT_RESUME = {
  title: "Prashant Jha - Full-Stack Developer Resume",
  pdfUrl: "https://prashant-jha-portfolio.vercel.app/resume.pdf",
  summary: "Full-stack software engineer specializing in scalable MERN web products and cross-platform React Native mobile applications.",
  updatedDate: "September 2026",
  active: true,
};

// @desc Get active resume metadata & PDF link
// @route GET /api/resume
// @access Public
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true }).sort({ updatedAt: -1 });
    if (resume) {
      return res.json(resume);
    } else {
      return res.json(DEFAULT_RESUME);
    }
  } catch (error) {
    console.error("[Get Resume Error]:", error);
    return res.json(DEFAULT_RESUME);
  }
};

// @desc Update active resume metadata & PDF link
// @route PUT /api/resume
// @access Private (Admin)
export const updateResume = async (req, res) => {
  try {
    const { title, pdfUrl, summary, updatedDate, active } = req.body;

    let resume = await Resume.findOne();
    if (resume) {
      resume.title = title || resume.title;
      resume.pdfUrl = pdfUrl || resume.pdfUrl;
      resume.summary = summary || resume.summary;
      resume.updatedDate = updatedDate || resume.updatedDate;
      resume.active = active !== undefined ? active : resume.active;
      await resume.save();
    } else {
      resume = await Resume.create({
        title: title || DEFAULT_RESUME.title,
        pdfUrl: pdfUrl || DEFAULT_RESUME.pdfUrl,
        summary: summary || DEFAULT_RESUME.summary,
        updatedDate: updatedDate || DEFAULT_RESUME.updatedDate,
        active: active !== undefined ? active : true,
      });
    }

    return res.json(resume);
  } catch (error) {
    console.error("[Update Resume Error]:", error);
    return res.status(500).json({ message: error.message || "Server error updating resume info." });
  }
};
