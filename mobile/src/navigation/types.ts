import type { Match } from '../types/match';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  MatchDetail: { match: Match };
  WeeklyLogin: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Live: undefined;
  Results: undefined;
  MyCoupons: undefined;
  Profile: undefined;
};
