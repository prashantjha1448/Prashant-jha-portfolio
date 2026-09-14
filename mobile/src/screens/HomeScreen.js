import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { statusAPI, portfolioAPI } from '../config/api';
import { cacheService } from '../services/cacheService';
import { Code2, Sparkles, ExternalLink, ArrowRight, ShieldCheck, Github, Linkedin, Mail } from 'lucide-react-native';

export const HomeScreen = ({ navigation }) => {
  const { colors, isLight } = useTheme();
  const [status, setStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Typewriter rotator phrases
  const phrases = [
    "Full Stack Developer",
    "Founder @ WorkQuora",
    "MERN Stack Architect",
    "Freelance Engineer",
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timer;
    if (!isDeleting && typedText !== current) {
      timer = setTimeout(() => setTypedText(current.substring(0, typedText.length + 1)), 75);
    } else if (!isDeleting && typedText === current) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText !== "") {
      timer = setTimeout(() => setTypedText(current.substring(0, typedText.length - 1)), 35);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx]);

  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    await cacheService.fetchWithCache(
      'home_status',
      statusAPI.getStatus,
      (data) => setStatus(data)
    );
    setLoadingStatus(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const freshData = await statusAPI.getStatus();
      if (freshData) {
        setStatus(freshData);
        await cacheService.set('home_status', freshData);
      }
    } catch (e) {
      console.warn('HomeScreen refresh failed:', e.message);
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
      {/* Hero Header with Portrait Image */}
      <View style={styles.heroHeaderRow}>
        <View style={[styles.portraitWrapper, { borderColor: colors.accent, backgroundColor: colors.cardBg }]}>
          <Image
            source={require('../../assets/prashant_portrait.jpg')}
            style={styles.portraitImage}
            resizeMode="cover"
          />
          <View style={styles.onlineBadge}>
            <View style={styles.onlineDot} />
          </View>
        </View>

        <View style={styles.headerTitleBox}>
          {/* Hero Availability Badge */}
          <View style={[styles.badge, { backgroundColor: 'rgba(139, 92, 246, 0.12)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
            <View style={styles.greenPulse} />
            <Text style={styles.badgeText}>Available for Freelance & Roles</Text>
          </View>

          {/* Name Header */}
          <Text style={[styles.name, { color: colors.text }]}>Prashant Jha</Text>
        </View>
      </View>

      {/* Typewriter Subtitle */}
      <View style={styles.typewriterRow}>
        <Text style={[styles.typewriterText, { color: colors.accent }]}>{typedText}</Text>
        <View style={[styles.cursor, { backgroundColor: colors.accent }]} />
      </View>

      <Text style={[styles.bioText, { color: colors.textSecondary }]}>
        Crafting immersive, high-performance web & mobile experiences with production-grade MERN architecture, pixel-perfect UI and clean scalable code.
      </Text>

      {/* Action Buttons */}
      <View style={styles.ctaRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Projects')}
          style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>Explore My Work</Text>
          <ArrowRight size={16} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Contact')}
          style={[styles.secondaryBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.secondaryBtnText, { color: colors.text }]}>Get In Touch</Text>
        </TouchableOpacity>
      </View>

      {/* Live Status Card from Backend */}
      {status && status.active && (
        <View style={[styles.statusCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          <View style={styles.statusHeader}>
            <Sparkles size={16} color="#fbbf24" />
            <Text style={styles.statusTitle}>Current Focus</Text>
          </View>
          <Text style={[styles.statusSub, { color: colors.text }]}>{status.title}</Text>
          <Text style={[styles.statusDesc, { color: colors.textSecondary }]}>{status.subtitle}</Text>
          {status.link && (
            <TouchableOpacity
              onPress={() => Linking.openURL(status.link)}
              style={styles.statusLink}
            >
              <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700', marginRight: 4 }}>Visit Platform</Text>
              <ExternalLink size={12} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Flagship Product Showcase Box */}
      <View style={[styles.flagshipBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <View style={styles.flagshipHeader}>
          <View style={styles.flagshipBadge}>
            <Text style={styles.flagshipBadgeText}>★ Flagship Platform</Text>
          </View>
          <Text style={[styles.flagshipTitle, { color: colors.text }]}>WorkQuora</Text>
        </View>

        <Text style={[styles.flagshipSubtitle, { color: colors.accent }]}>
          Hyperlocal Service Marketplace connecting India's skilled workers with verified clients.
        </Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricVal, { color: colors.text }]}>100%</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>KYC Verified</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricVal, { color: colors.text }]}>Escrow</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Payment Locks</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricVal, { color: colors.text }]}>Auto</Text>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Dispatch Engine</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.workquora.com')}
          style={[styles.workquoraBtn, { backgroundColor: '#2563eb' }]}
          activeOpacity={0.8}
        >
          <Text style={styles.workquoraBtnText}>Visit WorkQuora Live</Text>
          <ExternalLink size={14} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* Quick Navigation Links */}
      <View style={styles.navGrid}>
        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          style={[styles.navTile, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <Code2 size={24} color="#8b5cf6" />
          <Text style={[styles.navTileTitle, { color: colors.text }]}>MERN Stack & Certs</Text>
          <Text style={[styles.navTileSub, { color: colors.textMuted }]}>Sheryians & Infosys</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          style={[styles.navTile, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
        >
          <ShieldCheck size={24} color="#10b981" />
          <Text style={[styles.navTileTitle, { color: colors.text }]}>Privacy & Safety</Text>
          <Text style={[styles.navTileSub, { color: colors.textMuted }]}>Play Store Compliant</Text>
        </TouchableOpacity>
      </View>
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
  heroHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  portraitWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    position: 'relative',
    overflow: 'visible',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  portraitImage: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0b0f19',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
  },
  headerTitleBox: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 6,
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  name: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  typewriterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  typewriterText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  cursor: {
    width: 2,
    height: 18,
    marginLeft: 4,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  statusTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#fbbf24',
  },
  statusSub: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  statusDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  statusLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  flagshipBox: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
  },
  flagshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  flagshipBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  flagshipBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8b5cf6',
  },
  flagshipTitle: {
    fontSize: 24,
    fontWeight: '900',
  },
  flagshipSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 18,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.04)',
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  workquoraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  workquoraBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  navGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  navTile: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  navTileTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  navTileSub: {
    fontSize: 11,
    marginTop: 2,
  },
});
