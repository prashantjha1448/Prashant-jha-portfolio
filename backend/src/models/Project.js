import mongoose from "mongoose";

const projectMetricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const techRationaleSchema = new mongoose.Schema(
  {
    tech: { type: String, required: true },
    whyChosen: { type: String, required: true },
    impact: { type: String, default: "" },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    problem: { type: String, default: "" },
    engineeringChallenges: [{ type: String }],
    techStackRationale: [techRationaleSchema],
    architecture: { type: String, default: "" },
    deployment: { type: String, default: "" },
    uiHighlight: { type: String, default: "" },
    supportedRoles: [{ type: String }],
    shippedFeatures: [{ type: String }],
    plannedFeatures: [{ type: String }],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subtitle: { type: String, default: "" },
    category: { type: String, enum: ["flagship", "dev", "live"], default: "live" },
    description: { type: String, required: true },
    metrics: [projectMetricSchema],
    techStack: [{ type: String }],
    liveUrl: { type: String, default: "" },
    caseStudyUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    status: { type: String, enum: ["live", "dev"], default: "live" },
    timelineLabel: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isFlagship: { type: Boolean, default: false },
    caseStudy: caseStudySchema,
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
