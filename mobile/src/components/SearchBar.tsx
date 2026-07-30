import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon, XCircleIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        theme.shadow.ambient(theme.colors.primaryMuted),
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      <MagnifyingGlassIcon size={18} color={theme.colors.textMuted} weight="bold" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Takım, lig veya maç ara"
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.medium },
        ]}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 ? (
        <Pressable onPress={() => onChangeText('')} hitSlop={8}>
          <XCircleIcon size={18} color={theme.colors.textMuted} weight="fill" />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 46,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
});
