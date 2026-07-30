import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import WeeklyDayCard, { type WeeklyDayStatus } from '../components/WeeklyDayCard';
import PrimaryButton from '../components/PrimaryButton';
import AdRewardCard, { type AdRewardStatus } from '../components/AdRewardCard';
import AdPlayingModal from '../components/AdPlayingModal';
import { useTheme } from '../theme/ThemeContext';
import type { RootStackParamList } from '../navigation/types';
import { WEEKLY_LOGIN_REWARDS, getActiveWeeklyDay } from '../utils/weeklyLogin';

type Props = NativeStackScreenProps<RootStackParamList, 'WeeklyLogin'>;

export default function WeeklyLoginScreen({ navigation }: Props) {
  const theme = useTheme();
  const activeDay = useMemo(() => getActiveWeeklyDay(), []);
  const todayReward = WEEKLY_LOGIN_REWARDS[activeDay - 1];

  const [claimedToday, setClaimedToday] = useState(false);
  const [ad1Status, setAd1Status] = useState<AdRewardStatus>('ready');
  const [ad2Status, setAd2Status] = useState<AdRewardStatus>('locked');
  const [playingAdSlot, setPlayingAdSlot] = useState<1 | 2 | null>(null);

  const handleAdComplete = useCallback(() => {
    if (playingAdSlot === 1) {
      setAd1Status('claimed');
      setAd2Status('ready');
    } else if (playingAdSlot === 2) {
      setAd2Status('claimed');
    }
    setPlayingAdSlot(null);
  }, [playingAdSlot]);

  const bothAdsClaimed = ad1Status === 'claimed' && ad2Status === 'claimed';

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScreenHeader title="Haftalık Giriş" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          7 Günlük Giriş Ödülü
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {WEEKLY_LOGIN_REWARDS.map((coins, index) => {
            const day = index + 1;
            let status: WeeklyDayStatus;
            if (day < activeDay) {
              status = 'claimed';
            } else if (day > activeDay) {
              status = 'locked';
            } else {
              status = claimedToday ? 'claimed' : 'available';
            }
            return <WeeklyDayCard key={day} day={day} coins={coins} status={status} />;
          })}
        </ScrollView>

        <View style={styles.claimButtonWrap}>
          <PrimaryButton
            label={
              claimedToday
                ? `Bugün Alındı · +${todayReward} Coin`
                : `Bugünün Ödülünü Al · +${todayReward} Coin`
            }
            disabled={claimedToday}
            onPress={() => setClaimedToday(true)}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily },
          ]}
        >
          Reklam İzle, Ekstra Coin Kazan
        </Text>

        <AdRewardCard
          title="Reklamı İzle"
          coins={100}
          status={ad1Status}
          onWatch={() => setPlayingAdSlot(1)}
        />
        <AdRewardCard
          title="İkinci Reklamı İzle"
          coins={200}
          status={ad2Status}
          onWatch={() => setPlayingAdSlot(2)}
        />

        {bothAdsClaimed ? (
          <Text
            style={[
              styles.doneText,
              { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily },
            ]}
          >
            Bugün için reklamlar bitti, yarın tekrar gel.
          </Text>
        ) : null}
      </ScrollView>

      <AdPlayingModal visible={playingAdSlot !== null} onComplete={handleAdComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 4,
  },
  claimButtonWrap: {
    marginTop: 16,
  },
  doneText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
});
