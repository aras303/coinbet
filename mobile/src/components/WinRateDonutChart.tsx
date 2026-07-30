import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  winRate: number;
  size?: number;
  strokeWidth?: number;
};

export default function WinRateDonutChart({ winRate, size = 128, strokeWidth = 14 }: Props) {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const winLength = (winRate / 100) * circumference;
  const center = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.colors.danger}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={`${winLength}, ${circumference}`}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.centerLabel}>
        <Text
          style={[
            styles.percent,
            { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
          ]}
        >
          {winRate.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontSize: 18,
    fontWeight: '800',
  },
});
