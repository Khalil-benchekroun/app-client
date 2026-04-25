import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const avantages = [
  { icon: '◎', titre: 'Livraison offerte', detail: 'Frais de livraison gratuits sur toutes vos commandes, sans minimum d\'achat.' },
  { icon: '✦', titre: 'Réductions exclusives', detail: '−10% permanent sur l\'ensemble du catalogue des boutiques partenaires.' },
  { icon: '◉', titre: 'Accès prioritaire', detail: 'Commandez en avant-première lors des ventes privées et nouvelles collections.' },
  { icon: '◈', titre: 'Événements VIP', detail: 'Invitations aux pop-ups, dégustations et soirées boutique en avant-première.' },
  { icon: '§', titre: 'SAV dédié', detail: 'Ligne premium avec temps de réponse garanti sous 30 minutes, 7j/7.' },
  { icon: '⊕', titre: 'Points doublés', detail: 'Vos points de fidélité sont multipliés par 2 sur chaque commande.' },
];

const plans = [
  {
    id: 'mensuel',
    label: 'Mensuel',
    prix: '9,90 €',
    periode: '/ mois',
    detail: 'Sans engagement',
    recommande: false,
  },
  {
    id: 'annuel',
    label: 'Annuel',
    prix: '6,90 €',
    periode: '/ mois',
    detail: 'Soit 82,80 € / an — Économisez 36 €',
    recommande: true,
  },
];

