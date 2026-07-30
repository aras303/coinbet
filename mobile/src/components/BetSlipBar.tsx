import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  visible: boolean;
  count: number;
  totalOdds: string;
};

export default function BetSlipBar({ visible, count, totalOdds }: Props) {
  const theme = useTheme();
  const [translateY] = useState(() => new Animated.Value(100));
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: visible ? 0 : 100,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, { toValue: visible ? 1 : 0, duration: 220, useNativeDriver: true }),
    ]).start();
  }, [visible, translateY, opacity]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.wrapper,
        theme.shadow.raised,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.md,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: theme.colors.background }]}>
        <Text
          style={[
            styles.badgeText,
            { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          {count}
        </Text>
      </View>
      <Text
        style={[
          styles.label,
          { color: theme.colors.background, fontFamily: theme.typography.fontFamily },
        ]}
      >
        Kupon
      </Text>
      <Text
        style={[
          styles.odds,
          { color: theme.colors.background, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {totalOdds}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={theme.colors.background} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 10,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
  },
  odds: {
    fontSize: 16,
    fontWeight: '800',
  },
});
