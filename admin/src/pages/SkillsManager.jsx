import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 90,
    icon: "",
    order: 0,
  });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getSkills();
      setSkills(data);
    } catch (e) {
      console.warn("Skills load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingItem(skill);
      setFormData({
        name: skill.name || "",
        category: skill.category || "Frontend",
        proficiency: skill.proficiency || 90,
        icon: skill.icon || "",
        order: skill.order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        category: "Frontend",
        proficiency: 90,
        icon: "",
        order: skills.length + 1,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await adminAPI.updateSkill(editingItem._id, formData);
      } else {
        await adminAPI.createSkill(formData);
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert(err.message || "Failed to save skill.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await adminAPI.deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete skill.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Skills & Tech Stack Manager" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Tech Stack & Frameworks</h2>
            <p className="text-xs text-gray-400">Manage frontend, backend, mobile, and devops skill items</p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white hover:opacity-90 transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <i className="ri-add-line text-base" /> Add Skill
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">Loading skills database...</div>
        ) : skills.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No skills found. Click "Add Skill" to create one.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((s) => (
              <div key={s._id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {s.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">{s.proficiency}%</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(s)}
                    className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition cursor-pointer text-xs"
                  >
                    <i className="ri-edit-line" />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs"
                  >
                    <i className="ri-delete-bin-line" />
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
          <div className="bg-[#0e1322] border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">{editingItem ? "Edit Skill" : "Add Skill"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React Native & Expo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#111726] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="DevOps/Tools">DevOps/Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Proficiency Score ({formData.proficiency}%)</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  className="w-full accent-purple-600 cursor-pointer"
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
                  {submitting ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
