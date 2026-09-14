import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const EducationManager = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    field: "Computer Science & Engineering",
    period: "",
    grade: "",
    description: "",
    order: 0,
  });

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getEducation();
      setEducationList(data);
    } catch (e) {
      console.warn("Education load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditingItem(edu);
      setFormData({
        institution: edu.institution || "",
        degree: edu.degree || "",
        field: edu.field || "Computer Science & Engineering",
        period: edu.period || "",
        grade: edu.grade || "",
        description: edu.description || "",
        order: edu.order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        institution: "",
        degree: "",
        field: "Computer Science & Engineering",
        period: "",
        grade: "",
        description: "",
        order: educationList.length + 1,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await adminAPI.updateEducation(editingItem._id, formData);
      } else {
        await adminAPI.createEducation(formData);
      }
      setModalOpen(false);
      fetchEducation();
    } catch (err) {
      alert(err.message || "Failed to save education.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await adminAPI.deleteEducation(id);
      setEducationList((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete education.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Education CRUD Manager" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Academic History & Degrees</h2>
            <p className="text-xs text-gray-400">Manage university, degree qualifications, and grade records</p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white hover:opacity-90 transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <i className="ri-add-line text-base" /> Add Education
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">Loading education records...</div>
        ) : educationList.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No education records found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((edu) => (
              <div key={edu._id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{edu.degree}</h3>
                  <p className="text-xs font-semibold text-gray-300 mb-2">{edu.institution} · <span className="text-purple-300">{edu.field}</span></p>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{edu.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenModal(edu)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
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
            <h3 className="text-lg font-bold text-white">{editingItem ? "Edit Education" : "Add Education"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">University / Institution</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AKTU / Technical University"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Degree Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bachelor of Technology (B.Tech)"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Field of Study</label>
                  <input
                    type="text"
                    placeholder="e.g. Computer Science & Engineering"
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
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
                    placeholder="e.g. 2021 - 2025"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Grade / Distinction</label>
                  <input
                    type="text"
                    placeholder="e.g. First Class with Distinction"
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Key subjects & academic achievements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
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
                  {submitting ? "Saving..." : "Save Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationManager;
