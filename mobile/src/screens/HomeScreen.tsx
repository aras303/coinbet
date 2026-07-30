import React, { useMemo, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TopBar from '../components/TopBar';
import SideMenuDrawer from '../components/SideMenuDrawer';
import CalendarRow from '../components/CalendarRow';
import DatePickerModal from '../components/DatePickerModal';
import SearchBar from '../components/SearchBar';
import LeagueFilterRow from '../components/LeagueFilterRow';
import LeagueSectionHeader from '../components/LeagueSectionHeader';
import MatchCard from '../components/MatchCard';
import MatchListSkeleton from '../components/MatchListSkeleton';
import EmptyState from '../components/EmptyState';
import { useTheme } from '../theme/ThemeContext';
import { useMatches } from '../hooks/useMatches';
import { toISODate } from '../utils/date';
import { matchSearchText } from '../utils/match';
import type { League } from '../types/match';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | 'all'>('all');

  const dateKey = useMemo(() => toISODate(selectedDate), [selectedDate]);
  const { matches, loading, error } = useMatches(dateKey);

  const [trackedDateKey, setTrackedDateKey] = useState(dateKey);
  if (dateKey !== trackedDateKey) {
    setTrackedDateKey(dateKey);
    setSelectedLeagueId('all');
  }

  const leagues = useMemo<League[]>(() => {
    if (!matches) return [];
    const seen = new Map<number, League>();
    matches.forEach((match) => {
      if (!seen.has(match.league.id)) seen.set(match.league.id, match.league);
    });
    return Array.from(seen.values());
  }, [matches]);

  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    const query = searchText.trim().toLowerCase();
    return matches.filter((match) => {
      if (selectedLeagueId !== 'all' && match.league.id !== selectedLeagueId) return false;
      if (query && !matchSearchText(match).includes(query)) return false;
      return true;
    });
  }, [matches, selectedLeagueId, searchText]);

  const sections = useMemo(() => {
    const map = new Map<number, { league: League; data: typeof filteredMatches }>();
    filteredMatches.forEach((match) => {
      const existing = map.get(match.league.id);
      if (existing) {
        existing.data.push(match);
      } else {
        map.set(match.league.id, { league: match.league, data: [match] });
      }
    });
    return Array.from(map.values());
  }, [filteredMatches]);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <TopBar onMenuPress={() => setMenuVisible(true)} />
      <CalendarRow date={selectedDate} onPress={() => setDatePickerVisible(true)} />

      <View style={styles.searchWrap}>
        <SearchBar value={searchText} onChangeText={setSearchText} />
      </View>

      <LeagueFilterRow
        leagues={leagues}
        selectedLeagueId={selectedLeagueId}
        onSelect={setSelectedLeagueId}
      />

      {loading ? (
        <MatchListSkeleton />
      ) : error ? (
        <EmptyState message="Maçlar şu anda gösterilemiyor." />
      ) : filteredMatches.length === 0 ? (
        <EmptyState message="Bu tarihte maç bulunamadı." />
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

      <DatePickerModal
        visible={datePickerVisible}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        onClose={() => setDatePickerVisible(false)}
      />
      <SideMenuDrawer
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelect={(key) => {
          if (key === 'weekly-login') {
            navigation.navigate('WeeklyLogin');
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
});
