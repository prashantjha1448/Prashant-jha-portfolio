import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { resumeAPI } from "../services/api";

const ResumePage = () => {
  const [resumeData, setResumeData] = useState({ pdfUrl: "/resume.pdf" });

  useEffect(() => {
    window.scrollTo(0, 0);
    resumeAPI
      .getResume()
      .then((data) => {
        if (data && data.pdfUrl) setResumeData(data);
      })
      .catch(() => {});
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
            href={resumeData.pdfUrl || "/resume.pdf"}
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
              Full Stack Developer (MERN)
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
              Full Stack Developer with hands-on experience building and shipping production MERN applications, including WorkQuora – a live hyperlocal services marketplace built as my final-year major project – featuring role-based auth, real-time updates, and background job processing. Proficient in JavaScript, React.js, Node.js, Express.js, and MongoDB, with practical experience in JWT authentication, Google OAuth 2.0, Two-Factor Authentication, REST API design, and deployment on Vercel and Render.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 border-b border-white/5 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-white">Languages:</strong> JavaScript (ES6+), HTML5, CSS3
              </div>
              <div>
                <strong className="text-white">Frontend:</strong> React.js, Vite, Tailwind CSS, Context API, React Router, Redux Toolkit, TanStack Query, Framer Motion
              </div>
              <div>
                <strong className="text-white">Backend:</strong> Node.js, Express.js, REST API Design, Socket.io, JWT, bcrypt, OAuth 2.0, MVC Architecture, Redis
              </div>
              <div>
                <strong className="text-white">Database:</strong> MongoDB, Mongoose, MongoDB Atlas, PostgreSQL, Schema Design, CRUD, Aggregation
              </div>
              <div>
                <strong className="text-white">Developer Tools:</strong> Git, GitHub, Postman, VS Code, npm, Vercel, Render, Google Cloud Console
              </div>
              <div>
                <strong className="text-white">Languages Spoken:</strong> English, Hindi
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-4 border-b border-white/5 pb-1">
              Projects
            </h2>
            <div className="flex flex-col gap-6">
              
              {/* WorkQuora */}
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                  <h3 className="text-sm font-bold text-white">WorkQuora <span className="text-xs font-normal text-gray-400">| Final-Year Major Project</span></h3>
                  <span className="text-[11px] font-mono text-gray-400">2024 – Present</span>
                </div>
                <p className="text-xs text-purple-300 font-mono mb-2">React.js, Node.js, Express.js, MongoDB, Redis, BullMQ, Socket.io, JWT, OAuth 2.0</p>
                <ul className="list-disc list-inside text-xs text-gray-300 flex flex-col gap-1.5 leading-relaxed">
                  <li><strong>Problem:</strong> Hiring local workers in India (plumbers, electricians, AC repair, mechanics, etc.) is fragmented – people depend on WhatsApp/Facebook groups and word-of-mouth, with no verified platform or way to check ratings/KYC status</li>
                  <li><strong>Solution:</strong> Designed and deployed a live hyperlocal marketplace connecting clients with nearby verified workers through location-based matching, KYC-backed profiles, and ratings</li>
                  <li>Built secure role-based authentication (JWT, Google OAuth, Email OTP) across Client, Worker, and Admin roles</li>
                  <li>Eliminated API slowdowns from heavy background-job traffic using a Redis + BullMQ queue system, and cut repeated database load via Redis caching</li>
                  <li>Delivered real-time job status updates via Socket.io, with a graceful Redis fallback so the backend stays resilient when Redis is unavailable on Render’s free tier</li>
                </ul>
              </div>

              {/* Notewave */}
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                  <h3 className="text-sm font-bold text-white">Notewave</h3>
                  <span className="text-[11px] font-mono text-gray-400">2024</span>
                </div>
                <p className="text-xs text-purple-300 font-mono mb-2">React.js, Node.js, Express.js, MongoDB, JWT, OAuth 2.0, 2FA (TOTP)</p>
                <ul className="list-disc list-inside text-xs text-gray-300 flex flex-col gap-1.5 leading-relaxed">
                  <li>Built a production-ready MERN notes app with a complete auth pipeline – JWT, Email OTP, Google OAuth 2.0, and Two-Factor Authentication (TOTP); deployed on Vercel + Render</li>
                  <li>Implemented notes CRUD with soft delete, restore, and permanent delete; image & audio attachments; real-time search; profile picture upload; MVC architecture with MongoDB Atlas</li>
                </ul>
              </div>

              {/* Lokpriyatam */}
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1 mb-1">
                  <h3 className="text-sm font-bold text-white">Lokpriyatam</h3>
                  <span className="text-[11px] font-mono text-gray-400">2024</span>
                </div>
                <p className="text-xs text-purple-300 font-mono mb-2">React.js, Tailwind CSS</p>
                <ul className="list-disc list-inside text-xs text-gray-300 flex flex-col gap-1.5 leading-relaxed">
                  <li>Independently designed and built the responsive front-end for a tea stall business, owning UI/UX end-to-end solo – from component design to styling with Tailwind CSS</li>
                </ul>
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
                  <h3 className="font-bold text-white">Lakshmi Narain College of Technology</h3>
                  <p className="text-gray-400">Bachelor of Technology – Computer Science and Engineering</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Bhopal, India</p>
                  <span className="font-mono text-gray-400 text-[11px]">Aug. 2023 – Jul. 2026</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-white">Patel College of Science & Technology</h3>
                  <p className="text-gray-400">Diploma – Computer Science Engineering</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Bhopal, India</p>
                  <span className="font-mono text-gray-400 text-[11px]">Aug. 2020 – Jun. 2023</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-white">Children’s Happy Home</h3>
                  <p className="text-gray-400">10th (Secondary Schooling)</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Bihar, India</p>
                  <span className="font-mono text-gray-400 text-[11px]">2019 – 2020</span>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-3 border-b border-white/5 pb-1">
              Certifications
            </h2>
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div>
                  <strong className="text-white">MERN Fullstack Web Development – Certificate of Excellence</strong>
                  <p className="text-gray-400">Sheryians Coding School (Issued by Harsh Sharma, Director)</p>
                </div>
                <div className="text-right font-mono text-gray-400 text-[11px]">
                  <p>Mar. 2026</p>
                  <p>Aug. 2025 – Mar. 2026</p>
                </div>
              </div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <div>
                  <strong className="text-white">Basics of Python</strong>
                  <p className="text-gray-400">Infosys Springboard</p>
                </div>
                <span className="font-mono text-gray-400 text-[11px]">Feb. 2025</span>
              </div>
            </div>
          </section>

        </motion.div>

      </div>
    </div>
  );
};

export default ResumePage;
