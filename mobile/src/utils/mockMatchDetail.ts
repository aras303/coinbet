import type { Match } from '../types/match';
import type {
  MatchInfo,
  MatchStats,
  OddsCategory,
  OddsMarket,
  OddsTrend,
  StandingsRow,
} from '../types/matchDetail';
import { formatKickoffTime } from './date';
import { getStatusLongLabel } from './match';

function createRandom(seed: number) {
  let s = seed;
  return function random() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInt(random: () => number, min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

function randomOdd(random: () => number, min: number, max: number): string {
  return (min + random() * (max - min)).toFixed(2);
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
}

const REFEREES = ['Mehmet Öztürk', 'Ali Kaya', 'Cüneyt Çakır', 'Halil Umut Meler', 'Ahmet Aydemir'];

const FILLER_TEAMS = [
  'Kartal SK',
  'Yıldız Spor',
  'Deniz FK',
  'Orman GK',
  'Güneş SK',
  'Kale Birliği',
];

export function getMockMatchInfo(match: Match): MatchInfo {
  const random = createRandom(match.id);
  return {
    date: formatDate(match.kickoff),
    time: formatKickoffTime(match.kickoff),
    stadium: `${match.teams.home.name} Stadyumu`,
    referee: REFEREES[randomInt(random, 0, REFEREES.length - 1)],
    statusLabel: getStatusLongLabel(match),
  };
}

export function getMockMatchStats(match: Match): MatchStats {
  const random = createRandom(match.id + 1);
  const homePossession = randomInt(random, 38, 62);
  return {
    possession: { home: homePossession, away: 100 - homePossession },
    shots: { home: randomInt(random, 6, 18), away: randomInt(random, 6, 18) },
    shotsOnTarget: { home: randomInt(random, 2, 9), away: randomInt(random, 2, 9) },
    corners: { home: randomInt(random, 2, 10), away: randomInt(random, 2, 10) },
    yellowCards: { home: randomInt(random, 0, 4), away: randomInt(random, 0, 4) },
  };
}

export function getMockStandings(match: Match): StandingsRow[] {
  const random = createRandom(match.id + 2);
  const teamNames = [match.teams.home.name, match.teams.away.name, ...FILLER_TEAMS];

  const rows = teamNames.map((teamName, index) => {
    const played = randomInt(random, 14, 20);
    const won = randomInt(random, 3, played - 4);
    const drawn = randomInt(random, 0, played - won - 2);
    const lost = played - won - drawn;
    const goalsFor = randomInt(random, won, won * 3 + 10);
    const goalsAgainst = randomInt(random, lost, lost * 2 + 8);
    return {
      position: 0,
      teamName,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      points: won * 3 + drawn,
      highlighted: index === 0 || index === 1,
    };
  });

  return rows
    .sort((a, b) => b.points - a.points)
    .map((row, index) => ({ ...row, position: index + 1 }));
}

function randomTrend(random: () => number): OddsTrend {
  const roll = random();
  if (roll < 0.3) return 'up';
  if (roll < 0.6) return 'down';
  return 'flat';
}

function market(
  random: () => number,
  id: string,
  title: string,
  selections: { id: string; label: string; value: string }[],
): OddsMarket {
  return {
    id,
    title,
    selections: selections.map((selection) => ({ ...selection, trend: randomTrend(random) })),
  };
}

export function getMockOddsByCategory(match: Match): Record<OddsCategory, OddsMarket[]> {
  const random = createRandom(match.id + 3);
  const home = match.teams.home.name;
  const away = match.teams.away.name;

  const matchWinner = market(random, 'match-winner', 'Maç Sonucu 1-X-2', [
    { id: 'home', label: home, value: randomOdd(random, 1.5, 3.4) },
    { id: 'draw', label: 'Beraberlik', value: randomOdd(random, 2.8, 3.8) },
    { id: 'away', label: away, value: randomOdd(random, 1.8, 4.2) },
  ]);

  const doubleChance = market(random, 'double-chance', 'Çifte Şans', [
    { id: '1x', label: `${home} veya Berabere`, value: randomOdd(random, 1.15, 1.5) },
    { id: '12', label: `${home} veya ${away}`, value: randomOdd(random, 1.1, 1.3) },
    { id: 'x2', label: `Berabere veya ${away}`, value: randomOdd(random, 1.2, 1.6) },
  ]);

  const overUnder = market(random, 'over-under-2-5', '2.5 Alt/Üst', [
    { id: 'under', label: 'Alt 2.5', value: randomOdd(random, 1.6, 2.1) },
    { id: 'over', label: 'Üst 2.5', value: randomOdd(random, 1.6, 2.1) },
  ]);

  const bothTeamsScore = market(random, 'btts', 'Karşılıklı Gol', [
    { id: 'yes', label: 'Var', value: randomOdd(random, 1.6, 2.0) },
    { id: 'no', label: 'Yok', value: randomOdd(random, 1.7, 2.2) },
  ]);

  const halfTimeResult = market(random, 'half-time-result', 'İlk Yarı Sonucu', [
    { id: 'home', label: home, value: randomOdd(random, 2.0, 3.2) },
    { id: 'draw', label: 'Beraberlik', value: randomOdd(random, 1.9, 2.3) },
    { id: 'away', label: away, value: randomOdd(random, 2.4, 4.0) },
  ]);

  return {
    popular: [matchWinner, doubleChance, overUnder, bothTeamsScore],
    goals: [overUnder, bothTeamsScore],
    firstHalf: [halfTimeResult],
    corners: [],
    handicap: [],
    other: [],
  };
}
