import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const historique = [
  { id: '1', label: 'Commande #LVR-2048', date: 'Il y a 2 jours', points: +120, type: 'gain' },
  { id: '2', label: 'Réduction appliquée', date: 'Il y a 5 jours', points: -200, type: 'utilise' },
  { id: '3', label: 'Commande #LVR-2031', date: 'Il y a 1 sem.', points: +85, type: 'gain' },
  { id: '4', label: 'Bonus parrainage', date: 'Il y a 2 sem.', points: +500, type: 'bonus' },
  { id: '5', label: 'Commande #LVR-1998', date: 'Il y a 3 sem.', points: +245, type: 'gain' },
];

const recompenses = [
  { id: '1', label: 'Livraison offerte', cout: 150, icone: '◎', disponible: true },
  { id: '2', label: '−5 € sur votre commande', cout: 300, icone: '✦', disponible: true },
  { id: '3', label: '−15 € sur votre commande', cout: 750, icone: '◈', disponible: false },
  { id: '4', label: 'Livraison express offerte', cout: 200, icone: '⊕', disponible: true },
  { id: '5', label: 'Accès vente privée', cout: 1000, icone: '§', disponible: false },
];

const paliers = [
  { label: 'Argent', min: 0, max: 499, couleur: '#A0A0A0' },
  { label: 'Or', min: 500, max: 1499, couleur: colors.gold },
  { label: 'Platine', min: 1500, max: 9999, couleur: '#E8E4DE' },
];

const pointsActuels = 750;

