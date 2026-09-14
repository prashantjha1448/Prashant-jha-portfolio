import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    category: "Full-Stack",
    image: "",
    liveUrl: "",
    githubUrl: "",
    techStack: "",
    featured: false,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getProjects();
      setProjects(data);
    } catch (e) {
      console.warn("Projects load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingItem(project);
      setFormData({
        title: project.title || "",
        slug: project.slug || "",
        tagline: project.tagline || "",
        description: project.description || "",
        category: project.category || "Full-Stack",
        image: project.image || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : project.techStack || "",
        featured: project.featured || false,
        order: project.order || 0,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        category: "Full-Stack",
        image: "",
        liveUrl: "",
        githubUrl: "",
        techStack: "",
        featured: false,
        order: projects.length + 1,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await adminAPI.updateProject(editingItem._id, formData);
      } else {
        await adminAPI.createProject(formData);
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.message || "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await adminAPI.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete project.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Projects CRUD Manager" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">All Showcase Projects</h2>
            <p className="text-xs text-gray-400">Add, edit, or remove full-stack portfolio projects</p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white hover:opacity-90 transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <i className="ri-add-line text-base" /> Add New Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">Loading projects database...</div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No projects found. Click "Add New Project" to create one.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj._id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                      {proj.category || "Full-Stack"}
                    </span>
                    {proj.featured && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{proj.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{proj.tagline || proj.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(Array.isArray(proj.techStack) ? proj.techStack : []).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                        <i className="ri-external-link-line" /> Live
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:underline inline-flex items-center gap-1">
                        <i className="ri-github-line" /> Code
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(proj)}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
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
            <h3 className="text-lg font-bold text-white">{editingItem ? "Edit Project" : "Add New Project"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WorkQuora"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. High-performance job & service marketplace"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed project description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#111726] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Express, MongoDB"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Live URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">GitHub URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300 font-bold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded accent-purple-600"
                  />
                  Featured Project
                </label>

                <div className="flex items-center gap-3">
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
                    {submitting ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
