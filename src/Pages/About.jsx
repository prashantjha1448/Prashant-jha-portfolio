import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/portrait.jpg";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger on mount to prevent any opacity glitches when navigating back
    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`w-full min-h-screen px-6 py-24 flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#0b0f1a] text-white"
      }`}
    >
      {/* Decorative clean glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Title */}
        <div ref={headingRef} className="text-center mb-16">
          <h4 className={`tracking-widest text-xs mb-3 uppercase font-mono font-semibold ${
            isLight ? "text-purple-700" : "text-purple-400"
          }`}>
            About Me
          </h4>
          <h1
            className={`text-4xl md:text-5xl font-black ${isLight ? "text-slate-900" : "text-white"}`}
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Building Modern Web Experiences
          </h1>
        </div>

        {/* Content Columns (Aligned items-start at exact top) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
          
          {/* Left Side: Scannable Cards */}
          <div
            ref={leftRef}
            className="md:col-span-7 flex flex-col gap-5 text-sm leading-relaxed"
          >
            {/* Card 1: The Founder */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl group ${
              isLight
                ? "bg-white border-slate-200/90 text-slate-800 hover:border-purple-300"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/40"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <i className="ri-rocket-2-line text-lg" />
                </div>
                <div>
                  <h3 className={`font-semibold text-base ${isLight ? "text-slate-900" : "text-white"}`}>
                    The Founder & Solo Architect
                  </h3>
                  <p className={`text-xs font-mono ${isLight ? "text-purple-700 font-semibold" : "text-purple-400"}`}>
                    Building WorkQuora End-to-End
                  </p>
                </div>
              </div>
              <p className={`text-xs md:text-sm leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                Solo-designed and built <strong>WorkQuora</strong> — a KYC-verified local services marketplace connecting India's skilled workers (plumbers, electricians, cooks, carpenters, mechanics) with local clients. Handled everything from database schema design and auto-dispatch engines to real-time tracking and production deployment.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">Solo Founder</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">Production Native Apps</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">Auto-Dispatch Engine</span>
              </div>
            </div>

            {/* Card 2: The Stack & Engineering Philosophy */}
            <div className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl group ${
              isLight
                ? "bg-white border-slate-200/90 text-slate-800 hover:border-blue-300"
                : "bg-white/5 border-white/10 text-gray-300 hover:border-blue-500/40"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <i className="ri-code-s-slash-line text-lg" />
                </div>
                <div>
                  <h3 className={`font-semibold text-base ${isLight ? "text-slate-900" : "text-white"}`}>
                    The Stack & Engineering Philosophy
                  </h3>
                  <p className={`text-xs font-mono ${isLight ? "text-blue-700 font-semibold" : "text-blue-400"}`}>
                    Clean, Scalable & High-Performance
                  </p>
                </div>
              </div>
              <p className={`text-xs md:text-sm leading-relaxed mb-4 ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                Specialized in the <strong>MERN Stack</strong> (React, Node.js, Express, MongoDB) enhanced with Redis, Socket.io, Cloudinary, JWT/OAuth, and Email OTP verification. I focus on clean component architecture, strict security standards, fast API response times, and maintainable production code.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>React.js</span>
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>Node.js</span>
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>Express</span>
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>MongoDB</span>
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>Redis</span>
                <span className={`px-2.5 py-1 rounded-full border ${isLight ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/5 text-gray-300 border-white/10"}`}>Socket.io</span>
              </div>
            </div>

            {/* Read More Page Link Button */}
            <div className="pt-2">
              <Link
                to="/about"
                className={`w-full py-3.5 px-6 rounded-2xl border font-mono text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md group ${
                  isLight
                    ? "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100"
                    : "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                }`}
              >
                <i className="ri-article-line text-base text-purple-500" />
                Read More About Me & View Certificates
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>

          {/* Right Side: Passport Portrait (Aligned at top with left cards) */}
          <div
            ref={rightRef}
            className="md:col-span-5 flex justify-center items-start relative"
          >
            {/* Subtle background glow */}
            <div
              className="absolute w-[280px] h-[280px] rounded-full blur-[80px] pointer-events-none opacity-40 z-0"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
              }}
            />

            {/* Image Container with premium outline glow effect */}
            <div className="relative group z-10 transition-transform duration-500 hover:scale-[1.02] cursor-default">
              
              {/* Outer decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/30 via-blue-500/20 to-transparent -m-[1px] p-[1px] pointer-events-none" />

              <img
                src={portrait}
                alt="Prashant Jha"
                className="w-[260px] md:w-[300px] h-[320px] md:h-[390px] object-cover rounded-2xl relative z-10 select-none shadow-2xl border border-white/10 transition-all duration-700 grayscale group-hover:grayscale-0"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(168,85,247,0.15)",
                }}
              />

              {/* Status floating badge on portrait image */}
              <div className={`absolute bottom-4 left-4 right-4 z-20 backdrop-blur-md px-3.5 py-2.5 rounded-xl border text-xs font-mono flex items-center justify-between shadow-lg ${
                isLight ? "bg-white/90 border-slate-200 text-slate-800" : "bg-black/75 border-white/15 text-white"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">Prashant Jha</span>
                </div>
                <span className={isLight ? "text-purple-700 font-bold text-[11px]" : "text-purple-400 text-[11px]"}>MERN Dev</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
