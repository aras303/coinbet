import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from './Logo';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  onMenuPress: () => void;
};

const COIN_BALANCE = '1.250';

export default function TopBar({ onMenuPress }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Pressable onPress={onMenuPress} hitSlop={12}>
          <Ionicons name="menu" size={26} color={theme.colors.text} />
        </Pressable>
        <Logo size={20} />
      </View>

      <View
        style={[
          styles.balance,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.full,
          },
        ]}
      >
        <Ionicons name="cash-outline" size={15} color={theme.colors.primary} />
        <Text
          style={[
            styles.balanceText,
            { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
          ]}
        >
          {COIN_BALANCE}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  balanceText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
