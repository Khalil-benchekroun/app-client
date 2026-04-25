import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../../constants/theme';

const boutiques = [
  { id: '1', nom: 'Boutique Parisienne', categorie: 'Mode', distance: 0.8, delai: '45 min', ouvert: true, nouveaute: false },
  { id: '2', nom: 'Maison de Mode', categorie: 'Accessoires', distance: 1.2, delai: '55 min', ouvert: true, nouveaute: true },
  { id: '3', nom: 'Le Concept Store', categorie: 'Lifestyle', distance: 0.6, delai: '35 min', ouvert: false, nouveaute: false },
  { id: '4', nom: 'Épicerie du Marais', categorie: 'Épicerie fine', distance: 0.95, delai: '50 min', ouvert: true, nouveaute: true },
  { id: '5', nom: 'Beauté Dorée', categorie: 'Beauté', distance: 1.5, delai: '60 min', ouvert: true, nouveaute: false },
];

const categories = ['Toutes', 'Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle'];
const tris = ['Distance', 'Popularité', 'Nouveautés'];

export default function Explorer() {
  const [categorieActive, setCategorieActive] = useState('Toutes');
  const [triActif, setTriActif] = useState('Distance');
  const [ouvertSeulement, setOuvertSeulement] = useState(false);

  const boutiquesFiltrees = boutiques
    .filter(b => categorieActive === 'Toutes' || b.categorie === categorieActive)
    .filter(b => !ouvertSeulement || b.ouvert)
    .sort((a, b) => {
      if (triActif === 'Distance') return a.distance - b.distance;
      if (triActif === 'Nouveautés') return b.nouveaute - a.nouveaute;
      return 0;
    });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explorer</Text>
          <Text style={styles.subtitle}>Boutiques livrables à votre adresse</Text>
        </View>

        {/* Recherche */}
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchIcon}>✦</Text>
          <Text style={styles.searchText}>Rechercher un produit, une boutique...</Text>
        </TouchableOpacity>

        {/* Catégories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, categorieActive === cat && styles.categoryChipActive]}
              onPress={() => setCategorieActive(cat)}
            >
              <Text style={[styles.categoryText, categorieActive === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtres & Tri */}
        <View style={styles.filtresRow}>
          <TouchableOpacity
            style={[styles.filtreBtn, ouvertSeulement && styles.filtreBtnActive]}
            onPress={() => setOuvertSeulement(!ouvertSeulement)}
          >
            <Text style={[styles.filtreBtnText, ouvertSeulement && styles.filtreBtnTextActive]}>
              ◎ Ouvert
            </Text>
          </TouchableOpacity>

          {tris.map((tri) => (
            <TouchableOpacity
              key={tri}
              style={[styles.filtreBtn, triActif === tri && styles.filtreBtnActive]}
              onPress={() => setTriActif(tri)}
            >
              <Text style={[styles.filtreBtnText, triActif === tri && styles.filtreBtnTextActive]}>
                {tri}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Résultats */}
        <View style={styles.section}>
          <Text style={styles.resultats}>{boutiquesFiltrees.length} boutique{boutiquesFiltrees.length > 1 ? 's' : ''}</Text>
          {boutiquesFiltrees.map((boutique) => (
            <TouchableOpacity
              key={boutique.id}
              style={[styles.boutiqueCard, !boutique.ouvert && styles.boutiqueCardFermee]}
              onPress={() => boutique.ouvert && router.push(`/boutique/${boutique.id}`)}
            >
              <View style={styles.boutiqueImage}>
                {boutique.nouveaute && (
                  <View style={styles.nouveauteBadge}>
                    <Text style={styles.nouveauteText}>Nouveau</Text>
                  </View>
                )}
              </View>
              <View style={styles.boutiqueInfo}>
                <View style={styles.boutiqueHeader}>
                  <Text style={styles.boutiqueName}>{boutique.nom}</Text>
                  <Text style={styles.boutiqueDistance}>{boutique.distance}km</Text>
                </View>
                <Text style={styles.boutiqueCategorie}>{boutique.categorie}</Text>
                <View style={styles.boutiqueFooter}>
                  <View style={[
                    styles.statutBadge,
                    { backgroundColor: boutique.ouvert ? '#E8F5E9' : colors.backgroundSoft }
                  ]}>
                    <Text style={[
                      styles.statutText,
                      { color: boutique.ouvert ? colors.success : colors.textMuted }
                    ]}>
                      {boutique.ouvert ? `◎ ${boutique.delai}` : 'Fermé'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    fontSize: 14,
    color: colors.gold,
    marginRight: spacing.sm,
  },
  searchText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  categoriesRow: {
    paddingLeft: layout.screenPadding,
    marginBottom: spacing.md,
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
  categoryChipActive: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.backgroundDark,
  },
  categoryText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.gold,
  },
  filtresRow: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filtreBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  filtreBtnActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  filtreBtnText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  filtreBtnTextActive: {
    color: colors.backgroundDark,
    fontWeight: '400',
  },
  section: {
    paddingHorizontal: layout.screenPadding,
  },
  resultats: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  boutiqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  boutiqueCardFermee: {
    opacity: 0.5,
  },
  boutiqueImage: {
    width: 90,
    height: 90,
    backgroundColor: colors.backgroundSoft,
    justifyContent: 'flex-end',
    padding: spacing.xs,
  },
  nouveauteBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
  },
  nouveauteText: {
    fontSize: 9,
    color: colors.backgroundDark,
    fontWeight: '400',
  },
  boutiqueInfo: {
    flex: 1,
    padding: spacing.md,
  },
  boutiqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  boutiqueName: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    flex: 1,
  },
  boutiqueDistance: {
    fontSize: 12,
    color: colors.textMuted,
  },
  boutiqueCategorie: {
    fontSize: 12,
    color: colors.gold,
    letterSpacing: 0.3,
    marginBottom: spacing.sm,
  },
  boutiqueFooter: {
    flexDirection: 'row',
  },
  statutBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  statutText: {
    fontSize: 11,
    fontWeight: '400',
  },
  arrow: {
    fontSize: 20,
    color: colors.textMuted,
    paddingRight: spacing.md,
  },
});