import { darkColors, type ColorPalette } from './colors';
import { spacing, radius } from './spacing';
import { typography } from './typography';

export type Theme = {
  colors: ColorPalette;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  dark: boolean;
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  radius,
  typography,
  dark: true,
};

export * from './colors';
export * from './spacing';
export * from './typography';
