# CoinBet (mobile)

React Native + Expo + TypeScript app for CoinBet. The Home screen
fetches real fixtures through the backend proxy in `../api` — the
mobile app never talks to API-Football directly and never holds an
API key. No coupon system, live odds trading, or match detail screen
yet.

## Requirements

- Node.js 18+
- npm
- [Expo Go](https://expo.dev/go) app on a physical device, or an
  Android/iOS simulator, for previewing the app

## Setup

```bash
cd mobile
npm install
cp .env.example .env
```

Fill in `.env` with real values. `EXPO_PUBLIC_API_BASE_URL` should
point at the deployed backend from `../api` (see the root README/
`.env.example` for the `API_FOOTBALL_KEY` that backend needs — it
never goes in this app). Only variables prefixed with `EXPO_PUBLIC_`
are readable from the app — never put private/secret keys there,
since anything in the client bundle is visible to end users.

## Run

```bash
npm start        # Metro bundler + QR code (scan with Expo Go)
npm run android  # open on Android emulator/device
npm run ios      # open on iOS simulator (macOS only)
npm run web      # open in the browser
```

## Quality checks

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run format       # Prettier (writes)
npm run format:check # Prettier (check only)
```

## Project structure

```
src/
  screens/      # top-level app screens
  components/   # reusable UI components
  services/     # API clients (calls the backend proxy, never API-Football)
  hooks/        # stateful data hooks (caching, request dedup)
  theme/        # colors, spacing, typography, dark theme provider
  types/        # shared TypeScript types
  utils/        # date/match formatting helpers
  navigation/   # navigation container, stacks, route types
  config/       # environment variable access
```
