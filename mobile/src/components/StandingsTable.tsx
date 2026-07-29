import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import type { StandingsRow } from '../types/matchDetail';

type Props = {
  rows: StandingsRow[];
};

export default function StandingsTable({ rows }: Props) {
  const theme = useTheme();

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
      <View style={[styles.headerRow, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.posCell, styles.headerText, { color: theme.colors.textMuted }]}>
          #
        </Text>
        <Text
          style={[
            styles.teamCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily },
          ]}
        >
          Takım
        </Text>
        <Text style={[styles.numCell, styles.headerText, { color: theme.colors.textMuted }]}>
          O
        </Text>
        <Text style={[styles.numCell, styles.headerText, { color: theme.colors.textMuted }]}>
          G
        </Text>
        <Text style={[styles.numCell, styles.headerText, { color: theme.colors.textMuted }]}>
          B
        </Text>
        <Text style={[styles.numCell, styles.headerText, { color: theme.colors.textMuted }]}>
          M
        </Text>
        <Text style={[styles.avCell, styles.headerText, { color: theme.colors.textMuted }]}>
          AV
        </Text>
        <Text style={[styles.ptsCell, styles.headerText, { color: theme.colors.textMuted }]}>
          P
        </Text>
      </View>

      {rows.map((row) => (
        <View
          key={row.teamName}
          style={[
            styles.row,
            { borderBottomColor: theme.colors.border },
            row.highlighted && { backgroundColor: `${theme.colors.primary}14` },
          ]}
        >
          <Text
            style={[
              styles.posCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.position}
          </Text>
          <Text
            style={[
              styles.teamCell,
              styles.cellText,
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            ]}
            numberOfLines={1}
          >
            {row.teamName}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.played}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.won}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.drawn}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.lost}
          </Text>
          <Text
            style={[
              styles.avCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.goalsFor - row.goalsAgainst > 0 ? '+' : ''}
            {row.goalsFor - row.goalsAgainst}
          </Text>
          <Text
            style={[
              styles.ptsCell,
              styles.cellText,
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            ]}
          >
            {row.points}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cellText: {
    fontSize: 12,
    fontWeight: '600',
  },
  posCell: {
    width: 20,
    textAlign: 'center',
  },
  teamCell: {
    flex: 1,
    paddingLeft: 6,
  },
  teamName: {
    fontWeight: '700',
  },
  numCell: {
    width: 20,
    textAlign: 'center',
  },
  avCell: {
    width: 30,
    textAlign: 'center',
  },
  ptsCell: {
    width: 26,
    textAlign: 'center',
    fontWeight: '800',
  },
});
