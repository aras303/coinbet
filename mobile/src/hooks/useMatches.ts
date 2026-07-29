import { useEffect, useState } from 'react';
import { fetchMatchesByDate } from '../services/matchesApi';
import type { Match } from '../types/match';

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  data: Match[];
  timestamp: number;
};

// Module-level so the cache and in-flight requests survive remounts and are
// shared across the whole app, not just one screen instance.
const cache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<Match[]>>();

function getMatches(date: string): Promise<Match[]> {
  const pending = inFlight.get(date);
  if (pending) return pending;

  const request = fetchMatchesByDate(date).finally(() => {
    inFlight.delete(date);
  });
  inFlight.set(date, request);
  return request;
}

type UseMatchesResult = {
  matches: Match[] | null;
  loading: boolean;
  error: boolean;
};

export function useMatches(date: string): UseMatchesResult {
  const cached = cache.get(date);
  const [trackedDate, setTrackedDate] = useState(date);
  const [matches, setMatches] = useState<Match[] | null>(cached?.data ?? null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(false);

  if (date !== trackedDate) {
    setTrackedDate(date);
    const entry = cache.get(date);
    setMatches(entry?.data ?? null);
    setError(false);
    setLoading(!entry);
  }

  useEffect(() => {
    let cancelled = false;
    const entry = cache.get(date);
    const isFresh = Boolean(entry && Date.now() - entry.timestamp < CACHE_TTL_MS);

    if (isFresh) {
      return () => {
        cancelled = true;
      };
    }

    getMatches(date)
      .then((data) => {
        if (cancelled) return;
        cache.set(date, { data, timestamp: Date.now() });
        setMatches(data);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(!entry);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  return { matches, loading, error };
}
