import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, disabled }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.button,
        !disabled && theme.shadow.glow(theme.colors.primary),
        {
          backgroundColor: disabled ? theme.colors.surfaceElevated : theme.colors.primary,
          borderRadius: theme.radius.md,
          opacity: pressed && !disabled ? 0.85 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: disabled ? theme.colors.textMuted : theme.colors.background,
            fontFamily: theme.typography.fontFamily,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
});
