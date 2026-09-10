// Static Case-Study Data Schema for Portfolio Projects
// Ready to receive real content updates

export const CASE_STUDY_DATA = {
  workquora: {
    title: "WorkQuora",
    subtitle: "KYC-Verified Hyperlocal Services Marketplace",
    status: "Live in Production",
    statusType: "live",
    liveUrl: "https://www.workquora.com",
    githubUrl: "#",
    techTags: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Socket.io", "JWT", "OAuth 2.0"],
    accent: "#3b82f6",
    timelineDuration: "May 2026 – Present (Active Founder Building)",
    
    // 1. Overview
    overview:
      "WorkQuora is a production-ready hyperlocal services marketplace connecting India's skilled workers (electricians, plumbers, AC repair, mechanics, cooks) directly with local clients through verified identity profiles, automated dispatch matching, and payment escrow.",

    // 2. The Problem
    problem:
      "Hiring local skilled workers across Indian cities is heavily fragmented, unreliable, and unverified. Clients rely on informal WhatsApp groups and word-of-mouth without identity verification, job tracking, rating history, or payment safety.",

    // 3. Challenges Faced
    challenges: [
      "Handling real-time job dispatching to nearby workers without high server latency or polling loops.",
      "Offloading SMS, Email OTPs, and heavy background notification tasks away from the main Express HTTP event loop.",
      "Designing resilient fallback mechanisms when Redis or WebSockets encounter cloud deployment restarts on free hosting tiers.",
    ],

    // 4. Tech Stack Rationale (Why Chosen & What Problem Solved)
    techRationale: [
      {
        name: "React.js",
        whyChosen: "Component-driven architecture & fast DOM updates.",
        problemSolved: "Delivered responsive client & worker web dashboards with real-time UI status updates.",
      },
      {
        name: "Node.js & Express.js",
        whyChosen: "Non-blocking I/O & lightweight event loop suitable for WebSocket channels.",
        problemSolved: "Handled asynchronous job requests and role-based auth middleware efficiently.",
      },
      {
        name: "MongoDB & Mongoose",
        whyChosen: "Flexible document model with native geospatial indexing.",
        problemSolved: "Stored worker profiles, KYC documentation, and location coordinates for radius matching.",
      },
      {
        name: "Redis & BullMQ",
        whyChosen: "In-memory data store & message queue system.",
        problemSolved: "Offloaded email notifications & cached frequent database queries to prevent API slowdowns.",
      },
      {
        name: "Socket.io",
        whyChosen: "Bi-directional WebSocket gateway.",
        problemSolved: "Pushed instant job dispatch alerts to nearby workers within milliseconds.",
      },
    ],

    // 5. Architecture & How It Works
    architecture: {
      summary:
        "Engineered with a clean controller-service architecture. Client requests trigger geospatial query matches in MongoDB, while Socket.io gateways broadcast job payloads to targeted worker socket rooms.",
      userRoles: ["Client (Service Buyer)", "Worker (Skilled Provider)", "Administrator (KYC & Dispute Arbiter)"],
      frontendBackendSplit:
        "React SPA on Vercel communicating via REST API and WebSockets to a Node.js/Express service deployed on Render.",
    },

    // 6. UI/UX Highlights (Mockup Screens)
    screens: [
      {
        name: "Client Dispatch Dashboard",
        description: "Instant location-based worker search with verified KYC badges and rating reviews.",
      },
      {
        name: "Worker Real-Time Job Feed",
        description: "Socket.io powered alert modal showing job radius, payment offer, and direct accept button.",
      },
    ],

    // 7. Roadmap (Shipped vs Planned Next)
    roadmap: {
      shipped: [
        "MERN Core Engine & JWT Auth Pipeline",
        "Geospatial Worker Matching & Socket.io Gateway",
        "Redis + BullMQ Queue Integration",
        "KYC Document Verification Schema",
      ],
      planned: [
        "Native Android/iOS App Build via React Native",
        "Razorpay Escrow Automated Payout API",
        "AI-assisted Job Pricing Estimation Engine",
      ],
    },
  },

  "chh-school": {
    title: "CHH School Management System",
    subtitle: "Complete Educational & Campus Ecosystem",
    status: "In Active Development",
    statusType: "progress",
    liveUrl: "https://chh-school-management-system.vercel.app/",
    githubUrl: "#",
    techTags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT"],
    accent: "#f59e0b",
    timelineDuration: "Aug 2026 – Present",

    overview:
      "A comprehensive, multi-role school management ecosystem designed to centralize school administration, academic tracking, student records, and faculty-parent communication.",

    problem:
      "Traditional school administration suffers from isolated paper registers, manual attendance tracking, and disconnected fee processing, leading to administrative delays and lack of real-time parent visibility.",

    challenges: [
      "Structuring a strict multi-role permission matrix isolating sensitive administrative controls from teacher and student views.",
      "Optimizing dense data tables for student records and exam reports without UI lag.",
    ],

    techRationale: [
      {
        name: "React.js & Tailwind CSS",
        whyChosen: "Rapid UI prototyping and high-density dashboard layouts.",
        problemSolved: "Created responsive administrative views and dark-mode data tables.",
      },
      {
        name: "Node.js & MongoDB",
        whyChosen: "Document-oriented schema suited for varying student records.",
        problemSolved: "Centralized attendance history, exam marks, and administrative notices.",
      },
    ],

    architecture: {
      summary:
        "Role-based MERN architecture enforcing strict JWT token permission checks on all academic endpoints.",
      userRoles: ["Administrator", "Teacher / Faculty", "Student", "Parent"],
      frontendBackendSplit: "React SPA deployed on Vercel connected to a RESTful Express API.",
    },

    screens: [
      {
        name: "Admin Campus Overview",
        description: "Real-time attendance summaries, total enrollment stats, and noticeboard controls.",
      },
    ],

    roadmap: {
      shipped: [
        "Core Multi-Role Dashboard Layouts",
        "Student Directory & Registration Schema",
        "Attendance & Class Schedule Modules",
      ],
      planned: [
        "Fee Gateway & Invoice Generation Engine",
        "Exam Report Card PDF Generator",
        "Parent-Teacher Messaging Portal",
      ],
    },
  },

  notewave: {
    title: "Notewave",
    subtitle: "Production-Grade Notes & Asset Security Platform",
    status: "Completed",
    statusType: "live",
    liveUrl: "https://notewave-frontend.vercel.app",
    githubUrl: "https://github.com/prashantjha1448/notewave-frontend",
    techTags: ["React.js", "Node.js", "MongoDB", "JWT", "Cloudinary", "Passport.js"],
    accent: "#a855f7",
    timelineDuration: "2024",

    overview:
      "A secure, full-featured MERN notes app built to solve privacy and asset management problems for students and professionals.",

    problem:
      "Standard note-taking applications lack multi-factor security and media attachment flexibility for privacy-conscious users storing sensitive notes and audio recordings.",

    challenges: [
      "Integrating Two-Factor Authentication (2FA TOTP) seamlessly with authenticator apps.",
      "Handling audio & image media upload streams reliably via Cloudinary APIs.",
    ],

    techRationale: [
      {
        name: "Cloudinary API",
        whyChosen: "Cloud media storage & transformation platform.",
        problemSolved: "Managed audio note recordings and image attachments without overloading server storage.",
      },
      {
        name: "Passport.js & TOTP",
        whyChosen: "Industry-standard auth middleware.",
        problemSolved: "Provided 2FA time-based one-time password security and Google OAuth login.",
      },
    ],

    architecture: {
      summary: "MERN application featuring a 2-tier soft-delete database trash pipeline.",
      userRoles: ["Standard User"],
      frontendBackendSplit: "React frontend on Vercel paired with Node/Express on Render.",
    },

    screens: [
      {
        name: "Notes Dashboard & Trash Bin",
        description: "Soft delete, restore, and Cloudinary media player controls.",
      },
    ],

    roadmap: {
      shipped: ["Full CRUD with Soft Delete", "2FA (TOTP) Authenticator Integration", "Cloudinary Media Attachments"],
      planned: ["Collaborative Shared Notes", "End-to-End Encrypted Vault Notes"],
    },
  },

  lokpriyatam: {
    title: "Lokpriyatam",
    subtitle: "Digital Storefront & Chai Brand Experience",
    status: "Completed",
    statusType: "live",
    liveUrl: "#",
    githubUrl: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
    techTags: ["React.js", "Tailwind CSS", "Framer Motion"],
    accent: "#06b6d4",
    timelineDuration: "2024",

    overview:
      "A modern digital storefront built to solve the online presence and franchise expansion challenges for a local tea stall business.",

    problem:
      "A growing tea stall business lacked a digital presence to showcase its brand identity, menu offerings, customer reviews, and franchise opportunities.",

    challenges: [
      "Creating custom branding layouts and smooth fluid animations that feel premium on mobile devices.",
    ],

    techRationale: [
      {
        name: "Tailwind CSS & Framer Motion",
        whyChosen: "Utility-first styling & spring physics animations.",
        problemSolved: "Delivered interactive menu cards and brand story layouts.",
      },
    ],

    architecture: {
      summary: "Visual-first client React SPA optimized for mobile browsing and fast performance.",
      userRoles: ["Visitor / Customer"],
      frontendBackendSplit: "Standalone React SPA hosted on Vercel.",
    },

    screens: [
      {
        name: "Menu & Franchise Showcase",
        description: "Interactive beverage menu and contact integration for franchise inquiries.",
      },
    ],

    roadmap: {
      shipped: ["Responsive Menu & Brand Layouts", "Franchise Inquiry Form"],
      planned: ["Online Pre-Order & Store Pickup System"],
    },
  },
};
