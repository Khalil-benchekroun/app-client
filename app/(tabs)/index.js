import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, shadows, layout } from '../../constants/theme';

const boutiques = [
  { id: '1', nom: 'Boutique Parisienne', categorie: 'Mode', distance: '800m', delai: '45 min' },
  { id: '2', nom: 'Maison de Mode', categorie: 'Accessoires', distance: '1,2km', delai: '55 min' },
  { id: '3', nom: 'Le Concept Store', categorie: 'Lifestyle', distance: '600m', delai: '35 min' },
];

const offresPromo = [
  {
    id: '1',
    titre: '−10% chez Boutique Parisienne',
    detail: 'Valable jusqu\'au 30 avril · Code : BP10',
    couleur: colors.gold,
    boutiqueId: '1',
  },
  {
    id: '2',
    titre: 'Livraison offerte dès 80 €',
    detail: 'Sur toutes les boutiques partenaires ce week-end',
    couleur: '#2D6A4F',
    boutiqueId: null,
  },
  {
    id: '3',
    titre: 'Vente privée — Maison Dorée',
    detail: 'Membres Premium uniquement · Jusqu\'à −30%',
    couleur: '#A07840',
    boutiqueId: '2',
  },
];

const recommandations = [
  { id: '1', nom: 'Robe en soie', boutique: 'Boutique Parisienne', prix: '245,00 €', boutiqueId: '1' },
  { id: '2', nom: 'Sac cuir naturel', boutique: 'Maison Dorée', prix: '380,00 €', boutiqueId: '2' },
  { id: '3', nom: 'Foulard en soie', boutique: 'Boutique Parisienne', prix: '95,00 €', boutiqueId: '1' },
  { id: '4', nom: 'Parfum signature', boutique: 'Élégance & Co.', prix: '120,00 €', boutiqueId: '3' },
];

