import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { darkColors } from '../theme/colors';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: darkColors.background,
    card: darkColors.surface,
    text: darkColors.text,
    border: darkColors.border,
    primary: darkColors.primary,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: darkColors.surface },
          headerTintColor: darkColors.text,
          contentStyle: { backgroundColor: darkColors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'CoinBet' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
