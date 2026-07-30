import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { CalendarBlankIcon, CaretDownIcon } from 'phosphor-react-native';
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
      <CalendarBlankIcon size={17} color={theme.colors.primary} weight="duotone" />
      <Text
        style={[
          styles.label,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.semiBold },
        ]}
      >
        {formatDisplayDate(date)}
      </Text>
      <CaretDownIcon size={14} color={theme.colors.textMuted} weight="bold" />
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
    flex: 1,
  },
});
