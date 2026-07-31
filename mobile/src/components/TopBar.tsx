import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryMuted]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.balance,
          theme.shadow.glow(theme.colors.primary),
          { borderRadius: theme.radius.full },
        ]}
      >
        <CoinsIcon size={15} color={theme.colors.background} weight="fill" />
        <Text
          style={[
            styles.balanceText,
            { color: theme.colors.background, fontFamily: theme.typography.manrope.extraBold },
          ]}
        >
          {COIN_BALANCE}
        </Text>
      </LinearGradient>
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
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  balanceText: {
    fontSize: 13,
  },
});
