export type OddsSelection = {
  id: string;
  label: string;
  value: string;
};

export type OddsMarket = {
  id: string;
  title: string;
  selections: OddsSelection[];
};

export type OddsCategory = 'popular' | 'goals' | 'firstHalf' | 'corners' | 'handicap' | 'other';

export type MatchInfo = {
  date: string;
  time: string;
  stadium: string;
  referee: string;
  statusLabel: string;
};

export type MatchStats = {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  yellowCards: { home: number; away: number };
};

export type StandingsRow = {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  highlighted: boolean;
};
