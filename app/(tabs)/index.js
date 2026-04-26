import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, shadows, layout } from '../../constants/theme';
import PopupOffre from '../../components/common/PopupOffre';

const boutiques = [
  { id: '1', nom: 'Boutique Parisienne', categorie: 'Mode', distance: '800m', delai: '45 min' },
  { id: '2', nom: 'Maison de Mode', categorie: 'Accessoires', distance: '1,2km', delai: '55 min' },
  { id: '3', nom: 'Le Concept Store', categorie: 'Lifestyle', distance: '600m', delai: '35 min' },
];

const COLLECTIONS = [
  { id: '1', titre: 'Printemps 2026', sous: 'Nouvelles arrivées', boutique: 'Boutique Parisienne', boutiqueId: '1', couleur: '#8B7355' },
  { id: '2', titre: 'La maison', sous: 'Lifestyle & déco', boutique: 'Le Concept Store', boutiqueId: '3', couleur: '#2D6A4F' },
  { id: '3', titre: 'Beauté naturelle', sous: 'Soins & parfums', boutique: 'Beauté Dorée', boutiqueId: '5', couleur: '#8B3258' },
  { id: '4', titre: 'Chaussures été', sous: 'Sandales & espadrilles', boutique: 'Maison Dorée', boutiqueId: '2', couleur: '#185FA5' },
];

const NOUVEAUTES = [
  { id: '1', produit: 'Robe lin naturelle', boutique: 'Boutique Parisienne', boutiqueId: '1', prix: '185,00 €', tag: 'Nouveau' },
  { id: '2', produit: 'Sérum éclat vitamine C', boutique: 'Beauté Dorée', boutiqueId: '5', prix: '68,00 €', tag: 'Nouveau' },
  { id: '3', produit: 'Sac raphia tressé', boutique: 'Maison Dorée', boutiqueId: '2', prix: '220,00 €', tag: 'Tendance' },
  { id: '4', produit: 'Sandales cuir doré', boutique: 'Maison Dorée', boutiqueId: '2', prix: '195,00 €', tag: 'Nouveau' },
  { id: '5', produit: 'Bougie cèdre & vétiver', boutique: 'Le Concept Store', boutiqueId: '3', prix: '42,00 €', tag: 'Best-seller' },
];

const CATEGORIES_ACCUEIL = [
  { slug: 'mode', label: 'Mode', icon: '§' },
  { slug: 'beaute', label: 'Beauté', icon: '✦' },
  { slug: 'chaussures', label: 'Chaussures', icon: '◎' },
  { slug: 'accessoires', label: 'Accessoires', icon: '◈' },
  { slug: 'lifestyle', label: 'Lifestyle', icon: '◉' },
];

const RECOMMANDATIONS = [
  { id: '1', nom: 'Robe en soie', boutique: 'Boutique Parisienne', prix: '245,00 €', boutiqueId: '1' },
  { id: '4', nom: 'Sac cuir naturel', boutique: 'Maison Dorée', prix: '380,00 €', boutiqueId: '2' },
  { id: '3', nom: 'Foulard en soie', boutique: 'Boutique Parisienne', prix: '95,00 €', boutiqueId: '1' },
  { id: '5', nom: 'Sérum éclat', boutique: 'Beauté Dorée', prix: '68,00 €', boutiqueId: '5' },
];

const TAG_COLORS = {
  'Nouveau': { bg: '#E8F5EE', text: '#2D6A4F' },
  'Tendance': { bg: '#FFF8E8', text: '#A07840' },
  'Best-seller': { bg: '#EEF4FF', text: '#185FA5' },
};

