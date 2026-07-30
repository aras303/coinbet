import { darkColors, type ColorPalette } from './colors';
import { spacing, radius } from './spacing';
import { typography } from './typography';
import { shadow } from './shadow';

export type Theme = {
  colors: ColorPalette;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadow: typeof shadow;
  dark: boolean;
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  radius,
  typography,
  shadow,
  dark: true,
};

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadow';
