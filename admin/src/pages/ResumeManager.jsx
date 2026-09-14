import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const ResumeManager = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "Prashant Jha - Full-Stack Developer Resume",
    pdfUrl: "https://prashant-jha-portfolio.vercel.app/resume.pdf",
    summary: "Full-stack software engineer specializing in scalable MERN web products and cross-platform React Native mobile applications.",
    updatedDate: "September 2026",
    active: true,
  });

  const fetchResume = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getResume();
      if (data) {
        setFormData({
          title: data.title || "Prashant Jha - Full-Stack Developer Resume",
          pdfUrl: data.pdfUrl || "https://prashant-jha-portfolio.vercel.app/resume.pdf",
          summary: data.summary || "",
          updatedDate: data.updatedDate || "September 2026",
          active: data.active !== undefined ? data.active : true,
        });
      }
    } catch (e) {
      console.warn("Resume load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await adminAPI.updateResume(formData);
      setMsg("Resume details updated successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to update resume.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Resume Metadata & Link Console" />

      <main className="p-8 space-y-6 max-w-4xl mx-auto w-full">
        {msg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
            <span>{msg}</span>
            <button onClick={() => setMsg("")} className="cursor-pointer">&times;</button>
          </div>
        )}

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white mb-1">Resume Configuration</h2>
          <p className="text-xs text-gray-400 mb-6">Update active resume PDF link, summary, and download button target</p>

          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400">Loading resume config...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Resume Document Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Active Resume PDF Link (Cloud / Public URL)</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Resume Executive Summary</label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Last Updated Date Display</label>
                <input
                  type="text"
                  value={formData.updatedDate}
                  onChange={(e) => setFormData({ ...formData, updatedDate: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <a
                  href={formData.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <i className="ri-external-link-line" /> Test Current PDF Link
                </a>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold cursor-pointer"
                >
                  {submitting ? "Saving..." : "Save Resume Info"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeManager;
