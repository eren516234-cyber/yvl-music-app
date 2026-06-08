import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MiniPlayer } from '@/components/MiniPlayer';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { accentColor } = useTheme();
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';
  const TAB_HEIGHT = 60;
  const BOTTOM = insets.bottom + TAB_HEIGHT + 8;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: accentColor,
          tabBarInactiveTintColor: '#636366',
          tabBarStyle: {
            backgroundColor: isIOS ? 'transparent' : '#111111',
            borderTopWidth: 0,
            height: TAB_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
            elevation: 0,
          },
          tabBarBackground: () =>
            isIOS ? (
              <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
            ) : (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: '#111111' }]} />
            ),
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: 2 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'library' : 'library-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <MiniPlayer bottomOffset={BOTTOM} />
    </View>
  );
}
