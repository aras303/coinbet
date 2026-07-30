import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export type WeeklyDayStatus = 'claimed' | 'available' | 'locked';

type Props = {
  day: number;
  coins: number;
  status: WeeklyDayStatus;
};

export default function WeeklyDayCard({ day, coins, status }: Props) {
  const theme = useTheme();
  const active = status === 'available';
  const claimed = status === 'claimed';

  const badgeColor = active
    ? theme.colors.primary
    : claimed
      ? `${theme.colors.primary}22`
      : theme.colors.surfaceElevated;
  const badgeIconColor = active
    ? theme.colors.background
    : claimed
      ? theme.colors.primary
      : theme.colors.textMuted;

  return (
    <View
      style={[
        styles.card,
        active && theme.shadow.glow(theme.colors.primary),
        {
          backgroundColor: theme.colors.surface,
          borderColor: active ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Text
        style={[
          styles.dayLabel,
          {
            color: active ? theme.colors.primary : theme.colors.textMuted,
            fontFamily: theme.typography.fontFamily,
          },
        ]}
      >
        {day}. GÜN
      </Text>

      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Ionicons
          name={claimed ? 'checkmark' : status === 'locked' ? 'lock-closed' : 'logo-bitcoin'}
          size={18}
          color={badgeIconColor}
        />
      </View>

      <Text
        style={[
          styles.coins,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            opacity: status === 'locked' ? 0.5 : 1,
          },
        ]}
      >
        {coins}
      </Text>
      <Text
        style={[
          styles.coinLabel,
          { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily },
        ]}
      >
        COIN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 76,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coins: {
    fontSize: 15,
    fontWeight: '800',
  },
  coinLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: -4,
  },
});
