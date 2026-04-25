import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const CODES_PROMO_VALIDES = {
  'LIVRR10': { remise: 10, type: 'pourcent', label: '−10%' },
  'BIENVENUE': { remise: 5, type: 'fixe', label: '−5,00 €' },
  'VIP2026': { remise: 15, type: 'pourcent', label: '−15%' },
};

const produitsPanier = [
  { id: '1', nom: 'Robe en soie', taille: 'M', couleur: 'Noir', prix: 245, quantite: 1 },
  { id: '2', nom: 'Foulard en soie', taille: 'Unique', couleur: 'Or', prix: 95, quantite: 2 },
];

const modesLivraison = [
  { id: '1', label: 'Express < 1h', description: 'Livraison en moins d\'une heure', prix: 9.90, disponible: true },
  { id: '2', label: 'Aujourd\'hui J0', description: 'Livraison dans la journée', prix: 6.90, disponible: true },
  { id: '3', label: 'Programmée', description: 'Choisissez votre créneau', prix: 4.90, disponible: true },
];

const creneaux = [
  { id: '1', jour: 'Aujourd\'hui', heure: '18h00 – 20h00' },
  { id: '2', jour: 'Demain', heure: '10h00 – 12h00' },
  { id: '3', jour: 'Demain', heure: '14h00 – 16h00' },
  { id: '4', jour: 'Demain', heure: '18h00 – 20h00' },
  { id: '5', jour: 'Après-demain', heure: '10h00 – 12h00' },
];

