import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── BACKEND CONFIG ───────────────────────────────────────────────────────────
// Change this URL to your backend API endpoint
const API_URL = "http://localhost:5000/api/contact";
// ─────────────────────────────────────────────────────────────────────────────

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".contact-item"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      // If no backend yet, just simulate success for UI testing
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass =
    "w-full mt-2 px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-300 focus:ring-1";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#0b0f1a] text-white px-6 py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20 contact-item">
          <h4 className="text-purple-400 tracking-widest text-xs mb-4 uppercase">
            Get In Touch
          </h4>
          <h1
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Let's Work Together
          </h1>
          <p className="text-gray-400 mt-4 text-sm">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="flex flex-col gap-5">
            {[
              { icon: "ri-mail-line", label: "Email", value: "prashantjha0108@gmail.com", color: "#3b82f6" },
              { icon: "ri-phone-line", label: "Phone", value: "+91 9981789795", color: "#a855f7" },
              { icon: "ri-map-pin-line", label: "Location", value: "Bhopal, Madhya Pradesh, India", color: "#06b6d4" },
            ].map((item, i) => (
              <div
                key={i}
                className="contact-item flex items-center gap-4 p-5 rounded-xl transition-all duration-300 cursor-default"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${item.color}50`;
                  e.currentTarget.style.boxShadow = `0 0 25px ${item.color}20`;
                  e.currentTarget.style.background = `${item.color}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-lg shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
                >
                  <i className={`${item.icon} text-lg`} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="contact-item">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Connect With Me</p>
              <div className="flex gap-3">
                {[
                  { icon: "ri-github-line", href: "https://github.com/prashantjha1448", color: "#fff" },
                  { icon: "ri-linkedin-line", href: "www.linkedin.com/in/prashantjha1448", color: "#3b82f6" },
                  { icon: "ri-twitter-x-line", href: "https://x.com/Prashantjha1448", color: "#1da1f2" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = `1px solid ${s.color}60`;
                      e.currentTarget.style.background = `${s.color}15`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${s.color}25`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <i className={`${s.icon} text-base`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div
              className="contact-item p-6 rounded-2xl"
              style={{
                border: "1px solid rgba(168,85,247,0.2)",
                background: "linear-gradient(135deg, rgba(168,85,247,0.08), transparent)",
              }}
            >
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "I'm always excited to collaborate on innovative projects and bring creative ideas to life."
              </p>
              <p className="text-gray-500 mt-3 text-xs">— Prashant Jha</p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            className="contact-item p-8 rounded-2xl"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className={inputClass}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wide">Your Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell me about your project..."
                  required
                  className={inputClass}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-full font-medium text-sm transition-all duration-300 relative overflow-hidden"
                style={{
                  background: status === "success"
                    ? "linear-gradient(to right, #10b981, #059669)"
                    : "linear-gradient(to right, #3b82f6, #a855f7)",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" && "Sending..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error" && "Failed — Try Again"}
                {status === "idle" && "Send Message →"}
              </button>

              <p className="text-xs text-gray-600 text-center">
                {/* Backend connect: Change API_URL at top of file to your Express route */}
                Form submits to <code className="text-gray-500">POST /api/contact</code>
              </p>
            </form>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-white/10 pt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
          <div>
            <h2
              className="text-base text-white font-bold"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Prashant Jha
            </h2>
            <p className="text-xs mt-0.5">Full Stack Developer · MERN</p>
          </div>
          <div className="flex gap-6">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  const el = document.getElementById(l.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-white transition text-xs uppercase tracking-wide"
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs">© 2026 Built with ❤️ by Prashant</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
