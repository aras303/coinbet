import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CaretLeftIcon, SoccerBallIcon } from 'phosphor-react-native';
import RemoteLogo from './RemoteLogo';
import { useTheme } from '../theme/ThemeContext';
import type { Match } from '../types/match';
import { getStatusLabel, getStatusLongLabel, isFinishedMatch, isLiveMatch } from '../utils/match';

type Props = {
  match: Match;
  onBack: () => void;
};

export default function MatchDetailHeader({ match, onBack }: Props) {
  const theme = useTheme();
  const live = isLiveMatch(match);
  const finished = isFinishedMatch(match);
  const showScore = live || finished;

  return (
    <View
      style={[
        styles.wrapper,
        theme.shadow.ambient(theme.colors.primaryMuted),
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <View style={styles.topRow}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.backButton}>
          <CaretLeftIcon size={22} color={theme.colors.text} weight="bold" />
        </Pressable>

        <View style={styles.leagueRow}>
          <RemoteLogo uri={match.league.logo} size={16} fallbackIcon={SoccerBallIcon} />
          <Text
            style={[
              styles.leagueName,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
            numberOfLines={1}
          >
            {match.league.name}
          </Text>
        </View>
      </View>

      <View style={styles.teamsRow}>
        <View style={styles.teamColumn}>
          <RemoteLogo uri={match.teams.home.logo} size={44} />
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
            ]}
            numberOfLines={2}
          >
            {match.teams.home.name}
          </Text>
        </View>

        <View style={styles.centerColumn}>
          {showScore ? (
            <Text
              style={[
                styles.score,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {match.goals.home ?? 0} - {match.goals.away ?? 0}
            </Text>
          ) : (
            <Text
              style={[
                styles.time,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {getStatusLabel(match)}
            </Text>
          )}
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: live ? `${theme.colors.primary}22` : theme.colors.surfaceElevated,
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                {
                  color: live ? theme.colors.primary : theme.colors.textMuted,
                  fontFamily: theme.typography.manrope.bold,
                },
              ]}
            >
              {getStatusLongLabel(match)}
            </Text>
          </View>
        </View>

        <View style={styles.teamColumn}>
          <RemoteLogo uri={match.teams.away.logo} size={44} />
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
            ]}
            numberOfLines={2}
          >
            {match.teams.away.name}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  leagueRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingRight: 40,
  },
  leagueName: {
    fontSize: 13,
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  teamName: {
    fontSize: 13,
    textAlign: 'center',
  },
  centerColumn: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    minWidth: 90,
  },
  score: {
    fontSize: 26,
  },
  time: {
    fontSize: 20,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
  },
});
