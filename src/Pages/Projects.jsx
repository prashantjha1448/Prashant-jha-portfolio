import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const featuredProjects = [
    {
      slug: "workquora",
      title: "WorkQuora",
      subtitle: "Flagship Hyperlocal Marketplace",
      desc: "A hyperlocal marketplace connecting clients with verified nearby workers — electricians, plumbers, AC repair, mechanics, and more. Solves the fragmented, unverified hiring problem in India (WhatsApp groups, Facebook groups, no ratings or KYC) with location-based matching, verified profiles, and real-time job status updates.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Socket.io", "JWT", "OAuth 2.0"],
      live: "https://www.workquora.com",
      github: "#",
      accent: "#3b82f6",
      badge: "Live",
      badgeType: "live",
      featured: true,
    },
    {
      slug: "chh-school",
      title: "CHH School Management System",
      subtitle: "Complete Educational Ecosystem",
      desc: "A comprehensive school management ecosystem designed to streamline campus administration, academic tracking, student records, and multi-role workflows across educational operations.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
      live: "https://chh-school-management-system.vercel.app/",
      github: "#",
      accent: "#f59e0b",
      badge: "In Progress",
      badgeType: "progress",
      featured: true,
    },
  ];

  const secondaryProjects = [
    {
      slug: "notewave",
      title: "Notewave",
      desc: "A secure, full-featured notes app built to solve privacy and asset management problems for students and professionals. Features a production-ready MERN notes app with JWT, Email OTP, Google OAuth 2.0, and 2FA (TOTP). Full CRUD with soft delete, restore, and permanent delete; image/audio attachments via Cloudinary.",
      tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary", "Passport.js"],
      live: "https://notewave-frontend.vercel.app",
      github: "https://github.com/prashantjha1448/notewave-frontend",
      accent: "#a855f7",
    },
    {
      slug: "lokpriyatam",
      title: "Lokpriyatam",
      desc: "A modern digital storefront built to solve the online presence and franchise expansion challenges for a local tea stall business. Features a responsive front-end for a tea stall business, showcasing the brand's identity with a modern UI, product range, franchise info, and contact integration.",
      tech: ["React", "Tailwind CSS"],
      live: "#",
      github: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
      accent: "#06b6d4",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 60,
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
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h4 className="text-blue-400 tracking-widest text-xs mb-4 uppercase font-mono font-semibold">
            Portfolio
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Featured Projects
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
            Full-stack platforms, complete ecosystems, and production-deployed applications.
          </p>
        </div>

        {/* 1. TIER ONE: Featured Ecosystems & Flagship Platforms (2 Large Cards) */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Lead Platforms & Ecosystems
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="project-card group rounded-3xl overflow-hidden relative flex flex-col transition-all duration-500 cursor-default p-7 md:p-8"
                style={{
                  border: `1px solid ${project.accent}30`,
                  background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, ${project.accent}08 100%)`,
                  boxShadow: `0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${project.accent}70`;
                  e.currentTarget.style.background = `linear-gradient(145deg, ${project.accent}12 0%, rgba(255,255,255,0.05) 100%)`;
                  e.currentTarget.style.boxShadow = `0 0 50px ${project.accent}25, 0 20px 60px rgba(0,0,0,0.5)`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = `1px solid ${project.accent}30`;
                  e.currentTarget.style.background = `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, ${project.accent}08 100%)`;
                  e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Top accent gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
                />

                {/* Number badge */}
                <div className="absolute top-6 right-6">
                  <span
                    className="text-xs font-mono font-bold opacity-40"
                    style={{ color: project.accent }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Card Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                      {project.title}
                    </h2>

                    {/* Status Badge */}
                    {project.badgeType === "live" && (
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
                        Live
                      </span>
                    )}
                    {project.badgeType === "progress" && (
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-purple-300/80 uppercase tracking-wide">
                    {project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 leading-relaxed flex-1">
                  {project.desc}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-full font-mono font-medium"
                      style={{
                        background: `${project.accent}18`,
                        color: project.accent,
                        border: `1px solid ${project.accent}35`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 flex-wrap">
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
                    style={{ borderColor: `${project.accent}50`, color: project.accent }}
                  >
                    Case Study
                  </Link>
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-full text-xs border hover:bg-white/10 transition"
                      style={{ borderColor: "rgba(255,255,255,0.18)" }}
                    >
                      <i className="ri-github-line" />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 2. TIER TWO: Secondary Projects (2 Compact Cards) */}
        <div>
          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Specialized Applications & Storefronts
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryProjects.map((project, i) => (
              <div
                key={i}
                className="project-card group rounded-2xl overflow-hidden relative flex flex-col transition-all duration-400 cursor-default p-6"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${project.accent}50`;
                  e.currentTarget.style.background = `${project.accent}08`;
                  e.currentTarget.style.boxShadow = `0 0 35px ${project.accent}20, 0 15px 45px rgba(0,0,0,0.3)`;
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Top accent */}
                <div
                  className="h-[3px] w-full absolute top-0 left-0 right-0"
                  style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
                />

                {/* Number badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="text-xs font-mono opacity-30"
                    style={{ color: project.accent }}
                  >
                    0{i + 3}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-bold mb-2 text-white">{project.title}</h2>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed flex-1">{project.desc}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[11px] rounded-full font-mono"
                        style={{
                          background: `${project.accent}15`,
                          color: project.accent,
                          border: `1px solid ${project.accent}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2.5 flex-wrap">
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center px-3 py-2 rounded-full text-xs font-medium transition-opacity hover:opacity-90"
                        style={{
                          background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)`,
                          color: "#fff",
                        }}
                      >
                        Live Demo
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 text-center px-3 py-2 rounded-full text-xs font-medium border hover:bg-white/10 transition"
                      style={{ borderColor: `${project.accent}50`, color: project.accent }}
                    >
                      Case Study
                    </Link>
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-full text-xs border hover:bg-white/10 transition"
                        style={{ borderColor: "rgba(255,255,255,0.15)" }}
                      >
                        <i className="ri-github-line" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
