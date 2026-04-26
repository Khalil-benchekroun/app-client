import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { useAuth } from '../../context/AuthContext';

// Données mock — remplacées par Supabase en Phase 4
const commandesMock = [
  { id: '1', boutique: 'Boutique Parisienne', statut: 'En livraison', montant: '344,90 €', date: "Aujourd'hui 14:32", couleur: '#E8F5E9', textColor: '#2D6A4F', progress: 0.75 },
  { id: '2', boutique: 'Maison de Mode', statut: 'Livrée', montant: '89,00 €', date: 'Hier 11:15', couleur: colors.backgroundSoft, textColor: colors.textSecondary, progress: 1 },
  { id: '3', boutique: 'Le Concept Store', statut: 'Livrée', montant: '210,00 €', date: '20 avr. 16:45', couleur: colors.backgroundSoft, textColor: colors.textSecondary, progress: 1 },
];

export default function Commandes() {
  const { headerPadding, bottomPadding } = useHeaderHeight();
  const { isLoggedIn } = useAuth();

  // ── État invité ──────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: headerPadding }]}>
          <Text style={styles.title}>Commandes</Text>
        </View>
        <View style={styles.inviteState}>
          <Text style={styles.inviteIcon}>◉</Text>
          <Text style={styles.inviteTitre}>Suivez vos livraisons</Text>
          <Text style={styles.inviteSub}>
            Connectez-vous pour accéder à vos commandes et suivre vos livraisons en temps réel.
          </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const enCours = commandesMock.filter(c => c.statut === 'En livraison');
  const historique = commandesMock.filter(c => c.statut === 'Livrée');

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}
    >
      <View style={[styles.header, { paddingTop: headerPadding }]}>
        <Text style={styles.title}>Commandes</Text>
        <Text style={styles.subtitle}>Suivez vos livraisons en temps réel</Text>
      </View>

      {/* En cours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>En cours</Text>
        {enCours.length === 0 ? (
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>Aucune commande en cours</Text>
          </View>
        ) : (
          enCours.map((commande) => (
            <TouchableOpacity
              key={commande.id}
              style={styles.card}
              onPress={() => router.push('/commande/suivi')}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.boutiqueName}>{commande.boutique}</Text>
                <View style={[styles.badge, { backgroundColor: commande.couleur }]}>
                  <Text style={[styles.badgeText, { color: commande.textColor }]}>
                    {commande.statut}
                  </Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.date}>{commande.date}</Text>
                <Text style={styles.montant}>{commande.montant}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${commande.progress * 100}%` }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressLabel}>Acceptée</Text>
                <Text style={styles.progressLabel}>Préparation</Text>
                <Text style={[styles.progressLabel, { color: colors.gold }]}>Livraison</Text>
                <Text style={styles.progressLabel}>Livrée</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Historique */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historique</Text>
        {historique.length === 0 ? (
          <View style={styles.emptySection}>
            <Text style={styles.emptySectionText}>Aucune commande passée</Text>
          </View>
        ) : (
          historique.map((commande) => (
            <TouchableOpacity
              key={commande.id}
              style={styles.card}
              onPress={() => router.push('/commande/retour')}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.boutiqueName}>{commande.boutique}</Text>
                <View style={[styles.badge, { backgroundColor: commande.couleur }]}>
                  <Text style={[styles.badgeText, { color: commande.textColor }]}>
                    {commande.statut}
                  </Text>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.date}>{commande.date}</Text>
                <Text style={styles.montant}>{commande.montant}</Text>
              </View>
              <TouchableOpacity style={styles.retourBtn}>
                <Text style={styles.retourBtnText}>Faire un retour</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.lg,
  },
  title: { fontSize: 28, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },

  // Invité
  inviteState: {
    flex: 1, alignItems: 'center',
    paddingHorizontal: layout.screenPadding * 2,
    paddingTop: 80,
  },
  inviteIcon: { fontSize: 48, color: colors.gold, marginBottom: spacing.lg },
  inviteTitre: {
    fontSize: 20, fontWeight: '400', color: colors.textPrimary,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  inviteSub: {
    fontSize: 13, color: colors.textSecondary, textAlign: 'center',
    lineHeight: 20, marginBottom: spacing.xl,
  },
  loginBtn: {
    width: '100%', height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  loginBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },

  // Sections
  section: { marginBottom: spacing.xl },
  sectionTitle: {
    fontSize: 17, fontWeight: '400', color: colors.textPrimary,
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.md, letterSpacing: 0.3,
  },
  emptySection: {
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    alignItems: 'center',
  },
  emptySectionText: { fontSize: 13, color: colors.textMuted },

  // Cards
  card: {
    marginHorizontal: layout.screenPadding, marginBottom: spacing.md,
    padding: spacing.lg, backgroundColor: colors.card,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    ...shadows.soft,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  boutiqueName: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm },
  badgeText: { fontSize: 11, fontWeight: '400' },
  cardFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  date: { fontSize: 12, color: colors.textSecondary },
  montant: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  progressBar: {
    height: 3, backgroundColor: colors.borderLight,
    borderRadius: radius.full, marginBottom: spacing.sm,
  },
  progressFill: { height: 3, backgroundColor: colors.gold, borderRadius: radius.full },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { fontSize: 9, color: colors.textMuted },
  retourBtn: {
    alignSelf: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginTop: spacing.sm,
  },
  retourBtnText: { fontSize: 12, color: colors.textSecondary },
});