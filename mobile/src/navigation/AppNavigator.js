import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { Header } from '../components/Header';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { CaseStudyScreen } from '../screens/CaseStudyScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { ReviewsScreen } from '../screens/ReviewsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { TermsScreen } from '../screens/TermsScreen';
import { AccountDeletionScreen } from '../screens/AccountDeletionScreen';
import { LoginScreen } from '../screens/LoginScreen';

// Icons
import { Home, Layers, UserCheck, MessageSquare, Mail } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
  const { colors, isLight } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cardBg,
          borderTopColor: colors.cardBorder,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsScreen}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: ({ color, size }) => <Layers color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size }) => <UserCheck color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={20} />,
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({ color, size }) => <Mail color={color} size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

const defaultFonts = {
  regular: { fontFamily: 'sans-serif', fontWeight: '400' },
  medium: { fontFamily: 'sans-serif', fontWeight: '500' },
  bold: { fontFamily: 'sans-serif', fontWeight: '600' },
  heavy: { fontFamily: 'sans-serif', fontWeight: '700' },
};

export const AppNavigator = () => {
  const { colors, isLight } = useTheme();

  const baseTheme = isLight ? DefaultTheme : DarkTheme;
  const customTheme = {
    ...baseTheme,
    fonts: baseTheme?.fonts || defaultFonts,
    colors: {
      ...(baseTheme?.colors || {}),
      background: colors.bg,
      card: colors.cardBg,
      text: colors.text,
      border: colors.cardBorder,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, route, options }) => (
            <Header title="Prashant Jha" isOnline={true} navigation={navigation} />
          ),
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CaseStudy" component={CaseStudyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AccountDeletion" component={AccountDeletionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
