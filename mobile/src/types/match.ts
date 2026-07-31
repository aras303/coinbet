export type MatchStatus = {
  short: string;
  long: string;
  elapsed: number | null;
};

export type League = {
  id: number;
  name: string;
  logo: string | null;
  country: string | null;
};

export type Team = {
  id: number;
  name: string;
  logo: string | null;
};

export type MatchOdds = {
  home: string;
  draw: string;
  away: string;
};

export type Match = {
  id: number;
  kickoff: string;
  status: MatchStatus;
  league: League;
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  odds: MatchOdds | null;
};
