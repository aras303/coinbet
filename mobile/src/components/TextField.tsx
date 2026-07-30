import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = TextInputProps & {
  label: string;
  secureToggle?: boolean;
};

export default function TextField({ label, secureToggle, secureTextEntry, style, ...rest }: Props) {
  const theme = useTheme();
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          styles.label,
          { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {label}
      </Text>
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            style,
          ]}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={hidden}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />
        {secureToggle ? (
          <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={12}>
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={theme.colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
  },
});
