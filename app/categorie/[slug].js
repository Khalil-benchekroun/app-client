import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

// ── Données mock par catégorie ────────────────────────────────────────────────
const PRODUITS_PAR_CATEGORIE = {
  mode: [
    { id: '1', nom: 'Robe en soie', marque: 'Boutique Parisienne', boutiqueId: '1', prix: 245, delai: '45 min', categorie: 'mode', favoris: false },
    { id: '7', nom: 'Blazer structuré', marque: 'Maison Dorée', boutiqueId: '2', prix: 320, delai: '55 min', categorie: 'mode', favoris: false },
    { id: '8', nom: 'Pantalon lin', marque: 'Boutique Parisienne', boutiqueId: '1', prix: 145, delai: '45 min', categorie: 'mode', favoris: true },
    { id: '9', nom: 'Chemise satin', marque: 'Élégance & Co.', boutiqueId: '4', prix: 98, delai: '60 min', categorie: 'mode', favoris: false },
    { id: '10', nom: 'Jupe midi', marque: 'Boutique Parisienne', boutiqueId: '1', prix: 175, delai: '45 min', categorie: 'mode', favoris: false },
    { id: '11', nom: 'Manteau cachemire', marque: 'Maison Dorée', boutiqueId: '2', prix: 680, delai: '55 min', categorie: 'mode', favoris: true },
  ],
  beaute: [
    { id: '5', nom: 'Sérum éclat', marque: 'Beauté Dorée', boutiqueId: '5', prix: 68, delai: '40 min', categorie: 'beaute', favoris: false },
    { id: '12', nom: 'Huile visage', marque: 'Beauté Dorée', boutiqueId: '5', prix: 45, delai: '40 min', categorie: 'beaute', favoris: false },
    { id: '13', nom: 'Crème hydratante', marque: 'Maison Dorée', boutiqueId: '2', prix: 82, delai: '55 min', categorie: 'beaute', favoris: true },
    { id: '14', nom: 'Parfum signature', marque: 'Élégance & Co.', boutiqueId: '4', prix: 120, delai: '60 min', categorie: 'beaute', favoris: false },
  ],
  chaussures: [
    { id: '2', nom: 'Derby en cuir', marque: 'Maison Dorée', boutiqueId: '2', prix: 320, delai: '55 min', categorie: 'chaussures', favoris: false },
    { id: '6', nom: 'Sneaker en toile', marque: 'Le Concept Store', boutiqueId: '3', prix: 155, delai: '35 min', categorie: 'chaussures', favoris: true },
    { id: '15', nom: 'Mocassin cuir', marque: 'Maison Dorée', boutiqueId: '2', prix: 285, delai: '55 min', categorie: 'chaussures', favoris: false },
    { id: '16', nom: 'Escarpin satin', marque: 'Boutique Parisienne', boutiqueId: '1', prix: 195, delai: '45 min', categorie: 'chaussures', favoris: false },
  ],
  accessoires: [
    { id: '3', nom: 'Foulard en soie', marque: 'Boutique Parisienne', boutiqueId: '1', prix: 95, delai: '45 min', categorie: 'accessoires', favoris: true },
    { id: '4', nom: 'Sac cuir naturel', marque: 'Maison Dorée', boutiqueId: '2', prix: 380, delai: '55 min', categorie: 'accessoires', favoris: false },
    { id: '17', nom: 'Ceinture tressée', marque: 'Élégance & Co.', boutiqueId: '4', prix: 65, delai: '60 min', categorie: 'accessoires', favoris: false },
    { id: '18', nom: 'Chapeau panama', marque: 'Le Concept Store', boutiqueId: '3', prix: 110, delai: '35 min', categorie: 'accessoires', favoris: false },
  ],
  lifestyle: [
    { id: '19', nom: 'Bougie parfumée', marque: 'Le Concept Store', boutiqueId: '3', prix: 38, delai: '35 min', categorie: 'lifestyle', favoris: false },
    { id: '20', nom: 'Carnet cuir', marque: 'Élégance & Co.', boutiqueId: '4', prix: 52, delai: '60 min', categorie: 'lifestyle', favoris: false },
    { id: '21', nom: 'Plateau laiton', marque: 'Maison Dorée', boutiqueId: '2', prix: 89, delai: '55 min', categorie: 'lifestyle', favoris: false },
  ],
};

