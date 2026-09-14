import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ShieldCheck } from 'lucide-react-native';

export const Header = ({ title, isOnline = true, navigation }) => {
  const { isLight, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderBottomColor: colors.cardBorder }]}>
      <View style={styles.leftSection}>
        <Text style={[styles.title, { color: colors.text }]}>{title || 'Prashant Jha'}</Text>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: isOnline ? '#10b981' : '#f59e0b' }]} />
          <Text style={[styles.statusText, { color: isOnline ? '#10b981' : '#f59e0b' }]}>
            {isOnline ? 'API Live' : 'Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.iconButton, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
          activeOpacity={0.7}
        >
          {isLight ? <Moon size={18} color="#0f172a" /> : <Sun size={18} color="#fbbf24" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    textTransform: 'uppercase',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
