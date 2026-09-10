import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const Title = () => {
  const { theme } = useTheme();
  const nameRef = useRef(null);
  const badgeRef = useRef(null);
  const subRef = useRef(null);
  const paraRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    // Update scroll progress bar
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = progress + "%";
    };
    window.addEventListener("scroll", updateProgress);

    // GSAP: Badge fade in
    gsap.from(badgeRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
    });

    // GSAP: Name scale & fade in (runs ONCE on mount)
    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(
      nameRef.current,
      { scale: 1.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.1, ease: "power4.out" }
    ).to(nameRef.current, {
      scale: 1.04,
      duration: 0.15,
      ease: "power2.in",
      yoyo: true,
      repeat: 1,
    }, "-=0.1");

    // Sub elements stagger
    gsap.from([subRef.current, paraRef.current, btnsRef.current], {
      y: 25,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      delay: 1.0,
    });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []); // Run ONCE on mount so theme toggling never re-triggers animation glitches

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center text-center gap-6">

      {/* Badge */}
      <div
        ref={badgeRef}
        className="px-4 py-1.5 rounded-full border border-purple-500/30 text-purple-400 text-sm backdrop-blur-sm bg-purple-500/10 font-mono"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
        Available for freelance work
      </div>

      {/* Name */}
      <div>
        <h1
          ref={nameRef}
          className="font-black text-slate-900 dark:text-white transition-colors duration-300"
          style={{
            fontSize: "clamp(3rem, 10vw, 7rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontFamily: "'Georgia', serif",
            opacity: 0,
          }}
        >
          Prashant Jha
        </h1>

        <div ref={subRef} className="mt-3">
          <h3 className="text-lg md:text-xl font-mono font-semibold tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-300 bg-clip-text text-transparent inline-block py-1">
            Full Stack Developer · Founder @ WorkQuora · MERN
          </h3>
        </div>

        <p ref={paraRef} className="text-slate-600 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          Crafting immersive, high-performance web experiences with production-grade
          architecture, pixel-perfect UI and clean scalable code.
        </p>
      </div>

      {/* Buttons */}
      <div ref={btnsRef} className="flex gap-4 mt-2">
        <button
          onClick={() => scrollTo("projects")}
          className="px-6 py-3 rounded-full text-white font-medium text-sm relative overflow-hidden group shadow-md"
          style={{ background: "linear-gradient(to right, #2563eb, #7c3aed)" }}
        >
          <span className="relative z-10">Explore My Work</span>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to right, #7c3aed, #2563eb)" }}
          />
        </button>

        <button
          onClick={() => scrollTo("contact")}
          className="px-6 py-3 rounded-full border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition text-sm font-medium bg-white dark:bg-transparent cursor-pointer"
        >
          Get In Touch
        </button>
      </div>

    </div>
  );
};

export default Title;
