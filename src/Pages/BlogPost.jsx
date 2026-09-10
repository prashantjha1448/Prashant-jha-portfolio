import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "./BlogPage";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link to="/blog" className="px-5 py-2.5 rounded-full bg-purple-600 text-xs font-semibold">
          Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white py-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition mb-10 cursor-pointer"
        >
          <i className="ri-arrow-left-line" /> Back to Articles
        </button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 border-b border-white/10 pb-8"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-purple-400 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 font-semibold">
              {post.tag}
            </span>
            <span>•</span>
            <span className="text-gray-400">{post.date}</span>
            <span>•</span>
            <span className="text-gray-400">{post.readTime}</span>
          </div>

          <h1
            className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {post.title}
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed italic">
            By Prashant Jha — Founder & Full Stack Engineer @ WorkQuora
          </p>
        </motion.div>

        {/* Article Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl text-gray-300 text-sm md:text-base leading-relaxed flex flex-col gap-6"
        >
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg md:text-xl font-bold text-white font-serif mt-4 text-purple-300">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ")) {
              return (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs md:text-sm text-gray-200">
                  {paragraph}
                </div>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default BlogPost;
