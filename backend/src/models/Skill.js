import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "DevOps/Tools", "Mobile", "Other"],
      default: "Frontend",
    },
    proficiency: {
      type: Number,
      default: 90,
      min: 1,
      max: 100,
    },
    icon: {
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

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
