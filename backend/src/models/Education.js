import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);
export default Education;
