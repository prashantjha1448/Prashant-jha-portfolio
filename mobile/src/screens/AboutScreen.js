import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { CertificateCard } from '../components/CertificateCard';
import { Code2, Award, Terminal, Rocket, CheckCircle2, ExternalLink } from 'lucide-react-native';

export const certificatesData = [
  {
    id: "sheryians-mern",
    title: "Sheryians MERN Stack Specialization",
    issuer: "Sheryians Coding School",
    description: "Production-grade MERN Stack Web & Mobile Engineering, Authentication, Payment Escrow, Redis Caching, WebSockets, and Performance Optimization.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Socket.io", "JWT"],
    verified: true,
    link: "https://sheryians.com/certificate/7c47dda4-81f3-46ef-b514-c7bc58356e91",
    accent: "#3b82f6",
  },
  {
    id: "infosys-python",
    title: "Infosys Python Development",
    issuer: "Infosys Springboard",
    description: "Core Python Programming, Data Structures, OOPs Principles, Automated Scripting, and Algorithm Optimization.",
    skills: ["Python 3", "Data Structures", "Algorithms", "OOPs", "REST Concepts"],
    verified: true,
    link: "#",
    accent: "#f59e0b",
  },
];

export const AboutScreen = () => {
  const { colors, isLight } = useTheme();

  const skills = [
    { category: "Frontend", items: ["React.js", "React Native", "Tailwind CSS", "GSAP", "Redux Toolkit", "HTML5/CSS3"] },
    { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "WebSockets (Socket.io)", "JWT", "OAuth 2.0"] },
    { category: "Databases & Cache", items: ["MongoDB", "Mongoose", "Redis", "Cloudinary Storage"] },
    { category: "Tools & DevOps", items: ["Git & GitHub", "Vercel", "Render", "Postman", "Expo", "VS Code"] },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={[styles.headerTitle, { color: colors.text }]}>About Prashant Jha</Text>
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
          I am a passionate Full Stack Software Engineer specializing in modern MERN architecture, React Native mobile apps, and scalable web applications.
        </Text>

        <Text style={[styles.bioParagraph, { color: colors.textSecondary }]}>
          As the founder of <Text style={{ fontWeight: '800', color: colors.primary }}>WorkQuora</Text>, I engineered India's hyperlocal services marketplace with 100% KYC verification, escrow payment safety locks, and real-time auto-dispatch WebSocket architecture.
        </Text>
      </View>

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

      {certificatesData.map((cert) => (
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
    marginTop: 6,
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
    marginBottom: 10,
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
