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

  return (
    <View
      style={[
        styles.card,
        active && theme.shadow.glow(theme.colors.primary),
        {
          backgroundColor: active ? theme.colors.primary : theme.colors.surface,
          borderColor: active ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Text
        style={[
          styles.dayLabel,
          {
            color: active ? theme.colors.background : theme.colors.textMuted,
            fontFamily: theme.typography.fontFamily,
          },
        ]}
      >
        Gün {day}
      </Text>

      {claimed ? (
        <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
      ) : (
        <Ionicons
          name={status === 'locked' ? 'lock-closed-outline' : 'gift-outline'}
          size={22}
          color={active ? theme.colors.background : theme.colors.textMuted}
        />
      )}

      <Text
        style={[
          styles.coins,
          {
            color: active ? theme.colors.background : theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            opacity: status === 'locked' ? 0.5 : 1,
          },
        ]}
      >
        {coins}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 72,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  coins: {
    fontSize: 13,
    fontWeight: '800',
  },
});
