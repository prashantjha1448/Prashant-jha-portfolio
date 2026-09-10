import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResumePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white py-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Navigation & Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition cursor-pointer">
            <i className="ri-arrow-left-line" /> Back to Portfolio
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            download="Prashant_Jha_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg cursor-pointer"
          >
            <i className="ri-file-download-line text-sm" />
            Download PDF Resume
          </a>
        </div>

        {/* HTML Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl text-gray-300"
        >
          {/* Header Contact Block */}
          <div className="text-center mb-10 border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              Prashant Jha
            </h1>
            <p className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-3">
              Full Stack Developer & Founder @ WorkQuora
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 font-mono">
              <span>📍 Bhopal, MP, India</span>
              <span>📞 +91 9981789795</span>
              <span>✉️ prashantjha0108@gmail.com</span>
              <a href="https://linkedin.com/in/prashant-jha-dev" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                LinkedIn
              </a>
              <a href="https://github.com/prashantjha1448" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                GitHub
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 border-b border-white/5 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-gray-300">
              Full Stack Engineer skilled in the MERN stack with hands-on experience building responsive, secure, and scalable web applications. Founder of WorkQuora, a hyperlocal service marketplace. Proficient in JavaScript, TypeScript, React.js, Node.js, Express.js, and MongoDB. Experienced in JWT authentication, Google OAuth 2.0, Redis caching, Socket.io real-time engine, and full production deployment on Vercel and Render.
            </p>
          </section>

          {/* Work Experience */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-4 border-b border-white/5 pb-1">
              Work Experience
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-white">Founder & Full-Stack Engineer — WorkQuora</h3>
                  <span className="text-[11px] font-mono text-gray-400">May 2026 – Present</span>
                </div>
                <p className="text-xs text-gray-400 mb-2 font-mono">Bhopal, MP, India | MERN Stack & Cloud</p>
                <ul className="list-disc list-inside text-xs text-gray-300 flex flex-col gap-1.5 leading-relaxed">
                  <li>Solo-designed and built a hyperlocal service marketplace connecting clients with nearby verified workers.</li>
                  <li>Architected role-based JWT authentication across Client, Worker, and Admin interfaces.</li>
                  <li>Integrated Redis + BullMQ queueing to offload background notification jobs and optimize database queries.</li>
                  <li>Implemented real-time Socket.io job dispatching engine with fallback resilience for high uptime.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 border-b border-white/5 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-white">Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3
              </div>
              <div>
                <strong className="text-white">Frontend:</strong> React.js, Redux Toolkit, Tailwind CSS, Framer Motion, Context API
              </div>
              <div>
                <strong className="text-white">Backend & APIs:</strong> Node.js, Express.js, REST APIs, Socket.io, Redis, BullMQ
              </div>
              <div>
                <strong className="text-white">Database & Security:</strong> MongoDB, Mongoose, JWT, bcrypt, OAuth 2.0, 2FA
              </div>
              <div>
                <strong className="text-white">Dev & Cloud Tools:</strong> Git, GitHub, Postman, VS Code, Vercel, Render
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-4 border-b border-white/5 pb-1">
              Education
            </h2>
            <div className="flex flex-col gap-4 text-xs">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-white">Bachelor of Technology (B.Tech) in Computer Science & Engineering</h3>
                  <p className="text-gray-400">Lakshmi Narain College of Technology (LNCT), Bhopal</p>
                </div>
                <span className="font-mono text-gray-400 text-[11px]">2023 – 2026</span>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-white">Diploma in Computer Science & Engineering</h3>
                  <p className="text-gray-400">Patel College of Science & Technology, Bhopal</p>
                </div>
                <span className="font-mono text-gray-400 text-[11px]">2020 – 2023</span>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 border-b border-white/5 pb-1">
              Certifications & Accomplishments
            </h2>
            <ul className="list-disc list-inside text-xs text-gray-300 flex flex-col gap-1.5">
              <li>MERN Fullstack Web Development Certificate of Excellence — Sheryians Coding School</li>
              <li>Basics of Python — Infosys Springboard</li>
            </ul>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default ResumePage;
