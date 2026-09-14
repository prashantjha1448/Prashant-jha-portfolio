import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    period: "",
    location: "India",
    description: "",
    highlights: "",
    order: 0,
  });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getExperiences();
      setExperiences(data);
    } catch (e) {
      console.warn("Experience load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingItem(exp);
      setFormData({
        company: exp.company || "",
        role: exp.role || "",
        period: exp.period || "",
        location: exp.location || "India",
        description: exp.description || "",
        highlights: Array.isArray(exp.highlights) ? exp.highlights.join("\n") : exp.highlights || "",
        order: exp.order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        company: "",
        role: "",
        period: "",
        location: "India",
        description: "",
        highlights: "",
        order: experiences.length + 1,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await adminAPI.updateExperience(editingItem._id, formData);
      } else {
        await adminAPI.createExperience(formData);
      }
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      alert(err.message || "Failed to save experience.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience entry?")) return;
    try {
      await adminAPI.deleteExperience(id);
      setExperiences((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete experience.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Experience CRUD Manager" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Work Experience & Milestones</h2>
            <p className="text-xs text-gray-400">Add, edit, or remove software engineering positions and client roles</p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white hover:opacity-90 transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <i className="ri-add-line text-base" /> Add Experience
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">Loading experience history...</div>
        ) : experiences.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No experience records found.</div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp._id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-300 mb-2">{exp.company} · <span className="text-gray-500">{exp.location || "India"}</span></p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">{exp.description}</p>

                  {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenModal(exp)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1322] border border-white/10 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-white">{editingItem ? "Edit Experience" : "Add Experience"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. WorkQuora Tech"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full-Stack Engineer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Period</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024 - Present"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR, India"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of responsibilities..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Bullet Highlights (one per line)</label>
                <textarea
                  rows={4}
                  placeholder="Engineered real-time dispatch API...&#10;Built cross-platform React Native app..."
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold cursor-pointer"
                >
                  {submitting ? "Saving..." : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
