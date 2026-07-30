import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CaretUpIcon, CaretDownIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';
import type { OddsMarket } from '../types/matchDetail';

type Props = {
  market: OddsMarket;
  selectedSelectionId: string | null;
  onSelect: (marketId: string, selectionId: string) => void;
};

export default function OddsMarketCard({ market, selectedSelectionId, onSelect }: Props) {
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
      <Text
        style={[
          styles.title,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
        ]}
      >
        {market.title}
      </Text>

      <View style={styles.selectionsRow}>
        {market.selections.map((selection) => {
          const active = selection.id === selectedSelectionId;
          const trendColor = active
            ? theme.colors.background
            : selection.trend === 'up'
              ? theme.colors.success
              : theme.colors.danger;

          return (
            <Pressable
              key={selection.id}
              onPress={() => onSelect(market.id, selection.id)}
              style={[
                styles.selection,
                active && theme.shadow.glow(theme.colors.primary),
                {
                  backgroundColor: active ? theme.colors.primary : theme.colors.surfaceElevated,
                  borderColor: active ? theme.colors.primary : theme.colors.border,
                  borderRadius: theme.radius.sm,
                },
              ]}
            >
              <Text
                style={[
                  styles.selectionLabel,
                  {
                    color: active ? theme.colors.background : theme.colors.textSecondary,
                    fontFamily: theme.typography.manrope.semiBold,
                  },
                ]}
                numberOfLines={1}
              >
                {selection.label}
              </Text>
              <View style={styles.valueRow}>
                <Text
                  style={[
                    styles.selectionValue,
                    {
                      color: active ? theme.colors.background : theme.colors.text,
                      fontFamily: theme.typography.manrope.extraBold,
                    },
                  ]}
                >
                  {selection.value}
                </Text>
                {selection.trend !== 'flat' ? (
                  selection.trend === 'up' ? (
                    <CaretUpIcon size={11} color={trendColor} weight="bold" />
                  ) : (
                    <CaretDownIcon size={11} color={trendColor} weight="bold" />
                  )
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    marginBottom: 10,
  },
  selectionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selection: {
    flexGrow: 1,
    flexBasis: '30%',
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 3,
  },
  selectionLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  selectionValue: {
    fontSize: 13.5,
  },
});
