import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  home: number;
  away: number;
};

export default function StatCompareRow({ label, home, away }: Props) {
  const theme = useTheme();
  const total = home + away || 1;
  const homeRatio = home / total;

  return (
    <View style={styles.wrapper}>
      <View style={styles.valuesRow}>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          {home}
        </Text>
        <Text
          style={[
            styles.label,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.value,
            { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          {away}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.colors.surfaceElevated }]}>
        <View
          style={[
            styles.fill,
            { width: `${homeRatio * 100}%`, backgroundColor: theme.colors.primary },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    minWidth: 28,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
