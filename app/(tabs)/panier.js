import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const produitsPanier = [
  { id: '1', nom: 'Robe en soie', taille: 'M', couleur: 'Noir', prix: 245, quantite: 1, boutique: 'Boutique Parisienne' },
  { id: '2', nom: 'Foulard en soie', taille: 'Unique', couleur: 'Or', prix: 95, quantite: 2, boutique: 'Boutique Parisienne' },
];

export default function Panier() {
  const sousTotal = produitsPanier.reduce((acc, p) => acc + p.prix * p.quantite, 0);
  const fraisLivraison = 9.90;
  const total = sousTotal + fraisLivraison;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mon panier</Text>
          <Text style={styles.subtitle}>{produitsPanier.length} articles · Boutique Parisienne</Text>
        </View>

        {/* Produits */}
        <View style={styles.section}>
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
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Résumé */}
        <View style={styles.resumeSection}>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>Sous-total</Text>
            <Text style={styles.resumeValue}>{sousTotal.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>Livraison express</Text>
            <Text style={styles.resumeValue}>{fraisLivraison.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={[styles.resumeRow, styles.resumeTotal]}>
            <Text style={styles.resumeTotalLabel}>Total</Text>
            <Text style={styles.resumeTotalValue}>{total.toFixed(2).replace('.', ',')} €</Text>
          </View>
        </View>

      </ScrollView>

      {/* Bouton commander */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.commanderBtn}
          onPress={() => router.push('/commande/recap')}
        >
          <Text style={styles.commanderBtnText}>Commander</Text>
          <Text style={styles.commanderBtnPrice}>{total.toFixed(2).replace('.', ',')} €</Text>
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
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    padding: layout.screenPadding,
  },
  produitCard: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
    ...shadows.soft,
  },
  produitImage: {
    width: 80,
    height: 100,
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
  deleteBtn: {
    padding: spacing.sm,
    alignSelf: 'flex-start',
  },
  deleteBtnText: {
    fontSize: 20,
    color: colors.textMuted,
  },
  resumeSection: {
    marginHorizontal: layout.screenPadding,
    padding: layout.cardPadding,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: 120,
  },
  resumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  resumeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resumeValue: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  resumeTotal: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  resumeTotalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  resumeTotalValue: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: layout.screenPadding,
    paddingBottom: 34,
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  commanderBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  commanderBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  commanderBtnPrice: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textLight,
  },
});