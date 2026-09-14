import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ProjectCard } from '../components/ProjectCard';
import { projectsAPI } from '../config/api';

export const projectsData = [
  {
    slug: "workquora",
    title: "WorkQuora",
    subtitle: "Flagship Hyperlocal Marketplace",
    desc: "A KYC-verified local services marketplace connecting India's skilled workers (plumbers, electricians, mechanics, cooks) with local clients. Features real-time job dispatching, escrow payments, and native mobile apps.",
    metrics: [
      { label: "Verification", val: "100% KYC" },
      { label: "Security", val: "Escrow Locked" },
      { label: "Engine", val: "Auto-Dispatch" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "JWT"],
    live: "https://www.workquora.com",
    url: "workquora.com",
    accent: "#3b82f6",
    badgeType: "live",
    isFlagship: true,
    highlights: ["Aadhaar & PAN Identity Checks", "Digital Escrow Payment Locks", "Real-Time WebSocket Job Dispatch"],
    architecture: {
      summary: "High-scale MERN architecture powered by Redis caching layer and WebSocket real-time dispatch engine.",
      userRoles: "Client App, Worker App, Super Admin Web Dashboard.",
      frontendBackendSplit: "React / React Native Frontend, Express.js micro-services backend."
    }
  },
  {
    slug: "chh-school",
    title: "CHH School Management",
    subtitle: "Complete Educational Ecosystem",
    desc: "Comprehensive school management platform engineered to handle campus administration, student records, fee tracking, and multi-role portal workflows.",
    metrics: [
      { label: "Roles", val: "Multi-User" },
      { label: "Academic", val: "Full Records" },
      { label: "Portals", val: "Admin & Student" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    live: "https://chh-school-management-system.vercel.app/",
    url: "chh-school.vercel.app",
    accent: "#f59e0b",
    badgeType: "progress",
    isFlagship: false,
    highlights: ["Multi-Role Admin & Student Dashboards", "Campus Record Tracking", "Automated Attendance Systems"],
    architecture: {
      summary: "Role-based authorization system with segregated student, teacher, and administrator portals.",
      userRoles: "Student Portal, Teacher Portal, Financial Admin.",
      frontendBackendSplit: "Single-page React dashboard with RESTful Express API."
    }
  },
  {
    slug: "notewave",
    title: "Notewave",
    subtitle: "Secure Productivity Notes App",
    desc: "Production-grade MERN notes application with JWT, Email OTP, Google OAuth 2.0, 2FA security, soft delete recovery, and Cloudinary media uploads.",
    metrics: [
      { label: "Security", val: "2FA & OAuth" },
      { label: "Media", val: "Cloudinary" },
      { label: "CRUD", val: "Soft Delete" },
    ],
    tech: ["React", "Node.js", "MongoDB", "JWT", "Cloudinary"],
    live: "https://notewave-frontend.vercel.app",
    url: "notewave.vercel.app",
    accent: "#a855f7",
    badgeType: "live",
    isFlagship: false,
    highlights: ["Google OAuth & TOTP 2FA", "Cloudinary Media Attachments", "Soft Delete & Trash Recovery"],
    architecture: {
      summary: "Encrypted note storage layer with multi-factor TOTP authentication and trash recovery timeline.",
      userRoles: "Individual User, Team Workspaces.",
      frontendBackendSplit: "React SPA with Cloudinary SDK integration and MongoDB storage."
    }
  },
  {
    slug: "lokpriyatam",
    title: "Lokpriyatam",
    subtitle: "Digital Storefront & Franchise Platform",
    desc: "Modern responsive digital storefront built for a local tea brand business to accelerate brand presence, showcase menu items, and power franchise expansion.",
    metrics: [
      { label: "Design", val: "Modern UI" },
      { label: "Business", val: "Franchise Module" },
      { label: "Speed", val: "Lighthouse 98+" },
    ],
    tech: ["React.js", "Tailwind CSS", "GSAP"],
    live: "#",
    url: "lokpriyatam.com",
    accent: "#06b6d4",
    badgeType: "live",
    isFlagship: false,
    highlights: ["Interactive Product Showcase", "Franchise Application Flow", "Pixel-Perfect Responsive UI"],
    architecture: {
      summary: "High-performance brand showcase platform optimized for fast loading speeds and franchise conversions.",
      userRoles: "Customer Storefront, Franchise Applicant Portal.",
      frontendBackendSplit: "React + GSAP animation layer with static export options."
    }
  },
];

export const ProjectsScreen = ({ navigation }) => {
  const { colors, isLight } = useTheme();
  const [filter, setFilter] = useState('all');
  const [projectsList, setProjectsList] = useState(projectsData);

  useEffect(() => {
    projectsAPI
      .getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjectsList(data);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = filter === 'all'
    ? projectsList
    : filter === 'flagship'
    ? projectsList.filter(p => p.isFlagship)
    : projectsList.filter(p => !p.isFlagship);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.headerTitle, { color: colors.text }]}>Featured Projects</Text>
      <Text style={[styles.headerSub, { color: colors.textSecondary }]}>
        Production platforms, hyperlocal marketplaces, and enterprise systems built by Prashant Jha.
      </Text>

      {/* Category Filter Pills */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setFilter('all')}
          style={[styles.filterPill, filter === 'all' && { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.filterText, filter === 'all' && { color: '#ffffff' }]}>All Projects ({projectsData.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter('flagship')}
          style={[styles.filterPill, filter === 'flagship' && { backgroundColor: '#8b5cf6' }]}
        >
          <Text style={[styles.filterText, filter === 'flagship' && { color: '#ffffff' }]}>★ Flagship</Text>
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          onSelectCaseStudy={(proj) => navigation.navigate('CaseStudy', { project: proj })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  headerSub: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
