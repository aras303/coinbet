export const darkColors = {
  background: '#0D0F14',
  surface: '#161A21',
  surfaceElevated: '#1F242E',
  border: '#2A303C',
  primary: '#4F8CFF',
  secondary: '#2ECC71',
  text: '#F5F7FA',
  textSecondary: '#9AA3B2',
  textMuted: '#5C6472',
  success: '#2ECC71',
  warning: '#F5A623',
  danger: '#EB5757',
  overlay: 'rgba(0, 0, 0, 0.6)',
} as const;

export type ColorPalette = typeof darkColors;
