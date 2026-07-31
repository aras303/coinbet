const BASE_URL = 'https://v3.football.api-sports.io';
const FIXTURES_CACHE_TTL_MS = 60_000;
const ODDS_CACHE_TTL_MS = 5 * 60_000;

const cache = new Map();
const inFlight = new Map();

function getApiKey() {
  const key = process.env.API_FOOTBALL_KEY;
  if (!key) {
    throw new Error('Missing API_FOOTBALL_KEY environment variable.');
  }
  return key;
}

async function callApiFootball(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'x-apisports-key': getApiKey() },
  });

  if (!response.ok) {
    throw new Error(`API-Football request failed with status ${response.status}`);
  }

  return response.json();
}

// Shared across every request this server process handles, so concurrent
// users requesting the same date/league are served from one upstream call.
function cachedFetch(cacheKey, ttlMs, fetcher) {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return Promise.resolve(cached.data);
  }

  const pending = inFlight.get(cacheKey);
  if (pending) {
    return pending;
  }

  const request = fetcher()
    .then((data) => {
      cache.set(cacheKey, { data, timestamp: Date.now() });
      inFlight.delete(cacheKey);
      return data;
    })
    .catch((error) => {
      inFlight.delete(cacheKey);
      throw error;
    });

  inFlight.set(cacheKey, request);
  return request;
}

export function getFixturesByDate(date) {
  return cachedFetch(`fixtures:${date}`, FIXTURES_CACHE_TTL_MS, () =>
    callApiFootball(`/fixtures?date=${date}`),
  );
}

export function getOddsByDate(date) {
  return cachedFetch(`odds:${date}`, ODDS_CACHE_TTL_MS, () =>
    callApiFootball(`/odds?date=${date}`),
  );
}
