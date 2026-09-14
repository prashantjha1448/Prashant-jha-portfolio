import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adminAPI } from "../config/api";

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getReviews();
      setReviews(data);
    } catch (e) {
      console.warn("Reviews load warning:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review permanently?")) return;
    try {
      setDeletingId(id);
      await adminAPI.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (e) {
      alert(e.message || "Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.user?.name || "").toLowerCase().includes(q) ||
      (r.comment || "").toLowerCase().includes(q) ||
      (r.project || "").toLowerCase().includes(q) ||
      (r.city || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0b0f1a]">
      <Navbar title="Reviews Management Console" />

      <main className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              placeholder="Search reviews by user, project, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          <div className="text-xs font-mono text-gray-400">
            Total Displayed: <span className="text-purple-400 font-bold">{filteredReviews.length}</span> / {reviews.length}
          </div>
        </div>

        {/* Reviews Cards List */}
        {loading ? (
          <div className="py-20 text-center text-gray-400 text-xs">Loading reviews database...</div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-xs">No matching reviews found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev._id}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-white text-sm">{rev.user?.name || "Verified Client"}</h3>
                      <p className="text-[11px] text-gray-400">{rev.city || "India"} · <span className="text-purple-400 font-mono">{rev.project || "WorkQuora"}</span></p>
                    </div>

                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <i className="ri-checkbox-circle-fill" /> Verified
                      </span>
                    )}
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <i
                        key={s}
                        className={`ri-star-fill text-sm ${s <= (rev.rating || 5) ? "text-amber-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{rev.comment}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-500">
                    ID: {rev._id.slice(-8)}
                  </span>

                  <button
                    onClick={() => handleDelete(rev._id)}
                    disabled={deletingId === rev._id}
                    className="px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                  >
                    <i className="ri-delete-bin-line" />
                    {deletingId === rev._id ? "Deleting..." : "Delete Review"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewsManager;
