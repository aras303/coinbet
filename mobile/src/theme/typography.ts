import { Platform } from 'react-native';

const fontFamily = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' });

// Preview font for the visual-refresh trial (Home screen flow only, see
// WeeklyLoginScreen/HomeScreen discussion). Each weight is its own font
// file, so consumers must pick the matching family instead of pairing
// `fontWeight` with a single custom fontFamily (that combination is
// unreliable across iOS/Android).
export const manrope = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extraBold: 'Manrope_800ExtraBold',
} as const;

export const typography = {
  fontFamily,
  manrope,
  h1: { fontFamily, fontSize: 28, fontWeight: '700' as const },
  h2: { fontFamily, fontSize: 22, fontWeight: '700' as const },
  h3: { fontFamily, fontSize: 18, fontWeight: '600' as const },
  body: { fontFamily, fontSize: 15, fontWeight: '400' as const },
  caption: { fontFamily, fontSize: 12, fontWeight: '400' as const },
} as const;
