import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SoccerBallIcon } from 'phosphor-react-native';
import RemoteLogo from './RemoteLogo';
import { useTheme } from '../theme/ThemeContext';
import type { League } from '../types/match';

type Props = {
  leagues: League[];
  selectedLeagueId: number | 'all';
  onSelect: (leagueId: number | 'all') => void;
};

export default function LeagueFilterRow({ leagues, selectedLeagueId, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <Chip label="Tümü" active={selectedLeagueId === 'all'} onPress={() => onSelect('all')} />
      {leagues.map((league) => (
        <Chip
          key={league.id}
          label={league.name}
          logo={league.logo}
          active={selectedLeagueId === league.id}
          onPress={() => onSelect(league.id)}
        />
      ))}
    </ScrollView>
  );
}

type ChipProps = {
  label: string;
  logo?: string | null;
  active: boolean;
  onPress: () => void;
};

function Chip({ label, logo, active, onPress }: ChipProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active && theme.shadow.glow(theme.colors.primary),
        {
          backgroundColor: active ? theme.colors.primary : theme.colors.surface,
          borderColor: active ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.radius.sm,
        },
      ]}
    >
      {logo ? <RemoteLogo uri={logo} size={16} fallbackIcon={SoccerBallIcon} /> : null}
      <Text
        style={[
          styles.chipLabel,
          {
            color: active ? theme.colors.background : theme.colors.textSecondary,
            fontFamily: theme.typography.manrope.semiBold,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipLabel: {
    fontSize: 12,
    maxWidth: 120,
  },
});