const MARQUES = ['Toutes', 'Boutique Parisienne', 'Maison Dorée', 'Le Concept Store', 'Élégance & Co.', 'Beauté Dorée'];
const TRIS = [
  { id: 'pertinence', label: 'Pertinence' },
  { id: 'prix_asc', label: 'Prix croissant' },
  { id: 'prix_desc', label: 'Prix décroissant' },
  { id: 'delai', label: 'Délai livraison' },
];

const LABELS_CATEGORIES = {
  mode: 'Mode',
  beaute: 'Beauté',
  chaussures: 'Chaussures',
  accessoires: 'Accessoires',
  lifestyle: 'Lifestyle',
};

export default function Categorie() {
  const { slug } = useLocalSearchParams();
  const categorie = slug || 'mode';
  const label = LABELS_CATEGORIES[categorie] || categorie;
  const produitsBruts = PRODUITS_PAR_CATEGORIE[categorie] || [];

  const [search, setSearch] = useState('');
  const [marque, setMarque] = useState('Toutes');
  const [prixMax, setPrixMax] = useState(1000);
  const [delaiRapide, setDelaiRapide] = useState(false);
  const [tri, setTri] = useState('pertinence');
  const [colonnes, setColonnes] = useState(2);
  const [filtresVisible, setFiltresVisible] = useState(false);
  const [favoris, setFavoris] = useState(
    produitsBruts.reduce((acc, p) => ({ ...acc, [p.id]: p.favoris }), {})
  );

  // Filtrage + tri
  const produits = produitsBruts
    .filter(p => {
      if (search && !p.nom.toLowerCase().includes(search.toLowerCase()) &&
          !p.marque.toLowerCase().includes(search.toLowerCase())) return false;
      if (marque !== 'Toutes' && p.marque !== marque) return false;
      if (p.prix > prixMax) return false;
      if (delaiRapide && parseInt(p.delai) > 45) return false;
      return true;
    })
    .sort((a, b) => {
      if (tri === 'prix_asc') return a.prix - b.prix;
      if (tri === 'prix_desc') return b.prix - a.prix;
      if (tri === 'delai') return parseInt(a.delai) - parseInt(b.delai);
      return 0;
    });

  const toggleFavori = (id) => setFavoris(prev => ({ ...prev, [id]: !prev[id] }));

  const nbFiltresActifs = (marque !== 'Toutes' ? 1 : 0) + (prixMax < 1000 ? 1 : 0) + (delaiRapide ? 1 : 0);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.count}>{produits.length} articles</Text>
      </View>

      {/* Barre recherche */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>✦</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={`Rechercher en ${label}...`}
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.searchClear}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filtres + tri + colonnes */}
        <TouchableOpacity
          style={[styles.filtreBtn, nbFiltresActifs > 0 && styles.filtreBtnActif]}
          onPress={() => setFiltresVisible(true)}
        >
          <Text style={[styles.filtreBtnText, nbFiltresActifs > 0 && styles.filtreBtnTextActif]}>
            ◈ Filtres{nbFiltresActifs > 0 ? ` (${nbFiltresActifs})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barre tri + toggle colonnes */}
      <View style={styles.triRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
          {TRIS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[styles.triChip, tri === t.id && styles.triChipActif]}
              onPress={() => setTri(t.id)}
            >
              <Text style={[styles.triChipText, tri === t.id && styles.triChipTextActif]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Toggle colonnes */}
        <View style={styles.colonnesToggle}>
          {[1, 2, 3].map(n => (
            <TouchableOpacity
              key={n}
              style={[styles.colonneBtn, colonnes === n && styles.colonneBtnActif]}
              onPress={() => setColonnes(n)}
            >
              <Text style={[styles.colonneBtnText, colonnes === n && styles.colonneBtnTextActif]}>
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Grille produits */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grille}>
        {produits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyTitle}>Aucun résultat</Text>
            <Text style={styles.emptySub}>Essayez de modifier vos filtres.</Text>
          </View>
        ) : (
          <View style={[styles.grilleRow, { gap: colonnes === 1 ? 0 : spacing.sm }]}>
            {produits.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.produitCard,
                  colonnes === 1 && styles.produitCardLigne,
                  { width: colonnes === 1 ? '100%' : colonnes === 2 ? '48.5%' : '31.5%' },
                ]}
                onPress={() => router.push(`/produit/${p.id}`)}
              >
                {/* Image */}
                <View style={[
                  styles.produitImage,
                  colonnes === 1 && styles.produitImageLigne,
                  colonnes === 3 && { height: 100 },
                ]}>
                  {/* Bouton favori */}
                  <TouchableOpacity
                    style={styles.favoriBtn}
                    onPress={(e) => { e.stopPropagation?.(); toggleFavori(p.id); }}
                  >
                    <Text style={[styles.favoriIcon, favoris[p.id] && styles.favoriIconActif]}>
                      {favoris[p.id] ? '♥' : '♡'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Infos */}
                <View style={[styles.produitInfo, colonnes === 1 && styles.produitInfoLigne]}>
                  {colonnes !== 3 && (
                    <Text style={styles.produitMarque} numberOfLines={1}>{p.marque}</Text>
                  )}
                  <Text
                    style={[styles.produitNom, colonnes === 3 && { fontSize: 11 }]}
                    numberOfLines={colonnes === 1 ? 1 : 2}
                  >
                    {p.nom}
                  </Text>
                  <View style={styles.produitFooter}>
                    <Text style={[styles.produitPrix, colonnes === 3 && { fontSize: 13 }]}>
                      {p.prix.toFixed(2).replace('.', ',')} €
                    </Text>
                    {colonnes === 1 && (
                      <View style={styles.delaiTag}>
                        <Text style={styles.delaiTagText}>◎ {p.delai}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal filtres */}
      <Modal visible={filtresVisible} transparent animationType="slide" onRequestClose={() => setFiltresVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres</Text>
              <TouchableOpacity onPress={() => setFiltresVisible(false)}>
                <Text style={styles.modalFermer}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Marque */}
            <Text style={styles.filtreLabel}>MARQUE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.xl }}>
              {MARQUES.map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.marqueChip, marque === m && styles.marqueChipActif]}
                  onPress={() => setMarque(m)}
                >
                  <Text style={[styles.marqueChipText, marque === m && styles.marqueChipTextActif]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Prix max */}
            <Text style={styles.filtreLabel}>PRIX MAXIMUM</Text>
            <View style={styles.prixRow}>
              {[100, 200, 300, 500, 1000].map(p => (
                <TouchableOpacity
                  key={p}
                  style={[styles.prixChip, prixMax === p && styles.prixChipActif]}
                  onPress={() => setPrixMax(p)}
                >
                  <Text style={[styles.prixChipText, prixMax === p && styles.prixChipTextActif]}>
                    {p === 1000 ? 'Tous' : `≤ ${p}€`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Délai rapide */}
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>Livraison rapide</Text>
                <Text style={styles.toggleSub}>Moins de 45 minutes</Text>
              </View>
              <TouchableOpacity
                style={[styles.toggle, delaiRapide && styles.toggleActif]}
                onPress={() => setDelaiRapide(!delaiRapide)}
              >
                <View style={[styles.toggleThumb, delaiRapide && styles.toggleThumbActif]} />
              </TouchableOpacity>
            </View>

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => { setMarque('Toutes'); setPrixMax(1000); setDelaiRapide(false); }}
              >
                <Text style={styles.resetBtnText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.appliquerBtn} onPress={() => setFiltresVisible(false)}>
                <Text style={styles.appliquerBtnText}>
                  Voir {produits.length} résultat{produits.length > 1 ? 's' : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: layout.screenPadding, paddingTop: 60, paddingBottom: spacing.md,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { flex: 1, fontSize: 20, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.5 },
  count: { fontSize: 13, color: colors.textMuted },

  // Recherche
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    padding: layout.screenPadding, paddingBottom: spacing.sm,
  },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    paddingHorizontal: spacing.md, height: 44,
  },
  searchIcon: { fontSize: 14, color: colors.gold, marginRight: spacing.sm },
  searchInput: { flex: 1, fontSize: 14, color: colors.textPrimary },
  searchClear: { fontSize: 20, color: colors.textMuted, paddingLeft: spacing.sm },
  filtreBtn: {
    height: 44, paddingHorizontal: spacing.md,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft, justifyContent: 'center',
  },
  filtreBtnActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  filtreBtnText: { fontSize: 13, color: colors.textSecondary },
  filtreBtnTextActif: { color: colors.gold },

  // Tri + colonnes
  triRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingLeft: layout.screenPadding, paddingRight: layout.screenPadding,
    marginBottom: spacing.md, gap: spacing.sm,
  },
  triChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginRight: spacing.xs, backgroundColor: colors.backgroundSoft,
  },
  triChipActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  triChipText: { fontSize: 12, color: colors.textSecondary },
  triChipTextActif: { color: colors.gold },
  colonnesToggle: {
    flexDirection: 'row', borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, overflow: 'hidden',
  },
  colonneBtn: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.backgroundSoft,
  },
  colonneBtnActif: { backgroundColor: colors.backgroundDark },
  colonneBtnText: { fontSize: 12, color: colors.textSecondary },
  colonneBtnTextActif: { color: colors.gold },

  // Grille
  grille: { paddingHorizontal: layout.screenPadding, paddingBottom: 40 },
  grilleRow: { flexDirection: 'row', flexWrap: 'wrap' },
  produitCard: {
    marginBottom: spacing.md, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden', backgroundColor: colors.background,
    ...shadows.soft,
  },
  produitCardLigne: { flexDirection: 'row', width: '100%' },
  produitImage: {
    height: 160, backgroundColor: colors.backgroundSoft,
    position: 'relative',
  },
  produitImageLigne: { width: 100, height: 100, flexShrink: 0 },
  favoriBtn: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 30, height: 30, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  favoriIcon: { fontSize: 14, color: colors.textMuted },
  favoriIconActif: { color: '#E24B4A' },
  produitInfo: { padding: spacing.sm },
  produitInfoLigne: { flex: 1, padding: spacing.md, justifyContent: 'center' },
  produitMarque: { fontSize: 10, color: colors.gold, letterSpacing: 0.5, marginBottom: 2 },
  produitNom: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.xs, lineHeight: 18 },
  produitFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  produitPrix: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  delaiTag: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.sm,
  },
  delaiTagText: { fontSize: 11, color: colors.textSecondary },

  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 80, gap: spacing.sm },
  emptyIcon: { fontSize: 32, color: colors.gold, opacity: 0.3, marginBottom: spacing.md },
  emptyTitle: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  emptySub: { fontSize: 13, color: colors.textSecondary },

  // Modal filtres
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalCard: {
    backgroundColor: colors.background, borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: { fontSize: 18, fontWeight: '400', color: colors.textPrimary },
  modalFermer: { fontSize: 28, color: colors.textMuted, lineHeight: 30 },
  filtreLabel: {
    fontSize: 10, color: colors.textMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.md,
  },
  marqueChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginRight: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  marqueChipActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  marqueChipText: { fontSize: 12, color: colors.textSecondary },
  marqueChipTextActif: { color: colors.gold },
  prixRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl, flexWrap: 'wrap' },
  prixChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  prixChipActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  prixChipText: { fontSize: 12, color: colors.textSecondary },
  prixChipTextActif: { color: colors.gold },
  toggleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.xl,
  },
  toggleLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  toggleSub: { fontSize: 12, color: colors.textMuted },
  toggle: {
    width: 44, height: 26, borderRadius: radius.full,
    backgroundColor: colors.border, padding: 3, justifyContent: 'center',
  },
  toggleActif: { backgroundColor: colors.gold },
  toggleThumb: {
    width: 20, height: 20, borderRadius: radius.full,
    backgroundColor: colors.background, alignSelf: 'flex-start',
  },
  toggleThumbActif: { alignSelf: 'flex-end' },
  modalActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  resetBtn: {
    flex: 1, height: 48, borderRadius: radius.md,
    borderWidth: 0.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  resetBtnText: { fontSize: 14, color: colors.textSecondary },
  appliquerBtn: {
    flex: 2, height: 48, borderRadius: radius.md,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
  },
  appliquerBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 0.5 },
});