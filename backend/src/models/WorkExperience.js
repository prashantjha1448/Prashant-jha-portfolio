import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, default: "Bhopal, MP, India" },
    description: [{ type: String }],
    techStack: [{ type: String }],
  },
  { timestamps: true }
);

const WorkExperience = mongoose.models.WorkExperience || mongoose.model("WorkExperience", workExperienceSchema);
export default WorkExperience;
