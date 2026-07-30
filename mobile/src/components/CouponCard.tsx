import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ShareNetworkIcon, ThumbsUpIcon, UserIcon } from 'phosphor-react-native';
import CouponMatchRow from './CouponMatchRow';
import { useTheme } from '../theme/ThemeContext';
import type { Coupon, CouponStatus } from '../types/coupon';

type Props = {
  coupon: Coupon;
};

const STATUS_LABELS: Record<CouponStatus, string> = {
  won: 'Kazandı',
  lost: 'Kaybetti',
  pending: 'Bekliyor',
};

export default function CouponCard({ coupon }: Props) {
  const theme = useTheme();
  const [liked, setLiked] = useState(false);

  const statusColor =
    coupon.status === 'won'
      ? theme.colors.success
      : coupon.status === 'lost'
        ? theme.colors.danger
        : theme.colors.textMuted;

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
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceElevated }]}>
          <UserIcon size={18} color={theme.colors.textMuted} weight="fill" />
        </View>
        <View style={styles.headerText}>
          <Text
            style={[
              styles.username,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
            ]}
            numberOfLines={1}
          >
            {coupon.creatorName}
          </Text>
          <Text
            style={[
              styles.date,
              { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.semiBold },
            ]}
            numberOfLines={1}
          >
            {coupon.createdAtLabel}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${statusColor}22`, borderRadius: theme.radius.sm },
          ]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              { color: statusColor, fontFamily: theme.typography.manrope.extraBold },
            ]}
          >
            {STATUS_LABELS[coupon.status]}
          </Text>
        </View>
      </View>

      <View style={[styles.tableHeader, { borderColor: theme.colors.border }]}>
        <Text
          style={[
            styles.tableHeaderLabel,
            styles.tableHeaderMatches,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          MAÇLAR
        </Text>
        <Text
          style={[
            styles.tableHeaderLabel,
            styles.tableHeaderPick,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          SEÇİM
        </Text>
        <Text
          style={[
            styles.tableHeaderLabel,
            styles.tableHeaderOdd,
            { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          ORAN
        </Text>
      </View>

      {coupon.legs.map((leg) => (
        <CouponMatchRow key={leg.id} leg={leg} />
      ))}

      <View style={styles.footer}>
        <View style={styles.footerCell}>
          <Text
            style={[
              styles.footerLabel,
              { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            Toplam Oran
          </Text>
          <Text
            style={[
              styles.footerValue,
              { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
            ]}
          >
            {coupon.totalOdds}
          </Text>
        </View>
        <View style={styles.footerCell}>
          <Text
            style={[
              styles.footerLabel,
              { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            Kupon Değeri
          </Text>
          <Text
            style={[
              styles.footerValue,
              { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
            ]}
          >
            {coupon.stake}
          </Text>
        </View>
        <View style={styles.footerCell}>
          <Text
            style={[
              styles.footerLabel,
              { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.semiBold },
            ]}
          >
            Muhtemel Kazanç
          </Text>
          <Text
            style={[
              styles.footerValue,
              { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
            ]}
          >
            {coupon.potentialPayout}
          </Text>
        </View>
      </View>

      <View style={[styles.socialRow, { borderTopColor: theme.colors.border }]}>
        <Pressable style={styles.likeButton} onPress={() => setLiked((prev) => !prev)}>
          <ThumbsUpIcon
            size={17}
            color={liked ? theme.colors.primary : theme.colors.textMuted}
            weight={liked ? 'fill' : 'regular'}
          />
          <Text
            style={[
              styles.likeCount,
              {
                color: liked ? theme.colors.primary : theme.colors.textMuted,
                fontFamily: theme.typography.manrope.bold,
              },
            ]}
          >
            {coupon.likeCount + (liked ? 1 : 0)}
          </Text>
        </Pressable>
        <ShareNetworkIcon size={17} color={theme.colors.textMuted} weight="bold" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontSize: 14,
  },
  date: {
    fontSize: 11,
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusBadgeText: {
    fontSize: 11,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
  },
  tableHeaderLabel: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  tableHeaderMatches: {
    flex: 1,
    marginLeft: 40,
  },
  tableHeaderPick: {
    width: 22,
    textAlign: 'center',
  },
  tableHeaderOdd: {
    width: 44,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerCell: {
    flex: 1,
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeCount: {
    fontSize: 12,
  },
});
