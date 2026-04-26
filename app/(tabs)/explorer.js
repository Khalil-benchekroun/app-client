import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { useState, useMemo } from 'react';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const BOUTIQUES = [
  { id: '1', nom: 'Boutique Parisienne', categorie: 'Mode', distance: 0.8, delai: '45 min', ouvert: true, nouveaute: false },
  { id: '2', nom: 'Maison Dorée', categorie: 'Accessoires', distance: 1.2, delai: '55 min', ouvert: true, nouveaute: true },
  { id: '3', nom: 'Le Concept Store', categorie: 'Lifestyle', distance: 0.6, delai: '35 min', ouvert: false, nouveaute: false },
  { id: '4', nom: 'Épicerie du Marais', categorie: 'Épicerie fine', distance: 0.95, delai: '50 min', ouvert: true, nouveaute: true },
  { id: '5', nom: 'Beauté Dorée', categorie: 'Beauté', distance: 1.5, delai: '60 min', ouvert: true, nouveaute: false },
];

const PRODUITS = [
  { id: '1', nom: 'Robe en soie', boutique: 'Boutique Parisienne', boutiqueId: '1', prix: 245, categorie: 'Mode' },
  { id: '2', nom: 'Derby en cuir', boutique: 'Maison Dorée', boutiqueId: '2', prix: 320, categorie: 'Chaussures' },
  { id: '3', nom: 'Foulard en soie', boutique: 'Boutique Parisienne', boutiqueId: '1', prix: 95, categorie: 'Accessoires' },
  { id: '4', nom: 'Sac cuir naturel', boutique: 'Maison Dorée', boutiqueId: '2', prix: 380, categorie: 'Accessoires' },
  { id: '5', nom: 'Sérum éclat', boutique: 'Beauté Dorée', boutiqueId: '5', prix: 68, categorie: 'Beauté' },
  { id: '6', nom: 'Sneaker en toile', boutique: 'Le Concept Store', boutiqueId: '3', prix: 155, categorie: 'Chaussures' },
  { id: '7', nom: 'Blazer structuré', boutique: 'Maison Dorée', boutiqueId: '2', prix: 320, categorie: 'Mode' },
  { id: '8', nom: 'Pantalon lin', boutique: 'Boutique Parisienne', boutiqueId: '1', prix: 145, categorie: 'Mode' },
  { id: '9', nom: 'Parfum signature', boutique: 'Beauté Dorée', boutiqueId: '5', prix: 120, categorie: 'Beauté' },
  { id: '10', nom: 'Bougie parfumée', boutique: 'Le Concept Store', boutiqueId: '3', prix: 38, categorie: 'Lifestyle' },
  { id: '11', nom: 'Huile visage', boutique: 'Beauté Dorée', boutiqueId: '5', prix: 45, categorie: 'Beauté' },
  { id: '12', nom: 'Ceinture tressée', boutique: 'Épicerie du Marais', boutiqueId: '4', prix: 65, categorie: 'Accessoires' },
];

const CATEGORIES = ['Toutes', 'Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle', 'Chaussures'];
const TRIS = ['Distance', 'Popularité', 'Nouveautés'];
const RECHERCHES_RECENTES = ['Robe en soie', 'Sac cuir', 'Beauté Dorée'];

