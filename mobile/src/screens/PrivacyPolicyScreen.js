import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, ShieldCheck, Lock, Eye, RefreshCw } from 'lucide-react-native';

export const PrivacyPolicyScreen = ({ navigation }) => {
  const { colors, isLight } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { borderColor: colors.cardBorder, backgroundColor: colors.cardBg }]}
      >
        <ArrowLeft size={16} color={colors.text} />
        <Text style={[styles.backBtnText, { color: colors.text }]}>Back</Text>
      </TouchableOpacity>

      <View style={styles.badgeRow}>
        <ShieldCheck size={20} color="#10b981" />
        <Text style={styles.badgeText}>Google Play Store Compliant Privacy Policy</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
      <Text style={[styles.dateText, { color: colors.textMuted }]}>Last Updated: September 14, 2026</Text>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>1. Overview & Data Collection</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          "Prashant Jha" ("the Application") is committed to protecting your privacy. This Application is designed to showcase developer portfolio projects, technical skills, case studies, and verified credentials.
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          We collect minimal information necessary to deliver application features:
          {"\n"}• <Text style={{ fontWeight: '700', color: colors.text }}>Optional Account Data:</Text> Name, email address, and profile avatar if you register or post a verified testimonial review.
          {"\n"}• <Text style={{ fontWeight: '700', color: colors.text }}>Technical Logs:</Text> Anonymized device diagnostics, network request metrics, and API health checks.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>2. How Data is Used</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Collected data is used exclusively to:
          {"\n"}• Authenticate registered visitors posting verified reviews.
          {"\n"}• Process direct inquiry messages sent to the developer.
          {"\n"}• Ensure API health, security, and prevent abusive network requests.
        </Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          <Text style={{ fontWeight: '700', color: colors.text }}>No Data Selling:</Text> We do NOT sell, rent, trade, or share your personal data with third-party advertisers or data brokers under any circumstances.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>3. Permissions & Device Access</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          The Application requests only the minimal Android permissions required for network communications:
          {"\n"}• <Text style={{ fontWeight: '700', color: colors.text }}>android.permission.INTERNET:</Text> Required to fetch portfolio data, live statuses, and send messages.
          {"\n"}• <Text style={{ fontWeight: '700', color: colors.text }}>android.permission.ACCESS_NETWORK_STATE:</Text> Required to detect offline network connectivity.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>4. User Rights & Account Deletion</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          Per Google Play Developer Policies, you have full rights to request complete deletion of your account and associated data stored on our servers.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AccountDeletion')}
          style={[styles.actionLinkBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.actionLinkText}>Request Data Deletion →</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>5. Contact Developer</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          For privacy inquiries or compliance questions:
          {"\n"}• Email: prashantjha1448@gmail.com
          {"\n"}• Developer: Prashant Jha (Founder @ WorkQuora)
        </Text>
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
    gap: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10b981',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 20,
  },
  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 13,
    lineHeight: 20,
  },
  actionLinkBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  actionLinkText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