export default function Accueil() {
  const [promoVisible, setPromoVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const promoActuelle = offresPromo[promoIndex];

  return (
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

      {/* Bannière offre promo */}
      {promoVisible && (
        <View style={[styles.promoBanner, { borderLeftColor: promoActuelle.couleur }]}>
          <View style={styles.promoBannerLeft}>
            <Text style={[styles.promoBannerTitre, { color: promoActuelle.couleur }]}>
              {promoActuelle.titre}
            </Text>
            <Text style={styles.promoBannerDetail}>{promoActuelle.detail}</Text>
            <View style={styles.promoBannerDots}>
              {offresPromo.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setPromoIndex(i)}>
                  <View style={[styles.promoDot, i === promoIndex && styles.promoDotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.promoBannerRight}>
            {promoActuelle.boutiqueId ? (
              <TouchableOpacity
                style={styles.promoVoirBtn}
                onPress={() => router.push(`/boutique/${promoActuelle.boutiqueId}`)}
              >
                <Text style={styles.promoVoirBtnText}>Voir ›</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => setPromoVisible(false)}>
              <Text style={styles.promoFermer}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Bannière principale */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>Livraison en moins d'une heure</Text>
        <Text style={styles.heroSub}>Les meilleures boutiques parisiennes, livrées chez vous</Text>
        <TouchableOpacity style={styles.heroBtn} onPress={() => router.push('/carte')}>
          <Text style={styles.heroBtnText}>Voir la carte ›</Text>
        </TouchableOpacity>
      </View>

      {/* Accès rapide : Premium · Fidélité · Jeux */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.accesRapideRow}>
        {[
          { label: 'Premium', icon: '✦', route: '/premium', couleur: colors.gold },
          { label: 'Fidélité', icon: '◈', route: '/fidelite', couleur: '#A0A0A0' },
          { label: 'Jeux', icon: '◉', route: '/jeux', couleur: colors.success },
          { label: 'Messages', icon: '§', route: '/messages', couleur: colors.info },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.accesRapideCard}
            onPress={() => router.push(item.route)}
          >
            <Text style={[styles.accesRapideIcon, { color: item.couleur }]}>{item.icon}</Text>
            <Text style={styles.accesRapideLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Catégories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitlePadded}>Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {['Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle'].map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryChip}>
              <Text style={styles.categoryText}>{cat}</Text>
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
          {recommandations.map((produit) => (
            <TouchableOpacity
              key={produit.id}
              style={styles.recoCard}
              onPress={() => router.push(`/boutique/${produit.boutiqueId}`)}
            >
              <View style={styles.recoImage} />
              <Text style={styles.recoBoutique}>{produit.boutique}</Text>
              <Text style={styles.recoNom} numberOfLines={1}>{produit.nom}</Text>
              <Text style={styles.recoPrix}>{produit.prix}</Text>
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
        {boutiques.map((boutique) => (
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

    </ScrollView>
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
  promoBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: layout.screenPadding, marginBottom: spacing.md,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    borderLeftWidth: 3,
  },
  promoBannerLeft: { flex: 1, marginRight: spacing.md },
  promoBannerTitre: { fontSize: 13, fontWeight: '400', marginBottom: 4, letterSpacing: 0.2 },
  promoBannerDetail: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginBottom: spacing.sm },
  promoBannerDots: { flexDirection: 'row', gap: 4 },
  promoDot: { width: 5, height: 5, borderRadius: radius.full, backgroundColor: colors.border },
  promoDotActive: { backgroundColor: colors.gold },
  promoBannerRight: { alignItems: 'center', gap: spacing.sm },
  promoVoirBtn: {
    paddingHorizontal: spacing.md, paddingVertical: 4,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.gold,
  },
  promoVoirBtnText: { fontSize: 11, color: colors.gold },
  promoFermer: { fontSize: 18, color: colors.textMuted, lineHeight: 20 },
  heroBanner: {
    marginHorizontal: layout.screenPadding, padding: spacing.xl,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg, marginBottom: spacing.xl,
  },
  heroTitle: { fontSize: 20, fontWeight: '400', color: colors.gold, marginBottom: spacing.sm, letterSpacing: 0.5 },
  heroSub: { fontSize: 13, color: colors.textLight, opacity: 0.7, lineHeight: 20, marginBottom: spacing.lg },
  heroBtn: {
    alignSelf: 'flex-start', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.gold,
  },
  heroBtnText: { fontSize: 13, color: colors.gold },
  accesRapideRow: { paddingLeft: layout.screenPadding, marginBottom: spacing.xl },
  accesRapideCard: {
    width: 80, alignItems: 'center', padding: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, marginRight: spacing.sm,
    gap: 6,
  },
  accesRapideIcon: { fontSize: 20 },
  accesRapideLabel: { fontSize: 11, color: colors.textPrimary, textAlign: 'center' },
  section: { marginBottom: spacing.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline',
    paddingHorizontal: layout.screenPadding, marginBottom: spacing.lg,
  },
  sectionTitle: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3 },
  sectionTitlePadded: {
    fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3,
    paddingHorizontal: layout.screenPadding, marginBottom: spacing.md,
  },
  sectionSub: { fontSize: 12, color: colors.textMuted },
  voirTout: { fontSize: 13, color: colors.gold },
  categoriesRow: { paddingLeft: layout.screenPadding },
  categoryChip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.full,
    marginRight: spacing.sm, borderWidth: 0.5, borderColor: colors.border,
  },
  categoryText: { fontSize: 13, color: colors.textPrimary, letterSpacing: 0.3 },
  recoCard: {
    width: 140, marginRight: spacing.md,
    borderRadius: radius.lg, overflow: 'hidden',
    borderWidth: 0.5, borderColor: colors.border,
  },
  recoImage: { height: 160, backgroundColor: colors.backgroundSoft },
  recoBoutique: { fontSize: 10, color: colors.gold, padding: spacing.sm, paddingBottom: 2, letterSpacing: 0.5 },
  recoNom: { fontSize: 13, color: colors.textPrimary, paddingHorizontal: spacing.sm, marginBottom: 2 },
  recoPrix: { fontSize: 13, color: colors.textPrimary, padding: spacing.sm, paddingTop: 2 },
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
  boutiqueBadge: {
    alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2,
    backgroundColor: '#E8F5E9', borderRadius: radius.sm,
  },
  boutiqueBadgeText: { fontSize: 11, color: colors.success, fontWeight: '400' },
  boutiqueArrow: { fontSize: 24, color: colors.textMuted, paddingRight: spacing.md },
});