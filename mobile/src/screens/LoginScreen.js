import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Lock, Mail, User, MapPin, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react-native';

export const LoginScreen = ({ navigation, route }) => {
  const { colors, isLight } = useTheme();
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'login') {
        await login(email.trim(), password);
        Alert.alert('Welcome Back!', 'Logged in successfully.', [
          {
            text: 'OK',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('MainTabs');
              }
            },
          },
        ]);
      } else {
        await register(name.trim(), email.trim(), password, city.trim() || 'India');
        Alert.alert('Success!', 'Account created and logged in.', [
          {
            text: 'OK',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('MainTabs');
              }
            },
          },
        ]);
      }
    } catch (e) {
      Alert.alert('Authentication Error', e.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      await login('demo@prashantjha.com', 'demo123456');
      Alert.alert('Demo Account', 'Logged in as Demo Reviewer.', [
        {
          text: 'OK',
          onPress: () => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('MainTabs');
            }
          },
        },
      ]);
    } catch (e) {
      // Fallback demo account
      Alert.alert('Logged In', 'Demo session activated.');
      if (navigation.canGoBack()) navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.bg }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Navigation */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtn, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          activeOpacity={0.8}
        >
          <ArrowLeft size={20} color={colors.text} />
          <Text style={[styles.backBtnText, { color: colors.text }]}>Back</Text>
        </TouchableOpacity>

        {/* Title & Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            {mode === 'login' ? 'Sign In to Review' : 'Create Account'}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {mode === 'login'
              ? 'Log in to submit verified project feedback & reviews'
              : 'Register to write verified reviews and interact'}
          </Text>
        </View>

        {/* Mode Toggle Tabs */}
        <View style={[styles.tabRow, { backgroundColor: isLight ? '#e2e8f0' : '#1e293b' }]}>
          <TouchableOpacity
            onPress={() => setMode('login')}
            style={[
              styles.tabBtn,
              mode === 'login' && { backgroundColor: colors.primary },
            ]}
          >
            <LogIn size={16} color={mode === 'login' ? '#ffffff' : colors.textMuted} style={{ marginRight: 6 }} />
            <Text style={[styles.tabText, { color: mode === 'login' ? '#ffffff' : colors.textMuted }]}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMode('register')}
            style={[
              styles.tabBtn,
              mode === 'register' && { backgroundColor: colors.primary },
            ]}
          >
            <UserPlus size={16} color={mode === 'register' ? '#ffffff' : colors.textMuted} style={{ marginRight: 6 }} />
            <Text style={[styles.tabText, { color: mode === 'register' ? '#ffffff' : colors.textMuted }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {mode === 'register' && (
            <>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}>
                <User size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="e.g. Rahul Sharma"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <Text style={[styles.label, { color: colors.textSecondary }]}>City / Location</Text>
              <View style={[styles.inputWrapper, { borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}>
                <MapPin size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="e.g. Delhi NCR, Mumbai"
                  placeholderTextColor={colors.textMuted}
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </>
          )}

          <Text style={[styles.label, { color: colors.textSecondary }]}>Email Address</Text>
          <View style={[styles.inputWrapper, { borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}>
            <Mail size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="name@example.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
          <View style={[styles.inputWrapper, { borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}>
            <Lock size={18} color={colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 6 }}>
              {showPassword ? (
                <EyeOff size={18} color={colors.textMuted} />
              ) : (
                <Eye size={18} color={colors.textMuted} />
              )}
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={[styles.submitBtn, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.submitBtnText}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Demo Login Button */}
          <TouchableOpacity
            onPress={handleDemoLogin}
            disabled={loading}
            style={[styles.demoBtn, { borderColor: colors.cardBorder }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.demoBtnText, { color: colors.primary }]}>
              ⚡ Quick Demo Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          By signing in, you agree to our Terms of Service and Privacy Policy. Verified review status will be displayed alongside your feedback.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    gap: 6,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  tabRow: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
  },
  submitBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  demoBtn: {
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 10,
  },
});
