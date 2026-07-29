# CoinBet (mobile)

React Native + Expo + TypeScript starter for the CoinBet mobile app.
This is a clean infrastructure scaffold only — no match API, backend,
auth, or design screens yet.

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

Fill in `.env` with real values. Only variables prefixed with
`EXPO_PUBLIC_` are readable from the app — never put private/secret
keys there, since anything in the client bundle is visible to end
users. Real secrets belong on a backend, not in this repo.

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
  services/     # API clients / external integrations
  theme/        # colors, spacing, typography, dark theme provider
  types/        # shared TypeScript types
  utils/        # helper functions
  navigation/   # navigation container, stacks, route types
  config/       # environment variable access
```
