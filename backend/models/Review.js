import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Rate limiting: 1 review per user
    },
    project: {
      type: String,
      enum: ["WorkQuora", "CHH School Management System", "Notewave", "Lokpriyatam", "General Portfolio"],
      default: "WorkQuora",
    },
    projectLink: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    city: {
      type: String,
      default: "India",
    },
    verified: {
      type: Boolean,
      default: false, // True for Google OAuth or verified users
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
