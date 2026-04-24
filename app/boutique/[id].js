import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const produits = [
  { id: '1', nom: 'Robe en soie', prix: '245,00 €', categorie: 'Mode', dispo: true },
  { id: '2', nom: 'Sac cuir naturel', prix: '380,00 €', categorie: 'Accessoires', dispo: true },
  { id: '3', nom: 'Parfum signature', prix: '120,00 €', categorie: 'Beauté', dispo: false },
  { id: '4', nom: 'Foulard en soie', prix: '95,00 €', categorie: 'Accessoires', dispo: true },
  { id: '5', nom: 'Blazer structuré', prix: '320,00 €', categorie: 'Mode', dispo: true },
  { id: '6', nom: 'Crème visage luxe', prix: '180,00 €', categorie: 'Beauté', dispo: true },
];

export default function FicheBoutique() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Image boutique */}
      <View style={styles.coverImage}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Infos boutique */}
      <View style={styles.boutiqueInfo}>
        <View style={styles.boutiqueHeader}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <View style={styles.boutiqueMeta}>
            <Text style={styles.boutiqueName}>Boutique Parisienne</Text>
            <Text style={styles.boutiqueCategory}>Mode · Accessoires</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Ouvert</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>800m</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>45 min</Text>
            <Text style={styles.statLabel}>Délai estimé</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>4,8 ✦</Text>
            <Text style={styles.statLabel}>Note</Text>
          </View>
        </View>

        {/* Horaires */}
        <View style={styles.horaires}>
          <Text style={styles.horairesTitle}>Horaires</Text>
          <Text style={styles.horairesText}>Lun–Sam : 10h00 – 19h30</Text>
          <Text style={styles.horairesText}>Dimanche : Fermé</Text>
        </View>
      </View>

      {/* Produits */}
      <View style={styles.produitsSection}>
        <Text style={styles.sectionTitle}>Produits disponibles</Text>

        {produits.map((produit) => (
          <TouchableOpacity
            key={produit.id}
            style={[styles.produitCard, !produit.dispo && styles.produitIndispo]}
            onPress={() => produit.dispo && router.push(`/produit/${produit.id}`)}
            disabled={!produit.dispo}
          >
            <View style={styles.produitImage} />
            <View style={styles.produitInfo}>
              <Text style={styles.produitCategorie}>{produit.categorie}</Text>
              <Text style={styles.produitNom}>{produit.nom}</Text>
              <Text style={styles.produitPrix}>{produit.prix}</Text>
            </View>
            {!produit.dispo ? (
              <View style={styles.indispoBadge}>
                <Text style={styles.indispoText}>Indisponible</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => router.push(`/produit/${produit.id}`)}
              >
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            )}
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
  coverImage: {
    height: 220,
    backgroundColor: colors.backgroundSoft,
    justifyContent: 'flex-end',
    padding: layout.screenPadding,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: layout.screenPadding,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  boutiqueInfo: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  boutiqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.gold,
  },
  boutiqueMeta: {
    flex: 1,
  },
  boutiqueName: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  boutiqueCategory: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 0.5,
    height: 30,
    backgroundColor: colors.border,
  },
  horaires: {
    padding: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  horairesTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  horairesText: {
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  produitsSection: {
    padding: layout.screenPadding,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.lg,
  },
  produitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  produitIndispo: {
    opacity: 0.5,
  },
  produitImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.backgroundSoft,
  },
  produitInfo: {
    flex: 1,
    padding: spacing.md,
  },
  produitCategorie: {
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  produitNom: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  produitPrix: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  indispoBadge: {
    marginRight: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.sm,
  },
  indispoText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addBtnText: {
    fontSize: 20,
    color: colors.gold,
    lineHeight: 22,
  },
});