import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogAPI } from "../services/api";

export const BLOG_POSTS = [
  {
    slug: "building-workquora-architecture",
    title: "Architecting WorkQuora: Building a Hyperlocal MERN Marketplace Solo",
    summary:
      "A deep dive into how I designed WorkQuora's event-driven dispatch engine, role-based authorization matrix, and data layer to connect India's skilled workers with local clients.",
    date: "Aug 15, 2026",
    readTime: "6 min read",
    tag: "Architecture",
    content: `
Building a hyperlocal services marketplace in India presents unique technical and architectural challenges. Unlike generic e-commerce applications, service marketplaces require instant location-based queries, real-time status updates, and multi-actor security pipelines.

### The 3 Core Architectural Pillars

1. **Role-Based Permission Matrix**:
   WorkQuora operates on three distinct user actors — Clients (requesting services), Workers (responding and providing services), and Administrators (verifying KYC & moderating disputes). Using Express middleware and JWT payload claims, every API route validates token scope before executing database transactions.

2. **Redis + BullMQ Queue Engine**:
   Pushing background SMS notifications, Email OTPs, and job status logs synchronously during HTTP requests degrades API response times. I integrated Redis as a message broker paired with BullMQ queue workers to process async tasks in the background.

3. **Socket.io Event Gateway**:
   When a client posts an emergency repair request, nearby workers receive instant dispatch alerts via Socket.io channels, eliminating the need for client polling loops.

### Technical Takeaway
By combining MERN stack components with Redis caching and event-driven websockets, WorkQuora delivers high uptime and rapid query responses even on modest cloud instances.
    `,
  },
  {
    slug: "auth-security-pipeline-mern",
    title: "Building Production Auth: JWT, Email OTP, and 2FA (TOTP)",
    summary:
      "How to build a production-grade authentication pipeline combining JWT sessions, bcrypt hashing, Email OTP verification, and 2FA TOTP authenticator apps in Node.js.",
    date: "Jul 28, 2026",
    readTime: "5 min read",
    tag: "Security",
    content: `
Security is paramount when building applications that store user data or handle service credentials. During the development of Notewave and WorkQuora, I engineered a multi-layered security pipeline.

### Security Layers Implemented

1. **Password Hashing with Bcrypt**:
   Passwords are never stored in plain text. Pre-save Mongoose hooks generate a 10-round salt to hash passwords before database persistence.

2. **JWT Bearer Token Sessions**:
   Stateless authentication tokens are issued upon login with signed expiration dates. API requests validate the Authorization header on every protected endpoint.

3. **Two-Factor Authentication (TOTP)**:
   For sensitive account operations, users can pair Google Authenticator or Authy apps using time-based one-time password (TOTP) algorithms.

### Lessons Learned
Layered security doesn't have to compromise user experience. Providing seamless fallback mechanisms keeps applications secure while remaining developer-friendly.
    `,
  },
  {
    slug: "realtime-socketio-dispatch-engine",
    title: "Engineering Real-Time Job Dispatching with Socket.io & Redis Fallback",
    summary:
      "A technical look at how event-driven websockets dispatch real-time job requests and maintain resilience when cloud instances restart.",
    date: "Jun 10, 2026",
    readTime: "4 min read",
    tag: "WebSockets",
    content: `
In hyperlocal marketplaces, speed is the primary user retention metric. When a user requests an electrician or plumber, waiting for periodic HTTP polling is unacceptable.

### The Socket.io Dispatch Gateway

WorkQuora uses a bi-directional Socket.io connection pipeline:
- Workers join location-scoped socket rooms upon logging in.
- Job creation events broadcast payload alerts directly to target room subscribers.
- State changes (Job Accepted, En Route, Completed) trigger instant UI updates across client and worker mobile apps.

### Graceful Fallback Architecture
To prevent broken WebSocket connections during cloud server restarts or network blips, the frontend client falls back to short HTTP polling until the socket connection is re-established.
    `,
  },
];

const BlogPage = () => {
  const [blogs, setBlogs] = useState(BLOG_POSTS);

  useEffect(() => {
    window.scrollTo(0, 0);
    blogAPI
      .getBlogs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white py-20 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-14 border-b border-white/10 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition mb-3 cursor-pointer">
              <i className="ri-arrow-left-line" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Engineering Blog
            </h1>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              Articles and technical deep dives on full-stack development, MERN architecture, and WorkQuora.
            </p>
          </div>
        </div>

        {/* Blog Post List */}
        <div className="flex flex-col gap-8">
          {blogs.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-purple-500/40 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs font-mono text-purple-400 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 font-semibold">
                  {post.tag}
                </span>
                <span>•</span>
                <span className="text-gray-400">{post.date}</span>
                <span>•</span>
                <span className="text-gray-400">{post.readTime}</span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors font-serif">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                {post.summary}
              </p>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 font-semibold group-hover:translate-x-1 transition-transform"
              >
                Read Technical Deep Dive →
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
