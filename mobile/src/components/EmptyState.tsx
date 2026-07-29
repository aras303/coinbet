import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  message: string;
};

export default function EmptyState({ message }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Ionicons name="football-outline" size={40} color={theme.colors.textMuted} />
      <Text
        style={[
          styles.text,
          { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 60,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});
