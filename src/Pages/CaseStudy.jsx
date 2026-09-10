import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CASE_STUDIES = {
  workquora: {
    title: "WorkQuora",
    subtitle: "KYC-Verified Hyperlocal Services Marketplace",
    status: "Live in Production",
    statusType: "live",
    liveUrl: "https://www.workquora.com",
    githubUrl: "#",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Socket.io", "JWT", "OAuth 2.0"],
    accent: "#3b82f6",
    problem:
      "Hiring local skilled workers (electricians, plumbers, mechanics, AC repair) in India is heavily fragmented, unreliable, and unverified. Clients currently rely on informal WhatsApp/Facebook groups with no verified identity checks, no rating history, no real-time status updates, and no payment safety.",
    decision:
      "Designed and built a full-stack MERN platform from scratch solo. Implemented location-based matching, role-based JWT auth across 3 actor roles (Client, Worker, Admin), and integrated Redis + BullMQ queueing for background notification jobs and real-time Socket.io job dispatching.",
    architecture: [
      "Role-Based Security: JWT auth pipeline paired with Google OAuth 2.0 and OTP verification.",
      "Job Dispatch Engine: Event-driven Socket.io gateway pushing instant notifications to nearby workers.",
      "Redis Caching & Queueing: Offloaded email notifications and heavy database lookups to BullMQ workers.",
      "Escrow & Payments Architecture: Designed database schemas for milestone escrow holds and commission processing.",
    ],
    results:
      "Shipped to production solo. Successfully handles real-time worker dispatching, location-based query lookups, and instant worker status updates with graceful Redis fallback resilience when deployed on Render free tiers.",
  },
  "chh-school": {
    title: "CHH School Management System",
    subtitle: "Complete Educational & Campus Ecosystem",
    status: "In Active Development",
    statusType: "progress",
    liveUrl: "https://chh-school-management-system.vercel.app/",
    githubUrl: "#",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    accent: "#f59e0b",
    problem:
      "Traditional school administration relies on isolated paper registers, manual attendance tracking, and disconnected fee processing, leading to administrative bottlenecks and lack of transparent communication between teachers, parents, and school management.",
    decision:
      "Engineered an all-in-one MERN management ecosystem designed to centralize school operations. Created unified data models and role-based permissions governing administrators, faculty, students, and parent portals.",
    architecture: [
      "Multi-Role Permission Matrix: Strict JWT access control isolating administrative rights from teacher/student views.",
      "Centralized Record Directory: Normalized MongoDB schema storing academic records, attendance history, and schedules.",
      "Responsive Dark UI: High-density data tables and intuitive dashboards engineered with React.js and Tailwind CSS.",
      "Modular API Architecture: Clean controller-service layer separation for scale and maintainability.",
    ],
    results:
      "Currently deployed on Vercel preview environments. Successfully streamlines administrative workflows and centralizes student data tracking across academic departments.",
  },
  notewave: {
    title: "Notewave",
    subtitle: "Production-Grade Notes & Asset Security Platform",
    status: "Completed",
    statusType: "live",
    liveUrl: "https://notewave-frontend.vercel.app",
    githubUrl: "https://github.com/prashantjha1448/notewave-frontend",
    tech: ["React.js", "Node.js", "MongoDB", "JWT", "Cloudinary", "Passport.js"],
    accent: "#a855f7",
    problem:
      "Standard note-taking applications lack multi-factor security and media attachment flexibility for privacy-conscious users needing to store sensitive study notes, audio recordings, and visual documentation.",
    decision:
      "Built a secure MERN notes application supporting Two-Factor Authentication (2FA TOTP), Google OAuth 2.0, soft-delete record recovery, and Cloudinary media processing for audio and image attachments.",
    architecture: [
      "Auth Security Pipeline: Integrated 2FA (TOTP authenticator app support), Email OTP, and JWT sessions.",
      "Soft Delete & Trash Bin: Engineered two-tier deletion pipeline allowing temporary soft delete, restore, and permanent purge.",
      "Media Processing: Direct Cloudinary API integration for seamless upload and streaming of audio notes.",
    ],
    results:
      "Deployed on Vercel and Render. Provides users with zero-data-loss note management and multi-layered security.",
  },
  lokpriyatam: {
    title: "Lokpriyatam",
    subtitle: "Digital Storefront & Chai Brand Experience",
    status: "Completed",
    statusType: "live",
    liveUrl: "#",
    githubUrl: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    accent: "#06b6d4",
    problem:
      "A fast-growing local tea stall business lacked a modern online presence to showcase its brand story, menu offerings, customer reviews, and franchise opportunities.",
    decision:
      "Designed and developed a highly responsive, visual-first digital storefront featuring custom branding layouts, interactive menus, and contact integration.",
    architecture: [
      "Component-Driven UI: Built clean, reusable React UI components styled with Tailwind CSS utility classes.",
      "Micro-Interactions: Added subtle motion effects and hover states to enhance brand appeal and engagement.",
      "Mobile-First Layout: Optimized touch targets and image loading for fast mobile browsing.",
    ],
    results:
      "Delivered a digital brand presence that highlights products and franchise information effectively.",
  },
};

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = CASE_STUDIES[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
        <Link to="/" className="px-5 py-2.5 rounded-full bg-purple-600 text-xs font-semibold">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white py-20 px-6 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition mb-10 cursor-pointer"
        >
          <i className="ri-arrow-left-line" /> Back to Portfolio
        </button>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 border-b border-white/10 pb-10"
        >
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span
              className="text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: `${project.accent}18`,
                color: project.accent,
                border: `1px solid ${project.accent}35`,
              }}
            >
              {project.status}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {project.title}
          </h1>

          <p className="text-gray-400 text-sm md:text-base font-mono mb-8">
            {project.subtitle}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full text-xs font-semibold text-white shadow-lg transition-all hover:opacity-90"
              style={{ background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)` }}
            >
              Launch Live Application →
            </a>
            {project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-xs font-semibold border border-white/20 hover:bg-white/10 transition"
              >
                <i className="ri-github-line mr-1.5" /> Source Repository
              </a>
            )}
          </div>
        </motion.div>

        {/* Content Body */}
        <div className="flex flex-col gap-12 text-gray-300 text-sm leading-relaxed">
          
          {/* Problem Section */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              The Problem & Challenge
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.problem}</p>
          </section>

          {/* Architectural Decision Section */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Architectural Strategy & Decisions
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">{project.decision}</p>

            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-3">Key Technical Highlights</h3>
            <ul className="flex flex-col gap-2.5">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Results Section */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Results & Impact
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.results}</p>
          </section>

        </div>

      </div>
    </div>
  );
};

export default CaseStudy;
