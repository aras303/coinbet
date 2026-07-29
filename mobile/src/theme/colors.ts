export const darkColors = {
  background: '#050706',
  backgroundElevated: '#0A0D0B',
  surface: '#0F1713',
  surfaceElevated: '#16211B',
  border: '#1E2B24',
  primary: '#39FF88',
  primaryMuted: '#1F7A4D',
  text: '#F5F7F6',
  textSecondary: '#93A39C',
  textMuted: '#526059',
  success: '#39FF88',
  warning: '#F5A623',
  danger: '#FF5C5C',
  overlay: 'rgba(0, 0, 0, 0.65)',
} as const;

export type ColorPalette = typeof darkColors;
