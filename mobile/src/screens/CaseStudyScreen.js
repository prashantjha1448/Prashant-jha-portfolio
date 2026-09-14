import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ExternalLink, CheckCircle2, Cpu, ShieldCheck, Layers, ArrowLeft } from 'lucide-react-native';

export const CaseStudyScreen = ({ route, navigation }) => {
  const { colors, isLight } = useTheme();
  const { project } = route.params || {};

  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: colors.bg, padding: 20 }]}>
        <Text style={{ color: colors.text }}>No project specified.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
      >
        <ArrowLeft size={16} color={colors.text} />
        <Text style={[styles.backBtnText, { color: colors.text }]}>Back to Projects</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.badgeRow}>
        <View style={[styles.slugBadge, { backgroundColor: `${project.accent}15` }]}>
          <Text style={[styles.slugText, { color: project.accent }]}>CASE STUDY: {project.slug.toUpperCase()}</Text>
        </View>
        {project.isFlagship && (
          <View style={styles.flagshipBadge}>
            <Text style={styles.flagshipText}>★ Flagship</Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{project.title}</Text>
      <Text style={[styles.subtitle, { color: colors.accent }]}>{project.subtitle}</Text>
      <Text style={[styles.desc, { color: colors.textSecondary }]}>{project.desc}</Text>

      {/* Metrics Row */}
      <View style={[styles.metricsBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Key Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {project.metrics.map((m, idx) => (
            <View key={idx} style={styles.metricCard}>
              <Text style={[styles.metricVal, { color: project.accent }]}>{m.val}</Text>
              <Text style={[styles.metricLabel, { color: colors.textMuted }]}>{m.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Highlights */}
      <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Platform Highlights</Text>
        {project.highlights.map((h, idx) => (
          <View key={idx} style={styles.highlightRow}>
            <CheckCircle2 size={16} color={project.accent} style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={[styles.highlightText, { color: colors.textSecondary }]}>{h}</Text>
          </View>
        ))}
      </View>

      {/* System Architecture */}
      {project.architecture && (
        <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.archTitleRow}>
            <Cpu size={18} color={colors.accent} style={{ marginRight: 6 }} />
            <Text style={[styles.sectionHeading, { color: colors.text, marginBottom: 0 }]}>System Architecture</Text>
          </View>
          
          <Text style={[styles.archText, { color: colors.textSecondary }]}>
            <Text style={{ fontWeight: '800', color: colors.text }}>Overview: </Text>
            {project.architecture.summary}
          </Text>

          <Text style={[styles.archText, { color: colors.textSecondary, marginTop: 8 }]}>
            <Text style={{ fontWeight: '800', color: colors.text }}>User Roles & Portals: </Text>
            {project.architecture.userRoles}
          </Text>
        </View>
      )}

      {/* Tech Stack Pills */}
      <View style={[styles.sectionBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.sectionHeading, { color: colors.text }]}>Tech Stack & Libraries</Text>
        <View style={styles.techGrid}>
          {project.tech.map((t, idx) => (
            <View key={idx} style={[styles.techTag, { backgroundColor: `${project.accent}18`, borderColor: `${project.accent}30` }]}>
              <Text style={[styles.techTagText, { color: project.accent }]}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Live Demo Action Button */}
      {project.live && project.live !== '#' && (
        <TouchableOpacity
          onPress={() => Linking.openURL(project.live)}
          style={[styles.liveBtn, { backgroundColor: project.accent }]}
          activeOpacity={0.8}
        >
          <Text style={styles.liveBtnText}>Launch Live Application</Text>
          <ExternalLink size={16} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      )}
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
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  slugBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  slugText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  flagshipBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  flagshipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 12,
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  metricsBox: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    alignItems: 'center',
    flex: 1,
  },
  metricVal: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  sectionBox: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  archTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  archText: {
    fontSize: 13,
    lineHeight: 19,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },
  techTagText: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  liveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    marginTop: 8,
  },
  liveBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});
