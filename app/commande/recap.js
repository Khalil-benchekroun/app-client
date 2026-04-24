import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const produitsPanier = [
  { id: '1', nom: 'Robe en soie', taille: 'M', couleur: 'Noir', prix: 245, quantite: 1 },
  { id: '2', nom: 'Foulard en soie', taille: 'Unique', couleur: 'Or', prix: 95, quantite: 2 },
];

export default function Recap() {
  const sousTotal = produitsPanier.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const fraisLivraison = 9.90;
  const total = sousTotal + fraisLivraison;

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

        {/* Adresse livraison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          <TouchableOpacity style={styles.adresseCard}>
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
          {[
            { label: 'Express < 1h', prix: '9,90 €', selected: true },
            { label: 'Aujourd\'hui J0', prix: '6,90 €', selected: false },
          ].map((mode) => (
            <TouchableOpacity
              key={mode.label}
              style={[styles.livraisonCard, mode.selected && styles.livraisonSelected]}
            >
              <View>
                <Text style={[styles.livraisonLabel, mode.selected && styles.livraisonLabelSelected]}>
                  {mode.label}
                </Text>
              </View>
              <Text style={[styles.livraisonPrix, mode.selected && styles.livraisonPrixSelected]}>
                {mode.prix}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Résumé prix */}
        <View style={styles.section}>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>Sous-total</Text>
            <Text style={styles.prixValue}>{sousTotal.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>Livraison</Text>
            <Text style={styles.prixValue}>{fraisLivraison.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={[styles.prixRow, styles.prixTotal]}>
            <Text style={styles.prixTotalLabel}>Total</Text>
            <Text style={styles.prixTotalValue}>{total.toFixed(2).replace('.', ',')} €</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bouton paiement */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payBtn}
          onPress={() => router.push('/commande/paiement')}
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
  livraisonLabel: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  livraisonLabelSelected: {
    color: colors.textPrimary,
    fontWeight: '400',
  },
  livraisonPrix: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  livraisonPrixSelected: {
    color: colors.gold,
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
});