export default function Recap() {
  const [modeLivraison, setModeLivraison] = useState('1');
  const [creneauSelectionne, setCreneauSelectionne] = useState(null);
  const [codePromo, setCodePromo] = useState('');
  const [promoAppliquee, setPromoAppliquee] = useState(null);
  const [promoErreur, setPromoErreur] = useState(false);

  const appliquerCode = () => {
    const code = codePromo.trim().toUpperCase();
    if (CODES_PROMO_VALIDES[code]) {
      setPromoAppliquee({ ...CODES_PROMO_VALIDES[code], code });
      setPromoErreur(false);
    } else {
      setPromoErreur(true);
      setPromoAppliquee(null);
    }
  };

  const supprimerPromo = () => {
    setPromoAppliquee(null);
    setCodePromo('');
    setPromoErreur(false);
  };

  const modeSelectionne = modesLivraison.find(m => m.id === modeLivraison);
  const sousTotal = produitsPanier.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const fraisLivraison = modeSelectionne?.prix || 9.90;
  const remise = promoAppliquee
    ? promoAppliquee.type === 'pourcent'
      ? sousTotal * promoAppliquee.remise / 100
      : promoAppliquee.remise
    : 0;
  const total = sousTotal + fraisLivraison - remise;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Récapitulatif</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Produits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mon panier</Text>
          {produitsPanier.map((produit) => (
            <View key={produit.id} style={styles.produitCard}>
              <View style={styles.produitImage} />
              <View style={styles.produitInfo}>
                <Text style={styles.produitNom}>{produit.nom}</Text>
                <Text style={styles.produitVariante}>{produit.taille} · {produit.couleur}</Text>
                <View style={styles.produitFooter}>
                  <View style={styles.quantiteRow}>
                    <TouchableOpacity style={styles.quantiteBtn}>
                      <Text style={styles.quantiteBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantite}>{produit.quantite}</Text>
                    <TouchableOpacity style={styles.quantiteBtn}>
                      <Text style={styles.quantiteBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.produitPrix}>{(produit.prix * produit.quantite).toFixed(2).replace('.', ',')} €</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Adresse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          <TouchableOpacity style={styles.adresseCard} onPress={() => router.push('/adresse')}>
            <View style={styles.adresseInfo}>
              <Text style={styles.adresseNom}>Domicile</Text>
              <Text style={styles.adresseText}>12 Rue du Faubourg Saint-Honoré, 75008 Paris</Text>
            </View>
            <Text style={styles.adresseEdit}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Mode de livraison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de livraison</Text>
          {modesLivraison.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[styles.livraisonCard, modeLivraison === mode.id && styles.livraisonSelected]}
              onPress={() => {
                setModeLivraison(mode.id);
                if (mode.id !== '3') setCreneauSelectionne(null);
              }}
            >
              <View style={styles.livraisonLeft}>
                <View style={[styles.livraisonDot, modeLivraison === mode.id && styles.livraisonDotSelected]} />
                <View>
                  <Text style={[styles.livraisonLabel, modeLivraison === mode.id && styles.livraisonLabelSelected]}>
                    {mode.label}
                  </Text>
                  <Text style={styles.livraisonDescription}>{mode.description}</Text>
                </View>
              </View>
              <Text style={[styles.livraisonPrix, modeLivraison === mode.id && styles.livraisonPrixSelected]}>
                {mode.prix.toFixed(2).replace('.', ',')} €
              </Text>
            </TouchableOpacity>
          ))}

          {/* Créneaux programmés */}
          {modeLivraison === '3' && (
            <View style={styles.creneauxSection}>
              <Text style={styles.creneauxTitle}>Choisissez un créneau</Text>
              {creneaux.map((creneau) => (
                <TouchableOpacity
                  key={creneau.id}
                  style={[styles.creneauCard, creneauSelectionne === creneau.id && styles.creneauCardSelected]}
                  onPress={() => setCreneauSelectionne(creneau.id)}
                >
                  <View style={[styles.creneauDot, creneauSelectionne === creneau.id && styles.creneauDotSelected]} />
                  <View>
                    <Text style={styles.creneauJour}>{creneau.jour}</Text>
                    <Text style={styles.creneauHeure}>{creneau.heure}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Code promo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Code promotionnel</Text>
          {promoAppliquee ? (
            <View style={styles.promoAppliquee}>
              <View style={styles.promoAppliqueeLeft}>
                <Text style={styles.promoAppliqueeCode}>{promoAppliquee.code}</Text>
                <Text style={styles.promoAppliqueeLabel}>{promoAppliquee.label} appliqué</Text>
              </View>
              <TouchableOpacity onPress={supprimerPromo} style={styles.promoSupprBtn}>
                <Text style={styles.promoSupprBtnText}>×</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.promoRow}>
              <TextInput
                style={[styles.promoInput, promoErreur && styles.promoInputErreur]}
                placeholder="Entrer un code promo"
                placeholderTextColor={colors.textMuted}
                value={codePromo}
                onChangeText={(t) => { setCodePromo(t); setPromoErreur(false); }}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={[styles.promoBtn, !codePromo.trim() && styles.promoBtnDisabled]}
                onPress={appliquerCode}
                disabled={!codePromo.trim()}
              >
                <Text style={styles.promoBtnText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          )}
          {promoErreur && (
            <Text style={styles.promoErreur}>Code invalide ou expiré</Text>
          )}
        </View>

        {/* Résumé prix */}
        <View style={styles.section}>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>Sous-total</Text>
            <Text style={styles.prixValue}>{sousTotal.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>Livraison {modeSelectionne?.label}</Text>
            <Text style={styles.prixValue}>{fraisLivraison.toFixed(2).replace('.', ',')} €</Text>
          </View>
          {promoAppliquee && (
            <View style={styles.prixRow}>
              <Text style={[styles.prixLabel, { color: colors.success }]}>Code {promoAppliquee.code}</Text>
              <Text style={[styles.prixValue, { color: colors.success }]}>−{remise.toFixed(2).replace('.', ',')} €</Text>
            </View>
          )}
          <View style={[styles.prixRow, styles.prixTotal]}>
            <Text style={styles.prixTotalLabel}>Total</Text>
            <Text style={styles.prixTotalValue}>{total.toFixed(2).replace('.', ',')} €</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bouton paiement */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payBtn,
            modeLivraison === '3' && !creneauSelectionne && styles.payBtnDisabled
          ]}
          onPress={() => {
            if (modeLivraison === '3' && !creneauSelectionne) return;
            router.push('/commande/paiement');
          }}
        >
          <Text style={styles.payBtnText}>Procéder au paiement</Text>
          <Text style={styles.payBtnPrice}>{total.toFixed(2).replace('.', ',')} €</Text>
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
    letterSpacing: 1,
  },
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.md,
  },
  produitCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  produitImage: {
    width: 80,
    height: 90,
    backgroundColor: colors.border,
  },
  produitInfo: {
    flex: 1,
    padding: spacing.md,
  },
  produitNom: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  produitVariante: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  produitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantiteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantiteBtn: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  quantiteBtnText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  quantite: {
    fontSize: 14,
    color: colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  produitPrix: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  adresseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  adresseInfo: {
    flex: 1,
  },
  adresseNom: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  adresseText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  adresseEdit: {
    fontSize: 13,
    color: colors.gold,
  },
  livraisonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundSoft,
  },
  livraisonSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.background,
  },
  livraisonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  livraisonDot: {
    width: 16,
    height: 16,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexShrink: 0,
  },
  livraisonDotSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
  livraisonLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  livraisonLabelSelected: {
    color: colors.textPrimary,
  },
  livraisonDescription: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  livraisonPrix: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  livraisonPrixSelected: {
    color: colors.gold,
    fontWeight: '400',
  },
  creneauxSection: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  creneauxTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  creneauCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    gap: spacing.md,
  },
  creneauCardSelected: {
    borderColor: colors.gold,
  },
  creneauDot: {
    width: 14,
    height: 14,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexShrink: 0,
  },
  creneauDotSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
  creneauJour: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  creneauHeure: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  prixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  prixLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  prixValue: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  prixTotal: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  prixTotalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  prixTotalValue: {
    fontSize: 20,
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
  payBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  payBtnDisabled: {
    opacity: 0.4,
  },
  payBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  payBtnPrice: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textLight,
  },
  promoRow: {
    flexDirection: 'row', gap: spacing.sm,
  },
  promoInput: {
    flex: 1, height: 48,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary,
    letterSpacing: 1,
  },
  promoInputErreur: { borderColor: colors.error },
  promoBtn: {
    height: 48, paddingHorizontal: spacing.lg,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  promoBtnDisabled: { opacity: 0.4 },
  promoBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 0.5 },
  promoAppliquee: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, backgroundColor: '#E8F5E9',
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.success,
  },
  promoAppliqueeLeft: { flex: 1 },
  promoAppliqueeCode: { fontSize: 14, fontWeight: '400', color: colors.success, letterSpacing: 1, marginBottom: 2 },
  promoAppliqueeLabel: { fontSize: 12, color: colors.success, opacity: 0.8 },
  promoSupprBtn: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center', justifyContent: 'center',
  },
  promoSupprBtnText: { fontSize: 18, color: colors.success, lineHeight: 20 },
  promoErreur: { fontSize: 12, color: colors.error, marginTop: spacing.sm },
});