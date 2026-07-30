import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SoccerBallIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  message: string;
};

export default function EmptyState({ message }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <SoccerBallIcon size={40} color={theme.colors.textMuted} weight="light" />
      <Text
        style={[
          styles.text,
          { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
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
  },
});
