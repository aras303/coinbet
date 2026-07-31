import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { PlayCircleIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

const AD_DURATION_SECONDS = 3;

type Props = {
  visible: boolean;
  onComplete: () => void;
};

export default function AdPlayingModal({ visible, onComplete }: Props) {
  const theme = useTheme();
  const [secondsLeft, setSecondsLeft] = useState(AD_DURATION_SECONDS);
  const [wasVisible, setWasVisible] = useState(visible);

  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) {
      setSecondsLeft(AD_DURATION_SECONDS);
    }
  }

  useEffect(() => {
    if (!visible) return undefined;

    let remaining = AD_DURATION_SECONDS;
    const interval = setInterval(() => {
      remaining -= 1;
      setSecondsLeft(Math.max(remaining, 0));
      if (remaining <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [visible, onComplete]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            theme.shadow.raised,
            { backgroundColor: theme.colors.surface, borderRadius: theme.radius.lg },
          ]}
        >
          <View style={[styles.videoBox, { backgroundColor: theme.colors.backgroundElevated }]}>
            <PlayCircleIcon size={48} color={theme.colors.primary} weight="fill" />
          </View>
          <Text
            style={[
              styles.label,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
            ]}
          >
            Reklam Oynatılıyor
          </Text>
          <Text
            style={[
              styles.countdown,
              { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
            ]}
          >
            {secondsLeft > 0 ? secondsLeft : '✓'}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    padding: 24,
  },
  videoBox: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  countdown: {
    fontSize: 28,
  },
});
