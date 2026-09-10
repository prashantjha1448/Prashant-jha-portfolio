import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Building WorkQuora v2 & CHH School Ecosystem",
    },
    subtitle: {
      type: String,
      default: "Real-time dispatch matching engine & payment escrow",
    },
    link: {
      type: String,
      default: "https://www.workquora.com",
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

const Status = mongoose.model("Status", statusSchema);
export default Status;
