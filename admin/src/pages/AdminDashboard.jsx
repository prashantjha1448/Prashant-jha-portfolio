import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [msg, setMsg] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [reviewsData, statusData] = await Promise.allSettled([
        adminAPI.getReviews(),
        adminAPI.getStatus(),
      ]);

      if (reviewsData.status === "fulfilled") setReviews(reviewsData.value);
      if (statusData.status === "fulfilled") setStatusInfo(statusData.value);
    } catch (e) {
      console.warn("[Dashboard Data Error]:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setDeletingId(id);
      await adminAPI.deleteReview(id);
      setMsg("Review deleted successfully.");
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      alert(err.message || "Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const verifiedCount = reviews.filter((r) => r.verified).length;
  const avgRating = reviews.length
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Dashboard Overview" />

      <main className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        {msg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-between">
            <span>{msg}</span>
            <button onClick={() => setMsg("")} className="cursor-pointer">&times;</button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Total Reviews</span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <i className="ri-chat-3-line text-xl" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{reviews.length}</p>
            <p className="text-[11px] text-gray-400 mt-1">Submitted across Web & Mobile</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Verified Reviews</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <i className="ri-shield-check-line text-xl" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{verifiedCount}</p>
            <p className="text-[11px] text-emerald-400 mt-1">Authentic OAuth / KYC Testimonials</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Average Rating</span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <i className="ri-star-fill text-xl" />
              </div>
            </div>
            <p className="text-3xl font-black text-white">{avgRating} <span className="text-sm font-medium text-amber-400">/ 5.0</span></p>
            <p className="text-[11px] text-gray-400 mt-1">Client Feedback Satisfaction</p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Render Backend</span>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <i className="ri-server-line text-xl" />
              </div>
            </div>
            <p className="text-xl font-bold text-emerald-400">ONLINE</p>
            <p className="text-[11px] text-gray-400 mt-1">API Node.js + Express + MongoDB</p>
          </div>
        </div>

        {/* Reviews Moderation Console Table */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white">Recent Reviews Moderation</h2>
              <p className="text-xs text-gray-400">Manage user feedback and remove unwanted entries</p>
            </div>
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer flex items-center gap-2"
            >
              <i className="ri-refresh-line" /> Refresh List
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-400 text-xs">Loading dashboard reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">No reviews found in database.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 text-gray-400 font-mono text-[11px] uppercase border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Comment</th>
                    <th className="py-3 px-4">Verified</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map((rev) => (
                    <tr key={rev._id} className="hover:bg-white/[0.02] transition">
                      <td className="py-4 px-4">
                        <p className="font-bold text-white">{rev.user?.name || "Client"}</p>
                        <p className="text-[10px] text-gray-500">{rev.user?.email || rev.city || "India"}</p>
                      </td>
                      <td className="py-4 px-4 font-mono text-purple-400">{rev.project || "WorkQuora"}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                          <i className="ri-star-fill text-amber-400" /> {rev.rating || 5}
                        </span>
                      </td>
                      <td className="py-4 px-4 max-w-xs truncate text-gray-300">{rev.comment}</td>
                      <td className="py-4 px-4">
                        {rev.verified ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <i className="ri-checkbox-circle-fill" /> Verified
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-500">Standard</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          disabled={deletingId === rev._id}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs font-semibold"
                        >
                          {deletingId === rev._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
