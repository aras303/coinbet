import { env } from '../config/env';
import type { Match } from '../types/match';

type FixturesResponse = {
  date: string;
  matches: Match[];
};

export async function fetchMatchesByDate(date: string): Promise<Match[]> {
  const response = await fetch(`${env.apiBaseUrl}/api/fixtures?date=${date}`);
  if (!response.ok) {
    throw new Error(`Failed to load matches (status ${response.status})`);
  }
  const payload: FixturesResponse = await response.json();
  return payload.matches;
}
