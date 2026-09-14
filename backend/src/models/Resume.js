import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Prashant Jha - Full-Stack Developer Resume",
    },
    pdfUrl: {
      type: String,
      required: true,
      default: "https://prashant-jha-portfolio.vercel.app/resume.pdf",
    },
    summary: {
      type: String,
      default: "Full-stack software engineer specializing in scalable MERN web products and cross-platform React Native mobile applications.",
    },
    updatedDate: {
      type: String,
      default: "September 2026",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
