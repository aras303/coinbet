import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

export default function AmbientBackground() {
  const theme = useTheme();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="glowTop" cx="82%" cy="0%" r="65%">
            <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity={0.16} />
            <Stop offset="100%" stopColor={theme.colors.primary} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="glowBottom" cx="10%" cy="100%" r="55%">
            <Stop offset="0%" stopColor={theme.colors.primaryMuted} stopOpacity={0.12} />
            <Stop offset="100%" stopColor={theme.colors.primaryMuted} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glowTop)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glowBottom)" />
      </Svg>
    </View>
  );
}
