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
        theme.shadow.ambient(theme.colors.primaryMuted),
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      <View style={[styles.headerRow, { borderBottomColor: theme.colors.border }]}>
        <Text
          style={[
            styles.posCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          #
        </Text>
        <Text
          style={[
            styles.teamCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          Takım
        </Text>
        <Text
          style={[
            styles.numCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          O
        </Text>
        <Text
          style={[
            styles.numCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          G
        </Text>
        <Text
          style={[
            styles.numCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          B
        </Text>
        <Text
          style={[
            styles.numCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          M
        </Text>
        <Text
          style={[
            styles.avCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          AV
        </Text>
        <Text
          style={[
            styles.ptsCell,
            styles.headerText,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
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
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.position}
          </Text>
          <Text
            style={[
              styles.teamCell,
              styles.cellText,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
            ]}
            numberOfLines={1}
          >
            {row.teamName}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.played}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.won}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.drawn}
          </Text>
          <Text
            style={[
              styles.numCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.lost}
          </Text>
          <Text
            style={[
              styles.avCell,
              styles.cellText,
              { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            {row.goalsFor - row.goalsAgainst > 0 ? '+' : ''}
            {row.goalsFor - row.goalsAgainst}
          </Text>
          <Text
            style={[
              styles.ptsCell,
              styles.cellText,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
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
    borderWidth: 1,
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
  },
  cellText: {
    fontSize: 12,
  },
  posCell: {
    width: 20,
    textAlign: 'center',
  },
  teamCell: {
    flex: 1,
    paddingLeft: 6,
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
  },
});
