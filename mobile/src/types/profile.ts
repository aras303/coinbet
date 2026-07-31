export type ProfileStats = {
  username: string;
  coinBalance: string;
  couponCount: number;
  followers: number;
  following: number;
  ranking: {
    day: number;
    week: number;
    month: number;
  };
  openCoupons: number;
  wonCoupons: number;
  lostCoupons: number;
  winRate: number;
  roi: {
    day: number;
    week: number;
    month: number;
  };
};
