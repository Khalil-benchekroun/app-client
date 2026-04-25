import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const motifs = [
  { id: '1', label: 'Article non conforme à la description' },
  { id: '2', label: 'Mauvaise taille / taille incorrecte' },
  { id: '3', label: 'Article endommagé à la réception' },
  { id: '4', label: 'Article différent de celui commandé' },
  { id: '5', label: 'Changement d\'avis' },
  { id: '6', label: 'Autre motif' },
];

function genererNumBon() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'RET-';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function Retour() {
  const [motifSelectionne, setMotifSelectionne] = useState('1');
  const [confirme, setConfirme] = useState(false);
  const [numBon] = useState(() => genererNumBon());
  const dateRetour = new Date();
  const dateLimit = new Date(dateRetour);
  dateLimit.setDate(dateLimit.getDate() + 7);

  const formatDate = (d) =>
    d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  if (confirme) {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Bon de retour</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Confirmation */}
          <View style={styles.confirmationBadge}>
            <Text style={styles.confirmationIcon}>✓</Text>
            <Text style={styles.confirmationTitre}>Retour confirmé</Text>
            <Text style={styles.confirmationSub}>
              Votre bon de retour a été généré. Conservez ce numéro.
            </Text>
          </View>

          {/* Bon de retour */}
          <View style={styles.bonRetour}>
            <View style={styles.bonHeader}>
              <Text style={styles.bonLogo}>LIVRR</Text>
              <Text style={styles.bonTitre}>BON DE RETOUR</Text>
            </View>

            <View style={styles.bonSeparateur} />

            <View style={styles.bonNumRow}>
              <Text style={styles.bonNumLabel}>N° BON</Text>
              <Text style={styles.bonNum}>{numBon}</Text>
            </View>

            <View style={styles.bonSeparateur} />

            <View style={styles.bonLignes}>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Article</Text>
                <Text style={styles.bonLigneVal}>Robe en soie · Taille M</Text>
              </View>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Commande</Text>
                <Text style={styles.bonLigneVal}>#LVR-2048</Text>
              </View>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Motif</Text>
                <Text style={styles.bonLigneVal} numberOfLines={2}>
                  {motifs.find(m => m.id === motifSelectionne)?.label}
                </Text>
              </View>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Date retour</Text>
                <Text style={styles.bonLigneVal}>{formatDate(dateRetour)}</Text>
              </View>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Retour avant</Text>
                <Text style={[styles.bonLigneVal, { color: colors.gold }]}>{formatDate(dateLimit)}</Text>
              </View>
              <View style={styles.bonLigne}>
                <Text style={styles.bonLigneLabel}>Remboursement</Text>
                <Text style={styles.bonLigneVal}>245,00 € · 3–5 jours ouvrés</Text>
              </View>
            </View>

            <View style={styles.bonSeparateur} />

            <View style={styles.bonQR}>
              <View style={styles.bonQRPlaceholder}>
                <Text style={styles.bonQRText}>◉</Text>
              </View>
              <Text style={styles.bonQRLabel}>Présentez ce bon au livreur</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitre}>Instructions de retour</Text>
            {[
              { n: '1', texte: 'Remballez l\'article dans son emballage d\'origine ou dans un colis sécurisé.' },
              { n: '2', texte: 'Joignez ce bon de retour à l\'intérieur du colis.' },
              { n: '3', texte: 'Attendez le livreur LIVRR qui viendra collecter votre colis à domicile.' },
              { n: '4', texte: 'Le remboursement sera effectué dès réception et vérification de l\'article.' },
            ].map((step) => (
              <View key={step.n} style={styles.instructionRow}>
                <View style={styles.instructionNum}>
                  <Text style={styles.instructionNumText}>{step.n}</Text>
                </View>
                <Text style={styles.instructionTexte}>{step.texte}</Text>
              </View>
            ))}
          </View>

          {/* Collecte prévue */}
          <View style={styles.collecteCard}>
            <Text style={styles.collecteIcon}>◎</Text>
            <View style={styles.collecteBody}>
              <Text style={styles.collecteTitre}>Collecte prévue</Text>
              <Text style={styles.collecteDate}>Demain entre 10h00 et 13h00</Text>
              <Text style={styles.collecteAdresse}>12 Rue du Faubourg Saint-Honoré, 75008 Paris</Text>
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.fermerBtn} onPress={() => router.back()}>
            <Text style={styles.fermerBtnText}>Retour à mes commandes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
              style={[styles.motifCard, motifSelectionne === motif.id && styles.motifSelected]}
              onPress={() => setMotifSelectionne(motif.id)}
            >
              <View style={[styles.motifDot, motifSelectionne === motif.id && styles.motifDotSelected]} />
              <Text style={[styles.motifLabel, motifSelectionne === motif.id && styles.motifLabelSelected]}>
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
              <Text style={styles.methodeSub}>Un livreur LIVRR viendra récupérer votre article</Text>
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
            <View style={[styles.remboursementRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.remboursementLabel}>Vers</Text>
              <Text style={styles.remboursementValue}>Visa **** 4242</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bouton confirmer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => setConfirme(true)}
        >
          <Text style={styles.confirmBtnText}>Confirmer et générer le bon</Text>
        </TouchableOpacity>
      </View>
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
  infoCard: {
    margin: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    borderLeftWidth: 3, borderLeftColor: colors.gold,
  },
  infoTitle: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.sm },
  infoText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  section: { padding: layout.screenPadding, borderBottomWidth: 0.5, borderBottomColor: colors.border },
  sectionTitle: { fontSize: 12, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: spacing.md },
  produitCard: {
    flexDirection: 'row', backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden', ...shadows.soft,
  },
  produitImage: { width: 80, height: 90, backgroundColor: colors.border },
  produitInfo: { flex: 1, padding: spacing.md, justifyContent: 'center' },
  produitNom: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, marginBottom: 4 },
  produitVariante: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  produitPrix: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  motifCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm, backgroundColor: colors.backgroundSoft, gap: spacing.md,
  },
  motifSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  motifDot: { width: 16, height: 16, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border },
  motifDotSelected: { borderColor: colors.gold, backgroundColor: colors.gold },
  motifLabel: { fontSize: 14, color: colors.textPrimary, flex: 1 },
  motifLabelSelected: { color: colors.textPrimary },
  methodeCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft, gap: spacing.md,
  },
  methodeSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  methodeIcon: { fontSize: 20, color: colors.gold },
  methodeInfo: { flex: 1 },
  methodeLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  methodeSub: { fontSize: 12, color: colors.textSecondary },
  selectedDot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.gold },
  remboursementCard: {
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
  },
  remboursementRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: spacing.sm, borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  remboursementLabel: { fontSize: 14, color: colors.textSecondary },
  remboursementValue: { fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  footer: {
    padding: layout.screenPadding, paddingBottom: 34,
    borderTopWidth: 0.5, borderTopColor: colors.border, backgroundColor: colors.background,
  },
  confirmBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  confirmBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },

  // Bon de retour styles
  confirmationBadge: {
    alignItems: 'center', padding: spacing.xl,
    backgroundColor: '#E8F5E9', margin: layout.screenPadding,
    borderRadius: radius.lg,
  },
  confirmationIcon: { fontSize: 32, color: colors.success, marginBottom: spacing.sm },
  confirmationTitre: { fontSize: 18, fontWeight: '400', color: colors.success, marginBottom: 4 },
  confirmationSub: { fontSize: 13, color: colors.success, opacity: 0.8, textAlign: 'center' },
  bonRetour: {
    marginHorizontal: layout.screenPadding, marginBottom: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.gold,
    overflow: 'hidden',
  },
  bonHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, backgroundColor: colors.backgroundDark,
  },
  bonLogo: { fontSize: 16, color: colors.gold, letterSpacing: 6 },
  bonTitre: { fontSize: 11, color: colors.textLight, opacity: 0.7, letterSpacing: 2 },
  bonSeparateur: { height: 0.5, backgroundColor: colors.border, marginHorizontal: spacing.lg },
  bonNumRow: { padding: spacing.lg, alignItems: 'center' },
  bonNumLabel: { fontSize: 10, color: colors.textMuted, letterSpacing: 2, marginBottom: spacing.sm },
  bonNum: { fontSize: 22, fontWeight: '400', color: colors.textPrimary, letterSpacing: 4 },
  bonLignes: { padding: spacing.lg },
  bonLigne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.md },
  bonLigneLabel: { fontSize: 12, color: colors.textSecondary, flex: 1 },
  bonLigneVal: { fontSize: 13, color: colors.textPrimary, fontWeight: '400', flex: 2, textAlign: 'right' },
  bonQR: { padding: spacing.xl, alignItems: 'center', gap: spacing.md },
  bonQRPlaceholder: {
    width: 80, height: 80, borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  bonQRText: { fontSize: 32, color: colors.gold },
  bonQRLabel: { fontSize: 12, color: colors.textSecondary, textAlign: 'center' },
  instructionsSection: { marginHorizontal: layout.screenPadding, marginBottom: spacing.lg },
  instructionsTitre: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.lg, letterSpacing: 0.3 },
  instructionRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md, marginBottom: spacing.md },
  instructionNum: {
    width: 28, height: 28, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  instructionNumText: { fontSize: 13, color: colors.gold },
  instructionTexte: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 20, paddingTop: 4 },
  collecteCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
    marginHorizontal: layout.screenPadding, marginBottom: spacing.xxxl,
    padding: spacing.lg, backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
  },
  collecteIcon: { fontSize: 18, color: colors.gold, marginTop: 2 },
  collecteBody: { flex: 1 },
  collecteTitre: { fontSize: 12, color: colors.textLight, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  collecteDate: { fontSize: 15, fontWeight: '400', color: colors.gold, marginBottom: 4 },
  collecteAdresse: { fontSize: 12, color: colors.textLight, opacity: 0.6, lineHeight: 18 },
  fermerBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  fermerBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
});