import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SoccerBallIcon } from 'phosphor-react-native';
import RemoteLogo from './RemoteLogo';
import { useTheme } from '../theme/ThemeContext';
import type { League } from '../types/match';

type Props = {
  league: League;
};

export default function LeagueSectionHeader({ league }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: theme.colors.background, borderBottomColor: theme.colors.border },
      ]}
    >
      <RemoteLogo uri={league.logo} size={20} fallbackIcon={SoccerBallIcon} />
      <Text
        style={[
          styles.name,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
        ]}
        numberOfLines={1}
      >
        {league.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
  },
});
