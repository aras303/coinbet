import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckCircleIcon, PlayCircleIcon } from 'phosphor-react-native';
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
        theme.shadow.ambient(theme.colors.primaryMuted),
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      {status === 'claimed' ? (
        <CheckCircleIcon size={28} color={theme.colors.primary} weight="fill" />
      ) : (
        <PlayCircleIcon size={28} color={theme.colors.textSecondary} weight="regular" />
      )}

      <View style={styles.textWrap}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
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
              fontFamily: theme.typography.manrope.extraBold,
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
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 12,
  },
});
