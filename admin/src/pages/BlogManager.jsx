import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    coverImage: "",
    tags: "",
    readTime: "5 min read",
    published: true,
  });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getBlogs();
      setBlogs(data);
    } catch (e) {
      console.warn("Blogs load error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingItem(blog);
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        summary: blog.summary || "",
        content: blog.content || "",
        coverImage: blog.coverImage || "",
        tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
        readTime: blog.readTime || "5 min read",
        published: blog.published !== undefined ? blog.published : true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        slug: "",
        summary: "",
        content: "",
        coverImage: "",
        tags: "",
        readTime: "5 min read",
        published: true,
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingItem) {
        await adminAPI.updateBlog(editingItem._id, formData);
      } else {
        await adminAPI.createBlog(formData);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      alert(err.message || "Failed to save blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await adminAPI.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete blog post.");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Blog & Articles Manager" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Technical Blog Articles</h2>
            <p className="text-xs text-gray-400">Publish, edit, or delete engineering articles and guides</p>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-bold text-white hover:opacity-90 transition shadow-lg cursor-pointer flex items-center gap-2"
          >
            <i className="ri-add-line text-base" /> New Blog Post
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs text-gray-400">Loading blog articles...</div>
        ) : blogs.length === 0 ? (
          <div className="py-20 text-center text-xs text-gray-400">No blog posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((b) => (
              <div key={b._id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      {b.readTime || "5 min read"}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${b.published ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{b.summary}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenModal(b)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
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
          <div className="bg-[#0e1322] border border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-lg font-bold text-white">{editingItem ? "Edit Blog Article" : "New Blog Article"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Building Production Apps for Android 16"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief article preview summary..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Full Article Content (Markdown supported)</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Article body content..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React Native, Android 16, Expo"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
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
                  {submitting ? "Saving..." : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
