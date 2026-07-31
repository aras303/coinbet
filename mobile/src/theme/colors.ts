export const darkColors = {
  background: '#03110B',
  backgroundElevated: '#071A12',
  surface: '#0E2119',
  surfaceElevated: '#163024',
  border: '#22402F',
  primary: '#3DFF94',
  primaryMuted: '#1E7A4E',
  text: '#F5FBF8',
  textSecondary: '#9FB8AC',
  textMuted: '#5D7568',
  success: '#3DFF94',
  warning: '#FFB13D',
  danger: '#FF5C6C',
  overlay: 'rgba(1, 6, 4, 0.72)',
} as const;

export type ColorPalette = typeof darkColors;
