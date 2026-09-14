import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    certId: { type: String, default: "" },
    verifyUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
export default Certificate;