export default function Premium() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.hero}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>PREMIUM</Text>
          </View>
          <Text style={styles.heroTitle}>L'élégance{'\n'}sans limites</Text>
          <Text style={styles.heroSub}>
            Livraison gratuite, réductions exclusives et accès VIP aux boutiques parisiennes.
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choisissez votre plan</Text>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, plan.recommande && styles.planCardRecommande]}
            >
              {plan.recommande && (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>Le plus populaire</Text>
                </View>
              )}
              <View style={styles.planTop}>
                <View>
                  <Text style={[styles.planLabel, plan.recommande && styles.planLabelRecommande]}>
                    {plan.label}
                  </Text>
                  <Text style={[styles.planDetail, plan.recommande && styles.planDetailRecommande]}>
                    {plan.detail}
                  </Text>
                </View>
                <View style={styles.planPrixBlock}>
                  <Text style={[styles.planPrix, plan.recommande && styles.planPrixRecommande]}>
                    {plan.prix}
                  </Text>
                  <Text style={[styles.planPeriode, plan.recommande && styles.planPeriodeRecommande]}>
                    {plan.periode}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Avantages */}
        <View style={styles.avantagesSection}>
          <Text style={styles.sectionTitle}>Tout ce qui est inclus</Text>
          {avantages.map((a, i) => (
            <View key={i} style={styles.avantageRow}>
              <View style={styles.avantageIcon}>
                <Text style={styles.avantageIconText}>{a.icon}</Text>
              </View>
              <View style={styles.avantageBody}>
                <Text style={styles.avantageTitre}>{a.titre}</Text>
                <Text style={styles.avantageDetail}>{a.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Comparaison */}
        <View style={styles.comparaisonSection}>
          <Text style={styles.sectionTitle}>Free vs Premium</Text>
          <View style={styles.comparaisonTable}>
            <View style={styles.comparaisonHeader}>
              <Text style={[styles.comparaisonCol, { flex: 2 }]} />
              <Text style={styles.comparaisonColHeader}>Free</Text>
              <Text style={[styles.comparaisonColHeader, styles.comparaisonColPremium]}>Premium</Text>
            </View>
            {[
              ['Livraison express', '9,90 €', 'Offerte'],
              ['Réductions boutiques', '—', '−10%'],
              ['Points fidélité', '×1', '×2'],
              ['Accès ventes privées', '✗', '✓'],
              ['SAV prioritaire', '—', '< 30 min'],
              ['Événements VIP', '✗', '✓'],
            ].map(([label, free, premium], i) => (
              <View key={i} style={[styles.comparaisonRow, i % 2 === 0 && styles.comparaisonRowAlt]}>
                <Text style={[styles.comparaisonCol, { flex: 2, color: colors.textPrimary }]}>{label}</Text>
                <Text style={[styles.comparaisonCol, { color: colors.textMuted }]}>{free}</Text>
                <Text style={[styles.comparaisonCol, styles.comparaisonColPremium, { color: colors.gold }]}>{premium}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Note */}
        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>◎</Text>
          <Text style={styles.noteText}>
            Sans engagement pour l'offre mensuelle. Résiliable à tout moment depuis votre profil.
          </Text>
        </View>

      </ScrollView>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.ctaBtn}>
          <Text style={styles.ctaBtnText}>Démarrer mon essai gratuit</Text>
          <Text style={styles.ctaBtnSub}>7 jours offerts, sans carte bancaire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.backgroundDark,
    padding: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.xxxl,
  },
  backBtn: {
    width: 40, height: 40,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  backIcon: { fontSize: 24, color: colors.textLight },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md, paddingVertical: 4,
    borderWidth: 1, borderColor: colors.gold,
    borderRadius: radius.sm,
    marginBottom: spacing.lg,
  },
  heroBadgeText: {
    fontSize: 11, color: colors.gold, letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 36, fontWeight: '400', color: colors.textLight,
    letterSpacing: 0.5, lineHeight: 44,
    marginBottom: spacing.md,
  },
  heroSub: {
    fontSize: 14, color: colors.textLight, opacity: 0.7, lineHeight: 22,
  },
  plansSection: { padding: layout.screenPadding, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  sectionTitle: {
    fontSize: 17, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, marginBottom: spacing.lg,
  },
  planCard: {
    padding: spacing.lg, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    marginBottom: spacing.md,
  },
  planCardRecommande: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.gold,
  },
  planBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    backgroundColor: colors.gold, borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  planBadgeText: { fontSize: 10, color: colors.backgroundDark, letterSpacing: 0.5 },
  planTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planLabel: { fontSize: 16, fontWeight: '400', color: colors.textPrimary, marginBottom: 4 },
  planLabelRecommande: { color: colors.textLight },
  planDetail: { fontSize: 12, color: colors.textSecondary },
  planDetailRecommande: { color: colors.gold, opacity: 0.8 },
  planPrixBlock: { alignItems: 'flex-end' },
  planPrix: { fontSize: 22, fontWeight: '400', color: colors.textPrimary },
  planPrixRecommande: { color: colors.gold },
  planPeriode: { fontSize: 12, color: colors.textSecondary },
  planPeriodeRecommande: { color: colors.textLight, opacity: 0.6 },
  avantagesSection: { padding: layout.screenPadding, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  avantageRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: spacing.md, marginBottom: spacing.lg,
  },
  avantageIcon: {
    width: 40, height: 40, borderRadius: radius.full,
    borderWidth: 0.5, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  avantageIconText: { fontSize: 14, color: colors.gold },
  avantageBody: { flex: 1 },
  avantageTitre: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 4 },
  avantageDetail: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  comparaisonSection: { padding: layout.screenPadding, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  comparaisonTable: {
    borderRadius: radius.lg, overflow: 'hidden',
    borderWidth: 0.5, borderColor: colors.border,
  },
  comparaisonHeader: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  comparaisonColHeader: {
    flex: 1, fontSize: 12, fontWeight: '400',
    color: colors.textSecondary, textAlign: 'center', letterSpacing: 0.5,
  },
  comparaisonColPremium: { color: colors.gold },
  comparaisonRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  comparaisonRowAlt: { backgroundColor: colors.backgroundSoft },
  comparaisonCol: { flex: 1, fontSize: 13, color: colors.textPrimary, textAlign: 'center' },
  noteCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  noteIcon: { fontSize: 13, color: colors.gold, marginTop: 1 },
  noteText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  footer: {
    padding: layout.screenPadding, paddingBottom: 34,
    borderTopWidth: 0.5, borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  ctaBtn: {
    backgroundColor: colors.backgroundDark,
    padding: spacing.lg, borderRadius: radius.md,
    alignItems: 'center', gap: 4,
  },
  ctaBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
  ctaBtnSub: { fontSize: 12, color: colors.textLight, opacity: 0.5 },
});