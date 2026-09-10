import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { reviewsAPI } from "../services/api";

const PROJECTS_LIST = [
  "WorkQuora",
  "CHH School Management System",
  "Notewave",
  "Lokpriyatam",
  "General Portfolio",
];

const ReviewsSection = () => {
  const { user, openAuthModal } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [rating, setRating] = useState(5);
  const [selectedProject, setSelectedProject] = useState("WorkQuora");
  const [comment, setComment] = useState("");

  // Fetch public reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsAPI.getReviews();
      setReviews(data);
    } catch {
      // Fallback empty array if backend offline
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const userHasReviewed = user && reviews.some((r) => r.user && (r.user._id === user._id || r.user === user._id));

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("login");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await reviewsAPI.createReview(rating, comment, selectedProject, user.city || "India");
      setSuccess("Thank you! Your endorsement has been posted successfully.");
      setComment("");
      fetchReviews();
    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="w-full text-white px-6 py-24 bg-[#090d16] relative overflow-hidden">
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h4 className="text-purple-400 tracking-widest text-xs mb-3 uppercase font-mono font-semibold">
            Testimonials & Endorsements
          </h4>
          <h1
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Visitor Reviews
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-xl mx-auto">
            Feedback, ratings, and recommendations from clients, recruiters, and fellow developers.
          </p>
        </div>

        {/* Form Card (Rendered ONLY when logged in) */}
        {user && (
          <div className="max-w-2xl mx-auto mb-16 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative">
            {userHasReviewed ? (
              <div className="text-center py-4 text-emerald-400 font-mono text-xs flex flex-col items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm">
                  ✓
                </span>
                <span>You have already submitted a review. Thank you for your support!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                <div className="flex justify-between items-center flex-wrap gap-2 mb-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Posting Review as <span className="text-purple-400">{user.name}</span>
                  </h3>
                  <span className="text-xs font-mono text-gray-400">
                    📍 {user.city || "India"}
                  </span>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                    ⚠️ {error}
                  </div>
                )}
                {success && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    ✓ {success}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Star Rating Picker */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-1.5">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-2xl transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                        >
                          <i className={star <= rating ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-600"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Selector Dropdown */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-1.5">Select Project</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white outline-none focus:border-purple-500"
                    >
                      {PROJECTS_LIST.map((p) => (
                        <option key={p} value={p} className="bg-[#0b0f1a] text-white">
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-1.5">Your Review / Endorsement</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    placeholder="Share your thoughts on Prashant's code quality, apps, or WorkQuora..."
                    required
                    minLength={5}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-sm text-white outline-none focus:border-purple-500 transition-all resize-none placeholder:text-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-full font-medium text-xs text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition cursor-pointer shadow-lg mt-1"
                >
                  {submitting ? "Submitting..." : "Post Review →"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. Reviews List Grid / Empty State */}
        {loading ? (
          <div className="text-center py-12 text-gray-500 font-mono text-xs">
            Loading visitor reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 border border-white/5 rounded-3xl bg-white/[0.01] max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 text-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
              <i className="ri-chat-quote-line" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No reviews yet — be the first!</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-5">
              Sign in with a visitor account to leave feedback and post the first endorsement.
            </p>
            {!user && (
              <button
                onClick={() => openAuthModal("login")}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg cursor-pointer"
              >
                Sign In & Leave Review
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between relative group hover:border-purple-500/40 hover:-translate-y-1 transition-all shadow-xl"
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Header: Project Tag & Star Rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/25">
                      {rev.project || "WorkQuora"}
                    </span>

                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`text-xs ${
                            star <= rev.rating ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info & Verified Badge & Location */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs font-mono border border-purple-500/30 shrink-0">
                    {rev.user?.avatar ? (
                      <img src={rev.user.avatar} alt={rev.user.name} className="w-full h-full rounded-full object-cover" />
                    ) : rev.user?.name ? (
                      rev.user.name[0].toUpperCase()
                    ) : (
                      "V"
                    )}
                  </div>

                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-white truncate">
                        {rev.user?.name || "Visitor User"}
                      </h4>
                      {(rev.verified || rev.user?.authProvider === "google" || rev.user?.kycStatus === "verified") && (
                        <i
                          className="ri-checkbox-circle-fill text-blue-400 text-xs shrink-0"
                          title="Verified Account (Google OAuth / OTP Verified)"
                        />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mt-0.5">
                      <span>📍 {rev.city || rev.user?.city || "India"}</span>
                      <span>
                        {new Date(rev.createdAt || Date.now()).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ReviewsSection;
