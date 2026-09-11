import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

// 3D Parallax Tilt Wrapper Component
const TiltBentoCard = ({ children, className, style }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; // 5deg max tilt
    const rotateY = ((x - centerX) / centerX) * 5;  // 5deg max tilt

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    card.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.5s ease-out";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

// Browser Chrome Frame Header Component
const BrowserChromeFrame = ({ url, isLive }) => (
  <div className="w-full bg-slate-900/80 dark:bg-black/60 border-b border-white/10 px-4 py-2.5 flex items-center justify-between rounded-t-3xl backdrop-blur-md select-none">
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
    </div>

    <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1 rounded-full text-[11px] font-mono text-gray-300 max-w-[200px] sm:max-w-[320px] truncate">
      <i className="ri-lock-2-line text-emerald-400 text-xs shrink-0" />
      <span className="truncate">{url}</span>
    </div>

    <div className="flex items-center gap-1">
      {isLive ? (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      ) : (
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-mono font-semibold border border-amber-500/30">
          Dev
        </span>
      )}
    </div>
  </div>
);

const Projects = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isLight = theme === "light";

  const projects = [
    {
      slug: "workquora",
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
      gridClass: "md:col-span-8",
      isFlagship: true,
    },
    {
      slug: "chh-school",
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
      gridClass: "md:col-span-4",
      isFlagship: false,
    },
    {
      slug: "notewave",
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
      gridClass: "md:col-span-6",
      isFlagship: false,
    },
    {
      slug: "lokpriyatam",
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
      gridClass: "md:col-span-6",
      isFlagship: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll(".bento-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: (i % 2) * 0.1,
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
      className="w-full min-h-screen text-white px-6 py-24 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4 uppercase tracking-widest">
            <i className="ri-layout-grid-line" />
            Style Showcase 1 — Refined Bento Grid + Browser Chrome + 3D Tilt
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Featured Projects
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
            Full-stack platforms, complete ecosystems, and production-deployed applications.
          </p>
        </div>

        {/* Bento Grid Layout (Mixed-size tiles: 8-span hero flagship + 4-span vertical + two 6-span tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <TiltBentoCard
              key={project.slug}
              className={`bento-card group rounded-3xl overflow-hidden relative flex flex-col transition-all duration-300 cursor-default ${project.gridClass}`}
              style={{
                border: isLight ? `1px solid rgba(0,0,0,0.08)` : `1px solid ${project.accent}30`,
                background: isLight
                  ? "#ffffff"
                  : `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, ${project.accent}06 100%)`,
                boxShadow: isLight
                  ? "0 4px 20px -2px rgba(0,0,0,0.05), 0 2px 6px -1px rgba(0,0,0,0.02)"
                  : `0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Browser Chrome Header */}
              <BrowserChromeFrame url={project.url} isLive={project.badgeType === "live"} />

              {/* Card Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 relative">

                {/* Top Accent line under browser chrome */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
                />

                <div>
                  {/* Title & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                      {project.title}
                      {project.isFlagship && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Flagship
                        </span>
                      )}
                    </h2>
                    <span className="text-xs font-mono font-bold opacity-40" style={{ color: project.accent }}>
                      0{i + 1}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-purple-400 uppercase tracking-wide mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  {/* Metrics Pills Section */}
                  <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-black/20 dark:bg-black/30 border border-white/5">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-xs md:text-sm font-bold text-white font-mono">{m.val}</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tight">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded-full font-mono font-medium"
                        style={{
                          background: isLight ? `${project.accent}12` : `${project.accent}18`,
                          color: project.accent,
                          border: `1px solid ${project.accent}35`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 flex-wrap pt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[120px] text-center px-4 py-2.5 rounded-full text-xs font-semibold transition-all hover:opacity-90 shadow-md"
                    style={{
                      background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)`,
                      color: "#fff",
                    }}
                  >
                    Live Demo →
                  </a>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="flex-1 min-w-[120px] text-center px-4 py-2.5 rounded-full text-xs font-semibold border hover:bg-white/10 transition"
                    style={{
                      borderColor: isLight ? `#cbd5e1` : `${project.accent}50`,
                      color: isLight ? `#334155` : project.accent,
                      background: isLight ? `#ffffff` : `transparent`,
                    }}
                  >
                    Case Study
                  </Link>
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-full text-xs border hover:bg-white/10 transition"
                      style={{
                        borderColor: isLight ? `#cbd5e1` : "rgba(255,255,255,0.18)",
                        color: isLight ? `#334155` : "#ffffff",
                        background: isLight ? `#ffffff` : `transparent`,
                      }}
                    >
                      <i className="ri-github-line" />
                    </a>
                  )}
                </div>

              </div>
            </TiltBentoCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
