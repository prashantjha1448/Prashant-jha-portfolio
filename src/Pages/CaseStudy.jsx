import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CASE_STUDY_DATA } from "../data/caseStudies";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = CASE_STUDY_DATA[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-3 font-serif">Case Study Not Found</h2>
        <p className="text-xs text-gray-400 mb-6">The requested case study route doesn't exist.</p>
        <Link to="/" className="px-6 py-2.5 rounded-full bg-purple-600 text-xs font-semibold text-white shadow-lg">
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

        {/* 1. HERO SECTION */}
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
            <span className="text-xs font-mono text-gray-400">
              📅 {project.timelineDuration}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {project.title}
          </h1>

          <p className="text-gray-300 text-sm md:text-base font-mono mb-8">
            {project.subtitle}
          </p>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techTags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* 10. LINKS: Live & Code */}
          <div className="flex gap-4 flex-wrap">
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-xs font-semibold text-white shadow-lg transition-all hover:opacity-90 cursor-pointer"
                style={{ background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)` }}
              >
                Launch Live Demo →
              </a>
            )}
            {project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-xs font-semibold border border-white/20 hover:bg-white/10 transition cursor-pointer"
              >
                <i className="ri-github-line mr-1.5" /> Source Repository
              </a>
            )}
          </div>
        </motion.div>

        {/* 10-SECTION DETAILED CONTENT */}
        <div className="flex flex-col gap-10 text-gray-300 text-sm leading-relaxed">
          
          {/* 2. OVERVIEW */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              1. Project Overview
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.overview}</p>
          </section>

          {/* 3. THE PROBLEM */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              2. The Problem & Gap Solved
            </h2>
            <p className="text-gray-300 leading-relaxed">{project.problem}</p>
          </section>

          {/* 4. CHALLENGES FACED */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              3. Engineering Challenges Faced
            </h2>
            <ul className="flex flex-col gap-3">
              {project.challenges.map((c, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-300">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5. TECH STACK RATIONALE (Why Chosen & What Problem Solved) */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              4. Tech Stack Rationale
            </h2>
            <p className="text-xs text-gray-400 mb-6 font-mono">
              Why each technology was selected and the specific architectural problem it solved:
            </p>
            <div className="flex flex-col gap-4">
              {project.techRationale.map((t, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-white font-mono text-sm">{t.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-1">
                    <strong className="text-purple-300 font-mono">Why Chosen:</strong> {t.whyChosen}
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-emerald-400 font-mono">Problem Solved:</strong> {t.problemSolved}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. ARCHITECTURE / HOW IT WORKS */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              5. System Architecture & User Roles
            </h2>
            <p className="text-gray-300 leading-relaxed mb-5">{project.architecture.summary}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <h4 className="font-mono font-bold text-purple-300 uppercase tracking-wider mb-2">User Roles & Actors</h4>
                <ul className="flex flex-col gap-1 text-gray-300">
                  {project.architecture.userRoles.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <h4 className="font-mono font-bold text-blue-300 uppercase tracking-wider mb-2">Frontend & Backend Split</h4>
                <p className="text-gray-300 leading-relaxed">{project.architecture.frontendBackendSplit}</p>
              </div>
            </div>
          </section>

          {/* 7. UI/UX HIGHLIGHTS & SCREENSHOT MOCKUPS */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-3 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              6. UI/UX & Key Screen Mockups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {project.screens.map((screen, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2">
                  <div className="w-full h-32 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 flex items-center justify-center text-purple-300 font-mono text-xs">
                    <i className="ri-layout-grid-line text-2xl mr-2" /> [Product UI Screen]
                  </div>
                  <h4 className="font-bold text-white text-xs font-mono mt-1">{screen.name}</h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{screen.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. DEVELOPMENT TIMELINE */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-2 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              7. Development Timeline & Duration
            </h2>
            <p className="text-xs text-gray-300 font-mono">{project.timelineDuration}</p>
          </section>

          {/* 9. ROADMAP (Shipped vs Planned Next) */}
          <section className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white mb-4 font-serif flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
              8. Roadmap: Shipped vs Planned Next
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h4 className="font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2.5">✓ Currently Shipped</h4>
                <ul className="flex flex-col gap-1.5 text-gray-300">
                  {project.roadmap.shipped.map((s, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                <h4 className="font-mono font-bold text-purple-300 uppercase tracking-wider mb-2.5">🚀 Planned Next</h4>
                <ul className="flex flex-col gap-1.5 text-gray-300">
                  {project.roadmap.planned.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-purple-400">→</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default CaseStudy;
