import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const PITCH_CIRCLE_SIZE = width * 1.6;

export default function StadiumBackground() {
  const theme = useTheme();

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface, theme.colors.background]}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[`${theme.colors.primaryMuted}40`, 'transparent']}
        style={styles.floodlightGlow}
      />
      <View
        style={[
          styles.pitchCircle,
          {
            width: PITCH_CIRCLE_SIZE,
            height: PITCH_CIRCLE_SIZE,
            borderRadius: PITCH_CIRCLE_SIZE / 2,
            left: (width - PITCH_CIRCLE_SIZE) / 2,
            borderColor: `${theme.colors.primary}22`,
          },
        ]}
      />
      <View style={[styles.pitchLine, { backgroundColor: `${theme.colors.primary}1A` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  floodlightGlow: {
    position: 'absolute',
    top: -80,
    left: -60,
    right: -60,
    height: 320,
  },
  pitchCircle: {
    position: 'absolute',
    bottom: -PITCH_CIRCLE_SIZE * 0.75,
    borderWidth: 1,
  },
  pitchLine: {
    position: 'absolute',
    bottom: '38%',
    left: 0,
    right: 0,
    height: 1,
  },
});
