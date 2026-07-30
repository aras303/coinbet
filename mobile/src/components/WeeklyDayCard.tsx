import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckIcon, CoinsIcon, LockIcon } from 'phosphor-react-native';
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
        active
          ? theme.shadow.glow(theme.colors.primary)
          : theme.shadow.ambient(theme.colors.primaryMuted),
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
            fontFamily: theme.typography.manrope.extraBold,
          },
        ]}
        numberOfLines={1}
      >
        {day}
      </Text>

      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        {claimed ? (
          <CheckIcon size={14} color={badgeIconColor} weight="bold" />
        ) : status === 'locked' ? (
          <LockIcon size={14} color={badgeIconColor} weight="bold" />
        ) : (
          <CoinsIcon size={14} color={badgeIconColor} weight="fill" />
        )}
      </View>

      <Text
        style={[
          styles.coins,
          {
            color: theme.colors.text,
            fontFamily: theme.typography.manrope.extraBold,
            opacity: status === 'locked' ? 0.5 : 1,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {coins}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    gap: 5,
  },
  dayLabel: {
    fontSize: 9,
    letterSpacing: 0.2,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coins: {
    fontSize: 11,
  },
});
