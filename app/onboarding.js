import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    titre: 'L\'élégance du local',
    sousTitre: 'Les meilleures boutiques parisiennes livrent directement chez vous',
    icon: '✦',
    background: colors.backgroundDark,
    textColor: colors.gold,
  },
  {
    id: '2',
    titre: 'En moins d\'une heure',
    sousTitre: 'Commandez et recevez vos achats avant même d\'avoir raccroché',
    icon: '◎',
    background: colors.backgroundSoft,
    textColor: colors.textPrimary,
  },
  {
    id: '3',
    titre: 'Une expérience unique',
    sousTitre: 'Cabine d\'essayage virtuelle, programme fidélité et bien plus encore',
    icon: '◈',
    background: colors.backgroundDark,
    textColor: colors.gold,
  },
];

export default function Onboarding() {
  return (
    <View style={styles.container}>

      {/* Slide actif — slide 1 pour l'instant */}
      <View style={[styles.slide, { backgroundColor: slides[0].background }]}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>LIVRR</Text>
          <Text style={styles.logoTagline}>Paris · Mode · Luxe</Text>
        </View>

        {/* Icône */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{slides[0].icon}</Text>
        </View>

        {/* Texte */}
        <View style={styles.textContainer}>
          <Text style={[styles.titre, { color: slides[0].textColor }]}>
            {slides[0].titre}
          </Text>
          <Text style={styles.sousTitre}>{slides[0].sousTitre}</Text>
        </View>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              style={[styles.dot, index === 0 && styles.dotActive]}
            />
          ))}
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.replace('/(auth)/inscription')}
          >
            <Text style={styles.primaryBtnText}>Commencer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.secondaryBtnText}>J'ai déjà un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.skipBtnText}>Explorer sans compte</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 80,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 12,
    marginBottom: spacing.sm,
  },
  logoTagline: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.5,
    letterSpacing: 3,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 120,
    color: colors.gold,
    opacity: 0.15,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  titre: {
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 36,
  },
  sousTitre: {
    fontSize: 15,
    color: colors.textLight,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.textLight,
    opacity: 0.3,
  },
  dotActive: {
    width: 24,
    opacity: 1,
    backgroundColor: colors.gold,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  primaryBtn: {
    height: 52,
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.backgroundDark,
    letterSpacing: 2,
  },
  secondaryBtn: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    color: colors.textLight,
    opacity: 0.8,
  },
  skipBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtnText: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.5,
  },
});