import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { projectsAPI } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

// Browser Chrome Frame Header Component
const BrowserChromeFrame = ({ url, isLive, isLight }) => (
  <div className={`w-full border-b px-4 py-2.5 flex items-center justify-between rounded-t-3xl backdrop-blur-md select-none ${
    isLight ? "bg-slate-100/90 border-slate-200" : "bg-slate-900/80 dark:bg-black/60 border-white/10"
  }`}>
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
    </div>

    <div className={`flex items-center gap-2 border px-3 py-1 rounded-full text-[11px] font-mono max-w-[180px] sm:max-w-[280px] truncate ${
      isLight ? "bg-white border-slate-200 text-slate-600" : "bg-black/40 border-white/10 text-gray-300"
    }`}>
      <i className="ri-lock-2-line text-emerald-500 text-xs shrink-0" />
      <span className="truncate">{url}</span>
    </div>

    <div className="flex items-center gap-1">
      {isLive ? (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      ) : (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono font-semibold border border-amber-500/30">
          Dev
        </span>
      )}
    </div>
  </div>
);

const INITIAL_PROJECTS = [
  {
    slug: "workquora",
    date: "May 2026 – Present",
    phase: "Flagship Active Founder Build",
    title: "WorkQuora",
    subtitle: "Flagship Hyperlocal Marketplace",
    desc: "A KYC-verified local services marketplace connecting India's skilled workers (plumbers, electricians, mechanics, cooks) with local clients. Features real-time job dispatching, escrow payments, and native mobile apps.",
    metrics: [
      { label: "Verification", val: "100% KYC" },
      { label: "Security", val: "Escrow Locked" },
      { label: "Engine", val: "Auto-Dispatch" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "JWT"],
    live: "https://www.workquora.com",
    url: "workquora.com",
    github: "#",
    accent: "#3b82f6",
    badgeType: "live",
    isFlagship: true,
    highlights: ["Aadhaar & PAN Identity Checks", "Digital Escrow Payment Locks", "Real-Time WebSocket Job Dispatch"],
  },
  {
    slug: "chh-school",
    date: "Aug 2026 – Present",
    phase: "Enterprise Campus Platform",
    title: "CHH School Management System",
    subtitle: "Complete Educational Ecosystem",
    desc: "Comprehensive school management platform engineered to handle campus administration, student records, fee tracking, and multi-role portal workflows.",
    metrics: [
      { label: "Roles", val: "Multi-User" },
      { label: "Academic", val: "Full Records" },
      { label: "Portals", val: "Admin & Student" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    live: "https://chh-school-management-system.vercel.app/",
    url: "chh-school.vercel.app",
    github: "#",
    accent: "#f59e0b",
    badgeType: "progress",
    isFlagship: false,
    highlights: ["Multi-Role Admin & Student Dashboards", "Campus Record Tracking", "Automated Attendance Systems"],
  },
  {
    slug: "notewave",
    date: "2024",
    phase: "Security & Productivity Platform",
    title: "Notewave",
    subtitle: "Secure Productivity Notes App",
    desc: "Production-grade MERN notes application with JWT, Email OTP, Google OAuth 2.0, 2FA security, soft delete recovery, and Cloudinary media uploads.",
    metrics: [
      { label: "Security", val: "2FA & OAuth" },
      { label: "Media", val: "Cloudinary" },
      { label: "CRUD", val: "Soft Delete" },
    ],
    tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary"],
    live: "https://notewave-frontend.vercel.app",
    url: "notewave.vercel.app",
    github: "https://github.com/prashantjha1448/notewave-frontend",
    accent: "#a855f7",
    badgeType: "live",
    isFlagship: false,
    highlights: ["Google OAuth & TOTP 2FA", "Cloudinary Media Attachments", "Soft Delete & Trash Recovery"],
  },
  {
    slug: "lokpriyatam",
    date: "2024",
    phase: "Digital Storefront & Branding",
    title: "Lokpriyatam",
    subtitle: "Digital Storefront & Franchise Platform",
    desc: "Modern responsive digital storefront built for a local tea brand business to accelerate brand presence, showcase menu items, and power franchise expansion.",
    metrics: [
      { label: "Design", val: "Modern UI" },
      { label: "Business", val: "Franchise Module" },
      { label: "Speed", val: "Lighthouse 98+" },
    ],
    tech: ["React.js", "Tailwind CSS", "GSAP"],
    live: "#",
    url: "lokpriyatam.com",
    github: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
    accent: "#06b6d4",
    badgeType: "live",
    isFlagship: false,
    highlights: ["Interactive Product Showcase", "Franchise Application Flow", "Pixel-Perfect Responsive UI"],
  },
];

const Projects = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isLight = theme === "light";
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  useEffect(() => {
    projectsAPI
      .getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll(".timeline-item");
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`w-full min-h-screen px-6 py-24 transition-colors duration-300 relative overflow-hidden ${
        isLight ? "text-slate-900 bg-transparent" : "text-white bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4 uppercase tracking-widest ${
            isLight
              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
              : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
          }`}>
            <i className="ri-git-commit-line" />
            Engineering Journey & Platform Showcase
          </div>
          <h1
            className={`text-4xl md:text-6xl font-black ${isLight ? "text-slate-900" : "text-white"}`}
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Featured Projects
          </h1>
          <p className={`mt-4 text-sm max-w-xl mx-auto ${isLight ? "text-slate-600" : "text-gray-400"}`}>
            Chronological roadmap of full-stack platforms, client ecosystems, and production deployments.
          </p>
        </div>

        {/* VERTICAL TIMELINE CONTAINER */}
        <div className="relative border-l-2 md:border-l-0 border-blue-500/30 left-4 md:left-0">
          
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-30" />

          <div className="space-y-16">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={project.slug}
                  className="timeline-item relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
                >
                  
                  {/* Timeline Node Circle */}
                  <div className="absolute left-[-17px] md:left-1/2 top-8 md:-translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shadow-lg z-20"
                    style={{
                      background: project.accent,
                      color: "#fff",
                      boxShadow: `0 0 20px ${project.accent}80`,
                    }}
                  >
                    0{idx + 1}
                  </div>

                  {/* Left Side (Odd Desktop / Content or Date) */}
                  <div className={`w-full md:w-[46%] pl-8 md:pl-0 ${isEven ? "md:order-1 md:text-right" : "md:order-2 md:text-left"}`}>
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          background: `${project.accent}18`,
                          color: project.accent,
                          border: `1px solid ${project.accent}35`,
                        }}
                      >
                        📅 {project.date}
                      </span>
                    </div>

                    <h3 className={`text-xs font-mono uppercase tracking-wider mb-1 ${
                      isLight ? "text-slate-500" : "text-gray-400"
                    }`}>
                      {project.phase}
                    </h3>
                  </div>

                  {/* Right Side (Even Desktop / Card Box) */}
                  <div className={`w-full md:w-[46%] pl-8 md:pl-0 ${isEven ? "md:order-2" : "md:order-1"}`}>
                    
                    {/* Project Timeline Card */}
                    <div
                      className={`rounded-3xl overflow-hidden border shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                        isLight ? "bg-white border-slate-200/90" : "bg-[#0b0f19] border-white/15 shadow-black/80"
                      }`}
                      style={{
                        boxShadow: isLight
                          ? "0 10px 30px -5px rgba(0,0,0,0.06)"
                          : `0 15px 35px -10px ${project.accent}20`,
                      }}
                    >
                      {/* Browser Chrome Header */}
                      <BrowserChromeFrame url={project.url} isLive={project.badgeType === "live"} isLight={isLight} />

                      {/* Card Content */}
                      <div className="p-6 relative">
                        {/* Top Accent line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
                        />

                        {/* Title & Badge */}
                        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                          <h2 className={`text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2 ${
                            isLight ? "text-slate-900" : "text-white"
                          }`}>
                            {project.title}
                            {project.isFlagship && (
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                                isLight
                                  ? "bg-purple-100 text-purple-700 border-purple-200 font-semibold"
                                  : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                              }`}>
                                Flagship
                              </span>
                            )}
                          </h2>
                        </div>

                        <p className={`text-xs font-mono uppercase tracking-wide mb-3 ${
                          isLight ? "text-purple-700 font-semibold" : "text-purple-300"
                        }`}>
                          {project.subtitle}
                        </p>

                        <p className={`text-xs md:text-sm leading-relaxed mb-5 ${
                          isLight ? "text-slate-600" : "text-gray-300"
                        }`}>
                          {project.desc}
                        </p>

                        {/* Key Metrics Pill Grid */}
                        <div className={`grid grid-cols-3 gap-2 mb-5 p-3 rounded-2xl border ${
                          isLight ? "bg-slate-50 border-slate-200" : "bg-black/30 border-white/5"
                        }`}>
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="text-center">
                              <p className={`text-xs md:text-sm font-bold font-mono ${
                                isLight ? "text-slate-900" : "text-white"
                              }`}>{m.val}</p>
                              <p className={`text-[9px] md:text-[10px] font-mono uppercase tracking-tight ${
                                isLight ? "text-slate-500" : "text-gray-400"
                              }`}>{m.label}</p>
                            </div>
                          ))}
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 text-[11px] rounded-full font-mono font-medium"
                              style={{
                                background: isLight ? `${project.accent}15` : `${project.accent}18`,
                                color: project.accent,
                                border: `1px solid ${project.accent}35`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap pt-1">
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-full text-xs font-semibold text-white shadow transition-all hover:opacity-90"
                            style={{
                              background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)`,
                            }}
                          >
                            Live Demo →
                          </a>

                          <Link
                            to={`/projects/${project.slug}`}
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                              isLight
                                ? "border-slate-300 text-slate-800 bg-white hover:bg-slate-100"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            Case Study
                          </Link>

                          {project.github !== "#" && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className={`px-3 py-2 rounded-full text-xs border transition ${
                                isLight
                                  ? "border-slate-300 text-slate-800 bg-white hover:bg-slate-100"
                                  : "border-white/20 text-white hover:bg-white/10"
                              }`}
                            >
                              <i className="ri-github-line" />
                            </a>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
