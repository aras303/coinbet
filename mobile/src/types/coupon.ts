export type CouponLegOutcome = 'won' | 'lost' | 'pending';

export type CouponLeg = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number | null;
  awayGoals: number | null;
  statusLabel: string;
  isLive: boolean;
  pick: string;
  odd: string;
  outcome: CouponLegOutcome;
};

export type CouponStatus = 'won' | 'lost' | 'pending';

export type Coupon = {
  id: string;
  creatorName: string;
  createdAtLabel: string;
  legs: CouponLeg[];
  totalOdds: string;
  stake: string;
  potentialPayout: string;
  likeCount: number;
  status: CouponStatus;
};
