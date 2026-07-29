import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MyCouponsScreen from '../screens/MyCouponsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { darkColors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<
  keyof RootTabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Live: { active: 'radio', inactive: 'radio-outline' },
  Results: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  MyCoupons: { active: 'receipt', inactive: 'receipt-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const tabLabels: Record<keyof RootTabParamList, string> = {
  Home: 'Ana Sayfa',
  Live: 'Canlı',
  Results: 'Sonuçlar',
  MyCoupons: 'Kuponlarım',
  Profile: 'Profil',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: darkColors.primary,
        tabBarInactiveTintColor: darkColors.textMuted,
        tabBarStyle: {
          backgroundColor: darkColors.surface,
          borderTopColor: darkColors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarLabelStyle: {
          fontFamily: typography.fontFamily,
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icon = tabIcons[route.name as keyof RootTabParamList];
          return (
            <Ionicons name={focused ? icon.active : icon.inactive} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: tabLabels.Home }} />
      <Tab.Screen name="Live" component={LiveScreen} options={{ title: tabLabels.Live }} />
      <Tab.Screen name="Results" component={ResultsScreen} options={{ title: tabLabels.Results }} />
      <Tab.Screen
        name="MyCoupons"
        component={MyCouponsScreen}
        options={{ title: tabLabels.MyCoupons }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: tabLabels.Profile }} />
    </Tab.Navigator>
  );
}
