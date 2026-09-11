import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import portrait from "../assets/portrait.jpg";
import { useTheme } from "../context/ThemeContext";

const AboutPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToAbout = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const cardBgClass = isLight
    ? "bg-white border-slate-200/90 shadow-sm text-slate-700"
    : "bg-white/[0.03] border-white/10 text-gray-300";

  const headingClass = isLight ? "text-slate-900" : "text-white";

  return (
    <div className={`w-full min-h-screen py-20 px-6 relative overflow-hidden transition-colors duration-300 ${
      isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#0b0f1a] text-white"
    }`}>
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={handleBackToAbout}
          className={`inline-flex items-center gap-2 text-xs font-mono mb-8 cursor-pointer transition ${
            isLight ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white"
          }`}
        >
          <i className="ri-arrow-left-line" /> Back to About Section
        </button>

        {/* HERO HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-12 border-b pb-10 ${isLight ? "border-slate-200" : "border-white/10"}`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4 uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <i className="ri-user-smile-line" /> Full Biography & Engineering Profile
              </div>

              <h1
                className={`text-4xl md:text-5xl font-black mb-3 ${headingClass}`}
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Prashant Jha
              </h1>

              <p className={`text-base md:text-lg font-mono mb-4 ${
                isLight ? "text-purple-700 font-semibold" : "text-purple-300"
              }`}>
                Full Stack MERN Developer • Founder @ WorkQuora
              </p>

              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-xs rounded-full font-mono border ${
                  isLight ? "bg-slate-100 border-slate-200 text-slate-700 font-semibold" : "bg-white/5 border-white/10 text-gray-300"
                }`}>
                  📍 Bhopal, India
                </span>
                <span className={`px-3 py-1 text-xs rounded-full font-mono border ${
                  isLight ? "bg-slate-100 border-slate-200 text-slate-700 font-semibold" : "bg-white/5 border-white/10 text-gray-300"
                }`}>
                  🎓 B.Tech CSE (LNCT)
                </span>
                <span className="px-3 py-1 text-xs rounded-full font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  ● Available for Freelance & Roles
                </span>
              </div>
            </div>

            {/* Portrait Image */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-2xl" />
              <img
                src={portrait}
                alt="Prashant Jha"
                className="w-[140px] md:w-[160px] h-[170px] md:h-[195px] object-cover rounded-2xl border border-white/15 relative z-10 shadow-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* DETAILED SECTIONS */}
        <div className="flex flex-col gap-10 text-sm md:text-base leading-relaxed">

          {/* Section 1: The Founder & Solo Architect Story */}
          <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
            <h3 className={`text-lg md:text-xl font-bold mb-3 flex items-center gap-2 font-serif ${headingClass}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              1. The Founder & Solo Architect
            </h3>
            <p className="mb-4">
              Solo-designed and engineered <strong>WorkQuora</strong> — a production-ready hyperlocal services marketplace connecting India's skilled workers (electricians, plumbers, AC repair, mechanics, cooks) directly with local clients through verified identity profiles, automated dispatch matching, and payment escrow.
            </p>
            <p>
              Handled the complete technical lifecycle end-to-end: from PostgreSQL/MongoDB database schema indexing and Express API controllers to Socket.io real-time gateways, BullMQ Redis background worker queues, and cross-platform mobile interface design.
            </p>
          </section>

          {/* Section 2: Technical Stack & Engineering Philosophy */}
          <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
            <h3 className={`text-lg md:text-xl font-bold mb-3 flex items-center gap-2 font-serif ${headingClass}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              2. Technical Stack & Architecture
            </h3>
            <p className="mb-4">
              Specialized in building scalable, secure web applications with the <strong>MERN Stack</strong> (React, Node.js, Express, MongoDB) integrated with modern cloud infrastructure:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className={`p-3 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Frontend:</strong> React.js, Tailwind CSS, Framer Motion, GSAP, Context API, Redux Toolkit
              </div>
              <div className={`p-3 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Backend & Real-Time:</strong> Node.js, Express.js, Socket.io WebSockets, Redis, BullMQ
              </div>
              <div className={`p-3 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Database & Security:</strong> MongoDB, Mongoose, JWT, bcrypt, Google OAuth 2.0, TOTP 2FA
              </div>
              <div className={`p-3 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <strong className={isLight ? "text-slate-900" : "text-white"}>Media & Cloud:</strong> Cloudinary API, Vercel SPA Hosting, Render API Deployment
              </div>
            </div>
          </section>

          {/* Section 3: Official Verified Certifications & Credentials */}
          <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
            <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              3. Verified Certifications & Credentials
            </h3>

            <div className="flex flex-col gap-6">
              
              {/* CERTIFICATE 1: Sheryians Coding School (WITH LIVE VERIFICATION LINK) */}
              <div className={`p-5 md:p-6 rounded-2xl border ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
              }`}>
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                  <div>
                    <h4 className={`text-base font-bold ${headingClass}`}>
                      MERN Fullstack Web Development — Certificate of Excellence
                    </h4>
                    <p className={`text-xs font-mono ${isLight ? "text-cyan-700 font-semibold" : "text-cyan-400"}`}>
                      Sheryians Coding School • Cert ID: 7c47dda4-81f3-46ef-b514-c7bc58356e91
                    </p>
                  </div>

                  <a
                    href="https://sheryians.com/certificate/7c47dda4-81f3-46ef-b514-c7bc58356e91"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold inline-flex items-center gap-1.5 transition shadow-md cursor-pointer"
                  >
                    <i className="ri-checkbox-circle-line text-emerald-300" /> Verify Live Certificate →
                  </a>
                </div>

                <p className="text-xs md:text-sm leading-relaxed mb-3">
                  Awarded in recognition of successful completion of intensive MERN Fullstack Web Development bootcamp training, demonstrating mastery over React.js, Node.js, Express, MongoDB, RESTful APIs, authentication security, and production deployment architectures.
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                    Cert ID: 7c47dda4-81f3-46ef-b514-c7bc58356e91
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    Sheryians Coding School Verified
                  </span>
                </div>
              </div>

              {/* CERTIFICATE 2: Infosys Springboard (NO VERIFICATION LINK PER DIRECTIVE) */}
              <div className={`p-5 md:p-6 rounded-2xl border ${
                isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
              }`}>
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div>
                    <h4 className={`text-base font-bold ${headingClass}`}>
                      Basics of Python — Infosys Springboard
                    </h4>
                    <p className={`text-xs font-mono ${isLight ? "text-amber-700 font-semibold" : "text-amber-400"}`}>
                      Infosys Springboard Educational Certification
                    </p>
                  </div>
                </div>

                <p className="text-xs md:text-sm leading-relaxed mb-3">
                  Completed course training in Python programming fundamentals, data structures, conditional control flow, functions, and computational problem solving.
                </p>

                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    Infosys Springboard
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                    Python Fundamentals
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* Section 4: Academic Qualifications */}
          <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
            <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              4. Education & Academic Background
            </h3>

            <div className="flex flex-col gap-4 text-xs md:text-sm">
              <div className={`p-4 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <div className="flex justify-between items-baseline mb-1 flex-wrap gap-1">
                  <h4 className={`font-bold ${headingClass}`}>Bachelor of Technology (B.Tech) in Computer Science & Engineering</h4>
                  <span className="font-mono text-purple-500 font-bold">2023 – 2026</span>
                </div>
                <p className="text-xs opacity-80">Lakshmi Narain College of Technology (LNCT), Bhopal</p>
              </div>

              <div className={`p-4 rounded-2xl border ${isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"}`}>
                <div className="flex justify-between items-baseline mb-1 flex-wrap gap-1">
                  <h4 className={`font-bold ${headingClass}`}>Diploma in Computer Science & Engineering</h4>
                  <span className="font-mono text-purple-500 font-bold">2020 – 2023</span>
                </div>
                <p className="text-xs opacity-80">Patel College of Science & Technology, Bhopal</p>
              </div>
            </div>
          </section>

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <button
              onClick={handleBackToAbout}
              className={`px-8 py-3 rounded-full border text-xs font-semibold hover:opacity-90 transition cursor-pointer shadow-lg inline-flex items-center gap-2 ${
                isLight
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <i className="ri-arrow-left-line" /> Back to Portfolio About Section
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AboutPage;
