import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up section title & subtitle
      if (headingRef.current) {
        gsap.from(headingRef.current.children, {
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Fade up scannable cards sequentially
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Fade up portrait container with glow
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          scrollTrigger: { trigger: rightRef.current, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24 flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative clean glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Title */}
        <div ref={headingRef} className="text-center mb-16">
          <h4 className="text-purple-400 tracking-widest text-xs mb-3 uppercase font-mono font-semibold">
            About Me
          </h4>
          <h1
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Building Modern Web Experiences
          </h1>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Side: Scannable Cards (Option 1) */}
          <div
            ref={leftRef}
            className="md:col-span-7 flex flex-col gap-5 text-gray-300 text-sm leading-relaxed"
          >
            {/* Card 1: The Founder */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <i className="ri-rocket-2-line text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">The Founder & Solo Architect</h3>
                  <p className="text-xs text-purple-400 font-mono">Building WorkQuora End-to-End</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                Solo-designed and built <strong>WorkQuora</strong> — a KYC-verified local services marketplace connecting India's skilled workers (plumbers, electricians, cooks, carpenters, mechanics) with local clients. Handled everything from database schema design and auto-dispatch engines to real-time tracking and production deployment.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">Solo Founder</span>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">Production Native Apps</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Auto-Dispatch Engine</span>
              </div>
            </div>

            {/* Card 2: The Stack & Engineering Philosophy */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <i className="ri-code-s-slash-line text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">The Stack & Engineering Philosophy</h3>
                  <p className="text-xs text-blue-400 font-mono">Clean, Scalable & High-Performance</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                Specialized in the <strong>MERN Stack</strong> (React, Node.js, Express, MongoDB) enhanced with Redis, Socket.io, Cloudinary, JWT/OAuth, and Email OTP verification. I focus on clean component architecture, strict security standards, fast API response times, and maintainable production code.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">React.js</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">Node.js</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">Express</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">MongoDB</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">Redis</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">Socket.io</span>
              </div>
            </div>

            {/* Card 3: Vision & Freelance Services */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <i className="ri-compass-3-line text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Vision & Freelance Services</h3>
                  <p className="text-xs text-emerald-400 font-mono">Impactful Products & Client Growth</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4">
                Beyond WorkQuora, I engineer high-performance web applications for freelance clients, offering end-to-end full-stack development, UI optimization, and Generative AI exploration. My mission is to build digital products that solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Freelance Full-Stack</span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">Generative AI Exploration</span>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">Product Strategy</span>
              </div>
            </div>

          </div>

          {/* Right Side: Passport Portrait & Glow */}
          <div
            ref={rightRef}
            className="md:col-span-5 flex justify-center items-center relative py-6"
          >
            {/* Subtle purple background glow */}
            <div
              className="absolute w-[280px] h-[280px] rounded-full blur-[80px] pointer-events-none opacity-40 z-0"
              style={{
                background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
              }}
            />

            {/* Image Container with premium outline glow effect */}
            <div className="relative group z-10 transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Outer decorative gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-transparent -m-[1px] p-[1px] pointer-events-none rounded-2xl" />

              <img
                src={portrait}
                alt="Prashant Jha"
                className="w-[240px] md:w-[280px] h-[300px] md:h-[360px] object-cover rounded-2xl relative z-10 select-none shadow-2xl border border-white/5 transition-all duration-700 grayscale group-hover:grayscale-0"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(168,85,247,0.1)",
                }}
              />

              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/20 z-20 rounded-tl" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/20 z-20 rounded-tr" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/20 z-20 rounded-bl" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/20 z-20 rounded-br" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
