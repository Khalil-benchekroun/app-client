import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const etapes = [
  { id: '1', label: 'Commande acceptée', heure: '14:32', done: true },
  { id: '2', label: 'En préparation', heure: '14:38', done: true },
  { id: '3', label: 'Prise en charge', heure: '14:45', done: true },
  { id: '4', label: 'En livraison', heure: '14:52', done: false, active: true },
  { id: '5', label: 'Livrée', heure: '', done: false },
];

export default function Suivi() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Suivi commande</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Carte commande */}
        <View style={styles.commandeCard}>
          <View style={styles.commandeHeader}>
            <Text style={styles.commandeNum}>#LVR-2024-0042</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>En livraison</Text>
            </View>
          </View>
          <Text style={styles.boutiqueName}>Boutique Parisienne</Text>
          <Text style={styles.commandeDetails}>2 articles · 344,90 €</Text>
        </View>

        {/* Délai estimé */}
        <View style={styles.delaiCard}>
          <Text style={styles.delaiLabel}>Arrivée estimée</Text>
          <Text style={styles.delaiValue}>15:20</Text>
          <Text style={styles.delaiSub}>Dans environ 8 minutes</Text>
        </View>

        {/* Carte livreur */}
        <View style={styles.livreurCard}>
          <View style={styles.livreurAvatar}>
            <Text style={styles.livreurAvatarText}>M</Text>
          </View>
          <View style={styles.livreurInfo}>
            <Text style={styles.livreurNom}>Mohammed</Text>
            <Text style={styles.livreurSub}>Votre livreur · ✦ 4,9</Text>
          </View>
          <TouchableOpacity style={styles.contactBtn}>
            <Text style={styles.contactBtnText}>◎ Contacter</Text>
          </TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Étapes de livraison</Text>
          {etapes.map((etape, index) => (
            <View key={etape.id} style={styles.etapeRow}>
              <View style={styles.etapeLeft}>
                <View style={[
                  styles.etapeDot,
                  etape.done && styles.etapeDotDone,
                  etape.active && styles.etapeDotActive,
                ]} />
                {index < etapes.length - 1 && (
                  <View style={[styles.etapeLine, etape.done && styles.etapeLineDone]} />
                )}
              </View>
              <View style={styles.etapeInfo}>
                <Text style={[
                  styles.etapeLabel,
                  etape.active && styles.etapeLabelActive,
                  !etape.done && !etape.active && styles.etapeLabelFuture,
                ]}>
                  {etape.label}
                </Text>
                {etape.heure ? (
                  <Text style={styles.etapeHeure}>{etape.heure}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        {/* Adresse livraison */}
        <View style={styles.adresseSection}>
          <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          <View style={styles.adresseCard}>
            <Text style={styles.adresseIcon}>◎</Text>
            <Text style={styles.adresseText}>12 Rue du Faubourg Saint-Honoré, 75008 Paris</Text>
          </View>
        </View>

        {/* Bouton chat SAV */}
        <View style={styles.savSection}>
          <TouchableOpacity style={styles.savBtn} onPress={() => router.push('/chat')}>
            <Text style={styles.savBtnText}>◈ Contacter le SAV</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  commandeCard: {
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  commandeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  commandeNum: {
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.sm,
  },
  statusBadgeText: {
    fontSize: 11,
    color: colors.gold,
    fontWeight: '400',
  },
  boutiqueName: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  commandeDetails: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  delaiCard: {
    marginHorizontal: layout.screenPadding,
    padding: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  delaiLabel: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.6,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  delaiValue: {
    fontSize: 48,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 2,
  },
  delaiSub: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.5,
    marginTop: spacing.sm,
  },
  livreurCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    ...shadows.soft,
  },
  livreurAvatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  livreurAvatarText: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.gold,
  },
  livreurInfo: {
    flex: 1,
  },
  livreurNom: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  livreurSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  contactBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  contactBtnText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  timelineSection: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.lg,
  },
  etapeRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  etapeLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 20,
  },
  etapeDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    borderWidth: 2,
    borderColor: colors.border,
  },
  etapeDotDone: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  etapeDotActive: {
    backgroundColor: colors.background,
    borderColor: colors.gold,
    borderWidth: 3,
  },
  etapeLine: {
    width: 1,
    flex: 1,
    minHeight: 32,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  etapeLineDone: {
    backgroundColor: colors.gold,
  },
  etapeInfo: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  etapeLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  etapeLabelActive: {
    color: colors.gold,
    fontWeight: '400',
  },
  etapeLabelFuture: {
    color: colors.textMuted,
  },
  etapeHeure: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  adresseSection: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  adresseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  adresseIcon: {
    fontSize: 16,
    color: colors.gold,
  },
  adresseText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  savSection: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  savBtn: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  savBtnText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});