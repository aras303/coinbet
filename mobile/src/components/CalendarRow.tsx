import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
    <View style={styles.wrap}>
      <Pressable
        onPress={onPress}
        style={[
          styles.pill,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.full,
          },
        ]}
        hitSlop={4}
      >
        <CalendarBlankIcon size={16} color={theme.colors.primary} weight="duotone" />
        <Text
          style={[
            styles.label,
            { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          {formatDisplayDate(date)}
        </Text>
        <CaretDownIcon size={13} color={theme.colors.textMuted} weight="bold" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 2,
  },
  pill: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
  },
});
