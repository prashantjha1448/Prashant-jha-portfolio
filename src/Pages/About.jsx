import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/portrait.png";

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

      // Fade up paragraphs sequentially
      if (leftRef.current) {
        gsap.from(leftRef.current.children, {
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Side: Professional Bio */}
          <div
            ref={leftRef}
            className="md:col-span-7 flex flex-col gap-6 text-gray-300 text-sm md:text-base leading-relaxed"
          >
            <p>
              I'm a Full Stack MERN Developer passionate about building scalable, secure, and user-focused web applications. I enjoy transforming ideas into real-world digital products with clean architecture and modern UI.
            </p>
            <p>
              My expertise includes React.js, Node.js, Express.js, MongoDB, JavaScript, TypeScript, REST APIs, JWT Authentication, OAuth 2.0, Email OTP Verification, Two-Factor Authentication (2FA), Cloudinary, and production deployment. I focus on writing clean, maintainable, and high-performance code following industry best practices.
            </p>
            <p>
              I have experience building authentication systems, admin dashboards, and full-stack applications while continuously improving performance, scalability, and user experience.
            </p>
            <p>
              Beyond web development, I'm actively exploring Generative AI, Prompt Engineering, and modern development tools to stay ahead of evolving technologies.
            </p>
            <p className="font-medium text-white/90">
              My goal is to build impactful digital products, solve real-world problems, and continuously grow as a software engineer.
            </p>
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
