import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { formatDisplayDate } from '../utils/date';

type Props = {
  date: Date;
  onPress: () => void;
};

export default function CalendarRow({ date, onPress }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { borderBottomColor: theme.colors.border }]}
      hitSlop={4}
    >
      <Ionicons name="calendar-outline" size={17} color={theme.colors.primary} />
      <Text
        style={[
          styles.label,
          { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {formatDisplayDate(date)}
      </Text>
      <Ionicons name="chevron-down" size={15} color={theme.colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
