import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const skillData = [
    {
      title: "Frontend",
      color: "#3b82f6",
      skills: [
        { name: "React.js", val: 92 },
        { name: "Tailwind CSS", val: 90 },
        { name: "JavaScript (ES6+)", val: 93 },
        { name: "HTML5 & CSS3", val: 95 },
        { name: "Vite", val: 84 },
      ],
    },
    {
      title: "Backend & Auth",
      color: "#a855f7",
      skills: [
        { name: "Node.js & Express", val: 88 },
        { name: "REST APIs", val: 90 },
        { name: "JWT & bcrypt", val: 87 },
        { name: "OAuth 2.0 / Passport", val: 85 },
        { name: "2FA (OTP + TOTP)", val: 82 },
      ],
    },
    {
      title: "Database & Tools",
      color: "#06b6d4",
      skills: [
        { name: "MongoDB & Mongoose", val: 88 },
        { name: "MongoDB Atlas", val: 85 },
        { name: "Cloudinary", val: 84 },
        { name: "Git & GitHub", val: 90 },
        { name: "Vercel & Render", val: 86 },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        });

        // Animate progress bars
        const bars = card.querySelectorAll(".skill-bar");
        bars.forEach((bar) => {
          const width = bar.dataset.width;
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              scrollTrigger: { trigger: card, start: "top 80%" },
              width: `${width}%`,
              duration: 1,
              ease: "power2.out",
              delay: 0.3 + i * 0.1,
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h4 className="text-purple-400 tracking-widest text-xs mb-4 uppercase">
            Skills & Expertise
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Technical Arsenal
          </h1>
          <p className="text-gray-400 mt-4 text-sm">
            Production-grade skills built through real-world projects
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillData.map((card, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="p-6 rounded-2xl relative overflow-hidden cursor-default transition-all duration-400"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = `1px solid ${card.color}50`;
                e.currentTarget.style.background = `${card.color}10`;
                e.currentTarget.style.boxShadow = `0 0 40px ${card.color}20, 0 0 80px ${card.color}10`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(to right, ${card.color}, transparent)` }}
              />

              <h2
                className="text-lg font-bold mb-6"
                style={{ color: card.color }}
              >
                {card.title}
              </h2>

              {card.skills.map((skill, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-500">{skill.val}%</span>
                  </div>
                  <div
                    className="w-full h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="skill-bar h-full rounded-full"
                      data-width={skill.val}
                      style={{
                        width: 0,
                        background: `linear-gradient(to right, ${card.color}, ${card.color}99)`,
                        boxShadow: `0 0 8px ${card.color}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
