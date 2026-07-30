import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CaretLeftIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  title: string;
  onBack: () => void;
};

export default function ScreenHeader({ title, onBack }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        theme.shadow.ambient(theme.colors.primaryMuted),
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
        <CaretLeftIcon size={22} color={theme.colors.text} weight="bold" />
      </Pressable>
      <Text
        style={[
          styles.title,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
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
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
});
