import { Platform } from 'react-native';

export const shadow = {
  card: Platform.select({
    android: { elevation: 4 },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
    },
  }),
  raised: Platform.select({
    android: { elevation: 10 },
    default: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.4,
      shadowRadius: 18,
    },
  }),
  glow: (color: string) =>
    Platform.select({
      android: { elevation: 6 },
      default: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.45,
        shadowRadius: 12,
      },
    }),
} as const;
