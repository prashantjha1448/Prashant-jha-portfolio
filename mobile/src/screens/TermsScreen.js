import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, FileText } from 'lucide-react-native';

export const TermsScreen = ({ navigation }) => {
  const { colors } = useTheme();

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

      <Text style={[styles.title, { color: colors.text }]}>Terms & Conditions</Text>
      <Text style={[styles.dateText, { color: colors.textMuted }]}>Effective Date: September 14, 2026</Text>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>1. Acceptance of Terms</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          By installing, downloading, or accessing the "Prashant Jha" mobile application, you agree to comply with these Terms & Conditions.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>2. Intellectual Property</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          All brand assets, software source code, project showcase descriptions, logos (WorkQuora, Notewave, Lokpriyatam, CHH School), and design layouts are intellectual property of Prashant Jha.
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
        <Text style={[styles.heading, { color: colors.text }]}>3. User Conduct</Text>
        <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
          When submitting testimonial reviews or contact messages, users agree not to post defamatory, illegal, or abusive content. We reserve the right to moderate or delete fraudulent submissions.
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
});
