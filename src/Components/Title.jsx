import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Title = () => {
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

    // GSAP: Name - dark to light + scale 1.9 → 2.2 → 1
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      nameRef.current,
      {
        scale: 1.9,
        opacity: 0,
        color: "#1e2435",
        textShadow: "none",
      },
      {
        scale: 1,
        opacity: 1,
        color: "#ffffff",
        textShadow: "0 0 40px rgba(168,85,247,0.4)",
        duration: 1.2,
        ease: "power4.out",
      }
    ).to(nameRef.current, {
      scale: 1.05,
      duration: 0.15,
      ease: "power2.in",
      yoyo: true,
      repeat: 1,
    }, "-=0.1");

    // Sub elements stagger
    gsap.from([subRef.current, paraRef.current, btnsRef.current], {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 1.2,
    });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center text-center gap-6">

      {/* Badge */}
      <div
        ref={badgeRef}
        className="px-4 py-1.5 rounded-full border border-purple-500/40 text-purple-400 text-sm backdrop-blur-sm"
        style={{ background: "rgba(168,85,247,0.08)" }}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
        Available for freelance work
      </div>

      {/* Name */}
      <div>
        <h1
          ref={nameRef}
          className="font-black text-white"
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

        <div ref={subRef}>
          <h3
            className="text-lg md:text-xl mt-3"
            style={{
              background: "linear-gradient(to right, #60a5fa, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Courier New', monospace",
              letterSpacing: "0.05em",
            }}
          >
            Full Stack Developer · MERN · Creative Coder
          </h3>
        </div>

        <p ref={paraRef} className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          Crafting immersive, high-performance web experiences with production-grade
          architecture, pixel-perfect UI and clean scalable code.
        </p>
      </div>

      {/* Buttons */}
      <div ref={btnsRef} className="flex gap-4 mt-2">
        <button
          onClick={() => scrollTo("projects")}
          className="px-6 py-3 rounded-full text-white font-medium text-sm relative overflow-hidden group"
          style={{ background: "linear-gradient(to right, #3b82f6, #a855f7)" }}
        >
          <span className="relative z-10">Explore My Work</span>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to right, #a855f7, #3b82f6)" }}
          />
        </button>

        <button
          onClick={() => scrollTo("contact")}
          className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm"
        >
          Get In Touch
        </button>
      </div>

    </div>
  );
};

export default Title;
