import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { OddsCategory } from '../types/matchDetail';

const CATEGORIES: { key: OddsCategory; label: string }[] = [
  { key: 'popular', label: 'Popüler' },
  { key: 'goals', label: 'Gol' },
  { key: 'firstHalf', label: 'İlk Yarı' },
  { key: 'corners', label: 'Korner' },
  { key: 'handicap', label: 'Handikap' },
  { key: 'other', label: 'Diğer' },
];

type Props = {
  active: OddsCategory;
  onChange: (key: OddsCategory) => void;
};

export default function OddsCategoryTabs({ active, onChange }: Props) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CATEGORIES.map((category) => {
        const isActive = category.key === active;
        return (
          <Pressable
            key={category.key}
            onPress={() => onChange(category.key)}
            style={[
              styles.chip,
              isActive && theme.shadow.glow(theme.colors.primary),
              {
                backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                borderColor: isActive ? theme.colors.primary : theme.colors.border,
                borderRadius: theme.radius.sm,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? theme.colors.background : theme.colors.textSecondary,
                  fontFamily: theme.typography.manrope.semiBold,
                },
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
  },
});
