import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RemoteLogo from './RemoteLogo';
import { useTheme } from '../theme/ThemeContext';
import type { Match } from '../types/match';
import { getStatusLabel, isFinishedMatch, isLiveMatch } from '../utils/match';

type Props = {
  match: Match;
};

export default function MatchCard({ match }: Props) {
  const theme = useTheme();
  const live = isLiveMatch(match);
  const finished = isFinishedMatch(match);
  const showScore = live || finished;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <View style={styles.leagueRow}>
        <RemoteLogo uri={match.league.logo} size={16} fallbackIcon="football-outline" />
        <Text
          style={[
            styles.leagueName,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
          numberOfLines={1}
        >
          {match.league.name}
        </Text>
        <View style={[styles.statusPill, live && { backgroundColor: `${theme.colors.primary}22` }]}>
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
          <RemoteLogo uri={match.teams.home.logo} size={24} />
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
          <RemoteLogo uri={match.teams.away.logo} size={24} />
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
    </View>
  );
}

function OddsPill({ label, value }: { label: string; value: string }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.oddsPill,
        { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.sm },
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
          { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  leagueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  leagueName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  teamsBlock: {
    gap: 10,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  goals: {
    fontSize: 15,
    fontWeight: '700',
  },
  oddsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  oddsPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  oddsLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  oddsValue: {
    fontSize: 13,
    fontWeight: '700',
  },
});
