import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Platform, RefreshControl } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CertificateCard } from '../components/CertificateCard';
import { Code2, Award, Terminal, Rocket, CheckCircle2, GraduationCap, BookOpen } from 'lucide-react-native';
import { portfolioAPI } from '../config/api';
import { cacheService } from '../services/cacheService';

export const fallbackCertificates = [
  {
    id: "sheryians-mern",
    title: "Sheryians MERN Stack Specialization",
    issuer: "Sheryians Coding School",
    description: "Production-grade MERN Stack Web & Mobile Engineering, Authentication, Payment Escrow, Redis Caching, WebSockets, and Performance Optimization.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Socket.io", "JWT"],
    verified: true,
    link: "https://sheryians.com",
    accent: "#3b82f6",
  },
  {
    id: "infosys-python",
    title: "Infosys Python Development",
    issuer: "Infosys Springboard",
    description: "Core Python Programming, Data Structures, OOPs Principles, Automated Scripting, and Algorithm Optimization.",
    skills: ["Python 3", "Data Structures", "Algorithms", "OOPs", "REST Concepts"],
    verified: true,
    link: "https://infosys.com",
    accent: "#f59e0b",
  },
];

export const fallbackSkills = [
  { category: "Frontend", items: ["React.js", "React Native", "Tailwind CSS", "GSAP", "Redux Toolkit", "HTML5/CSS3"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "WebSockets (Socket.io)", "JWT", "OAuth 2.0"] },
  { category: "Databases & Cache", items: ["MongoDB", "Mongoose", "Redis", "Cloudinary Storage"] },
  { category: "Tools & DevOps", items: ["Git & GitHub", "Vercel", "Render", "Postman", "Expo", "VS Code"] },
];

export const fallbackEducation = [
  {
    degree: "Bachelor of Technology – Computer Science and Engineering",
    institution: "Lakshmi Narain College of Technology, Bhopal",
    startYear: "Aug. 2023",
    endYear: "Jun. 2026",
    description: "Focus on Data Structures, Algorithms, Software Engineering Principles, and MERN Full Stack Application Development.",
  },
  {
    degree: "Diploma – Computer Science Engineering",
    institution: "Patel College of Science & Technology, Bhopal",
    startYear: "Aug. 2020",
    endYear: "Jun. 2023",
    description: "Strong foundation in web development, database management, and programming fundamentals.",
  },
];

export const AboutScreen = () => {
  const { colors, isLight } = useTheme();
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [education, setEducation] = useState(fallbackEducation);
  const [skills, setSkills] = useState(fallbackSkills);
  const [refreshing, setRefreshing] = useState(false);

  const processPortfolioData = (data) => {
    if (!data) return;

    if (data.profile && data.profile.name) {
      setProfile(data.profile);
    }

    if (Array.isArray(data.certificates) && data.certificates.length > 0) {
      const formattedCerts = data.certificates.map((c, i) => ({
        id: c._id || `cert-${i}`,
        title: c.title,
        issuer: c.issuer,
        description: c.description,
        skills: c.tags || [],
        verified: true,
        link: c.verifyUrl || '#',
        accent: i % 2 === 0 ? '#3b82f6' : '#f59e0b',
      }));
      setCertificates(formattedCerts);
    }

    if (Array.isArray(data.education) && data.education.length > 0) {
      setEducation(data.education);
    }

    if (Array.isArray(data.techStack) && data.techStack.length > 0) {
      // Group tech stack by category
      const grouped = {};
      data.techStack.forEach((item) => {
        const cat = item.category || 'Other';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item.name);
      });
      const skillGroups = Object.keys(grouped).map((cat) => ({
        category: cat,
        items: grouped[cat],
      }));
      setSkills(skillGroups);
    }
  };

  const loadData = async () => {
    await cacheService.fetchWithCache(
      'portfolio_all',
      portfolioAPI.getAllData,
      (data) => processPortfolioData(data)
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const freshData = await portfolioAPI.getAllData();
      if (freshData) {
        processPortfolioData(freshData);
        await cacheService.set('portfolio_all', freshData);
      }
    } catch (e) {
      console.warn('AboutScreen refresh failed:', e.message);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} tintColor={colors.primary} />
      }
    >
      {/* Header */}
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        About {profile?.name || 'Prashant Jha'}
      </Text>
      <Text style={[styles.headerSub, { color: colors.accent }]}>
        Full Stack Developer · Founder @ WorkQuora · MERN Stack Architect
      </Text>

      {/* Bio Card */}
      <View style={[styles.bioCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.bioTitleRow}>
          <Rocket size={18} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Founder Story & Mission</Text>
        </View>

        <Text style={[styles.bioParagraph, { color: colors.textSecondary }]}>
          {profile?.bio?.founderStory ||
            "Solo-designed and engineered WorkQuora — a production-ready hyperlocal services marketplace connecting India's skilled workers directly with local clients through verified identity profiles, automated dispatch matching, and payment escrow."}
        </Text>
      </View>

      {/* Education Section */}
      <View style={styles.sectionHeaderRow}>
        <GraduationCap size={20} color={colors.primary} style={{ marginRight: 6 }} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Academic Education</Text>
      </View>

      {education.map((edu, idx) => (
        <View key={idx} style={[styles.skillGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.skillGroupTitle, { color: colors.text }]}>{edu.degree}</Text>
          <Text style={[styles.eduInstitution, { color: colors.accent }]}>
            {edu.institution} ({edu.startYear} – {edu.endYear})
          </Text>
          <Text style={[styles.eduDesc, { color: colors.textSecondary }]}>{edu.description}</Text>
        </View>
      ))}

      {/* MERN Tech Stack Grid */}
      <View style={styles.sectionHeaderRow}>
        <Code2 size={20} color={colors.accent} style={{ marginRight: 6 }} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Technical Stack & Skills</Text>
      </View>

      {skills.map((group, idx) => (
        <View key={idx} style={[styles.skillGroupCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <Text style={[styles.skillGroupTitle, { color: colors.text }]}>{group.category}</Text>
          <View style={styles.skillPillsGrid}>
            {group.items.map((item, itemIdx) => (
              <View key={itemIdx} style={[styles.skillPill, { backgroundColor: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.06)' }]}>
                <CheckCircle2 size={12} color={colors.accent} style={{ marginRight: 5 }} />
                <Text style={[styles.skillText, { color: colors.textSecondary }]}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Verified Certifications Section */}
      <View style={styles.sectionHeaderRow}>
        <Award size={20} color="#fbbf24" style={{ marginRight: 6 }} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Verified Certifications</Text>
      </View>

      {certificates.map((cert) => (
        <CertificateCard key={cert.id} cert={cert} />
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
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 20,
  },
  bioCard: {
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  bioTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  bioParagraph: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  skillGroupCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  skillGroupTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  eduInstitution: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  eduDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  skillPillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
