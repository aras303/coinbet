import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  value: string;
  valueColor?: string;
};

export default function InfoRow({ label, value, valueColor }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
      <Text
        style={[
          styles.label,
          { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.value,
          { color: valueColor ?? theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
  },
});
