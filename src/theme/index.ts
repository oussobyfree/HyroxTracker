export const colors = {
  // Backgrounds
  bg: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceLight: '#222222',
  card: '#242424',

  // Accents Hyrox
  accent: '#FF3B30',
  accentOrange: '#FF9500',
  accentGreen: '#30D158',
  accentBlue: '#0A84FF',

  // Text
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',

  // Borders
  border: '#2C2C2E',
  borderLight: '#38383A',

  // Status
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',

  // Gradients
  gradientStart: '#FF3B30',
  gradientEnd: '#FF9500',
  gradientDarkStart: '#1A1A1A',
  gradientDarkEnd: '#0D0D0D',
};

export const typography = {
  hero: { fontSize: 48, fontWeight: '800' as const, letterSpacing: -1 },
  h1: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodyBold: { fontSize: 16, fontWeight: '600' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  captionBold: { fontSize: 13, fontWeight: '600' as const },
  small: { fontSize: 11, fontWeight: '500' as const },
  timer: { fontSize: 64, fontWeight: '200' as const, letterSpacing: -2 },
  number: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  price: { fontSize: 34, fontWeight: '700' as const },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
};
