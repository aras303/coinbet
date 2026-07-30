import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MatchDetailHeader from '../components/MatchDetailHeader';
import MatchDetailTabs, { type MatchDetailTabKey } from '../components/MatchDetailTabs';
import OddsCategoryTabs from '../components/OddsCategoryTabs';
import OddsMarketCard from '../components/OddsMarketCard';
import InfoRow from '../components/InfoRow';
import StatCompareRow from '../components/StatCompareRow';
import StandingsTable from '../components/StandingsTable';
import EmptyState from '../components/EmptyState';
import BetSlipBar from '../components/BetSlipBar';
import { useTheme } from '../theme/ThemeContext';
import type { RootStackParamList } from '../navigation/types';
import type { OddsCategory, OddsMarket } from '../types/matchDetail';
import {
  getMockMatchInfo,
  getMockMatchStats,
  getMockOddsByCategory,
  getMockStandings,
} from '../utils/mockMatchDetail';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchDetail'>;

export default function MatchDetailScreen({ route, navigation }: Props) {
  const theme = useTheme();
  const { match } = route.params;

  const [activeTab, setActiveTab] = useState<MatchDetailTabKey>('odds');
  const [activeOddsCategory, setActiveOddsCategory] = useState<OddsCategory>('popular');
  const [selectedOdds, setSelectedOdds] = useState<Record<string, string>>({});

  const info = useMemo(() => getMockMatchInfo(match), [match]);
  const stats = useMemo(() => getMockMatchStats(match), [match]);
  const standings = useMemo(() => getMockStandings(match), [match]);
  const oddsByCategory = useMemo(() => getMockOddsByCategory(match), [match]);
  const markets = oddsByCategory[activeOddsCategory];

  const allMarkets = useMemo(() => {
    const map = new Map<string, OddsMarket>();
    Object.values(oddsByCategory).forEach((list) => {
      list.forEach((marketItem) => map.set(marketItem.id, marketItem));
    });
    return map;
  }, [oddsByCategory]);

  const activeSelections = useMemo(() => {
    return Object.entries(selectedOdds)
      .filter(([, selectionId]) => selectionId)
      .map(([marketId, selectionId]) => {
        const marketItem = allMarkets.get(marketId);
        return marketItem?.selections.find((selection) => selection.id === selectionId) ?? null;
      })
      .filter((selection): selection is NonNullable<typeof selection> => selection !== null);
  }, [selectedOdds, allMarkets]);

  const combinedOdds = activeSelections
    .reduce((acc, selection) => acc * parseFloat(selection.value), 1)
    .toFixed(2);

  function handleSelectOdd(marketId: string, selectionId: string) {
    setSelectedOdds((prev) => ({
      ...prev,
      [marketId]: prev[marketId] === selectionId ? '' : selectionId,
    }));
  }

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <MatchDetailHeader match={match} onBack={() => navigation.goBack()} />
      <MatchDetailTabs active={activeTab} onChange={setActiveTab} />

      {activeTab === 'odds' ? (
        <View style={styles.flex}>
          <OddsCategoryTabs active={activeOddsCategory} onChange={setActiveOddsCategory} />
          {markets.length === 0 ? (
            <EmptyState message="Bu kategori için oran bulunmuyor." />
          ) : (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {markets.map((market) => (
                <OddsMarketCard
                  key={market.id}
                  market={market}
                  selectedSelectionId={selectedOdds[market.id] ?? null}
                  onSelect={handleSelectOdd}
                />
              ))}
            </ScrollView>
          )}
        </View>
      ) : null}

      {activeTab === 'info' ? (
        <ScrollView contentContainerStyle={styles.infoContent} showsVerticalScrollIndicator={false}>
          <InfoRow label="Tarih" value={info.date} />
          <InfoRow label="Saat" value={info.time} />
          <InfoRow label="Stadyum" value={info.stadium} />
          <InfoRow label="Hakem" value={info.referee} />
          <InfoRow label="Maç Durumu" value={info.statusLabel} />
        </ScrollView>
      ) : null}

      {activeTab === 'stats' ? (
        <ScrollView contentContainerStyle={styles.infoContent} showsVerticalScrollIndicator={false}>
          <View style={styles.statsTeamsRow}>
            <Text
              style={[
                styles.statsTeamName,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
              ]}
              numberOfLines={1}
            >
              {match.teams.home.name}
            </Text>
            <Text
              style={[
                styles.statsTeamName,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.fontFamily,
                  textAlign: 'right',
                },
              ]}
              numberOfLines={1}
            >
              {match.teams.away.name}
            </Text>
          </View>
          <StatCompareRow
            label="Topa Sahip Olma"
            home={stats.possession.home}
            away={stats.possession.away}
          />
          <StatCompareRow label="Şut" home={stats.shots.home} away={stats.shots.away} />
          <StatCompareRow
            label="İsabetli Şut"
            home={stats.shotsOnTarget.home}
            away={stats.shotsOnTarget.away}
          />
          <StatCompareRow label="Korner" home={stats.corners.home} away={stats.corners.away} />
          <StatCompareRow
            label="Sarı Kart"
            home={stats.yellowCards.home}
            away={stats.yellowCards.away}
          />
        </ScrollView>
      ) : null}

      {activeTab === 'standings' ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <StandingsTable rows={standings} />
        </ScrollView>
      ) : null}

      <BetSlipBar
        visible={activeSelections.length > 0}
        count={activeSelections.length}
        totalOdds={combinedOdds}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 14,
    paddingBottom: 88,
  },
  infoContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 88,
  },
  statsTeamsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statsTeamName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
  },
});
