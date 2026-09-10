import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { reviewsAPI } from "../services/api";

const ReviewsSection = () => {
  const { user, openAuthModal } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Fetch public reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsAPI.getReviews();
      setReviews(data);
    } catch {
      // Fallback empty array or initial state if backend unavailable
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Check if current logged in user has already reviewed
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
      await reviewsAPI.createReview(rating, comment);
      setSuccess("Thank you! Your testimonial has been posted successfully.");
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

        {/* 1. Review Submission Form / Auth Banner */}
        <div className="max-w-2xl mx-auto mb-16 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative">
          {!user ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3 text-xl">
                <i className="ri-chat-heart-line" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Have we worked together or explored my apps?</h3>
              <p className="text-xs text-gray-400 mb-5 max-w-md mx-auto">
                Sign in with a quick visitor account to leave a star rating and feedback on my projects or code.
              </p>
              <button
                onClick={() => openAuthModal("login")}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg cursor-pointer"
              >
                Sign In to Leave a Review →
              </button>
            </div>
          ) : userHasReviewed ? (
            <div className="text-center py-4 text-emerald-400 font-mono text-xs flex flex-col items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm">
                ✓
              </span>
              <span>You have already submitted a review. Thank you for your support!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                Leave a Testimonial as <span className="text-purple-400">{user.name}</span>
              </h3>

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

              {/* Comment Input */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-1.5">Your Review / Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  placeholder="Share your thoughts on Prashant's work, code quality, or WorkQuora..."
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
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Sign in above to share your feedback and leave the first endorsement on Prashant's portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <motion.div
                key={rev._id || Math.random()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-white/10 flex flex-col justify-between relative group hover:border-purple-500/40 transition-all"
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`text-sm ${
                          star <= rev.rating ? "ri-star-fill text-amber-400" : "ri-star-line text-gray-700"
                        }`}
                      />
                    ))}
                    {rev.verified && (
                      <span className="ml-2 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 text-xs leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs font-mono border border-purple-500/30 shrink-0">
                    {rev.user?.name ? rev.user.name[0].toUpperCase() : "V"}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">
                      {rev.user?.name || "Visitor User"}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono">
                      {new Date(rev.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
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
