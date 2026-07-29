import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
        ]}
      >
        {market.title}
      </Text>

      <View style={styles.selectionsRow}>
        {market.selections.map((selection) => {
          const active = selection.id === selectedSelectionId;
          return (
            <Pressable
              key={selection.id}
              onPress={() => onSelect(market.id, selection.id)}
              style={[
                styles.selection,
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
                    fontFamily: theme.typography.fontFamily,
                  },
                ]}
                numberOfLines={1}
              >
                {selection.label}
              </Text>
              <Text
                style={[
                  styles.selectionValue,
                  {
                    color: active ? theme.colors.background : theme.colors.text,
                    fontFamily: theme.typography.fontFamily,
                  },
                ]}
              >
                {selection.value}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  selectionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  selection: {
    flexGrow: 1,
    flexBasis: '30%',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 6,
  },
  selectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectionValue: {
    fontSize: 15,
    fontWeight: '800',
  },
});
