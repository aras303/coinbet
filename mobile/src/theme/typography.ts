import { Platform } from 'react-native';

const fontFamily = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' });

export const typography = {
  fontFamily,
  h1: { fontFamily, fontSize: 28, fontWeight: '700' as const },
  h2: { fontFamily, fontSize: 22, fontWeight: '700' as const },
  h3: { fontFamily, fontSize: 18, fontWeight: '600' as const },
  body: { fontFamily, fontSize: 15, fontWeight: '400' as const },
  caption: { fontFamily, fontSize: 12, fontWeight: '400' as const },
} as const;
