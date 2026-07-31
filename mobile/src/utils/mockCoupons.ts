import type { Coupon, CouponLeg, CouponLegOutcome } from '../types/coupon';

function leg(
  id: string,
  homeTeam: string,
  awayTeam: string,
  homeGoals: number | null,
  awayGoals: number | null,
  statusLabel: string,
  isLive: boolean,
  pick: string,
  odd: string,
  outcome: CouponLegOutcome,
): CouponLeg {
  return { id, homeTeam, awayTeam, homeGoals, awayGoals, statusLabel, isLive, pick, odd, outcome };
}

function computeStatus(legs: CouponLeg[]): 'won' | 'lost' | 'pending' {
  if (legs.some((item) => item.outcome === 'lost')) return 'lost';
  if (legs.some((item) => item.outcome === 'pending')) return 'pending';
  return 'won';
}

function computeTotalOdds(legs: CouponLeg[]): number {
  return legs.reduce((acc, item) => acc * parseFloat(item.odd), 1);
}

function buildCoupon(
  id: string,
  creatorName: string,
  createdAtLabel: string,
  legs: CouponLeg[],
  stake: number,
  likeCount: number,
): Coupon {
  const totalOdds = computeTotalOdds(legs);
  return {
    id,
    creatorName,
    createdAtLabel,
    legs,
    totalOdds: totalOdds.toFixed(2),
    stake: stake.toFixed(2),
    potentialPayout: (totalOdds * stake).toFixed(2),
    likeCount,
    status: computeStatus(legs),
  };
}

export function getMockCoupons(): Coupon[] {
  const pendingCouponLegs = [
    leg('a1', 'Dinamo Zagreb', 'Thun', 0, 2, "42'", true, '1', '1.34', 'pending'),
    leg('a2', 'Celje', 'Egnatia Rrogozhinë', 0, 1, "30'", true, '1', '1.51', 'pending'),
    leg(
      'a3',
      'Shamrock Rovers',
      'Ararat-Armenia',
      null,
      null,
      '20:00',
      false,
      '1',
      '1.63',
      'pending',
    ),
    leg('a4', 'Banfield', 'Sarmiento Jun.', null, null, '23:00', false, 'X', '3.03', 'pending'),
    leg('a5', 'San Lorenzo', 'Gimnasia Mendoza', 2, 1, 'MS', false, 'X', '3.09', 'won'),
    leg('a6', 'Tigre', 'Nacional', 0, 1, 'MS', false, 'X', '3.19', 'lost'),
  ];

  const wonCouponLegs = [
    leg('c1', 'Arsenal', 'Chelsea', 2, 1, 'MS', false, '1', '1.90', 'won'),
    leg('c2', 'Manchester City', 'Liverpool', 3, 1, 'MS', false, '1', '1.70', 'won'),
    leg('c3', 'Bayern Munich', 'Paris Saint Germain', 2, 0, 'MS', false, '1', '1.55', 'won'),
  ];

  const lostCouponLegs = [
    leg('b1', 'Galatasaray', 'Fenerbahçe', 3, 0, 'MS', false, '1', '1.75', 'won'),
    leg('b2', 'Real Madrid', 'Barcelona', 2, 2, 'MS', false, 'X', '3.30', 'lost'),
  ];

  return [
    buildCoupon('coupon-1', 'aras218', '28 Temmuz 2026, Pazartesi', pendingCouponLegs, 10, 4),
    buildCoupon('coupon-2', 'aras218', '25 Temmuz 2026, Cumartesi', wonCouponLegs, 15, 12),
    buildCoupon('coupon-3', 'aras218', '20 Temmuz 2026, Pazartesi', lostCouponLegs, 20, 2),
  ];
}
