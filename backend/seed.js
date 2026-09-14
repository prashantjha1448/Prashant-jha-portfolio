import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Profile from './src/models/Profile.js';
import Project from './src/models/Project.js';
import Certificate from './src/models/Certificate.js';
import Education from './src/models/Education.js';
import WorkExperience from './src/models/WorkExperience.js';
import SocialLink from './src/models/SocialLink.js';
import TechStackItem from './src/models/TechStackItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('[SEED ERROR] MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB database for seeding...');

    // 1. Profile Data
    const profileData = {
      name: 'Prashant Jha',
      tagline: 'Freelance Engineer',
      taglineRotating: [
        'Full Stack Developer',
        'Founder @ WorkQuora',
        'MERN Stack Architect',
        'Freelance Engineer',
      ],
      bio: {
        founderStory:
          "Solo-designed and engineered WorkQuora — a production-ready hyperlocal services marketplace connecting India's skilled workers (electricians, plumbers, AC repair, mechanics, cooks) directly with local clients through verified identity profiles, automated dispatch matching, and payment escrow. Handled the complete technical lifecycle end-to-end: from PostgreSQL/MongoDB database schema indexing and Express API controllers to Socket.io real-time gateways, BullMQ Redis background worker queues, and cross-platform mobile interface design.",
        stackPhilosophy:
          'Specialized in building scalable, secure web applications with the MERN Stack (React, Node.js, Express, MongoDB) integrated with modern cloud infrastructure.',
      },
      location: 'Bhopal, MP, India',
      educationTags: ['B.Tech CSE (LNCT)'],
      availabilityStatus: 'Available for Freelance & Roles',
      stats: {
        projectsShipped: 4,
        yearsExperience: '1+',
        featuresBuilt: '25+',
        codeCommits: '500+',
      },
      quote: 'Great products are built through great collaboration. — Prashant Jha',
      contact: {
        email: 'prashantjha0108@gmail.com',
        phone: '+91 9981789795',
        github: 'https://github.com/prashantjha1448',
        linkedin: 'https://linkedin.com/in/prashant-jha-dev',
        twitter: 'https://x.com/Prashantjha1448',
      },
    };

    await Profile.findOneAndUpdate({ name: profileData.name }, profileData, {
      upsert: true,
      new: true,
    });
    console.log('✔ Profile seeded');

    // 2. Projects Data
    const projectsData = [
      {
        title: 'WorkQuora',
        slug: 'workquora',
        subtitle: 'Flagship Hyperlocal Marketplace',
        category: 'flagship',
        description:
          "A KYC-verified local services marketplace connecting India's skilled workers (plumbers, electricians, mechanics, cooks) with local clients. Features real-time job dispatching, escrow payments, and native mobile apps.",
        metrics: [
          { label: 'Verification', value: '100% KYC' },
          { label: 'Security', value: 'Escrow Locked' },
          { label: 'Engine', value: 'Auto-Dispatch' },
        ],
        techStack: [
          'React.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Redis',
          'BullMQ',
          'Socket.io',
          'JWT',
          'OAuth 2.0',
        ],
        liveUrl: 'https://www.workquora.com',
        caseStudyUrl: '/projects/workquora',
        githubUrl: 'https://github.com/prashantjha1448',
        status: 'live',
        timelineLabel: '2024 – Present',
        order: 1,
        isFlagship: true,
        caseStudy: {
          problem:
            'Hiring local skilled workers across Indian cities is heavily fragmented, unreliable, and unverified. Clients rely on informal WhatsApp groups and word-of-mouth without identity verification, job tracking, rating history, or payment safety.',
          engineeringChallenges: [
            'Handling real-time job dispatching to nearby workers without high server latency or polling loops.',
            'Offloading SMS, Email OTPs, and heavy background notification tasks away from the main Express HTTP event loop.',
            'Designing resilient fallback mechanisms when Redis or WebSockets encounter cloud deployment restarts on free hosting tiers.',
          ],
          techStackRationale: [
            {
              tech: 'React.js',
              whyChosen: 'Component-driven architecture & fast DOM updates',
              impact: 'Responsive dashboards with real-time UI status updates',
            },
            {
              tech: 'Node.js & Express.js',
              whyChosen: 'Non-blocking I/O suitable for WebSocket channels',
              impact: 'Handled async job requests and role-based auth middleware',
            },
            {
              tech: 'MongoDB & Mongoose',
              whyChosen: 'Flexible document model with native geospatial indexing',
              impact: 'Stored worker profiles, KYC docs, location coords',
            },
            {
              tech: 'Redis & BullMQ',
              whyChosen: 'In-memory store & message queue',
              impact: 'Offloaded email notifications & cached frequent queries',
            },
            {
              tech: 'Socket.io',
              whyChosen: 'Bi-directional WebSocket gateway',
              impact: 'Pushed instant job dispatch alerts within milliseconds',
            },
          ],
          architecture:
            'Engineered with a clean controller-service architecture. Client requests trigger geospatial query matches in MongoDB, while Socket.io gateways broadcast job payloads to targeted worker socket rooms.',
          deployment:
            'React SPA on Vercel communicating via REST API and WebSockets to a Node.js/Express service deployed on Render.',
          supportedRoles: [
            'Client (Service Buyer)',
            'Worker (Skilled Provider)',
            'Administrator (KYC & Dispute Arbiter)',
          ],
          shippedFeatures: [
            'MERN Core Engine & JWT Auth Pipeline',
            'Geospatial Worker Matching & Socket.io Gateway',
            'Redis + BullMQ Queue Integration',
            'KYC Document Verification Schema',
          ],
          plannedFeatures: [
            'Native Android/iOS App Build via React Native',
            'Razorpay Escrow Automated Payout API',
            'AI-assisted Job Pricing Estimation Engine',
          ],
        },
      },
      {
        title: 'CHH School Management System',
        slug: 'chh-school',
        subtitle: 'Complete Educational Ecosystem',
        category: 'dev',
        description:
          'Comprehensive school management platform engineered to handle campus administration, student records, fee tracking, and multi-role portal workflows.',
        metrics: [
          { label: 'Roles', value: 'Multi-User Roles' },
          { label: 'Records', value: 'Full Academic' },
          { label: 'Portals', value: 'Admin & Student' },
        ],
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        liveUrl: 'https://chh-school.vercel.app',
        caseStudyUrl: '/projects/chh-school',
        githubUrl: 'https://github.com/prashantjha1448',
        status: 'dev',
        timelineLabel: 'Aug 2026 – Present',
        order: 2,
        isFlagship: false,
        caseStudy: {
          problem:
            'Traditional school administration suffers from isolated paper registers, manual attendance tracking, and disconnected fee processing, leading to administrative delays and lack of real-time parent visibility.',
          engineeringChallenges: [
            'Structuring a strict multi-role permission matrix isolating sensitive administrative controls from teacher and student views.',
            'Optimizing dense data tables for student records and exam reports without UI lag.',
          ],
          techStackRationale: [
            {
              tech: 'React.js & Tailwind CSS',
              whyChosen: 'Rapid UI prototyping & high-density dashboard layouts',
              impact: 'Responsive admin views and dark-mode data tables',
            },
            {
              tech: 'Node.js & MongoDB',
              whyChosen: 'Document-oriented schema suited for varying student records',
              impact: 'Centralized attendance history, exam marks, admin notices',
            },
          ],
          architecture:
            'Role-based MERN architecture enforcing strict JWT token permission checks on all academic endpoints.',
          deployment: 'React SPA deployed on Vercel connected to a RESTful Express API.',
          uiHighlight:
            'Admin Campus Overview — Real-time attendance summaries, total enrollment stats, and noticeboard controls.',
          supportedRoles: ['Administrator', 'Teacher/Faculty', 'Student', 'Parent'],
          shippedFeatures: [
            'Core Multi-Role Dashboard Layouts',
            'Student Directory & Registration Schema',
            'Attendance & Class Schedule Modules',
          ],
          plannedFeatures: [
            'Fee Gateway & Invoice Generation Engine',
            'Exam Report Card PDF Generator',
            'Parent-Teacher Messaging Portal',
          ],
        },
      },
      {
        title: 'Notewave',
        slug: 'notewave',
        subtitle: 'Secure Productivity Notes App',
        category: 'live',
        description:
          'Production-grade MERN notes application with JWT, Email OTP, Google OAuth 2.0, 2FA security, soft delete recovery, and Cloudinary media uploads.',
        metrics: [
          { label: 'Security', value: '2FA & OAuth' },
          { label: 'Media', value: 'Cloudinary' },
          { label: 'CRUD', value: 'Soft Delete' },
        ],
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'OAuth 2.0', '2FA (TOTP)', 'Cloudinary'],
        liveUrl: 'https://notewave.vercel.app',
        githubUrl: 'https://github.com/prashantjha1448/notewave-frontend',
        status: 'live',
        timelineLabel: '2024',
        order: 3,
        isFlagship: false,
      },
      {
        title: 'Lokpriyatam',
        slug: 'lokpriyatam',
        subtitle: 'Digital Storefront & Franchise Platform',
        category: 'live',
        description:
          'Modern responsive digital storefront built for a local tea brand business to accelerate brand presence, showcase menu items, and power franchise expansion.',
        metrics: [
          { label: 'Design', value: 'Modern UI' },
          { label: 'Business', value: 'Franchise Module' },
          { label: 'Speed', value: 'Lighthouse 98+' },
        ],
        techStack: ['React.js', 'Tailwind CSS', 'GSAP'],
        liveUrl: 'https://lokpriyatam.com',
        githubUrl: 'https://github.com/prashantjha1448/Lokpriyatam-frontend',
        status: 'live',
        timelineLabel: '2024',
        order: 4,
        isFlagship: false,
      },
    ];

    for (const project of projectsData) {
      await Project.findOneAndUpdate({ slug: project.slug }, project, {
        upsert: true,
        new: true,
      });
    }
    console.log(`✔ ${projectsData.length} Projects seeded`);

    // 3. Certificates Data
    const certificatesData = [
      {
        title: 'MERN Fullstack Web Development – Certificate of Excellence',
        issuer: 'Sheryians Coding School (Issued by Harsh Sharma, Director)',
        certId: 'SHERYIANS-MERN-CERT',
        verifyUrl: 'https://sheryians.com',
        description:
          'Awarded in recognition of successful completion of intensive MERN Fullstack Web Development training (Aug. 2025 – Mar. 2026). Mastery over React.js, Node.js, Express, MongoDB, RESTful APIs, authentication security, and production deployment architectures.',
        tags: ['Sheryians Coding School Verified', 'MERN Stack'],
      },
      {
        title: 'Basics of Python',
        issuer: 'Infosys Springboard',
        certId: 'INFOSYS-PYTHON-BASIC',
        verifyUrl: 'https://infosys.com',
        description:
          'Completed course training in Python programming fundamentals, data structures, conditional control flow, functions, and computational problem solving in Feb. 2025.',
        tags: ['Infosys Springboard', 'Python Fundamentals'],
      },
    ];

    for (const cert of certificatesData) {
      await Certificate.findOneAndUpdate({ title: cert.title }, cert, {
        upsert: true,
        new: true,
      });
    }
    console.log(`✔ ${certificatesData.length} Certificates seeded`);

    // 4. Education Data (ACCORDING TO RESUME)
    const educationData = [
      {
        degree: 'Bachelor of Technology – Computer Science and Engineering',
        institution: 'Lakshmi Narain College of Technology',
        startYear: 'Aug. 2023',
        endYear: 'Jun. 2026',
        description:
          'Pursuing B.Tech in CSE at LNCT Bhopal, India. Focus on Data Structures, Algorithms, Software Engineering Principles, and MERN Full Stack Application Development.',
      },
      {
        degree: 'Diploma – Computer Science Engineering',
        institution: 'Patel College of Science & Technology',
        startYear: 'Aug. 2020',
        endYear: 'Jun. 2023',
        description:
          'Completed Diploma in CSE at PCST Bhopal, India. Strong foundation in web development, database management, and programming fundamentals.',
      },
    ];

    // Clear old invalid dummy education entries if present
    await Education.deleteMany({ institution: { $regex: /AKTU|Technical University/i } });

    for (const edu of educationData) {
      await Education.findOneAndUpdate(
        { degree: edu.degree, institution: edu.institution },
        edu,
        { upsert: true, new: true }
      );
    }
    console.log(`✔ ${educationData.length} Education records seeded (Resume accurate)`);

    // 5. Work Experience Data
    const workExperienceData = [
      {
        role: 'Founder & Full Stack Developer',
        company: 'WorkQuora',
        startDate: '2024',
        endDate: 'Present',
        location: 'Bhopal, MP, India',
        description: [
          'Hiring local workers in India (plumbers, electricians, AC repair, mechanics, etc.) is fragmented and unreliable – designed and deployed a live hyperlocal marketplace connecting clients with nearby verified workers through location-based matching, KYC-backed profiles, and ratings.',
          'Built secure role-based authentication (JWT, Google OAuth, Email OTP) across Client, Worker, and Admin roles.',
          'Eliminated API slowdowns from heavy notification and background-job traffic by offloading work to a Redis + BullMQ queue system, and reduced repeated database load by introducing Redis caching.',
          'Delivered real-time job status updates via Socket.io, and engineered a graceful Redis fallback so the backend stays resilient in production when Redis is unavailable on Render’s free tier.',
        ],
        techStack: [
          'React.js',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Redis',
          'BullMQ',
          'Socket.io',
          'JWT',
          'OAuth 2.0',
        ],
      },
    ];

    for (const exp of workExperienceData) {
      await WorkExperience.findOneAndUpdate(
        { role: exp.role, company: exp.company },
        exp,
        { upsert: true, new: true }
      );
    }
    console.log(`✔ ${workExperienceData.length} Work Experience records seeded`);

    // 6. Social Links Data
    const socialLinksData = [
      {
        platform: 'GitHub',
        url: 'https://github.com/prashantjha1448',
        icon: 'ri-github-line',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/prashant-jha-dev',
        icon: 'ri-linkedin-line',
      },
      {
        platform: 'X (Twitter)',
        url: 'https://x.com/Prashantjha1448',
        icon: 'ri-twitter-x-line',
      },
      {
        platform: 'Email',
        url: 'mailto:prashantjha0108@gmail.com',
        icon: 'ri-mail-line',
      },
    ];

    for (const link of socialLinksData) {
      await SocialLink.findOneAndUpdate({ platform: link.platform }, link, {
        upsert: true,
        new: true,
      });
    }
    console.log(`✔ ${socialLinksData.length} Social Links seeded`);

    // 7. Tech Stack Items Data
    const techStackItemsData = [
      // Frontend
      { name: 'JavaScript (ES6+)', category: 'Frontend', icon: 'javascript' },
      { name: 'HTML5', category: 'Frontend', icon: 'html5' },
      { name: 'CSS3', category: 'Frontend', icon: 'css3' },
      { name: 'React.js', category: 'Frontend', icon: 'react' },
      { name: 'Vite', category: 'Frontend', icon: 'vite' },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'tailwindcss' },
      { name: 'Context API', category: 'Frontend', icon: 'react' },
      { name: 'React Router', category: 'Frontend', icon: 'reactrouter' },
      { name: 'Redux Toolkit', category: 'Frontend', icon: 'redux' },
      { name: 'TanStack Query', category: 'Frontend', icon: 'tanstack' },
      { name: 'Framer Motion', category: 'Frontend', icon: 'framer' },

      // Backend
      { name: 'Node.js', category: 'Backend', icon: 'nodedotjs' },
      { name: 'Express.js', category: 'Backend', icon: 'express' },
      { name: 'REST API Design', category: 'Backend', icon: 'api' },
      { name: 'Socket.io', category: 'Backend', icon: 'socketdotio' },
      { name: 'MVC Architecture', category: 'Backend', icon: 'architecture' },
      { name: 'Redis', category: 'Backend', icon: 'redis' },
      { name: 'BullMQ', category: 'Backend', icon: 'bullmq' },

      // Database
      { name: 'MongoDB', category: 'Database', icon: 'mongodb' },
      { name: 'Mongoose', category: 'Database', icon: 'mongoose' },
      { name: 'MongoDB Atlas', category: 'Database', icon: 'mongodb' },
      { name: 'Schema Design', category: 'Database', icon: 'database' },
      { name: 'CRUD & Aggregation', category: 'Database', icon: 'database' },

      // Security/Auth
      { name: 'JWT', category: 'Security/Auth', icon: 'jwt' },
      { name: 'bcrypt', category: 'Security/Auth', icon: 'lock' },
      { name: 'OAuth 2.0 (Google)', category: 'Security/Auth', icon: 'oauth' },
      { name: '2FA (TOTP)', category: 'Security/Auth', icon: 'shield' },

      // Tools & DevOps
      { name: 'Git', category: 'Tools & DevOps', icon: 'git' },
      { name: 'GitHub', category: 'Tools & DevOps', icon: 'github' },
      { name: 'Postman', category: 'Tools & DevOps', icon: 'postman' },
      { name: 'VS Code', category: 'Tools & DevOps', icon: 'vscode' },
      { name: 'npm', category: 'Tools & DevOps', icon: 'npm' },
      { name: 'Vercel', category: 'Tools & DevOps', icon: 'vercel' },
      { name: 'Render', category: 'Tools & DevOps', icon: 'render' },
      { name: 'Google Cloud Console', category: 'Tools & DevOps', icon: 'googlecloud' },
    ];

    for (const item of techStackItemsData) {
      await TechStackItem.findOneAndUpdate({ name: item.name }, item, {
        upsert: true,
        new: true,
      });
    }
    console.log(`✔ ${techStackItemsData.length} Tech Stack Items seeded`);

    console.log('\n==========================================');
    console.log('🎉 RESUME-ACCURATE SEEDING COMPLETED!');
    console.log('==========================================\n');

    process.exit(0);
  } catch (err) {
    console.error('[SEED ERROR]:', err);
    process.exit(1);
  }
};

seedData();
