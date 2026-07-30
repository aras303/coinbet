import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  type Icon,
  BroadcastIcon,
  ChartBarIcon,
  HouseIcon,
  ReceiptIcon,
  UserIcon,
} from 'phosphor-react-native';
import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import ResultsScreen from '../screens/ResultsScreen';
import MyCouponsScreen from '../screens/MyCouponsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { darkColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { shadow } from '../theme/shadow';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, Icon> = {
  Home: HouseIcon,
  Live: BroadcastIcon,
  Results: ChartBarIcon,
  MyCoupons: ReceiptIcon,
  Profile: UserIcon,
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
          ...shadow.raised,
        },
        tabBarLabelStyle: {
          fontFamily: typography.manrope.bold,
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const TabIcon = tabIcons[route.name as keyof RootTabParamList];
          return <TabIcon size={size} color={color} weight={focused ? 'fill' : 'regular'} />;
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
