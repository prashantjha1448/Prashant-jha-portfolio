import Status from "../models/Status.js";

const DEFAULT_STATUS = {
  title: "Building WorkQuora v2 & CHH School Management System",
  subtitle: "Real-time dispatch engine & multi-role ecosystem architecture",
  link: "https://www.workquora.com",
  active: true,
};

// @desc    Get current building status badge info
// @route   GET /api/status
// @access  Public
export const getStatus = async (req, res) => {
  try {
    const status = await Status.findOne({ active: true }).sort({ updatedAt: -1 });
    if (status) {
      return res.json(status);
    } else {
      return res.json(DEFAULT_STATUS);
    }
  } catch (error) {
    console.error("[Get Status Error]:", error);
    return res.json(DEFAULT_STATUS);
  }
};

// @desc    Update current building status (Admin only)
// @route   PUT /api/status
// @access  Private (Admin)
export const updateStatus = async (req, res) => {
  try {
    const { title, subtitle, link, active } = req.body;

    let status = await Status.findOne();
    if (status) {
      status.title = title || status.title;
      status.subtitle = subtitle !== undefined ? subtitle : status.subtitle;
      status.link = link !== undefined ? link : status.link;
      status.active = active !== undefined ? active : status.active;
      await status.save();
    } else {
      status = await Status.create({
        title,
        subtitle,
        link,
        active: active !== undefined ? active : true,
      });
    }

    return res.json(status);
  } catch (error) {
    console.error("[Update Status Error]:", error);
    return res.status(500).json({ message: "Server error updating status widget." });
  }
};
