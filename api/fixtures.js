import { getFixturesByDate, getOddsByDate } from './_lib/apiFootball.js';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function findMatchWinnerOdds(oddsResponse, fixtureId) {
  const entry = oddsResponse?.response?.find((item) => item.fixture?.id === fixtureId);
  const bookmaker = entry?.bookmakers?.[0];
  const matchWinner = bookmaker?.bets?.find((bet) => bet.name === 'Match Winner');
  if (!matchWinner) return null;

  const home = matchWinner.values.find((value) => value.value === 'Home')?.odd;
  const draw = matchWinner.values.find((value) => value.value === 'Draw')?.odd;
  const away = matchWinner.values.find((value) => value.value === 'Away')?.odd;
  if (!home || !draw || !away) return null;

  return { home, draw, away };
}

function toMatch(item, oddsResponse) {
  return {
    id: item.fixture.id,
    kickoff: item.fixture.date,
    status: {
      short: item.fixture.status.short,
      long: item.fixture.status.long,
      elapsed: item.fixture.status.elapsed,
    },
    league: {
      id: item.league.id,
      name: item.league.name,
      logo: item.league.logo ?? null,
      country: item.league.country ?? null,
    },
    teams: {
      home: {
        id: item.teams.home.id,
        name: item.teams.home.name,
        logo: item.teams.home.logo ?? null,
      },
      away: {
        id: item.teams.away.id,
        name: item.teams.away.name,
        logo: item.teams.away.logo ?? null,
      },
    },
    goals: { home: item.goals.home, away: item.goals.away },
    odds: oddsResponse ? findMatchWinnerOdds(oddsResponse, item.fixture.id) : null,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const date = req.query.date;
  if (typeof date !== 'string' || !DATE_PATTERN.test(date)) {
    res.status(400).json({ error: 'A valid "date" query parameter (YYYY-MM-DD) is required.' });
    return;
  }

  try {
    const fixturesResponse = await getFixturesByDate(date);

    // Odds are best-effort: if the upstream call fails or the plan doesn't
    // include this endpoint, matches are still returned without odds.
    let oddsResponse = null;
    try {
      oddsResponse = await getOddsByDate(date);
    } catch {
      oddsResponse = null;
    }

    const matches = (fixturesResponse.response ?? []).map((item) => toMatch(item, oddsResponse));

    res.status(200).json({ date, matches });
  } catch (error) {
    res.status(502).json({ error: 'Unable to fetch matches right now.' });
  }
}
