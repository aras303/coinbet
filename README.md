# CoinBet

## Backend (`api/`)

Vercel serverless functions that proxy API-Football. The mobile app
(`mobile/`) and the legacy web page (`index.html`) both call these
instead of talking to API-Football directly, so the API key never
ships to a client.

- `api/_lib/apiFootball.js` — shared upstream client: reads
  `API_FOOTBALL_KEY` from the environment, caches responses (60s for
  fixtures, 5min for odds), and coalesces concurrent requests for the
  same date so multiple users don't each trigger a separate upstream
  call.
- `api/fixtures.js` — `GET /api/fixtures?date=YYYY-MM-DD`, used by the
  mobile Home screen. Returns fixtures for that date merged with
  Match Winner (1X2) odds when available.
- `api/matches.js` — used by the legacy web page (`index.html` /
  `script.js`); returns today's fixtures in API-Football's raw shape.

### Setup

```bash
cp .env.example .env
```

Fill in `API_FOOTBALL_KEY` with a real API-Football key. In
production, set this in your hosting provider's environment variable
settings instead of committing a `.env` file. To run locally with
`vercel dev`, install the Vercel CLI separately.

## Mobile app (`mobile/`)

See `mobile/README.md`.
