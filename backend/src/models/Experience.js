import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role title is required"],
      trim: true,
    },
    period: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "India",
    },
    description: {
      type: String,
      default: "",
    },
    highlights: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
