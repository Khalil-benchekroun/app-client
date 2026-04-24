import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const motifs = [
  { id: '1', label: 'Article non conforme à la description' },
  { id: '2', label: 'Mauvaise taille / taille incorrecte' },
  { id: '3', label: 'Article endommagé à la réception' },
  { id: '4', label: 'Article différent de celui commandé' },
  { id: '5', label: 'Changement d\'avis' },
  { id: '6', label: 'Autre motif' },
];

export default function Retour() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Retour produit</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Info retour */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Politique de retour</Text>
          <Text style={styles.infoText}>
            Vous disposez de 14 jours à compter de la réception pour retourner votre article.
            Le remboursement sera effectué sous 3 à 5 jours ouvrés.
          </Text>
        </View>

        {/* Produit concerné */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Article concerné</Text>
          <View style={styles.produitCard}>
            <View style={styles.produitImage} />
            <View style={styles.produitInfo}>
              <Text style={styles.produitNom}>Robe en soie</Text>
              <Text style={styles.produitVariante}>Taille M · Noir</Text>
              <Text style={styles.produitPrix}>245,00 €</Text>
            </View>
          </View>
        </View>

        {/* Motif */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motif du retour</Text>
          {motifs.map((motif) => (
            <TouchableOpacity
              key={motif.id}
              style={[styles.motifCard, motif.id === '1' && styles.motifSelected]}
            >
              <View style={[styles.motifDot, motif.id === '1' && styles.motifDotSelected]} />
              <Text style={[styles.motifLabel, motif.id === '1' && styles.motifLabelSelected]}>
                {motif.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Méthode retour */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de retour</Text>
          <View style={[styles.methodeCard, styles.methodeSelected]}>
            <Text style={styles.methodeIcon}>◎</Text>
            <View style={styles.methodeInfo}>
              <Text style={styles.methodeLabel}>Collecte à domicile</Text>
              <Text style={styles.methodeSub}>Un livreur viendra récupérer votre article</Text>
            </View>
            <View style={styles.selectedDot} />
          </View>
        </View>

        {/* Remboursement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Remboursement</Text>
          <View style={styles.remboursementCard}>
            <View style={styles.remboursementRow}>
              <Text style={styles.remboursementLabel}>Montant</Text>
              <Text style={styles.remboursementValue}>245,00 €</Text>
            </View>
            <View style={styles.remboursementRow}>
              <Text style={styles.remboursementLabel}>Délai</Text>
              <Text style={styles.remboursementValue}>3 à 5 jours ouvrés</Text>
            </View>
            <View style={styles.remboursementRow}>
              <Text style={styles.remboursementLabel}>Vers</Text>
              <Text style={styles.remboursementValue}>Visa **** 4242</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bouton confirmer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmBtnText}>Confirmer le retour</Text>
        </TouchableOpacity>
      </View>
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
  infoCard: {
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  produitCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  produitImage: {
    width: 80,
    height: 90,
    backgroundColor: colors.border,
  },
  produitInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  produitNom: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  produitVariante: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  produitPrix: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  motifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundSoft,
    gap: spacing.md,
  },
  motifSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.background,
  },
  motifDot: {
    width: 16,
    height: 16,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  motifDotSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
  motifLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  motifLabelSelected: {
    color: colors.textPrimary,
  },
  methodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    gap: spacing.md,
  },
  methodeSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.background,
  },
  methodeIcon: {
    fontSize: 20,
    color: colors.gold,
  },
  methodeInfo: {
    flex: 1,
  },
  methodeLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  methodeSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
  },
  remboursementCard: {
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  remboursementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  remboursementLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  remboursementValue: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  confirmBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
});