export default function Fidelite() {
  const palierActuel = paliers.find(p => pointsActuels >= p.min && pointsActuels <= p.max) || paliers[0];
  const palierSuivant = paliers[paliers.indexOf(palierActuel) + 1];
  const progression = palierSuivant
    ? ((pointsActuels - palierActuel.min) / (palierSuivant.min - palierActuel.min)) * 100
    : 100;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Fidélité</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Carte points */}
        <View style={styles.cartePoints}>
          <View style={styles.carteTop}>
            <View>
              <Text style={styles.carteLabel}>Votre solde</Text>
              <View style={styles.cartePointsRow}>
                <Text style={styles.cartePointsVal}>{pointsActuels.toLocaleString('fr-FR')}</Text>
                <Text style={styles.cartePointsUnit}>pts</Text>
              </View>
            </View>
            <View style={styles.cartePalier}>
              <Text style={[styles.cartePalierLabel, { color: palierActuel.couleur }]}>
                {palierActuel.label}
              </Text>
              <Text style={styles.cartePalierIcon}>✦</Text>
            </View>
          </View>

          {palierSuivant && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progression}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {palierSuivant.min - pointsActuels} pts pour atteindre le niveau {palierSuivant.label}
              </Text>
            </View>
          )}
        </View>

        {/* Comment gagner */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comment gagner des points ?</Text>
          {[
            { icon: '◎', label: '1 € dépensé = 1 point gagné' },
            { icon: '✦', label: 'Bonus ×2 avec LIVRR Premium' },
            { icon: '◈', label: '+500 pts par parrainage réussi' },
            { icon: '⊕', label: '+50 pts en laissant un avis' },
          ].map((item, i) => (
            <View key={i} style={styles.regleRow}>
              <Text style={styles.regleIcon}>{item.icon}</Text>
              <Text style={styles.regleLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Récompenses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Utiliser vos points</Text>
          {recompenses.map((r) => (
            <View key={r.id} style={[styles.recompenseCard, !r.disponible && styles.recompenseCardIndispo]}>
              <View style={styles.recompenseLeft}>
                <View style={[styles.recompenseIcon, !r.disponible && styles.recompenseIconIndispo]}>
                  <Text style={styles.recompenseIconText}>{r.icone}</Text>
                </View>
                <View>
                  <Text style={[styles.recompenseLabel, !r.disponible && styles.recompenseLabelIndispo]}>
                    {r.label}
                  </Text>
                  <Text style={styles.recompenseCout}>{r.cout} pts</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.recompenseBtn, !r.disponible && styles.recompenseBtnIndispo]}
                disabled={!r.disponible || pointsActuels < r.cout}
              >
                <Text style={[styles.recompenseBtnText, !r.disponible && styles.recompenseBtnTextIndispo]}>
                  {!r.disponible || pointsActuels < r.cout ? 'Insuffisant' : 'Utiliser'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Historique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique</Text>
          {historique.map((h) => (
            <View key={h.id} style={styles.historiqueRow}>
              <View style={styles.historiqueLeft}>
                <Text style={styles.historiqueLabel}>{h.label}</Text>
                <Text style={styles.historiqueDate}>{h.date}</Text>
              </View>
              <Text style={[
                styles.historiquePoints,
                h.type === 'gain' && styles.historiqueGain,
                h.type === 'bonus' && styles.historiqueBonus,
                h.type === 'utilise' && styles.historiqueUtilise,
              ]}>
                {h.points > 0 ? `+${h.points}` : h.points} pts
              </Text>
            </View>
          ))}
        </View>

        {/* CTA Premium */}
        <TouchableOpacity style={styles.premiumBanner} onPress={() => router.push('/premium')}>
          <View>
            <Text style={styles.premiumBannerTitle}>Doublez vos points avec Premium</Text>
            <Text style={styles.premiumBannerSub}>Chaque commande rapporte 2× plus de points</Text>
          </View>
          <Text style={styles.premiumBannerArrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding, paddingTop: 60, paddingBottom: spacing.lg,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.5 },
  cartePoints: {
    margin: layout.screenPadding,
    padding: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.xl,
  },
  carteTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.xl },
  carteLabel: { fontSize: 12, color: colors.textLight, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase', marginBottom: spacing.sm },
  cartePointsRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  cartePointsVal: { fontSize: 42, fontWeight: '400', color: colors.textLight, letterSpacing: -1 },
  cartePointsUnit: { fontSize: 16, color: colors.textLight, opacity: 0.6 },
  cartePalier: { alignItems: 'flex-end' },
  cartePalierLabel: { fontSize: 18, fontWeight: '400', letterSpacing: 1 },
  cartePalierIcon: { fontSize: 12, color: colors.gold, marginTop: 4 },
  progressSection: { gap: spacing.sm },
  progressBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: radius.full, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.gold, borderRadius: radius.full },
  progressText: { fontSize: 12, color: colors.textLight, opacity: 0.6 },
  section: { padding: layout.screenPadding, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  sectionTitle: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3, marginBottom: spacing.lg },
  regleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  regleIcon: { fontSize: 14, color: colors.gold, width: 24, textAlign: 'center' },
  regleLabel: { fontSize: 14, color: colors.textPrimary },
  recompenseCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  recompenseCardIndispo: { opacity: 0.5 },
  recompenseLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  recompenseIcon: {
    width: 40, height: 40, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  recompenseIconIndispo: { borderColor: colors.border },
  recompenseIconText: { fontSize: 14, color: colors.gold },
  recompenseLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  recompenseLabelIndispo: { color: colors.textSecondary },
  recompenseCout: { fontSize: 12, color: colors.textSecondary },
  recompenseBtn: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundDark, borderRadius: radius.sm,
  },
  recompenseBtnIndispo: { backgroundColor: colors.backgroundSoft, borderWidth: 0.5, borderColor: colors.border },
  recompenseBtnText: { fontSize: 12, color: colors.gold },
  recompenseBtnTextIndispo: { color: colors.textMuted },
  historiqueRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: spacing.md, borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  historiqueLeft: { flex: 1 },
  historiqueLabel: { fontSize: 14, color: colors.textPrimary, marginBottom: 2 },
  historiqueDate: { fontSize: 12, color: colors.textMuted },
  historiquePoints: { fontSize: 14, fontWeight: '400' },
  historiqueGain: { color: colors.success },
  historiqueBonus: { color: colors.gold },
  historiqueUtilise: { color: colors.error },
  premiumBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    margin: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.gold,
    marginBottom: spacing.xxxl,
  },
  premiumBannerTitle: { fontSize: 14, fontWeight: '400', color: colors.textLight, marginBottom: 4 },
  premiumBannerSub: { fontSize: 12, color: colors.gold, opacity: 0.8 },
  premiumBannerArrow: { fontSize: 22, color: colors.gold },
});