export default function Explorer() {
  const { headerPadding } = useHeaderHeight();
  const [search, setSearch] = useState('');
  const [searchActif, setSearchActif] = useState(false);
  const [categorieActive, setCategorieActive] = useState('Toutes');
  const [triActif, setTriActif] = useState('Distance');
  const [ouvertSeulement, setOuvertSeulement] = useState(false);
  const [onglet, setOnglet] = useState('boutiques');

  // Recherche globale
  const resultatsRecherche = useMemo(() => {
    if (!search.trim()) return { boutiques: [], produits: [] };
    const q = search.toLowerCase().trim();
    return {
      boutiques: BOUTIQUES.filter(b =>
        b.nom.toLowerCase().includes(q) || b.categorie.toLowerCase().includes(q)
      ),
      produits: PRODUITS.filter(p =>
        p.nom.toLowerCase().includes(q) ||
        p.boutique.toLowerCase().includes(q) ||
        p.categorie.toLowerCase().includes(q)
      ),
    };
  }, [search]);

  const totalResultats = resultatsRecherche.boutiques.length + resultatsRecherche.produits.length;

  // Filtrage boutiques
  const boutiquesFiltrees = BOUTIQUES
    .filter(b => categorieActive === 'Toutes' || b.categorie === categorieActive)
    .filter(b => !ouvertSeulement || b.ouvert)
    .sort((a, b) => {
      if (triActif === 'Distance') return a.distance - b.distance;
      if (triActif === 'Nouveautés') return b.nouveaute - a.nouveaute;
      return 0;
    });

  // Filtrage produits
  const produitsFiltres = PRODUITS
    .filter(p => categorieActive === 'Toutes' || p.categorie === categorieActive);

  const annulerRecherche = () => {
    setSearch('');
    setSearchActif(false);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={[styles.header, { paddingTop: headerPadding }]}>
        {!searchActif && (
          <>
            <Text style={styles.title}>Explorer</Text>
            <Text style={styles.subtitle}>Boutiques livrables à votre adresse</Text>
          </>
        )}

        <View style={styles.searchRow}>
          <View style={[styles.searchBar, searchActif && styles.searchBarActif]}>
            <Text style={styles.searchIcon}>✦</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Produit, boutique, marque..."
              placeholderTextColor={colors.textMuted}
              value={search}
              onChangeText={setSearch}
              onFocus={() => setSearchActif(true)}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Text style={styles.searchClear}>×</Text>
              </TouchableOpacity>
            )}
          </View>
          {searchActif && (
            <TouchableOpacity style={styles.annulerBtn} onPress={annulerRecherche}>
              <Text style={styles.annulerText}>Annuler</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Mode recherche */}
      {searchActif ? (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Pas de saisie → récentes + catégories */}
          {!search.trim() && (
            <View style={styles.recentesSection}>
              <Text style={styles.recentesLabel}>RECHERCHES RÉCENTES</Text>
              {RECHERCHES_RECENTES.map((r, i) => (
                <TouchableOpacity key={i} style={styles.recenteRow} onPress={() => setSearch(r)}>
                  <Text style={styles.recenteIcon}>◎</Text>
                  <Text style={styles.recenteText}>{r}</Text>
                  <Text style={styles.recenteArrow}>›</Text>
                </TouchableOpacity>
              ))}

              <Text style={[styles.recentesLabel, { marginTop: spacing.xl }]}>CATÉGORIES</Text>
              <View style={styles.categoriesGrid}>
                {CATEGORIES.filter(c => c !== 'Toutes').map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.categorieGridItem}
                    onPress={() => router.push(`/categorie/${cat.toLowerCase().replace(' ', '-')}`)}
                  >
                    <Text style={styles.categorieGridText}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Résultats */}
          {search.trim() && (
            <View style={styles.resultatsSection}>
              <Text style={styles.resultatsCount}>
                {totalResultats} résultat{totalResultats > 1 ? 's' : ''} pour « {search} »
              </Text>

              {/* Boutiques */}
              {resultatsRecherche.boutiques.length > 0 && (
                <View style={styles.resultatsGroupe}>
                  <Text style={styles.resultatsGroupeLabel}>BOUTIQUES</Text>
                  {resultatsRecherche.boutiques.map(b => (
                    <TouchableOpacity
                      key={b.id}
                      style={styles.boutiqueCard}
                      onPress={() => router.push(`/boutique/${b.id}`)}
                    >
                      <View style={styles.boutiqueImage}>
                        {b.nouveaute && (
                          <View style={styles.nouveauteBadge}>
                            <Text style={styles.nouveauteText}>Nouveau</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.boutiqueInfo}>
                        <View style={styles.boutiqueHeader}>
                          <Text style={styles.boutiqueName}>{b.nom}</Text>
                          <Text style={styles.boutiqueDistance}>{b.distance}km</Text>
                        </View>
                        <Text style={styles.boutiqueCategorie}>{b.categorie}</Text>
                        <View style={[styles.statutBadge, { backgroundColor: b.ouvert ? '#E8F5E9' : colors.backgroundSoft }]}>
                          <Text style={[styles.statutText, { color: b.ouvert ? colors.success : colors.textMuted }]}>
                            {b.ouvert ? `◎ ${b.delai}` : 'Fermé'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Produits */}
              {resultatsRecherche.produits.length > 0 && (
                <View style={styles.resultatsGroupe}>
                  <Text style={styles.resultatsGroupeLabel}>PRODUITS</Text>
                  {resultatsRecherche.produits.map(p => (
                    <TouchableOpacity
                      key={p.id}
                      style={styles.produitCard}
                      onPress={() => router.push(`/produit/${p.id}`)}
                    >
                      <View style={styles.produitImage} />
                      <View style={styles.produitInfo}>
                        <Text style={styles.produitNom}>{p.nom}</Text>
                        <Text style={styles.produitBoutique}>{p.boutique}</Text>
                        <Text style={styles.produitPrix}>{p.prix.toFixed(2).replace('.', ',')} €</Text>
                      </View>
                      <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Aucun résultat */}
              {totalResultats === 0 && (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>✦</Text>
                  <Text style={styles.emptyTitle}>Aucun résultat</Text>
                  <Text style={styles.emptySub}>Essayez un autre mot-clé.</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>

      ) : (
        /* Mode navigation normal */
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Catégories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            {CATEGORIES.map(cat => (
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

          {/* Onglets */}
          <View style={styles.ongletsRow}>
            {[
              { id: 'boutiques', label: `Boutiques (${boutiquesFiltrees.length})` },
              { id: 'produits', label: `Produits (${produitsFiltres.length})` },
            ].map(o => (
              <TouchableOpacity
                key={o.id}
                style={[styles.onglet, onglet === o.id && styles.ongletActif]}
                onPress={() => setOnglet(o.id)}
              >
                <Text style={[styles.ongletText, onglet === o.id && styles.ongletTextActif]}>
                  {o.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Filtres */}
          {onglet === 'boutiques' && (
            <View style={styles.filtresRow}>
              <TouchableOpacity
                style={[styles.filtreBtn, ouvertSeulement && styles.filtreBtnActive]}
                onPress={() => setOuvertSeulement(!ouvertSeulement)}
              >
                <Text style={[styles.filtreBtnText, ouvertSeulement && styles.filtreBtnTextActive]}>
                  ◎ Ouvert
                </Text>
              </TouchableOpacity>
              {TRIS.map(tri => (
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
          )}

          {/* Liste boutiques */}
          {onglet === 'boutiques' && (
            <View style={styles.section}>
              <Text style={styles.resultats}>
                {boutiquesFiltrees.length} boutique{boutiquesFiltrees.length > 1 ? 's' : ''}
              </Text>
              {boutiquesFiltrees.map(boutique => (
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
                    <View style={[styles.statutBadge, { backgroundColor: boutique.ouvert ? '#E8F5E9' : colors.backgroundSoft }]}>
                      <Text style={[styles.statutText, { color: boutique.ouvert ? colors.success : colors.textMuted }]}>
                        {boutique.ouvert ? `◎ ${boutique.delai}` : 'Fermé'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Grille produits */}
          {onglet === 'produits' && (
            <View style={styles.section}>
              <Text style={styles.resultats}>
                {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''}
              </Text>
              <View style={styles.produitsGrille}>
                {produitsFiltres.map(p => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.produitGrilleCard}
                    onPress={() => router.push(`/produit/${p.id}`)}
                  >
                    <View style={styles.produitGrilleImage} />
                    <Text style={styles.produitGrilleBoutique} numberOfLines={1}>{p.boutique}</Text>
                    <Text style={styles.produitGrilleNom} numberOfLines={2}>{p.nom}</Text>
                    <Text style={styles.produitGrillePrix}>{p.prix.toFixed(2).replace('.', ',')} €</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: layout.headerSpacing,
    paddingBottom: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  title: { fontSize: 28, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4, marginBottom: spacing.md },

  // Recherche
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, height: 44,
  },
  searchBarActif: { borderColor: colors.gold },
  searchIcon: { fontSize: 14, color: colors.gold, marginRight: spacing.sm },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  searchClear: { fontSize: 20, color: colors.textMuted, paddingLeft: spacing.sm },
  annulerBtn: { paddingHorizontal: spacing.sm },
  annulerText: { fontSize: 14, color: colors.gold },

  // Mode recherche
  recentesSection: { padding: layout.screenPadding },
  recentesLabel: {
    fontSize: 10, color: colors.textMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.md,
  },
  recenteRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  recenteIcon: { fontSize: 14, color: colors.gold },
  recenteText: { flex: 1, fontSize: 14, color: colors.textPrimary },
  recenteArrow: { fontSize: 18, color: colors.textMuted },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categorieGridItem: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  categorieGridText: { fontSize: 13, color: colors.textSecondary },

  // Résultats recherche
  resultatsSection: { padding: layout.screenPadding },
  resultatsCount: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg },
  resultatsGroupe: { marginBottom: spacing.xl },
  resultatsGroupeLabel: {
    fontSize: 10, color: colors.textMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.md,
  },

  // Produit card (résultats recherche)
  produitCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: spacing.sm, marginBottom: spacing.sm,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  produitImage: { width: 60, height: 60, backgroundColor: colors.border, borderRadius: radius.md, marginRight: spacing.md },
  produitInfo: { flex: 1 },
  produitNom: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  produitBoutique: { fontSize: 11, color: colors.gold, marginBottom: 2 },
  produitPrix: { fontSize: 13, color: colors.textSecondary },

  // Empty state
  emptyState: { alignItems: 'center', paddingTop: layout.headerSpacing, gap: spacing.sm },
  emptyIcon: { fontSize: 32, color: colors.gold, opacity: 0.3, marginBottom: spacing.md },
  emptyTitle: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  emptySub: { fontSize: 13, color: colors.textSecondary },

  // Mode navigation
  categoriesRow: { paddingLeft: layout.screenPadding, paddingVertical: spacing.md },
  categoryChip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.full,
    marginRight: spacing.sm, borderWidth: 0.5, borderColor: colors.border,
  },
  categoryChipActive: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  categoryText: { fontSize: 13, color: colors.textSecondary },
  categoryTextActive: { color: colors.gold },

  // Onglets
  ongletsRow: {
    flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.border,
    paddingHorizontal: layout.screenPadding,
  },
  onglet: { paddingVertical: spacing.md, marginRight: spacing.xl, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  ongletActif: { borderBottomColor: colors.gold },
  ongletText: { fontSize: 14, color: colors.textMuted },
  ongletTextActif: { color: colors.textPrimary, fontWeight: '400' },

  // Filtres
  filtresRow: {
    flexDirection: 'row', paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.md, gap: spacing.sm, flexWrap: 'wrap',
  },
  filtreBtn: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  filtreBtnActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  filtreBtnText: { fontSize: 12, color: colors.textSecondary },
  filtreBtnTextActive: { color: colors.backgroundDark, fontWeight: '400' },

  section: { paddingHorizontal: layout.screenPadding, paddingBottom: 40 },
  resultats: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.md, marginTop: spacing.sm },

  // Boutique card
  boutiqueCard: {
    flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md,
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden',
    ...shadows.soft,
  },
  boutiqueCardFermee: { opacity: 0.5 },
  boutiqueImage: { width: 90, height: 90, backgroundColor: colors.backgroundSoft, justifyContent: 'flex-end', padding: spacing.xs },
  nouveauteBadge: { alignSelf: 'flex-start', paddingHorizontal: spacing.xs, paddingVertical: 2, backgroundColor: colors.gold, borderRadius: radius.sm },
  nouveauteText: { fontSize: 9, color: colors.backgroundDark, fontWeight: '400' },
  boutiqueInfo: { flex: 1, padding: spacing.md },
  boutiqueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  boutiqueName: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, flex: 1 },
  boutiqueDistance: { fontSize: 12, color: colors.textMuted },
  boutiqueCategorie: { fontSize: 12, color: colors.gold, letterSpacing: 0.3, marginBottom: spacing.sm },
  statutBadge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  statutText: { fontSize: 11, fontWeight: '400' },
  arrow: { fontSize: 20, color: colors.textMuted, paddingRight: spacing.md },

  // Grille produits
  produitsGrille: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  produitGrilleCard: {
    width: '48.5%', borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden',
    backgroundColor: colors.background, ...shadows.soft,
  },
  produitGrilleImage: { height: 160, backgroundColor: colors.backgroundSoft },
  produitGrilleBoutique: { fontSize: 10, color: colors.gold, padding: spacing.sm, paddingBottom: 2, letterSpacing: 0.3 },
  produitGrilleNom: { fontSize: 13, color: colors.textPrimary, paddingHorizontal: spacing.sm, marginBottom: 2, lineHeight: 18 },
  produitGrillePrix: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, padding: spacing.sm, paddingTop: 2 },
});