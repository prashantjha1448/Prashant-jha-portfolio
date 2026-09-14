import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import Education from "../models/Education.js";
import Skill from "../models/Skill.js";
import Blog from "../models/Blog.js";
import Resume from "../models/Resume.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://prashantJHA:1Prashant%23@chh-cluster.iw5isxv.mongodb.net/portfolio";

const initialProjects = [
  {
    title: "WorkQuora",
    slug: "workquora",
    tagline: "High-performance job & service marketplace platform",
    description: "Built a production-grade MERN platform powering real-time dispatch, client-freelancer service matches, and multi-role dashboards.",
    category: "Full-Stack",
    image: "https://www.workquora.com/og-image.png",
    liveUrl: "https://www.workquora.com",
    githubUrl: "https://github.com/prashantjha1448/WorkQuora",
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT"],
    featured: true,
    order: 1,
  },
  {
    title: "CHH School Management System",
    slug: "chh-school-management-system",
    tagline: "Campus management & multi-role administrative portal",
    description: "Integrated role-based access control, automated fee receipts, attendance tracking, and student grade portals.",
    category: "Full-Stack",
    image: "https://chh-school-management-system.vercel.app/og.png",
    liveUrl: "https://chh-school-management-system.vercel.app/",
    githubUrl: "https://github.com/prashantjha1448/CHH-School",
    techStack: ["React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    featured: true,
    order: 2,
  },
  {
    title: "Notewave",
    slug: "notewave",
    tagline: "Privacy-conscious cloud note-taking app",
    description: "Designed a clean, secure note-taking web app featuring instant cloud sync, rich text formatting, and privacy controls.",
    category: "Web App",
    image: "https://notewave-frontend.vercel.app/preview.png",
    liveUrl: "https://notewave-frontend.vercel.app",
    githubUrl: "https://github.com/prashantjha1448/Notewave",
    techStack: ["React.js", "Node.js", "Express", "MongoDB"],
    featured: true,
    order: 3,
  },
  {
    title: "Lokpriyatam",
    slug: "lokpriyatam",
    tagline: "Community engagement & content discovery platform",
    description: "Full-stack web application for community posts, interactive voting, and real-time feeds.",
    category: "Full-Stack",
    image: "",
    liveUrl: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
    githubUrl: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
    techStack: ["React.js", "Express", "MongoDB", "Tailwind CSS"],
    featured: false,
    order: 4,
  },
];

const initialExperiences = [
  {
    company: "WorkQuora Tech",
    role: "Lead Full-Stack Software Engineer",
    period: "2024 - Present",
    location: "Delhi NCR, India",
    description: "Leading the core product architecture, real-time APIs, and React Native mobile application development.",
    highlights: [
      "Engineered real-time dispatch and match-making API engines handling sub-100ms response times.",
      "Architected cross-platform React Native / Expo mobile application targeting API Level 36 compliance.",
      "Implemented token-based JWT authentication and Google OAuth 2.0 verification.",
    ],
    order: 1,
  },
  {
    company: "Freelance / Software Consultant",
    role: "Full-Stack Developer",
    period: "2023 - 2024",
    location: "Remote",
    description: "Delivered production MERN stack platforms and custom web portals for clients across education and SaaS sectors.",
    highlights: [
      "Developed CHH School Management System with multi-role access control.",
      "Built and deployed scalable web applications on Render and Vercel with 99.9% uptime.",
    ],
    order: 2,
  },
];

const initialEducation = [
  {
    institution: "AKTU / Technical University",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    period: "2021 - 2025",
    grade: "First Class with Distinction",
    description: "Focused on Data Structures, Algorithms, Software Engineering Principles, Database Systems, and Cloud Architectures.",
    order: 1,
  },
];

const initialSkills = [
  { name: "React Native & Expo", category: "Mobile", proficiency: 95, icon: "ri-smartphone-line", order: 1 },
  { name: "React.js & Next.js", category: "Frontend", proficiency: 95, icon: "ri-reactjs-line", order: 2 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 98, icon: "ri-css3-line", order: 3 },
  { name: "Node.js & Express.js", category: "Backend", proficiency: 92, icon: "ri-node-tree", order: 4 },
  { name: "MongoDB & Mongoose", category: "Backend", proficiency: 90, icon: "ri-database-2-line", order: 5 },
  { name: "REST APIs & JWT", category: "Backend", proficiency: 95, icon: "ri-key-2-line", order: 6 },
  { name: "Git & GitHub", category: "DevOps/Tools", proficiency: 92, icon: "ri-git-branch-line", order: 7 },
  { name: "Render & Vercel Deployments", category: "DevOps/Tools", proficiency: 90, icon: "ri-cloud-line", order: 8 },
  { name: "EAS Build & Play Store Publishing", category: "Mobile", proficiency: 90, icon: "ri-google-play-line", order: 9 },
];

const initialBlogs = [
  {
    title: "Building Production-Ready React Native Apps for Android 16 (API 36)",
    slug: "building-react-native-apps-android-16",
    summary: "Key requirements, EAS build configuration, and safe-area edge-to-edge layout handling for Google Play Store submission.",
    content: "Google Play Console now mandates Android 16 (API Level 36) targeting for new app submissions. In this article, we explore the upgrade path from Expo SDK 52 to SDK 54, resolving native Gradle build headers, and ensuring full backward compatibility.",
    coverImage: "",
    tags: ["React Native", "Android 16", "Expo", "EAS Build"],
    readTime: "5 min read",
    published: true,
  },
  {
    title: "Designing Stateless JWT Authentication & OAuth 2.0 in Express.js",
    slug: "stateless-jwt-authentication-express-js",
    summary: "Best practices for token expiration, bcrypt salt hashing, and Google OAuth ID Token verification.",
    content: "Authentication is the foundation of secure web and mobile platforms. We walk through token verification using google-auth-library, bcrypt password salting, and rate-limited review submission endpoints.",
    coverImage: "",
    tags: ["Node.js", "JWT", "Express", "MongoDB"],
    readTime: "6 min read",
    published: true,
  },
];

const initialResume = {
  title: "Prashant Jha - Full-Stack Developer & Software Engineer Resume",
  pdfUrl: "https://prashant-jha-portfolio.vercel.app/resume.pdf",
  summary: "Full-stack software engineer specializing in scalable MERN web products and cross-platform React Native mobile applications.",
  updatedDate: "September 2026",
  active: true,
};

export const seedDatabase = async () => {
  try {
    console.log("[Seed] Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    // Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log("[Seed] Projects seeded successfully.");
    }

    // Seed Experiences
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany(initialExperiences);
      console.log("[Seed] Experiences seeded successfully.");
    }

    // Seed Education
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      await Education.insertMany(initialEducation);
      console.log("[Seed] Education seeded successfully.");
    }

    // Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(initialSkills);
      console.log("[Seed] Skills seeded successfully.");
    }

    // Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany(initialBlogs);
      console.log("[Seed] Blogs seeded successfully.");
    }

    // Seed Resume
    const resumeCount = await Resume.countDocuments();
    if (resumeCount === 0) {
      await Resume.create(initialResume);
      console.log("[Seed] Resume metadata seeded successfully.");
    }

    console.log("[Seed] Database seeding complete!");
  } catch (error) {
    console.error("[Seed Error]:", error.message);
  }
};

// Run seed if executed directly
if (process.argv[1].endsWith("seed.js")) {
  seedDatabase().then(() => process.exit(0));
}
