import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CASE_STUDY_DATA } from "../data/caseStudies";
import { useTheme } from "../context/ThemeContext";

const CaseStudy = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";
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
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#0b0f1a] text-white"
      }`}>
        <h2 className="text-2xl font-bold mb-3 font-serif">Case Study Not Found</h2>
        <p className={`text-xs mb-6 ${isLight ? "text-slate-600" : "text-gray-400"}`}>
          The requested case study route does not exist.
        </p>
        <button
          onClick={handleBackToProjects}
          className="px-6 py-2.5 rounded-full bg-blue-600 text-xs font-semibold text-white shadow-lg cursor-pointer hover:bg-blue-700 transition"
        >
          ← Back to Projects
        </button>
      </div>
    );
  }

  const cardBgClass = isLight
    ? "bg-white border-slate-200/80 shadow-sm text-slate-700"
    : "bg-white/[0.03] border-white/10 text-gray-300";

  const headingClass = isLight ? "text-slate-900" : "text-white";

  return (
    <div className={`w-full min-h-screen py-20 px-6 relative overflow-hidden transition-colors duration-300 ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-[#0b0f1a] text-white"
    }`}>
      {/* Background Accent Glow */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={handleBackToProjects}
          className={`inline-flex items-center gap-2 text-xs font-mono mb-10 cursor-pointer transition ${
            isLight ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white"
          }`}
        >
          <i className="ri-arrow-left-line" /> Back to Projects
        </button>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-14 border-b pb-10 ${isLight ? "border-slate-200" : "border-white/10"}`}
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
            <span className={`text-xs font-mono ${isLight ? "text-slate-600" : "text-gray-400"}`}>
              📅 {project.timelineDuration}
            </span>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-black mb-4 ${headingClass}`}
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {project.title}
          </h1>

          <p className={`text-lg md:text-xl font-mono mb-6 ${isLight ? "text-purple-700 font-semibold" : "text-purple-300"}`}>
            {project.subtitle || project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techTags?.map((t, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-xs rounded-full font-mono border ${
                  isLight
                    ? "bg-slate-100 border-slate-200 text-slate-700 font-medium"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            {project.liveUrl && project.liveUrl !== "#" && (
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
            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-6 py-3 rounded-full text-xs font-semibold border transition ${
                  isLight
                    ? "border-slate-300 text-slate-800 bg-white hover:bg-slate-100"
                    : "border-white/20 text-white hover:bg-white/10"
                }`}
              >
                View Repository
              </a>
            )}
          </div>
        </motion.div>

        {/* 10-SECTION DETAILED CASE STUDY BODY */}
        <div className="flex flex-col gap-10 text-sm md:text-base leading-relaxed">
          
          {/* Section 1: Overview */}
          {project.overview && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-3 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                1. Project Overview
              </h3>
              <p>{project.overview}</p>
            </section>
          )}

          {/* Section 2: Problem & Gap */}
          {project.problem && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-3 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                2. The Problem & Gap Solved
              </h3>
              <p>{project.problem}</p>
            </section>
          )}

          {/* Section 3: Engineering Challenges */}
          {project.challenges && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                3. Key Engineering Challenges
              </h3>
              <div className="flex flex-col gap-4">
                {Array.isArray(project.challenges) ? (
                  project.challenges.map((c, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${
                      isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
                    }`}>
                      {typeof c === "string" ? (
                        <p className="text-xs md:text-sm flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span> {c}
                        </p>
                      ) : (
                        <div>
                          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
                            isLight ? "text-rose-700" : "text-rose-300"
                          }`}>
                            Challenge: {c.title}
                          </h4>
                          <p className="text-xs md:text-sm">{c.solution}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{project.challenges}</p>
                )}
              </div>
            </section>
          )}

          {/* Section 4: Tech Stack Rationale */}
          {project.techRationale && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                4. Tech Stack Rationale
              </h3>
              {Array.isArray(project.techRationale) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.techRationale.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${
                      isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
                    }`}>
                      {typeof item === "string" ? (
                        <p className="text-xs md:text-sm">{item}</p>
                      ) : (
                        <div>
                          <h4 className={`font-mono font-bold text-xs mb-1.5 ${
                            isLight ? "text-cyan-700" : "text-cyan-300"
                          }`}>{item.name}</h4>
                          <p className="text-xs mb-1">
                            <strong className={isLight ? "text-slate-900" : "text-white"}>Why Chosen:</strong> {item.whyChosen}
                          </p>
                          <p className="text-xs opacity-90">
                            <strong className={isLight ? "text-slate-900" : "text-white"}>Impact:</strong> {item.problemSolved}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{project.techRationale}</p>
              )}
            </section>
          )}

          {/* Section 5: System Architecture (SAFELY HANDLING OBJECTS) */}
          {project.architecture && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                5. System Architecture & Workflow
              </h3>

              {typeof project.architecture === "string" ? (
                <p>{project.architecture}</p>
              ) : (
                <div className="space-y-5">
                  {project.architecture.summary && (
                    <p className="text-xs md:text-sm">{project.architecture.summary}</p>
                  )}

                  {project.architecture.userRoles && (
                    <div>
                      <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                        isLight ? "text-slate-600" : "text-gray-400"
                      }`}>
                        Supported User Roles:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.architecture.userRoles.map((role, rIdx) => (
                          <span
                            key={rIdx}
                            className={`px-3 py-1 text-xs rounded-full font-mono border ${
                              isLight
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                            }`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.architecture.frontendBackendSplit && (
                    <div className={`p-3.5 rounded-2xl border text-xs ${
                      isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-white/5 border-white/5 text-gray-300"
                    }`}>
                      <strong className={isLight ? "text-slate-900" : "text-white"}>Deployment Architecture: </strong>
                      {project.architecture.frontendBackendSplit}
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Section 6: UI/UX Highlights & Screen Walkthroughs */}
          {project.screens && project.screens.length > 0 && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                6. UI/UX Highlights & Screen Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screens.map((screen, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border ${
                    isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
                  }`}>
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
                      isLight ? "text-amber-700" : "text-amber-300"
                    }`}>
                      🖥️ {screen.name}
                    </h4>
                    <p className="text-xs">{screen.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 7: Key Features List */}
          {project.keyFeatures && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                7. Core Features Built
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className={`p-3 rounded-2xl border text-xs md:text-sm flex items-center gap-2 ${
                    isLight ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-white/5 border-white/5 text-gray-200"
                  }`}>
                    <span className="text-purple-500 font-bold">•</span> {feat}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 8: Metrics & Impact */}
          {project.metrics && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                8. Metrics & Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border text-center ${
                    isLight ? "bg-slate-50 border-slate-200" : "bg-white/5 border-white/5"
                  }`}>
                    <p className={`text-xl md:text-2xl font-bold font-mono mb-1 ${
                      isLight ? "text-purple-700" : "text-purple-300"
                    }`}>{m.val}</p>
                    <p className={`text-xs font-mono uppercase tracking-wider ${
                      isLight ? "text-slate-600" : "text-gray-400"
                    }`}>{m.label}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 9: Performance & Security */}
          {project.performanceAndSecurity && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-3 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                9. Performance & Security
              </h3>
              <p>{project.performanceAndSecurity}</p>
            </section>
          )}

          {/* Section 10: Future Roadmap */}
          {project.roadmap && (
            <section className={`p-6 md:p-8 rounded-3xl border ${cardBgClass}`}>
              <h3 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 font-serif ${headingClass}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                10. Shipped Features & Roadmap
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                {project.roadmap.shipped && (
                  <div className={`p-4 rounded-2xl border ${
                    isLight ? "bg-emerald-50/70 border-emerald-200 text-slate-800" : "bg-emerald-500/5 border-emerald-500/20 text-gray-300"
                  }`}>
                    <h4 className={`font-mono font-bold uppercase tracking-wider mb-2.5 ${
                      isLight ? "text-emerald-800" : "text-emerald-300"
                    }`}>✓ Shipped Features</h4>
                    <ul className="flex flex-col gap-1.5">
                      {project.roadmap.shipped.map((s, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.roadmap.planned && (
                  <div className={`p-4 rounded-2xl border ${
                    isLight ? "bg-purple-50/70 border-purple-200 text-slate-800" : "bg-purple-500/5 border-purple-500/20 text-gray-300"
                  }`}>
                    <h4 className={`font-mono font-bold uppercase tracking-wider mb-2.5 ${
                      isLight ? "text-purple-800" : "text-purple-300"
                    }`}>🚀 Planned Next</h4>
                    <ul className="flex flex-col gap-1.5">
                      {project.roadmap.planned.map((p, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">→</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <button
              onClick={handleBackToProjects}
              className={`px-8 py-3 rounded-full border text-xs font-semibold hover:opacity-90 transition cursor-pointer shadow-lg inline-flex items-center gap-2 ${
                isLight
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
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
