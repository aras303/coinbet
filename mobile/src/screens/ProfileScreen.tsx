import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CoinsIcon, PencilSimpleIcon, UserIcon } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AmbientBackground from '../components/AmbientBackground';
import InfoRow from '../components/InfoRow';
import WinRateDonutChart from '../components/WinRateDonutChart';
import { useTheme } from '../theme/ThemeContext';
import { getMockProfileStats } from '../utils/mockProfile';
import { useUsername } from '../hooks/useUsername';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function formatRoi(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export default function ProfileScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const stats = useMemo(() => getMockProfileStats(), []);
  const username = useUsername();

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <AmbientBackground />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileRow}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceElevated }]}>
            <UserIcon size={30} color={theme.colors.textMuted} weight="fill" />
          </View>
          <View style={styles.profileText}>
            <Text
              style={[
                styles.username,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
              numberOfLines={1}
            >
              {username}
            </Text>
            <View style={styles.balanceRow}>
              <CoinsIcon size={14} color={theme.colors.primary} weight="duotone" />
              <Text
                style={[
                  styles.balance,
                  { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
                ]}
              >
                {stats.coinBalance}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={[
              styles.editButton,
              {
                backgroundColor: theme.colors.surfaceElevated,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.sm,
              },
            ]}
          >
            <PencilSimpleIcon size={14} color={theme.colors.textSecondary} weight="bold" />
            <Text
              style={[
                styles.editButtonText,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.bold },
              ]}
            >
              Düzenle
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.statsRow,
            theme.shadow.ambient(theme.colors.primaryMuted),
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <View style={styles.statCell}>
            <Text
              style={[
                styles.statValue,
                { color: theme.colors.primary, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {stats.couponCount}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.manrope.semiBold,
                },
              ]}
            >
              Kuponlarım
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.statCell}>
            <Text
              style={[
                styles.statValue,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {stats.followers}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.manrope.semiBold,
                },
              ]}
            >
              Takipçiler
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.statCell}>
            <Text
              style={[
                styles.statValue,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
            >
              {stats.following}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.manrope.semiBold,
                },
              ]}
            >
              Takip Edilen
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          Dünya Sıralaması
        </Text>
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
          <InfoRow label="24 Saat" value={`${stats.ranking.day}.`} />
          <InfoRow label="7 Gün" value={`${stats.ranking.week}.`} />
          <InfoRow label="30 Gün" value={`${stats.ranking.month}.`} />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          Kupon Performansı
        </Text>
        <View
          style={[
            styles.card,
            styles.performanceCard,
            theme.shadow.ambient(theme.colors.primaryMuted),
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <WinRateDonutChart winRate={stats.winRate} />
          <View style={styles.performanceStats}>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.extraBold },
                ]}
              >
                {stats.openCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.typography.manrope.semiBold,
                  },
                ]}
              >
                Açık Kuponlar
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.success, fontFamily: theme.typography.manrope.extraBold },
                ]}
              >
                {stats.wonCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.typography.manrope.semiBold,
                  },
                ]}
              >
                Tutan Kuponlar
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.danger, fontFamily: theme.typography.manrope.extraBold },
                ]}
              >
                {stats.lostCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.typography.manrope.semiBold,
                  },
                ]}
              >
                Kaybeden Kuponlar
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.manrope.bold },
          ]}
        >
          ROI
        </Text>
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
          <InfoRow
            label="24 Saat"
            value={formatRoi(stats.roi.day)}
            valueColor={stats.roi.day >= 0 ? theme.colors.success : theme.colors.danger}
          />
          <InfoRow
            label="7 Gün"
            value={formatRoi(stats.roi.week)}
            valueColor={stats.roi.week >= 0 ? theme.colors.success : theme.colors.danger}
          />
          <InfoRow
            label="30 Gün"
            value={formatRoi(stats.roi.month)}
            valueColor={stats.roi.month >= 0 ? theme.colors.success : theme.colors.danger}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  balance: {
    fontSize: 14,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 8,
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 32,
  },
  statValue: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 11,
  },
  sectionTitle: {
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 20,
  },
  performanceStats: {
    flex: 1,
    gap: 10,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  performanceValue: {
    fontSize: 16,
    minWidth: 24,
  },
  performanceLabel: {
    fontSize: 12,
  },
});
