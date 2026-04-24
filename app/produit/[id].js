import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const variantes = ['XS', 'S', 'M', 'L', 'XL'];
const couleurs = ['#0A0A0F', '#C9A96E', '#F9F7F4', '#8B7355'];

export default function FicheProduit() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Image produit */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favorisBtn}>
            <Text style={styles.favorisIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* Infos produit */}
        <View style={styles.content}>

          <TouchableOpacity style={styles.boutiqueTag} onPress={() => router.back()}>
            <Text style={styles.boutiqueTagText}>Boutique Parisienne ›</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.productName}>Robe en soie</Text>
            <Text style={styles.productPrice}>245,00 €</Text>
          </View>

          <Text style={styles.productCategory}>Mode · Femme</Text>

          <View style={styles.delaiRow}>
            <Text style={styles.delaiIcon}>◎</Text>
            <Text style={styles.delaiText}>Livraison estimée en <Text style={styles.delaiHighlight}>45 min</Text></Text>
          </View>

          {/* Couleurs */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Couleur</Text>
            <View style={styles.couleursRow}>
              {couleurs.map((couleur, index) => (
                <TouchableOpacity
                  key={couleur}
                  style={[
                    styles.couleurBtn,
                    { backgroundColor: couleur },
                    index === 0 && styles.couleurSelected,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Tailles */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Taille</Text>
            <View style={styles.taillesRow}>
              {variantes.map((taille) => (
                <TouchableOpacity
                  key={taille}
                  style={[styles.tailleBtn, taille === 'M' && styles.tailleBtnSelected]}
                >
                  <Text style={[styles.tailleBtnText, taille === 'M' && styles.tailleBtnTextSelected]}>
                    {taille}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>
              Robe fluide en soie naturelle, coupe midi élégante. Parfaite pour toutes les occasions,
              elle allie raffinement et confort. Disponible en plusieurs coloris exclusifs.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Composition</Text>
            <Text style={styles.description}>100% Soie naturelle — Lavage à la main recommandé</Text>
          </View>

        </View>
      </ScrollView>

      {/* Bouton panier fixe */}
      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceLabel}>Prix total</Text>
          <Text style={styles.footerPriceValue}>245,00 €</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => router.push('/commande/recap')}
        >
          <Text style={styles.addToCartText}>Ajouter au panier</Text>
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
  imageContainer: {
    height: 380,
    backgroundColor: colors.backgroundSoft,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: layout.screenPadding,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  favorisBtn: {
    position: 'absolute',
    top: 50,
    right: layout.screenPadding,
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  favorisIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  content: {
    padding: layout.screenPadding,
    paddingBottom: 100,
  },
  boutiqueTag: {
    marginBottom: spacing.md,
  },
  boutiqueTagText: {
    fontSize: 13,
    color: colors.gold,
    letterSpacing: 0.3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  productName: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    flex: 1,
    marginRight: spacing.md,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  productCategory: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  delaiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.xl,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  delaiIcon: {
    fontSize: 14,
    color: colors.gold,
    marginRight: spacing.sm,
  },
  delaiText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  delaiHighlight: {
    color: colors.textPrimary,
    fontWeight: '400',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  couleursRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  couleurBtn: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  couleurSelected: {
    borderWidth: 2,
    borderColor: colors.gold,
  },
  taillesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tailleBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSoft,
  },
  tailleBtnSelected: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.backgroundDark,
  },
  tailleBtnText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  tailleBtnTextSelected: {
    color: colors.gold,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.screenPadding,
    backgroundColor: colors.background,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    paddingBottom: 34,
  },
  footerPrice: {
    flex: 1,
  },
  footerPriceLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  footerPriceValue: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  addToCartBtn: {
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
});