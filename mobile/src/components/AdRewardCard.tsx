import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

export type AdRewardStatus = 'locked' | 'ready' | 'playing' | 'claimed';

type Props = {
  title: string;
  coins: number;
  status: AdRewardStatus;
  onWatch: () => void;
};

const BUTTON_LABELS: Record<AdRewardStatus, string> = {
  locked: 'Kilitli',
  ready: 'İzle',
  playing: 'Oynatılıyor',
  claimed: 'Alındı',
};

export default function AdRewardCard({ title, coins, status, onWatch }: Props) {
  const theme = useTheme();
  const disabled = status !== 'ready';

  return (
    <View
      style={[
        styles.card,
        theme.shadow.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Ionicons
        name={status === 'claimed' ? 'checkmark-circle' : 'play-circle-outline'}
        size={28}
        color={status === 'claimed' ? theme.colors.primary : theme.colors.textSecondary}
      />

      <View style={styles.textWrap}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          +{coins} Coin
        </Text>
      </View>

      <Pressable
        onPress={disabled ? undefined : onWatch}
        style={[
          styles.button,
          {
            backgroundColor:
              status === 'ready' ? theme.colors.primary : theme.colors.surfaceElevated,
            borderRadius: theme.radius.sm,
          },
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: status === 'ready' ? theme.colors.background : theme.colors.textMuted,
              fontFamily: theme.typography.fontFamily,
            },
          ]}
        >
          {BUTTON_LABELS[status]}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
