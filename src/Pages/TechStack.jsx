import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Small reusable card
const TechCard = ({ tech, index }) => (
  <div
    className="tech-card rounded-xl px-4 py-3.5 text-center flex flex-col justify-center items-center gap-2.5"
    style={{
      border: "1px solid rgba(255,255,255,0.09)",
      background: "rgba(255,255,255,0.04)",
      animationDelay: `${(index % 10) * 0.05}s`,
    }}
  >
    <div className="flex items-center justify-center text-2xl h-8">
      {tech.icon ? (
        <i className={`${tech.icon}`}></i>
      ) : (
        <i className="ri-code-s-slash-line text-purple-400"></i>
      )}
    </div>

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
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools", label: "Tools & DevOps" },
  ];

  const techs = [
    // Languages
    { name: "JavaScript", type: "Language", icon: "devicon-javascript-plain colored", category: "frontend" },
    { name: "HTML5", type: "Markup", icon: "devicon-html5-plain colored", category: "frontend" },
    { name: "CSS3", type: "Styling", icon: "devicon-css3-plain colored", category: "frontend" },

    // Frontend
    { name: "React.js", type: "Frontend", icon: "devicon-react-original colored", category: "frontend" },
    { name: "Redux Toolkit", type: "Frontend", icon: "devicon-redux-original colored", category: "frontend" },
    { name: "Tailwind CSS", type: "Styling", icon: "devicon-tailwindcss-original colored", category: "frontend" },
    { name: "Framer Motion", type: "Frontend", icon: "ri-play-circle-line text-purple-400", category: "frontend" },
    { name: "Context API", type: "State Mgmt", icon: "ri-bubble-chart-line text-blue-400", category: "frontend" },
    { name: "React Router", type: "Routing", icon: "ri-route-line text-red-400", category: "frontend" },

    // Backend & APIs
    { name: "Node.js", type: "Backend", icon: "devicon-nodejs-plain colored", category: "backend" },
    { name: "Express.js", type: "Backend", icon: "devicon-express-original text-gray-400", category: "backend" },
    { name: "REST API", type: "API", icon: "ri-api-line text-emerald-400", category: "backend" },
    { name: "Socket.io", type: "Real-time", icon: "devicon-socketio-original text-white", category: "backend" },
    { name: "Redis", type: "Backend", icon: "devicon-redis-plain colored", category: "backend" },
    { name: "BullMQ", type: "Queue", icon: "ri-list-settings-line text-orange-500", category: "backend" },
    { name: "Nodemailer", type: "Email", icon: "ri-mail-send-line text-blue-500", category: "backend" },

    // Databases & ORMs
    { name: "MongoDB", type: "Database", icon: "devicon-mongodb-plain colored", category: "database" },
    { name: "MongoDB Atlas", type: "Cloud DB", icon: "devicon-mongodb-plain", category: "database" },
    { name: "Mongoose", type: "ODM", icon: "ri-database-2-line text-rose-500", category: "database" },

    // Security & Auth
    { name: "JWT", type: "Auth", icon: "ri-shield-keyhole-line text-purple-400", category: "backend" },
    { name: "bcrypt", type: "Security", icon: "ri-lock-password-line text-yellow-500", category: "backend" },
    { name: "OAuth 2.0", type: "Auth", icon: "devicon-oauth-plain colored", category: "backend" },
    { name: "Passport.js", type: "Auth", icon: "ri-passport-line text-sky-400", category: "backend" },

    // Media & Storage
    { name: "Cloudinary", type: "Media", icon: "ri-image-line text-cyan-400", category: "tools" },

    // Developer Tools & Version Control
    { name: "Git", type: "Version Control", icon: "devicon-git-plain colored", category: "tools" },
    { name: "GitHub", type: "Repo", icon: "devicon-github-original text-white", category: "tools" },
    { name: "Postman", type: "API Tool", icon: "devicon-postman-plain colored", category: "tools" },
    { name: "VS Code", type: "Editor", icon: "devicon-vscode-plain colored", category: "tools" },
    { name: "npm", type: "Package Mgmt", icon: "devicon-npm-original-wordmark colored", category: "tools" },
    { name: "Vite", type: "Build Tool", icon: "devicon-vite-plain colored", category: "tools" },

    // Deployment
    { name: "Vercel", type: "Deployment", icon: "devicon-vercel-original text-white", category: "tools" },
    { name: "Render", type: "Deployment", icon: "ri-server-line text-indigo-400", category: "tools" },
    { name: "Google Cloud", type: "Cloud Tools", icon: "devicon-googlecloud-plain colored", category: "tools" },
  ];





  const filteredTechs = activeCategory === "all"
    ? techs
    : techs.filter((tech) => tech.category === activeCategory);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="w-full text-white px-6 py-24 relative overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h4 className="text-purple-400 tracking-widest text-xs mb-3 uppercase font-mono font-semibold">
            Technologies
          </h4>
          <h1 
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Tech Stack
          </h1>
          <p className="text-gray-400 mt-3 text-sm">
            The tools and technologies I work with on a daily basis
          </p>
        </div>

        {/* Category Pills Tab bar */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-12 relative z-20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/35"
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Responsive Grid with Framer Motion Layout animations */}
        <motion.div 
          layout
          className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 min-h-[380px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechs.map((tech, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                key={tech.name}
              >
                <TechCard tech={tech} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>



      </div>
    </section>
  );
};

export default TechStack;