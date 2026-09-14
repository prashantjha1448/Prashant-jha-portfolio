import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ExternalLink, Layers, CheckCircle2, ChevronRight } from 'lucide-react-native';

export const ProjectCard = ({ project, onSelectCaseStudy }) => {
  const { colors, isLight } = useTheme();

  const handleOpenLive = () => {
    if (project.live && project.live !== '#') {
      Linking.openURL(project.live).catch((err) => console.warn('Could not open URL', err));
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
      {/* Top Browser Header Bar */}
      <View style={[styles.chromeFrame, { backgroundColor: isLight ? '#f1f5f9' : '#1e293b' }]}>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
          <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
          <View style={[styles.dot, { backgroundColor: '#10b981' }]} />
        </View>
        <Text style={[styles.urlText, { color: colors.textSecondary }]}>{project.url}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{project.badgeType === 'live' ? 'Live' : 'Dev'}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]}>{project.title}</Text>
          {project.isFlagship && (
            <View style={styles.flagshipTag}>
              <Text style={styles.flagshipText}>★ Flagship</Text>
            </View>
          )}
        </View>

        <Text style={[styles.subtitle, { color: colors.accent }]}>{project.subtitle}</Text>
        <Text style={[styles.desc, { color: colors.textSecondary }]}>{project.desc}</Text>

        {/* Highlights */}
        <View style={styles.highlightsContainer}>
          {project.highlights.map((h, i) => (
            <View key={i} style={[styles.highlightPill, { backgroundColor: isLight ? '#f8fafc' : 'rgba(255,255,255,0.05)' }]}>
              <CheckCircle2 size={12} color={project.accent} style={{ marginRight: 4 }} />
              <Text style={[styles.highlightText, { color: colors.textSecondary }]}>{h}</Text>
            </View>
          ))}
        </View>

        {/* Metrics Grid */}
        <View style={[styles.metricsGrid, { backgroundColor: isLight ? '#f8fafc' : 'rgba(0,0,0,0.3)' }]}>
          {project.metrics.map((m, idx) => (
            <View key={idx} style={styles.metricItem}>
              <Text style={[styles.metricVal, { color: colors.text }]}>{m.val}</Text>
              <Text style={[styles.metricLabel, { color: colors.textMuted }]}>{m.label}</Text>
            </View>
          ))}
        </View>

        {/* Tech Stack Tags */}
        <View style={styles.techContainer}>
          {project.tech.map((t, idx) => (
            <View key={idx} style={[styles.techPill, { backgroundColor: `${project.accent}15`, borderColor: `${project.accent}30` }]}>
              <Text style={[styles.techText, { color: project.accent }]}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          {project.live !== '#' && (
            <TouchableOpacity
              onPress={handleOpenLive}
              style={[styles.primaryBtn, { backgroundColor: project.accent }]}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryBtnText}>Live Demo</Text>
              <ExternalLink size={14} color="#ffffff" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => onSelectCaseStudy(project)}
            style={[styles.secondaryBtn, { borderColor: colors.cardBorder }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryBtnText, { color: colors.text }]}>Case Study</Text>
            <ChevronRight size={14} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  chromeFrame: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  urlText: {
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10b981',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  flagshipTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  flagshipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 8,
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  highlightText: {
    fontSize: 11,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  metricLabel: {
    fontSize: 9,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  techPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  techText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 2,
  },
});
