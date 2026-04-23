import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, radius, shadows, layout } from '../../constants/theme';

export default function Accueil() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>LIVRR</Text>
          <Text style={styles.tagline}>L'élégance du local</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Text style={styles.profileIcon}>◉</Text>
        </TouchableOpacity>
      </View>

      {/* Adresse */}
      <TouchableOpacity style={styles.addressBar}>
        <Text style={styles.addressIcon}>◎</Text>
        <Text style={styles.addressText}>Où souhaitez-vous être livré ?</Text>
        <Text style={styles.addressArrow}>›</Text>
      </TouchableOpacity>

      {/* Bannière luxe */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Livraison en moins d'une heure</Text>
        <Text style={styles.heroSub}>Les meilleures boutiques parisiennes, livrées chez vous</Text>
      </View>

      {/* Catégories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {['Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle'].map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Boutiques */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Boutiques tendances</Text>
        {[1, 2, 3].map((i) => (
          <TouchableOpacity key={i} style={styles.boutiqueCard}>
            <View style={styles.boutiqueImage} />
            <View style={styles.boutiqueInfo}>
              <Text style={styles.boutiqueName}>Boutique {i}</Text>
              <Text style={styles.boutiqueDetails}>Mode · 800m · 45 min</Text>
              <View style={styles.boutiqueBadge}>
                <Text style={styles.boutiqueBadgeText}>Ouvert</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  logo: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 6,
  },
  tagline: {
    fontSize: 12,
    color: colors.gold,
    letterSpacing: 2,
    marginTop: 2,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  addressIcon: {
    fontSize: 16,
    color: colors.gold,
    marginRight: spacing.sm,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.textMuted,
  },
  addressArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
  heroBanner: {
    marginHorizontal: layout.screenPadding,
    padding: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.gold,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  heroSub: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.7,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.textPrimary,
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    letterSpacing: 0.3,
  },
  categoriesRow: {
    paddingLeft: layout.screenPadding,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.full,
    marginRight: spacing.sm,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  categoryText: {
    fontSize: 13,
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  boutiqueCard: {
    flexDirection: 'row',
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  boutiqueImage: {
    width: 90,
    height: 90,
    backgroundColor: colors.backgroundSoft,
  },
  boutiqueInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  boutiqueName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  boutiqueDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  boutiqueBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: '#E8F5E9',
    borderRadius: radius.sm,
  },
  boutiqueBadgeText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
});