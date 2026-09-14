import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree name is required"],
      trim: true,
    },
    field: {
      type: String,
      default: "Computer Science & Engineering",
    },
    period: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
