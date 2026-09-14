import mongoose from "mongoose";

const techStackItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "Security/Auth", "Tools & DevOps"],
      required: true,
    },
    icon: { type: String, default: "" },
  },
  { timestamps: true }
);

const TechStackItem = mongoose.models.TechStackItem || mongoose.model("TechStackItem", techStackItemSchema);
export default TechStackItem;
