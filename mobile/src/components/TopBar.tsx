import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ListIcon, CoinsIcon } from 'phosphor-react-native';
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
          <ListIcon size={24} color={theme.colors.text} weight="bold" />
        </Pressable>
        <Logo size={20} />
      </View>

      <View
        style={[
          styles.balance,
          {
            backgroundColor: `${theme.colors.primary}16`,
            borderColor: `${theme.colors.primary}40`,
            borderRadius: theme.radius.full,
          },
        ]}
      >
        <CoinsIcon size={15} color={theme.colors.primary} weight="duotone" />
        <Text
          style={[
            styles.balanceText,
            { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
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
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  balanceText: {
    fontSize: 13,
  },
});
