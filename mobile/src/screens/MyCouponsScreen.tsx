import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AmbientBackground from '../components/AmbientBackground';
import CouponCard from '../components/CouponCard';
import { useTheme } from '../theme/ThemeContext';
import { getMockCoupons } from '../utils/mockCoupons';

export default function MyCouponsScreen() {
  const theme = useTheme();
  const coupons = useMemo(() => getMockCoupons(), []);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <AmbientBackground />
      <FlatList
        data={coupons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CouponCard coupon={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },
});
