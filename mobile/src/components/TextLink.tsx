import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  label: string;
  onPress?: () => void;
  muted?: boolean;
};

export default function TextLink({ label, onPress, muted }: Props) {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Text
        style={[
          styles.text,
          {
            color: muted ? theme.colors.textSecondary : theme.colors.primary,
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
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
