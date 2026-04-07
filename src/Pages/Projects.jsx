import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Notewave",
      desc: "Production-ready MERN notes app with JWT, Email OTP, Google OAuth 2.0, and 2FA (TOTP). Full CRUD with soft delete, image/audio via Cloudinary.",
      tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary", "Passport.js"],
      live: "https://notewave-frontend.vercel.app",
      github: "https://github.com/prashantjha1448/notewave-frontend",
      accent: "#3b82f6",
    },
    {
      title: "Lokpriyatam-chai",
      desc: "A premium chai brand website showcasing Lokpriyatam’s identity, featuring modern UI with smooth animations, franchise opportunities, product range, and contact integration.",
      tech: ["React", "Express.js", "MongoDB", "JWT", "bcrypt"],
      live: "#",
      github: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
      accent: "#a855f7",
    },
    {
      title: "E-Commerce Platform",
      desc: "Modern shopping platform with seamless checkout experience, product catalog, and secure payment integration.",
      tech: ["Next.js", "Stripe", "Prisma", "Tailwind"],
      live: "#",
      github: "#",
      accent: "#06b6d4",
    },
    {
      title: "AI Dashboard",
      desc: "Analytics dashboard with real-time insights, charts, and data visualization for monitoring app performance.",
      tech: ["React", "Chart.js", "Tailwind", "REST API"],
      live: "#",
      github: "#",
      accent: "#10b981",
    },
    {
      title: "Banking App",
      desc: "Secure banking app with smooth transactions, account management, and real-time balance updates.",
      tech: ["React Native", "Firebase", "JWT"],
      live: "#",
      github: "#",
      accent: "#f59e0b",
    },
    {
      title: "Portfolio Website",
      desc: "Creative developer portfolio with GSAP animations, smooth scrolling, particle background, and premium UI effects.",
      tech: ["React", "GSAP", "Tailwind", "Vite"],
      live: "#",
      github: "#",
      accent: "#ec4899",
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
          delay: (i % 3) * 0.1,
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
          <h4 className="text-blue-400 tracking-widest text-xs mb-4 uppercase">
            Portfolio
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Featured Projects
          </h1>
          <p className="text-gray-400 mt-4 text-sm">
            Real-world, production-deployed applications with full auth pipelines
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-7">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card group rounded-2xl overflow-hidden relative flex flex-col transition-all duration-400 cursor-default"
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${project.accent}50`;
                e.currentTarget.style.background = `${project.accent}08`;
                e.currentTarget.style.boxShadow = `0 0 40px ${project.accent}20, 0 20px 60px rgba(0,0,0,0.3)`;
                e.currentTarget.style.transform = "translateY(-6px)";
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
                className="h-[3px] w-full"
                style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
              />

              {/* Number badge */}
              <div className="absolute top-4 right-4">
                <span
                  className="text-xs font-mono opacity-30"
                  style={{ color: project.accent }}
                >
                  0{i + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">{project.desc}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-full font-mono"
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
                <div className="flex gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)`,
                      color: "#fff",
                    }}
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center px-4 py-2 rounded-full text-sm border hover:bg-white/10 transition"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <i className="ri-github-line mr-1" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
