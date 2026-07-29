import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  opacity: Animated.Value;
};

export default function MatchCardSkeleton({ opacity }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Animated.View
        style={[styles.leagueLine, { opacity, backgroundColor: theme.colors.surfaceElevated }]}
      />
      <Animated.View
        style={[styles.teamLine, { opacity, backgroundColor: theme.colors.surfaceElevated }]}
      />
      <Animated.View
        style={[styles.teamLine, { opacity, backgroundColor: theme.colors.surfaceElevated }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  leagueLine: {
    width: '45%',
    height: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  teamLine: {
    width: '80%',
    height: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
});
