import type { ProfileStats } from '../types/profile';

export function getMockProfileStats(): ProfileStats {
  return {
    username: 'aras218',
    coinBalance: '1.250',
    couponCount: 47,
    followers: 121,
    following: 8,
    ranking: { day: 308, week: 4918, month: 1398 },
    openCoupons: 1,
    wonCoupons: 18,
    lostCoupons: 29,
    winRate: 38.2,
    roi: { day: -12.5, week: -4.3, month: 34.67 },
  };
}
