import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Award, ExternalLink, CheckCircle, ShieldCheck } from 'lucide-react-native';

export const CertificateCard = ({ cert }) => {
  const { colors, isLight } = useTheme();

  const handleVerify = () => {
    if (cert.link && cert.link !== '#') {
      Linking.openURL(cert.link).catch((e) => console.warn('Could not open verification link', e));
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: `${cert.accent}15` }]}>
          <Award size={22} color={cert.accent} />
        </View>

        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text }]}>{cert.title}</Text>
          <Text style={[styles.issuer, { color: colors.textSecondary }]}>{cert.issuer}</Text>
        </View>

        {cert.verified && (
          <View style={styles.verifiedBadge}>
            <ShieldCheck size={14} color="#10b981" />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>

      <Text style={[styles.desc, { color: colors.textSecondary }]}>{cert.description}</Text>

      <View style={styles.skillsContainer}>
        {cert.skills.map((s, idx) => (
          <View key={idx} style={[styles.skillPill, { backgroundColor: isLight ? '#f1f5f9' : 'rgba(255,255,255,0.05)' }]}>
            <Text style={[styles.skillText, { color: colors.textSecondary }]}>{s}</Text>
          </View>
        ))}
      </View>

      {cert.link && cert.link !== '#' && (
        <TouchableOpacity
          onPress={handleVerify}
          style={[styles.verifyBtn, { backgroundColor: cert.accent }]}
          activeOpacity={0.8}
        >
          <CheckCircle size={14} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.verifyBtnText}>Verify Certificate Credentials</Text>
          <ExternalLink size={14} color="#ffffff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  issuer: {
    fontSize: 12,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  skillPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 11,
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 14,
  },
  verifyBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
