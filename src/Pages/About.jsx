import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      gsap.from(rightRef.current.children, {
        scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
        x: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h4 className="text-blue-400 tracking-widest text-xs mb-4 uppercase">
            About Me
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Building Digital Experiences
          </h1>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left */}
          <div
            ref={leftRef}
            className="p-8 rounded-2xl relative overflow-hidden group transition-all duration-500"
            style={{
              border: "1px solid rgba(168,85,247,0.2)",
              background: "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, transparent 100%)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
              }}
            />

            <p className="text-gray-300 leading-relaxed mb-5 relative z-10">
              I'm a Full Stack Developer skilled in the MERN stack with hands-on experience building
              responsive, secure, and scalable web applications. I specialize in JWT authentication,
              OAuth 2.0, email OTP, 2FA, REST APIs, Cloudinary media storage, and full deployment.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5 relative z-10">
              My journey started with curiosity and evolved into a commitment to excellence — clean
              architecture, best practices, and staying updated with industry trends.
            </p>
            <p className="text-gray-500 leading-relaxed relative z-10">
              When not coding, I explore new technologies, build production-ready projects, and
              sharpen skills in Generative AI and Prompt Engineering.
            </p>
          </div>

          {/* Right */}
          <div ref={rightRef} className="flex flex-col gap-5">
            {[
              {
                icon: "ri-code-s-slash-line",
                title: "Clean Architecture",
                desc: "MVC pattern, scalable schema design, and well-documented RESTful APIs",
              },
              {
                icon: "ri-shield-keyhole-line",
                title: "Secure by Default",
                desc: "JWT, bcrypt, OAuth 2.0, TOTP 2FA, and email OTP — production-grade auth",
              },
              {
                icon: "ri-flashlight-line",
                title: "Performance First",
                desc: "Optimized builds with Vite, lazy loading, and Cloudinary CDN for media",
              },
              {
                icon: "ri-global-line",
                title: "Full Deployment",
                desc: "End-to-end shipping on Vercel + Render with CI/CD and real-world load",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-xl group transition-all duration-300 cursor-default"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(168,85,247,0.4)";
                  e.currentTarget.style.background = "rgba(168,85,247,0.08)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(168,85,247,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-lg shrink-0"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }}
                >
                  <i className={`${item.icon} text-lg`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
