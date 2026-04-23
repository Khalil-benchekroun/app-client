export const colors = {
  // Fonds
  background: '#FFFFFF',
  backgroundSoft: '#F9F7F4',
  backgroundDark: '#0A0A0F',

  // Or LIVRR
  gold: '#C9A96E',
  goldLight: '#E8D5B0',
  goldDark: '#A07840',

  // Textes
  textPrimary: '#0A0A0F',
  textSecondary: '#6B6B6B',
  textMuted: '#A0A0A0',
  textLight: '#FFFFFF',

  // UI
  border: '#E8E4DE',
  borderLight: '#F0EDE8',
  card: '#FFFFFF',
  cardSoft: '#F9F7F4',

  // Navigation bar
  navBackground: '#0A0A0F',
  navActive: '#C9A96E',
  navInactive: '#6B6B6B',

  // États
  success: '#2D6A4F',
  error: '#C0392B',
  warning: '#D4A017',
  info: '#2C5F8A',
};

export const typography = {
  // Display — Cormorant Garamond
  display: {
    fontFamily: 'CormorantGaramond-Regular',
    fontSize: 32,
    lineHeight: 40,
    color: colors.textPrimary,
  },
  displayMedium: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 28,
    lineHeight: 36,
    color: colors.textPrimary,
  },
  displaySmall: {
    fontFamily: 'CormorantGaramond-Regular',
    fontSize: 22,
    lineHeight: 30,
    color: colors.textPrimary,
  },

  // Corps — DM Sans
  h1: {
    fontFamily: 'DMSans-Medium',
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  h2: {
    fontFamily: 'DMSans-Medium',
    fontSize: 17,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  h3: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  body: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: 'DMSans-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
  },
  button: {
    fontFamily: 'DMSans-Medium',
    fontSize: 15,
    lineHeight: 22,
  },
  price: {
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
    lineHeight: 28,
    color: colors.textPrimary,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadows = {
  soft: {
    shadowColor: '#0A0A0F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#0A0A0F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
  },
  gold: {
    shadowColor: '#C9A96E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const layout = {
  screenPadding: 20,
  cardPadding: 16,
  navHeight: 80,
  headerHeight: 56,
};