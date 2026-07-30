import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraIcon, CoinsIcon, PencilSimpleIcon, UserIcon } from 'phosphor-react-native';
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
        <LinearGradient
          colors={[
            `${theme.colors.primary}3D`,
            theme.colors.backgroundElevated,
            theme.colors.background,
          ]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={[
            styles.hero,
            { borderBottomLeftRadius: theme.radius.lg, borderBottomRightRadius: theme.radius.lg },
          ]}
        >
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={[
              styles.editButton,
              {
                backgroundColor: `${theme.colors.background}66`,
                borderColor: `${theme.colors.text}22`,
                borderRadius: theme.radius.full,
              },
            ]}
          >
            <PencilSimpleIcon size={13} color={theme.colors.text} weight="bold" />
            <Text
              style={[
                styles.editButtonText,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.bold },
              ]}
            >
              Düzenle
            </Text>
          </Pressable>

          <View style={styles.heroBody}>
            <View style={styles.avatarWrap}>
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: theme.colors.surfaceElevated,
                    borderColor: `${theme.colors.primary}66`,
                  },
                ]}
              >
                <UserIcon size={34} color={theme.colors.textMuted} weight="fill" />
              </View>
              <View
                style={[
                  styles.cameraBadge,
                  { backgroundColor: theme.colors.primary, borderColor: theme.colors.background },
                ]}
              >
                <CameraIcon size={12} color={theme.colors.background} weight="fill" />
              </View>
            </View>

            <Text
              style={[
                styles.username,
                { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
              ]}
              numberOfLines={1}
            >
              {username}
            </Text>

            <View
              style={[
                styles.balancePill,
                {
                  backgroundColor: `${theme.colors.background}55`,
                  borderColor: `${theme.colors.primary}40`,
                  borderRadius: theme.radius.full,
                },
              ]}
            >
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
        </LinearGradient>

        <View
          style={[
            styles.statsRow,
            { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border },
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

        <View style={styles.section}>
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
            <RankRow label="24 Saat" value={stats.ranking.day} border />
            <RankRow label="7 Gün" value={stats.ranking.week} border />
            <RankRow label="30 Gün" value={stats.ranking.month} />
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
                    {
                      color: theme.colors.textMuted,
                      fontFamily: theme.typography.manrope.extraBold,
                    },
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
                    {
                      color: theme.colors.success,
                      fontFamily: theme.typography.manrope.extraBold,
                    },
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
              styles.roiCard,
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
                styles.roiWatermark,
                {
                  color: `${theme.colors.primary}18`,
                  fontFamily: theme.typography.manrope.extraBold,
                },
              ]}
            >
              ROI
            </Text>
            <View style={styles.roiRows}>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RankRow({ label, value, border }: { label: string; value: number; border?: boolean }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.rankRow,
        border && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.rankLabel,
          { color: theme.colors.textMuted, fontFamily: theme.typography.manrope.bold },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.rankValue,
          { color: theme.colors.text, fontFamily: theme.typography.manrope.extraBold },
        ]}
      >
        {value}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  editButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 8,
  },
  editButtonText: {
    fontSize: 12,
  },
  heroBody: {
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  balancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  balance: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  section: {
    paddingHorizontal: 16,
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
  rankRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rankLabel: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  rankValue: {
    fontSize: 22,
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
  roiCard: {
    overflow: 'hidden',
    position: 'relative',
  },
  roiWatermark: {
    position: 'absolute',
    right: -6,
    top: -18,
    fontSize: 72,
    letterSpacing: 2,
  },
  roiRows: {
    width: '100%',
  },
});
