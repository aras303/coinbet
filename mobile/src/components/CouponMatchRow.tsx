import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckCircleIcon, XCircleIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';
import type { CouponLeg } from '../types/coupon';

type Props = {
  leg: CouponLeg;
};

export default function CouponMatchRow({ leg }: Props) {
  const theme = useTheme();
  const showScore = leg.homeGoals !== null && leg.awayGoals !== null;

  return (
    <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.statusCell}>
        {leg.outcome === 'won' ? (
          <CheckCircleIcon size={20} color={theme.colors.success} weight="fill" />
        ) : leg.outcome === 'lost' ? (
          <XCircleIcon size={20} color={theme.colors.danger} weight="fill" />
        ) : (
          <Text
            style={[
              styles.statusLabel,
              {
                color: leg.isLive ? theme.colors.danger : theme.colors.textMuted,
                fontFamily: theme.typography.manrope.bold,
              },
            ]}
          >
            {leg.statusLabel}
          </Text>
        )}
      </View>

      <Text style={styles.ballIcon}>⚽</Text>

      <View style={styles.teamsCell}>
        <View style={styles.teamRow}>
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.semiBold },
            ]}
            numberOfLines={1}
          >
            {leg.homeTeam}
          </Text>
          {showScore ? (
            <Text
              style={[
                styles.score,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {leg.homeGoals}
            </Text>
          ) : null}
        </View>
        <View style={styles.teamRow}>
          <Text
            style={[
              styles.teamName,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.semiBold },
            ]}
            numberOfLines={1}
          >
            {leg.awayTeam}
          </Text>
          {showScore ? (
            <Text
              style={[
                styles.score,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {leg.awayGoals}
            </Text>
          ) : null}
        </View>
      </View>

      <Text
        style={[
          styles.pick,
          { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.bold },
        ]}
      >
        {leg.pick}
      </Text>
      <Text
        style={[
          styles.odd,
          { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
        ]}
      >
        {leg.odd}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  statusCell: {
    width: 32,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 11,
  },
  ballIcon: {
    fontSize: 15,
    marginRight: 2,
  },
  teamsCell: {
    flex: 1,
    gap: 3,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamName: {
    flex: 1,
    fontSize: 12.5,
  },
  score: {
    fontSize: 12.5,
    marginLeft: 6,
  },
  pick: {
    width: 22,
    textAlign: 'center',
    fontSize: 13,
  },
  odd: {
    width: 44,
    textAlign: 'right',
    fontSize: 13,
  },
});