export default function Accueil() {
  const [promoVisible, setPromoVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);

  const offresPromo = [
    { id: '1', titre: '−10% chez Boutique Parisienne', detail: 'Code : BP10 · Jusqu\'au 30 avril', couleur: colors.gold, boutiqueId: '1' },
    { id: '2', titre: 'Livraison offerte dès 80 €', detail: 'Ce week-end sur toutes les boutiques', couleur: '#2D6A4F', boutiqueId: null },
  ];
  const promoActuelle = offresPromo[promoIndex];

  return (
    <View style={{ flex: 1 }}>
      {/* Popup offre 1er lancement */}
      <PopupOffre />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>LIVRR</Text>
            <Text style={styles.tagline}>L'élégance du local</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.carteBtn} onPress={() => router.push('/carte')}>
              <Text style={styles.carteBtnText}>◎ Carte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(tabs)/profil')}>
              <Text style={styles.profileIcon}>◉</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Adresse */}
        <TouchableOpacity style={styles.addressBar} onPress={() => router.push('/adresse')}>
          <Text style={styles.addressIcon}>◎</Text>
          <Text style={styles.addressText}>Où souhaitez-vous être livré ?</Text>
          <Text style={styles.addressArrow}>›</Text>
        </TouchableOpacity>

        {/* Bannière promo rotative */}
        {promoVisible && (
          <View style={[styles.promoBanner, { borderLeftColor: promoActuelle.couleur }]}>
            <View style={styles.promoBannerLeft}>
              <Text style={[styles.promoBannerTitre, { color: promoActuelle.couleur }]}>
                {promoActuelle.titre}
              </Text>
              <Text style={styles.promoBannerDetail}>{promoActuelle.detail}</Text>
              <View style={styles.promoDots}>
                {offresPromo.map((_, i) => (
                  <TouchableOpacity key={i} onPress={() => setPromoIndex(i)}>
                    <View style={[styles.promoDot, i === promoIndex && styles.promoDotActif]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.promoBannerRight}>
              {promoActuelle.boutiqueId && (
                <TouchableOpacity
                  style={styles.promoVoirBtn}
                  onPress={() => router.push(`/boutique/${promoActuelle.boutiqueId}`)}
                >
                  <Text style={styles.promoVoirBtnText}>Voir ›</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => setPromoVisible(false)}>
                <Text style={styles.promoFermer}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Hero */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>Livraison en moins d'une heure</Text>
          <Text style={styles.heroSub}>Les meilleures boutiques parisiennes, livrées chez vous</Text>
          <TouchableOpacity style={styles.heroBtn} onPress={() => router.push('/carte')}>
            <Text style={styles.heroBtnText}>Voir la carte ›</Text>
          </TouchableOpacity>
        </View>

        {/* Accès rapide */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accesRapideRow}>
          {[
            { label: 'Premium', icon: '✦', route: '/premium' },
            { label: 'Fidélité', icon: '◈', route: '/fidelite' },
            { label: 'Services', icon: '◎', route: '/reservations' },
            { label: 'Magazine', icon: '§', route: '/blog' },
            { label: 'Jeux', icon: '◉', route: '/jeux' },
          ].map(item => (
            <TouchableOpacity
              key={item.label}
              style={styles.accesRapideCard}
              onPress={() => router.push(item.route)}
            >
              <Text style={styles.accesRapideIcon}>{item.icon}</Text>
              <Text style={styles.accesRapideLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Catégories avec navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitlePadded}>Catégories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            {CATEGORIES_ACCUEIL.map(cat => (
              <TouchableOpacity
                key={cat.slug}
                style={styles.categoryChip}
                onPress={() => router.push(`/categorie/${cat.slug}`)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryText}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Collections en vedette */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Collections en vedette</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: layout.screenPadding }}>
            {COLLECTIONS.map(col => (
              <TouchableOpacity
                key={col.id}
                style={[styles.collectionCard, { backgroundColor: col.couleur }]}
                onPress={() => router.push(`/boutique/${col.boutiqueId}`)}
              >
                <Text style={styles.collectionBoutique}>{col.boutique}</Text>
                <Text style={styles.collectionTitre}>{col.titre}</Text>
                <Text style={styles.collectionSous}>{col.sous}</Text>
                <Text style={styles.collectionCta}>Découvrir ›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Fil d'actualité — nouveautés */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nouveautés</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/explorer')}>
              <Text style={styles.voirTout}>Voir tout ›</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: layout.screenPadding }}>
            {NOUVEAUTES.map(n => (
              <TouchableOpacity
                key={n.id}
                style={styles.nouveauteCard}
                onPress={() => router.push(`/boutique/${n.boutiqueId}`)}
              >
                <View style={styles.nouveauteImage}>
                  <View style={[
                    styles.nouveauteTag,
                    { backgroundColor: TAG_COLORS[n.tag]?.bg || colors.backgroundSoft }
                  ]}>
                    <Text style={[
                      styles.nouveauteTagText,
                      { color: TAG_COLORS[n.tag]?.text || colors.textSecondary }
                    ]}>
                      {n.tag}
                    </Text>
                  </View>
                </View>
                <View style={styles.nouveauteInfo}>
                  <Text style={styles.nouveauteBoutique}>{n.boutique}</Text>
                  <Text style={styles.nouveauteNom} numberOfLines={2}>{n.produit}</Text>
                  <Text style={styles.nouveautePrix}>{n.prix}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommandations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sélection pour vous</Text>
            <Text style={styles.sectionSub}>Basée sur vos achats</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: layout.screenPadding }}>
            {RECOMMANDATIONS.map(p => (
              <TouchableOpacity
                key={p.id}
                style={styles.recoCard}
                onPress={() => router.push(`/produit/${p.id}`)}
              >
                <View style={styles.recoImage} />
                <Text style={styles.recoBoutique}>{p.boutique}</Text>
                <Text style={styles.recoNom} numberOfLines={1}>{p.nom}</Text>
                <Text style={styles.recoPrix}>{p.prix}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Boutiques */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Boutiques tendances</Text>
            <TouchableOpacity onPress={() => router.push('/carte')}>
              <Text style={styles.voirTout}>Voir tout ›</Text>
            </TouchableOpacity>
          </View>
          {boutiques.map(boutique => (
            <TouchableOpacity
              key={boutique.id}
              style={styles.boutiqueCard}
              onPress={() => router.push(`/boutique/${boutique.id}`)}
            >
              <View style={styles.boutiqueImage} />
              <View style={styles.boutiqueInfo}>
                <Text style={styles.boutiqueName}>{boutique.nom}</Text>
                <Text style={styles.boutiqueDetails}>{boutique.categorie} · {boutique.distance} · {boutique.delai}</Text>
                <View style={styles.boutiqueBadge}>
                  <Text style={styles.boutiqueBadgeText}>Ouvert</Text>
                </View>
              </View>
              <Text style={styles.boutiqueArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Lien blog */}
        <TouchableOpacity style={styles.blogBanner} onPress={() => router.push('/blog')}>
          <View>
            <Text style={styles.blogBannerTitre}>Magazine LIVRR</Text>
            <Text style={styles.blogBannerSub}>Tendances, idées cadeaux, lifestyle parisien</Text>
          </View>
          <Text style={styles.blogBannerArrow}>›</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: layout.screenPadding, paddingTop: 60, paddingBottom: spacing.lg,
  },
  logo: { fontSize: 26, fontWeight: '400', color: colors.textPrimary, letterSpacing: 8 },
  tagline: { fontSize: 12, color: colors.gold, letterSpacing: 2, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  carteBtn: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  carteBtnText: { fontSize: 12, color: colors.textPrimary },
  profileBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: colors.backgroundSoft, alignItems: 'center', justifyContent: 'center',
  },
  profileIcon: { fontSize: 20, color: colors.textPrimary },
  addressBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, marginBottom: spacing.md,
  },
  addressIcon: { fontSize: 16, color: colors.gold, marginRight: spacing.sm },
  addressText: { flex: 1, fontSize: 14, color: colors.textMuted },
  addressArrow: { fontSize: 20, color: colors.textMuted },

  // Promo banner
  promoBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: layout.screenPadding, marginBottom: spacing.md,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border, borderLeftWidth: 3,
  },
  promoBannerLeft: { flex: 1, marginRight: spacing.md },
  promoBannerTitre: { fontSize: 13, fontWeight: '400', marginBottom: 4 },
  promoBannerDetail: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  promoDots: { flexDirection: 'row', gap: 4 },
  promoDot: { width: 5, height: 5, borderRadius: radius.full, backgroundColor: colors.border },
  promoDotActif: { backgroundColor: colors.gold },
  promoBannerRight: { alignItems: 'center', gap: spacing.sm },
  promoVoirBtn: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.gold },
  promoVoirBtnText: { fontSize: 11, color: colors.gold },
  promoFermer: { fontSize: 18, color: colors.textMuted },

  // Hero
  heroBanner: {
    marginHorizontal: layout.screenPadding, padding: spacing.xl,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg, marginBottom: spacing.xl,
  },
  heroTitle: { fontSize: 20, fontWeight: '400', color: colors.gold, marginBottom: spacing.sm, letterSpacing: 0.5 },
  heroSub: { fontSize: 13, color: colors.textLight, opacity: 0.7, lineHeight: 20, marginBottom: spacing.lg },
  heroBtn: { alignSelf: 'flex-start', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.gold },
  heroBtnText: { fontSize: 13, color: colors.gold },

  // Accès rapide
  accesRapideRow: { paddingLeft: layout.screenPadding, marginBottom: spacing.xl },
  accesRapideCard: {
    width: 72, alignItems: 'center', padding: spacing.sm,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, marginRight: spacing.sm, gap: 4,
  },
  accesRapideIcon: { fontSize: 18, color: colors.gold },
  accesRapideLabel: { fontSize: 10, color: colors.textPrimary, textAlign: 'center' },

  // Sections
  section: { marginBottom: spacing.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
    paddingHorizontal: layout.screenPadding, marginBottom: spacing.lg,
  },
  sectionTitle: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3 },
  sectionTitlePadded: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3, paddingHorizontal: layout.screenPadding, marginBottom: spacing.md },
  sectionSub: { fontSize: 12, color: colors.textMuted },
  voirTout: { fontSize: 13, color: colors.gold },

  // Catégories
  categoriesRow: { paddingLeft: layout.screenPadding },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.xs,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.full,
    marginRight: spacing.sm, borderWidth: 0.5, borderColor: colors.border,
  },
  categoryIcon: { fontSize: 12, color: colors.gold },
  categoryText: { fontSize: 13, color: colors.textPrimary, letterSpacing: 0.3 },

  // Collections
  collectionCard: {
    width: 160, height: 140, borderRadius: radius.lg,
    marginRight: spacing.md, padding: spacing.lg,
    justifyContent: 'space-between',
  },
  collectionBoutique: { fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: 0.5 },
  collectionTitre: { fontSize: 16, fontWeight: '400', color: colors.textLight, letterSpacing: 0.3 },
  collectionSous: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  collectionCta: { fontSize: 12, color: colors.gold },

  // Nouveautés
  nouveauteCard: {
    width: 140, marginRight: spacing.md,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden',
  },
  nouveauteImage: { height: 160, backgroundColor: colors.backgroundSoft, justifyContent: 'flex-end', padding: spacing.sm },
  nouveauteTag: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  nouveauteTagText: { fontSize: 10, fontWeight: '400' },
  nouveauteInfo: { padding: spacing.sm },
  nouveauteBoutique: { fontSize: 10, color: colors.gold, marginBottom: 2, letterSpacing: 0.3 },
  nouveauteNom: { fontSize: 12, color: colors.textPrimary, marginBottom: 2, lineHeight: 17 },
  nouveautePrix: { fontSize: 13, fontWeight: '400', color: colors.textPrimary },

  // Recommandations
  recoCard: { width: 140, marginRight: spacing.md, borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden' },
  recoImage: { height: 160, backgroundColor: colors.backgroundSoft },
  recoBoutique: { fontSize: 10, color: colors.gold, padding: spacing.sm, paddingBottom: 2, letterSpacing: 0.5 },
  recoNom: { fontSize: 13, color: colors.textPrimary, paddingHorizontal: spacing.sm, marginBottom: 2 },
  recoPrix: { fontSize: 13, color: colors.textPrimary, padding: spacing.sm, paddingTop: 2 },

  // Boutiques
  boutiqueCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: layout.screenPadding, marginBottom: spacing.md,
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden',
    ...shadows.soft,
  },
  boutiqueImage: { width: 90, height: 90, backgroundColor: colors.backgroundSoft },
  boutiqueInfo: { flex: 1, padding: spacing.md },
  boutiqueName: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, marginBottom: 4 },
  boutiqueDetails: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  boutiqueBadge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, backgroundColor: '#E8F5E9', borderRadius: radius.sm },
  boutiqueBadgeText: { fontSize: 11, color: colors.success, fontWeight: '400' },
  boutiqueArrow: { fontSize: 24, color: colors.textMuted, paddingRight: spacing.md },

  // Blog banner
  blogBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: layout.screenPadding, marginBottom: spacing.xl,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
  },
  blogBannerTitre: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  blogBannerSub: { fontSize: 12, color: colors.textSecondary },
  blogBannerArrow: { fontSize: 22, color: colors.gold },
});