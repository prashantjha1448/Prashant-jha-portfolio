import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, default: "" },
    taglineRotating: [{ type: String }],
    bio: {
      founderStory: { type: String, default: "" },
      stackPhilosophy: { type: String, default: "" },
    },
    location: { type: String, default: "Bhopal, India" },
    educationTags: [{ type: String }],
    availabilityStatus: { type: String, default: "Available for Freelance & Roles" },
    stats: {
      projectsShipped: { type: Number, default: 4 },
      yearsExperience: { type: String, default: "1+" },
      featuresBuilt: { type: String, default: "25+" },
      codeCommits: { type: String, default: "500+" },
    },
    quote: { type: String, default: "" },
    contact: {
      email: { type: String, default: "prashantjha0108@gmail.com" },
      phone: { type: String, default: "+91 9981789795" },
      github: { type: String, default: "https://github.com/prashantjha1448" },
      linkedin: { type: String, default: "https://linkedin.com/in/prashant-jha-dev" },
      twitter: { type: String, default: "https://x.com/Prashantjha1448" },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
