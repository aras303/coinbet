import React, { useMemo, useState } from 'react';
import { SectionList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LeagueFilterRow from '../components/LeagueFilterRow';
import LeagueSectionHeader from '../components/LeagueSectionHeader';
import MatchCard from '../components/MatchCard';
import MatchListSkeleton from '../components/MatchListSkeleton';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../theme/ThemeContext';
import { useMatches } from '../hooks/useMatches';
import { toISODate } from '../utils/date';
import { groupMatchesByLeague, isLiveMatch } from '../utils/match';
import type { League } from '../types/match';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LiveScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | 'all'>('all');

  const dateKey = useMemo(() => toISODate(new Date()), []);
  const { matches, loading, error } = useMatches(dateKey);

  const liveMatches = useMemo(() => (matches ?? []).filter(isLiveMatch), [matches]);

  const leagues = useMemo<League[]>(() => {
    const seen = new Map<number, League>();
    liveMatches.forEach((match) => {
      if (!seen.has(match.league.id)) seen.set(match.league.id, match.league);
    });
    return Array.from(seen.values());
  }, [liveMatches]);

  const filteredMatches = useMemo(() => {
    if (selectedLeagueId === 'all') return liveMatches;
    return liveMatches.filter((match) => match.league.id === selectedLeagueId);
  }, [liveMatches, selectedLeagueId]);

  const sections = useMemo(() => groupMatchesByLeague(filteredMatches), [filteredMatches]);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      {!loading && !error && liveMatches.length > 0 ? (
        <LeagueFilterRow
          leagues={leagues}
          selectedLeagueId={selectedLeagueId}
          onSelect={setSelectedLeagueId}
        />
      ) : null}

      {loading ? (
        <MatchListSkeleton />
      ) : error ? (
        <EmptyState message="Canlı maçlar şu anda gösterilemiyor." />
      ) : filteredMatches.length === 0 ? (
        <EmptyState message="Şu anda canlı maç yok." />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => String(item.id)}
          renderSectionHeader={({ section }) => <LeagueSectionHeader league={section.league} />}
          renderItem={({ item }) => (
            <MatchCard
              match={item}
              onPress={() => navigation.navigate('MatchDetail', { match: item })}
            />
          )}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
});
