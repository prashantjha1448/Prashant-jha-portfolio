import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  const workExperience = [
    {
      side: "left",
      period: "May 2026 – Present",
      title: "Founder & Full-Stack Engineer",
      place: "WorkQuora",
      desc: "Solo-designed and built a KYC-verified local services marketplace from architecture to production. Full MERN stack, native mobile apps, an auto-dispatch job matching engine, and Razorpay payment escrow.",
      color: "#a855f7",
      icon: "ri-briefcase-line",
    }
  ];

  const education = [
    {
      side: "left",
      period: "2023 – 2026",
      title: "B.Tech in Computer Science",
      place: "Lakshmi Narain College of Technology, Bhopal",
      desc: "Currently pursuing Bachelor's in CSE. Building production-grade MERN apps, implementing full auth pipelines, and learning AI fundamentals.",
      color: "#3b82f6",
      icon: "ri-graduation-cap-line",
    },
    {
      side: "right",
      period: "2020 – 2023",
      title: "Diploma in Computer Science",
      place: "Patel College of Science & Technology, Bhopal",
      desc: "Strong foundation in programming, web technologies, and software engineering fundamentals.",
      color: "#a855f7",
      icon: "ri-book-open-line",
    },
    {
      side: "left",
      period: "2019 – 2020",
      title: "Secondary Education",
      place: "Children's Happy Home , katihar (Bihar)",
      desc: "Completed schooling with general studies background. Started exploring computers and coding.",
      color: "#06b6d4",
      icon: "ri-school-line",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current.querySelectorAll(".timeline-line");
      lines.forEach((line) => {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: "top 80%", end: "bottom 20%", scrub: 1 },
          scaleY: 0,
          transformOrigin: "top",
          ease: "none",
        });
      });

      const cards = sectionRef.current.querySelectorAll(".timeline-card");
      cards.forEach((card) => {
        const side = card.dataset.side;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x: side === "left" ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderTimelineGroup = (items) => (
    <div className="relative">
      {/* Center line on desktop, Left line on mobile */}
      <div
        className="timeline-line absolute left-4 md:left-1/2 top-0 h-full w-[1px] -translate-x-1/2"
        style={{ background: "linear-gradient(to bottom, #3b82f6, #a855f7, #06b6d4)" }}
      />

      {items.map((item, i) => (
        <div
          key={i}
          className={`timeline-card mb-12 flex flex-col md:flex-row ${
            item.side === "left" ? "md:justify-start" : "md:justify-end"
          } w-full relative`}
          data-side={item.side}
        >
          {/* Card wrapper: 100% width on mobile, 5/12 on desktop */}
          <div className="w-full md:w-5/12 pl-12 md:pl-0 relative">
            {/* Timeline Card */}
            <div
              className="p-6 rounded-2xl relative group transition-all duration-400 cursor-default"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${item.color}50`;
                e.currentTarget.style.background = `${item.color}08`;
                e.currentTarget.style.boxShadow = `0 0 30px ${item.color}20`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
              />

              <p className="text-xs font-mono mb-2" style={{ color: item.color }}>
                {item.period}
              </p>
              <h2 className="text-base font-bold mb-1">{item.title}</h2>
              <p className="text-gray-400 text-xs mb-3">{item.place}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>

          {/* Dot - aligned left on mobile, center on desktop */}
          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10"
            style={{
              background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`,
              top: "16px",
              boxShadow: `0 0 20px ${item.color}50`,
            }}
          >
            <i className={`${item.icon} text-xs`} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h4 className="text-blue-400 tracking-widest text-xs mb-4 uppercase font-mono">
            Journey
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Experience & Education
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto leading-relaxed">
            My professional path as a founder and developer alongside my academic foundation.
          </p>
        </div>

        {/* Work Experience Sub-section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10 justify-center md:justify-start border-b border-white/5 pb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg border border-purple-500/20">
              <i className="ri-briefcase-line" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">Work Experience</h2>
              <p className="text-[11px] text-gray-500 uppercase font-mono tracking-wider mt-0.5">Professional ventures & founder roles</p>
            </div>
          </div>
          {renderTimelineGroup(workExperience)}
        </div>

        {/* Education Sub-section */}
        <div>
          <div className="flex items-center gap-3 mb-10 justify-center md:justify-start border-b border-white/5 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-lg border border-blue-500/20">
              <i className="ri-graduation-cap-line" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-wide">Education</h2>
              <p className="text-[11px] text-gray-500 uppercase font-mono tracking-wider mt-0.5">Academic background & credentials</p>
            </div>
          </div>
          {renderTimelineGroup(education)}
        </div>
      </div>
    </section>
  );
};

export default Experience;
