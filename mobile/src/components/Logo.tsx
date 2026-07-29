import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  size?: number;
};

export default function Logo({ size = 34 }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Text
        style={[
          styles.text,
          { fontSize: size, color: theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
      >
        Coin
      </Text>
      <Text
        style={[
          styles.text,
          { fontSize: size, color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
        ]}
      >
        Bet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
