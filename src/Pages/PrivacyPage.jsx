import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const PrivacyPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardBgClass = isLight
    ? "bg-white border-slate-200 shadow-sm text-slate-700"
    : "bg-white/[0.03] border-white/10 text-gray-300";

  const headingClass = isLight ? "text-slate-900" : "text-white";

  return (
    <div
      className={`w-full min-h-screen py-20 px-6 relative overflow-hidden transition-colors duration-300 ${
        isLight ? "bg-[#f8fafc] text-slate-900" : "bg-[#0b0f1a] text-white"
      }`}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-xs font-mono mb-8 cursor-pointer transition ${
            isLight ? "text-slate-600 hover:text-slate-900" : "text-gray-400 hover:text-white"
          }`}
        >
          <i className="ri-arrow-left-line" /> Back to Home
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <i className="ri-shield-user-line" /> Privacy & Disclosures
          </div>
          <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${headingClass}`}>
            Privacy Policy
          </h1>
          <p className={`text-sm ${isLight ? "text-slate-500" : "text-gray-400"}`}>
            Effective Date: September 14, 2026 | Last Updated: September 14, 2026
          </p>
        </motion.div>

        {/* Policy Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Section 1: Overview */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>1. Overview</h2>
            <p className="text-sm leading-relaxed mb-3">
              This Privacy Policy describes how <strong>Prashant Jha Portfolio</strong> ("we", "our", or "us") collects, uses, and discloses your personal information when you visit our website (
              <a
                href="https://prashant-jha-portfolio.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline"
              >
                prashant-jha-portfolio.vercel.app
              </a>
              ) or use our mobile applications.
            </p>
            <p className="text-sm leading-relaxed">
              We respect your privacy and are committed to protecting your personal data in full compliance with Google Play Developer User Data Policies and applicable privacy regulations.
            </p>
          </section>

          {/* Section 2: Data We Collect */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>2. Information We Collect</h2>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <h3 className={`font-semibold mb-1 ${headingClass}`}>a) Information You Provide Voluntarily</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong>Account Data:</strong> Name, email address, and profile details when logging in via Google OAuth or registering an account.</li>
                  <li><strong>Feedback & Reviews:</strong> Project ratings, reviews, city/location, and comments submitted to the platform.</li>
                  <li><strong>Contact Inquiries:</strong> Name, email address, and message contents submitted through the contact form.</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-semibold mb-1 ${headingClass}`}>b) Automatically Collected Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li><strong>Usage Analytics:</strong> Anonymous page views, performance metrics, and referrer data via Vercel Analytics.</li>
                  <li><strong>Technical Logs:</strong> IP address, browser type, and operating system for rate-limiting and security audit purposes.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: How We Use Information */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>3. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-2 text-gray-400">
              <li>Authenticate your account and enable authorized interaction with portfolio features.</li>
              <li>Display verified user reviews and feedback on featured showcase projects.</li>
              <li>Respond to direct messages, inquiries, and collaboration requests.</li>
              <li>Detect and prevent spam, unauthorized access, and malicious activity.</li>
            </ul>
          </section>

          {/* Section 4: Data Retention & Security */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>4. Data Storage & Security</h2>
            <p className="text-sm leading-relaxed mb-3">
              Your personal data is transmitted securely using Industry Standard TLS 1.3 (HTTPS) encryption and stored in secure cloud database clusters (MongoDB Atlas & Render Services).
            </p>
            <p className="text-sm leading-relaxed">
              We do not sell, rent, or trade your personal information to any third party for marketing or advertising purposes.
            </p>
          </section>

          {/* Section 5: Third-Party Infrastructure */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>5. Third-Party Services</h2>
            <p className="text-sm leading-relaxed mb-3">
              Our website and mobile app integrate with trusted infrastructure providers:
            </p>
            <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 text-gray-400">
              <li><strong>Vercel Inc.:</strong> Static web hosting and privacy-conscious frontend analytics.</li>
              <li><strong>Render:</strong> Backend API infrastructure hosting.</li>
              <li><strong>MongoDB Atlas:</strong> Encrypted cloud database storage.</li>
              <li><strong>Google OAuth:</strong> Secure single sign-on authentication service.</li>
            </ul>
          </section>

          {/* Section 6: User Rights & Data Deletion */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>6. Your Rights & Account Deletion</h2>
            <p className="text-sm leading-relaxed mb-3">
              You have the right to request access to, correction of, or deletion of your personal data stored on our servers at any time.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              To request account or data deletion, please contact us directly at{" "}
              <a href="mailto:prashantjha1632@gmail.com" className="text-blue-400 hover:underline">
                prashantjha1632@gmail.com
              </a>{" "}
              or use the "Request Account Deletion" action in the mobile app. All associated data will be removed within 7 business days.
            </p>
          </section>

          {/* Section 7: Contact Us */}
          <section className={`p-6 md:p-8 rounded-2xl border backdrop-blur-xl ${cardBgClass}`}>
            <h2 className={`text-xl font-bold mb-3 ${headingClass}`}>7. Developer Contact Information</h2>
            <p className="text-sm leading-relaxed mb-3">
              If you have any questions, concerns, or requests regarding this Privacy Policy, feel free to reach out:
            </p>
            <div className="text-sm space-y-1 font-mono text-gray-400">
              <p>Developer: <strong>Prashant Jha</strong></p>
              <p>Email: <a href="mailto:prashantjha1632@gmail.com" className="text-blue-400 hover:underline">prashantjha1632@gmail.com</a></p>
              <p>Website: <a href="https://prashant-jha-portfolio.vercel.app" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">https://prashant-jha-portfolio.vercel.app</a></p>
            </div>
          </section>
        </motion.div>

        {/* Footer Link Back */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg cursor-pointer"
          >
            <i className="ri-home-4-line" /> Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
