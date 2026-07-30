import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  onBack: () => void;
};

export default function ScreenHeader({ title, onBack }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.row, theme.shadow.card, { backgroundColor: theme.colors.surface }]}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
      </Pressable>
      <Text
        style={[
          styles.title,
          { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
});
