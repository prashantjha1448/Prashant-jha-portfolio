import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import portrait from "../assets/portrait.jpg";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS environment variables are missing.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    try {
      const templateParams = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const contactItems = [
    { icon: "ri-map-pin-line", label: "Location", value: "Bhopal, India", color: "#3b82f6" },
    { icon: "ri-mail-line", label: "Email", value: "prashantjha0108@gmail.com", color: "#a855f7" },
    { icon: "ri-phone-line", label: "Phone", value: "+91 9981789795", color: "#06b6d4" },
  ];

  const socialLinks = [
    { icon: "ri-github-line", href: "https://github.com/prashantjha1448", label: "GitHub", color: "#fff" },
    { icon: "ri-linkedin-line", href: "https://linkedin.com/in/prashantjha1448", label: "LinkedIn", color: "#3b82f6" },
    { icon: "ri-twitter-x-line", href: "https://x.com/Prashantjha1448", label: "X (Twitter)", color: "#1da1f2" },
    { icon: "ri-file-download-line", href: "#", label: "Download Resume", color: "#10b981", download: "Prashant_Jha_Resume.pdf" },
  ];

  // Motion animation variants for viewport entering
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen text-white px-6 py-24 relative overflow-hidden bg-gradient-to-b from-[#09090F] via-[#10131D] to-[#09090F] flex items-center justify-center"
    >
      
      {/* ─── BACKGROUND DECORATION ─────────────────────────────────────────────────── */}
      {/* Soft Purple Glow Blob */}
      <div 
        className="absolute top-1/4 left-1/10 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)"
        }}
      />
      {/* Soft Blue Glow Blob */}
      <div 
        className="absolute bottom-1/4 right-1/10 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)"
        }}
      />

      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

      {/* ─── CONTAINER ────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Heading Block */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="text-center mb-16"
        >
          <h4 className="text-purple-400 tracking-widest text-xs mb-3 uppercase font-mono font-semibold">
            Get In Touch
          </h4>
          <h1
            className="text-4xl md:text-5xl font-black text-white max-w-2xl mx-auto leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Let's Build Something Amazing Together
          </h1>
          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Have an idea, startup, freelance project, or full-time opportunity? Let's create something impactful together.
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* LEFT COLUMN: Premium Profile Card (40% width on Desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-5 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between gap-6 cursor-default relative overflow-hidden"
          >
            
            {/* Subtle glow behind card content */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-5">
              
              {/* Header Info: Portrait Image + Name & Role */}
              <div className="flex items-center gap-4">
                
                {/* Passport size Portrait container */}
                <div className="relative shrink-0">
                  {/* Small glow behind photo */}
                  <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-[18px]" />
                  <img
                    src={portrait}
                    alt="Prashant Jha Portrait"
                    loading="lazy"
                    className="w-[100px] md:w-[120px] h-[125px] md:h-[150px] object-cover rounded-[18px] border border-white/15 relative z-10 shadow-md select-none"
                  />
                </div>

                {/* Name, Role & Status */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">Prashant Jha</h2>
                  <p className="text-xs text-purple-400 font-mono">Full Stack MERN Developer</p>
                  
                  {/* Availability Badge */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                      Available for Freelance
                    </span>
                  </div>
                </div>

              </div>

              {/* Bio description */}
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">
                I build scalable, secure, and production-ready web applications using the MERN stack, AI-powered tools, and modern cloud technologies. 
                <span className="block mt-2 text-gray-400">
                  I enjoy transforming ideas into fast, beautiful, and impactful digital products.
                </span>
              </p>

              {/* Contact Info Items */}
              <div className="flex flex-col gap-2.5 mt-2">
                {contactItems.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-3.5 p-3 rounded-xl border border-white/5 bg-white/[0.01] transition-all hover:bg-white/[0.03] hover:border-white/10"
                  >
                    <div 
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-white/95"
                      style={{ background: `linear-gradient(135deg, ${item.color}25, ${item.color}05)` }}
                    >
                      <i className={`${item.icon} text-base`} />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-mono tracking-widest text-gray-500">{item.label}</p>
                      <p className="text-xs font-semibold text-white/95">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Section: Socials + Quote Card */}
            <div className="flex flex-col gap-4">

              {/* Social Links Row */}
              <div className="flex items-center justify-between px-1">
                {socialLinks.map((s, i) => (
                  <div key={i} className="relative group">
                    
                    {/* Tooltip */}
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 text-[10px] font-mono tracking-wide text-white bg-black/90 border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {s.label}
                    </span>

                    <motion.a
                      href={s.href}
                      download={s.download}
                      target={s.href !== "#" ? "_blank" : undefined}
                      rel="noreferrer"
                      whileHover={{ scale: 1.12, rotate: 5, boxShadow: `0 0 15px ${s.color}30` }}
                      transition={{ type: "spring", stiffness: 350, damping: 15 }}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                    >
                      <i className={`${s.icon} text-base`} />
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Quote Card */}
              <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-md">
                <p className="text-gray-300 italic text-xs leading-relaxed">
                  "Great products are built through great collaboration."
                </p>
                <p className="text-gray-500 mt-2 text-[10px] font-mono uppercase tracking-widest">— Prashant Jha</p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT COLUMN: Contact Form Card (60% width on Desktop) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-7 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden"
          >
            
            {/* Subtle glow behind form container */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              
              {/* Grid for Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Subject Input Field */}
              <div>
                <label htmlFor="subject" className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  required
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all placeholder:text-gray-600"
                />
              </div>

              {/* Message Input Field */}
              <div>
                <label htmlFor="message" className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="w-full mt-2 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all resize-none placeholder:text-gray-600"
                />
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3.5 rounded-full font-medium text-sm transition-all duration-500 relative overflow-hidden group cursor-pointer"
                style={{
                  background: status === "success"
                    ? "linear-gradient(to right, #10b981, #059669)"
                    : "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                  boxShadow: status === "success"
                    ? "0 0 20px rgba(16,185,129,0.3)"
                    : "0 0 20px rgba(139,92,246,0.3)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  {status === "loading" && "Sending..."}
                  {status === "success" && "✓ Message Sent Successfully"}
                  {status === "error" && "Failed — Try Again"}
                  {status === "idle" && (
                    <>
                      Start a Project
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </>
                  )}
                </span>

                {/* Shimmer gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed, #db2777)"
                  }}
                />
              </button>

              {/* Inline dynamic feedback messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-emerald-400 text-center font-medium font-mono mt-1"
                  >
                    ✓ I have received your message! I'll get back to you within 24 hours.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-400 text-center font-medium font-mono mt-1"
                  >
                    ✗ Error submitting form. Please try again or mail me directly.
                  </motion.p>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-white/5 bg-black/10 backdrop-blur-md hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 text-gray-500 text-[11px] font-mono uppercase tracking-wider">
          <p>© 2026 Prashant Jha</p>
          <div className="flex gap-6">
            {["About", "Projects", "Experience", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  const el = document.getElementById(l.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-white transition cursor-pointer"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
