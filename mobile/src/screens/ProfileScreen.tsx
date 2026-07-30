import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileRow}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceElevated }]}>
            <Ionicons name="person" size={32} color={theme.colors.textMuted} />
          </View>
          <View style={styles.profileText}>
            <Text
              style={[
                styles.username,
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
              numberOfLines={1}
            >
              {username}
            </Text>
            <View style={styles.balanceRow}>
              <Ionicons name="cash-outline" size={14} color={theme.colors.primary} />
              <Text
                style={[
                  styles.balance,
                  { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
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
            <Ionicons name="pencil-outline" size={14} color={theme.colors.textSecondary} />
            <Text
              style={[
                styles.editButtonText,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
              ]}
            >
              Düzenle
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.statsRow,
            theme.shadow.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
            },
          ]}
        >
          <View style={styles.statCell}>
            <Text
              style={[
                styles.statValue,
                { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {stats.couponCount}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
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
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {stats.followers}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
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
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {stats.following}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
              ]}
            >
              Takip Edilen
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          Dünya Sıralaması
        </Text>
        <View
          style={[
            styles.card,
            theme.shadow.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
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
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          Kupon Performansı
        </Text>
        <View
          style={[
            styles.card,
            styles.performanceCard,
            theme.shadow.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
            },
          ]}
        >
          <WinRateDonutChart winRate={stats.winRate} />
          <View style={styles.performanceStats}>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily },
                ]}
              >
                {stats.openCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
                ]}
              >
                Açık Kuponlar
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.success, fontFamily: theme.typography.fontFamily },
                ]}
              >
                {stats.wonCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
                ]}
              >
                Tutan Kuponlar
              </Text>
            </View>
            <View style={styles.performanceRow}>
              <Text
                style={[
                  styles.performanceValue,
                  { color: theme.colors.danger, fontFamily: theme.typography.fontFamily },
                ]}
              >
                {stats.lostCoupons}
              </Text>
              <Text
                style={[
                  styles.performanceLabel,
                  { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
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
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          ROI
        </Text>
        <View
          style={[
            styles.card,
            theme.shadow.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
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
    fontWeight: '800',
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  balance: {
    fontSize: 14,
    fontWeight: '800',
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
    fontWeight: '700',
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
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
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
    fontWeight: '800',
    minWidth: 24,
  },
  performanceLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});
