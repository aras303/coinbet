import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RemoteLogo from './RemoteLogo';
import LiveDot from './LiveDot';
import { useTheme } from '../theme/ThemeContext';
import type { Match } from '../types/match';
import { getStatusLabel, isFinishedMatch, isLiveMatch } from '../utils/match';

type Props = {
  match: Match;
  onPress?: () => void;
};

export default function MatchCard({ match, onPress }: Props) {
  const theme = useTheme();
  const live = isLiveMatch(match);
  const finished = isFinishedMatch(match);
  const showScore = live || finished;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        theme.shadow.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: live ? `${theme.colors.primary}55` : theme.colors.border,
          borderRadius: theme.radius.md,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.statusPill,
            {
              backgroundColor: live ? `${theme.colors.primary}22` : theme.colors.surfaceElevated,
              borderRadius: theme.radius.sm,
            },
          ]}
        >
          {live ? <LiveDot color={theme.colors.primary} /> : null}
          <Text
            style={[
              styles.statusText,
              {
                color: live ? theme.colors.primary : theme.colors.textMuted,
                fontFamily: theme.typography.fontFamily,
              },
            ]}
          >
            {getStatusLabel(match)}
          </Text>
        </View>
      </View>

      <View style={styles.teamsBlock}>
        <View style={styles.teamRow}>
          <RemoteLogo uri={match.teams.home.logo} size={26} />
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            ]}
            numberOfLines={1}
          >
            {match.teams.home.name}
          </Text>
          {showScore ? (
            <Text
              style={[
                styles.goals,
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {match.goals.home ?? 0}
            </Text>
          ) : null}
        </View>

        <View style={styles.teamRow}>
          <RemoteLogo uri={match.teams.away.logo} size={26} />
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            ]}
            numberOfLines={1}
          >
            {match.teams.away.name}
          </Text>
          {showScore ? (
            <Text
              style={[
                styles.goals,
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {match.goals.away ?? 0}
            </Text>
          ) : null}
        </View>
      </View>

      {match.odds ? (
        <View style={[styles.oddsRow, { borderTopColor: theme.colors.border }]}>
          <OddsPill label="1" value={match.odds.home} />
          <OddsPill label="X" value={match.odds.draw} />
          <OddsPill label="2" value={match.odds.away} />
        </View>
      ) : null}
    </Pressable>
  );
}

function OddsPill({ label, value }: { label: string; value: string }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.oddsPill,
        {
          backgroundColor: theme.colors.surfaceElevated,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.sm,
        },
      ]}
    >
      <Text
        style={[
          styles.oddsLabel,
          { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.oddsValue,
          { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 14,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },
  teamsBlock: {
    gap: 12,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamName: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '700',
  },
  goals: {
    fontSize: 16,
    fontWeight: '800',
  },
  oddsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  oddsPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  oddsLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 3,
  },
  oddsValue: {
    fontSize: 14,
    fontWeight: '800',
  },
});
