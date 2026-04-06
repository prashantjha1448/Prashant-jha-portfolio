import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Small reusable card
const TechCard = ({ tech }) => (
  <div
    className="tech-card rounded-xl px-4 py-3.5"
    style={{
      border: "1px solid rgba(255,255,255,0.09)",
      background: "rgba(255,255,255,0.04)",
      minWidth: "118px",
    }}
  >
    <div className="card-inner">
      <h3 className="text-xs font-semibold text-white">
        {tech.name}
      </h3>
      <p className="text-[11px] text-gray-500 mt-1">
        {tech.type}
      </p>
    </div>
  </div>
);

const TechStack = () => {
  const sectionRef = useRef(null);

  const techs = [
    { name: "JavaScript", type: "Language" },
    { name: "HTML5", type: "Markup" },
    { name: "CSS3", type: "Styling" },
    { name: "React.js", type: "Frontend" },
    { name: "Tailwind CSS", type: "Styling" },
    { name: "Vite", type: "Build Tool" },
    { name: "Context API", type: "State Mgmt" },
    { name: "React Router", type: "Routing" },
    { name: "Node.js", type: "Backend" },
    { name: "Express.js", type: "Backend" },
    { name: "REST API", type: "API" },
    { name: "JWT", type: "Auth" },
    { name: "bcrypt", type: "Security" },
    { name: "OAuth 2.0", type: "Auth" },
    { name: "Passport.js", type: "Auth" },
    { name: "Nodemailer", type: "Email" },
    { name: "MongoDB", type: "Database" },
    { name: "Mongoose", type: "ODM" },
    { name: "MongoDB Atlas", type: "Cloud DB" },
    { name: "Cloudinary", type: "Media" },
    { name: "Git", type: "Version Control" },
    { name: "GitHub", type: "Repo" },
    { name: "Postman", type: "API Tool" },
    { name: "VS Code", type: "Editor" },
    { name: "Vercel", type: "Deployment" },
    { name: "Render", type: "Deployment" },
  ];

  const stats = [
    { num: "1+", label: "Years Experience" },
    { num: "8+", label: "Projects Built" },
    { num: "25+", label: "Features Built" },
    { num: "500+", label: "Code Commits" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-card", {
        scrollTrigger: { trigger: ".tech-grid", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.035,
        ease: "power3.out",
      });

      gsap.from(".stat-card", {
        scrollTrigger: { trigger: ".stats-grid", start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="w-full text-white px-6 py-24"
      style={{ background: "#0b0f1a" }}
    >
      <style>{`

        /* ✅ SAME SMOOTH FLOAT */
        @keyframes floatSmooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .tech-card {
          animation: floatSmooth 6s ease-in-out infinite;
          position: relative;
          overflow: hidden;
          cursor: default;
          box-shadow:
            0 2px 8px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
        }

        .tech-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          background-image:
            repeating-linear-gradient(
              135deg,
              rgba(168,85,247,0.07) 0px,
              rgba(168,85,247,0.07) 1px,
              transparent 1px,
              transparent 7px
            ),
            repeating-linear-gradient(
              45deg,
              rgba(59,130,246,0.04) 0px,
              rgba(59,130,246,0.04) 1px,
              transparent 1px,
              transparent 11px
            );
          pointer-events: none;
          z-index: 0;
          border-radius: inherit;
        }

        .tech-card::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(168,85,247,0.18) 0%,
            rgba(59,130,246,0.06) 50%,
            transparent 72%
          );
          pointer-events: none;
          z-index: 0;
          border-radius: inherit;
        }

        .tech-card:hover::before,
        .tech-card:hover::after { opacity: 1; }

        .tech-card:hover {
          border-color: rgba(168,85,247,0.55) !important;
          background: rgba(168,85,247,0.08) !important;
          box-shadow:
            0 0 0 1px rgba(168,85,247,0.2),
            0 6px 28px rgba(168,85,247,0.22),
            0 2px 8px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .tech-card .card-inner { position: relative; z-index: 1; }

        .stat-card {
          position: relative;
          overflow: hidden;
          transition: all 0.35s ease;
          cursor: default;
          box-shadow: 0 2px 10px rgba(0,0,0,0.35);
        }

        .stat-card:hover {
          border-color: rgba(168,85,247,0.38) !important;
          box-shadow:
            0 0 28px rgba(168,85,247,0.15),
            0 6px 20px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }

      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h4 className="text-purple-400 tracking-widest text-xs mb-3 uppercase">
            Technologies
          </h4>
          <h1 className="text-5xl md:text-7xl font-black">
            Tech Stack
          </h1>
          <p className="text-gray-400 mt-3 text-sm">
            The tools and technologies I work with on a daily basis
          </p>
        </div>

        {/* ✅ FIXED PYRAMID LAYOUT */}
        <div className="tech-grid flex flex-col gap-3">

          {/* Row 1 - 10 */}
          <div className="flex justify-center gap-2.5 flex-wrap">
            {techs.slice(0, 10).map((tech, i) => (
              <TechCard key={i} tech={tech} />
            ))}
          </div>

          {/* Row 2 - 8 */}
          <div className="flex justify-center gap-2.5 flex-wrap">
            {techs.slice(10, 18).map((tech, i) => (
              <TechCard key={i} tech={tech} />
            ))}
          </div>

          {/* Row 3 - 4 */}
          <div className="flex justify-center gap-2.5 flex-wrap">
            {techs.slice(18, 22).map((tech, i) => (
              <TechCard key={i} tech={tech} />
            ))}
          </div>

          {/* Row 4 - 3 */}
          <div className="flex justify-center gap-2.5 flex-wrap">
            {techs.slice(22, 25).map((tech, i) => (
              <TechCard key={i} tech={tech} />
            ))}
          </div>

        </div>

        {/* Stats */}
        <div className="stats-grid mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-card rounded-xl py-7 px-4 text-center ${
                stat.label.includes("Projects") ? "scale-105 border-purple-500" : ""
              }`}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <h2 className="text-3xl font-black">{stat.num}</h2>
              <p className="text-gray-400 mt-1 text-[11px] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStack;