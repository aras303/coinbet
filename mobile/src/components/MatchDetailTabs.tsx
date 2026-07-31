import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export type MatchDetailTabKey = 'odds' | 'info' | 'stats' | 'standings';

const TABS: { key: MatchDetailTabKey; label: string }[] = [
  { key: 'odds', label: 'Oranlar' },
  { key: 'info', label: 'Detay' },
  { key: 'stats', label: 'İstatistik' },
  { key: 'standings', label: 'Puan Durumu' },
];

type Props = {
  active: MatchDetailTabKey;
  onChange: (key: MatchDetailTabKey) => void;
};

export default function MatchDetailTabs({ active, onChange }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? theme.colors.primary : theme.colors.textMuted,
                  fontFamily: theme.typography.manrope.bold,
                },
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
            <View
              style={[
                styles.indicator,
                { backgroundColor: isActive ? theme.colors.primary : 'transparent' },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 10,
  },
  label: {
    fontSize: 13,
  },
  indicator: {
    marginTop: 10,
    height: 2,
    width: '70%',
    borderRadius: 1,
  },
});
