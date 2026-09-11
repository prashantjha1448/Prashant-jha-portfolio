import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CASE_STUDY_DATA } from "../data/caseStudies";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = CASE_STUDY_DATA[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackToProjects = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-3 font-serif">Case Study Not Found</h2>
        <p className="text-xs text-gray-400 mb-6">The requested case study route doesn't exist.</p>
        <button
          onClick={handleBackToProjects}
          className="px-6 py-2.5 rounded-full bg-purple-600 text-xs font-semibold text-white shadow-lg cursor-pointer"
        >
          ← Back to Projects
        </button>
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
          onClick={handleBackToProjects}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition mb-10 cursor-pointer"
        >
          <i className="ri-arrow-left-line" /> Back to Projects
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
            className="text-4xl md:text-6xl font-black mb-4 text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-purple-300 font-mono mb-6">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs rounded-full font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-xs font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: `linear-gradient(to right, ${project.accent}, ${project.accent}bb)` }}
              >
                Launch Live Demo →
              </a>
            )}
            {project.repoUrl !== "#" && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-xs font-semibold border border-white/20 hover:bg-white/10 transition"
              >
                View Repository
              </a>
            )}
          </div>
        </motion.div>

        {/* 10-SECTION DETAILED CASE STUDY BODY */}
        <div className="flex flex-col gap-12 text-gray-300 text-sm md:text-base leading-relaxed">
          
          {/* Section 1: Overview */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              1. Project Overview
            </h3>
            <p>{project.overview}</p>
          </section>

          {/* Section 2: Problem & Gap */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              2. The Problem & Gap Solved
            </h3>
            <p>{project.problem}</p>
          </section>

          {/* Section 3: Tech Rationale */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              3. Tech Stack Rationale
            </h3>
            <p>{project.techRationale}</p>
          </section>

          {/* Section 4: Architecture */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              4. System Architecture
            </h3>
            <p>{project.architecture}</p>
          </section>

          {/* Section 5: Key Features */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              5. Key Features & Workflows
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs md:text-sm text-gray-200 flex items-center gap-2">
                  <span className="text-purple-400 font-bold">•</span> {feat}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6: Challenges & Solutions */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              6. Engineering Challenges & Solutions
            </h3>
            <div className="flex flex-col gap-4">
              {project.challenges.map((c, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <h4 className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider mb-1">
                    Challenge: {c.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-300">{c.solution}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Performance & Security */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              7. Performance & Security Measures
            </h3>
            <p>{project.performanceAndSecurity}</p>
          </section>

          {/* Section 8: Metrics & Impact */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              8. Metrics & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <p className="text-xl md:text-2xl font-bold text-purple-300 font-mono mb-1">{m.val}</p>
                  <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Key Learnings */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              9. Lessons Learned
            </h3>
            <p>{project.learnings}</p>
          </section>

          {/* Section 10: Future Roadmap */}
          <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 font-serif">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              10. Future Roadmap
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <h4 className="font-mono font-bold text-emerald-300 uppercase tracking-wider mb-2.5">✓ Shipped Features</h4>
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

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <button
              onClick={handleBackToProjects}
              className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer shadow-lg inline-flex items-center gap-2"
            >
              <i className="ri-arrow-left-line" /> Back to Projects Section
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CaseStudy;
