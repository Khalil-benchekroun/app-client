import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

const FRAIS_LIVRAISON = 9.90;

export default function Panier() {
  const { items, nbArticles, sousTotal, modifierQuantite, supprimerDuPanier, viderPanier, parBoutique } = useCart();

  const total = sousTotal + FRAIS_LIVRAISON;

  const confirmerSuppression = (item) => {
    Alert.alert(
      'Retirer cet article ?',
      `${item.nom}${item.variante ? ` · ${item.variante}` : ''}${item.couleur ? ` · ${item.couleur}` : ''}`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Retirer', style: 'destructive', onPress: () => supprimerDuPanier(item.cle) },
      ]
    );
  };

  // Libellé variante selon type
  const afficherVariante = (item) => {
    const parts = [];
    if (item.variante) {
      const label = item.varianteType || 'Taille';
      parts.push(`${label} ${item.variante}`);
    }
    if (item.couleur) parts.push(item.couleur);
    return parts.join(' · ') || 'Taille unique';
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mon panier</Text>
          <Text style={styles.subtitle}>Vide</Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>◈</Text>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySub}>
            Découvrez nos boutiques parisiennes et ajoutez vos articles préférés.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.push('/(tabs)/explorer')}
          >
            <Text style={styles.emptyBtnText}>Explorer les boutiques</Text>
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
          <Text style={styles.title}>Mon panier</Text>
          <View style={styles.headerRight}>
            <Text style={styles.subtitle}>
              {nbArticles} article{nbArticles > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity
              onPress={() => Alert.alert(
                'Vider le panier ?',
                'Tous les articles seront retirés.',
                [
                  { text: 'Annuler', style: 'cancel' },
                  { text: 'Vider', style: 'destructive', onPress: viderPanier },
                ]
              )}
            >
              <Text style={styles.viderText}>Vider</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Articles groupés par boutique */}
        {Object.values(parBoutique).map((groupe) => (
          <View key={groupe.boutiqueId} style={styles.groupeBoutique}>

            {/* En-tête boutique si plusieurs boutiques */}
            {Object.keys(parBoutique).length > 1 && (
              <View style={styles.groupeHeader}>
                <Text style={styles.groupeHeaderIcon}>◎</Text>
                <Text style={styles.groupeHeaderNom}>{groupe.boutique}</Text>
                <Text style={styles.groupeHeaderCount}>
                  {groupe.items.reduce((s, i) => s + i.quantite, 0)} article{groupe.items.reduce((s, i) => s + i.quantite, 0) > 1 ? 's' : ''}
                </Text>
              </View>
            )}

            {groupe.items.map((item) => (
              <View key={item.cle} style={styles.produitCard}>
                <View style={styles.produitImage} />
                <View style={styles.produitInfo}>

                  {/* Boutique (si une seule boutique) */}
                  {Object.keys(parBoutique).length === 1 && (
                    <Text style={styles.produitBoutique}>{item.boutique}</Text>
                  )}

                  <Text style={styles.produitNom}>{item.nom}</Text>
                  <Text style={styles.produitVariante}>{afficherVariante(item)}</Text>

                  <View style={styles.produitFooter}>
                    <View style={styles.quantiteRow}>
                      <TouchableOpacity
                        style={styles.quantiteBtn}
                        onPress={() => modifierQuantite(item.cle, -1)}
                      >
                        <Text style={styles.quantiteBtnText}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantite}>{item.quantite}</Text>
                      <TouchableOpacity
                        style={styles.quantiteBtn}
                        onPress={() => modifierQuantite(item.cle, +1)}
                      >
                        <Text style={styles.quantiteBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.produitPrix}>
                      {(item.prix * item.quantite).toFixed(2).replace('.', ',')} €
                    </Text>
                  </View>

                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => confirmerSuppression(item)}
                >
                  <Text style={styles.deleteBtnText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {/* Note livraison multi-boutiques */}
        {Object.keys(parBoutique).length > 1 && (
          <View style={styles.multiBoutiqueNote}>
            <Text style={styles.multiBoutiqueIcon}>◎</Text>
            <Text style={styles.multiBoutiqueText}>
              Vos articles viennent de {Object.keys(parBoutique).length} boutiques différentes.
              Chaque boutique prépare sa commande séparément.
            </Text>
          </View>
        )}

        {/* Résumé prix */}
        <View style={styles.resumeSection}>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>
              Sous-total ({nbArticles} article{nbArticles > 1 ? 's' : ''})
            </Text>
            <Text style={styles.resumeValue}>
              {sousTotal.toFixed(2).replace('.', ',')} €
            </Text>
          </View>
          <View style={styles.resumeRow}>
            <Text style={styles.resumeLabel}>Livraison express</Text>
            <Text style={styles.resumeValue}>
              {FRAIS_LIVRAISON.toFixed(2).replace('.', ',')} €
            </Text>
          </View>
          <View style={[styles.resumeRow, styles.resumeTotal]}>
            <Text style={styles.resumeTotalLabel}>Total</Text>
            <Text style={styles.resumeTotalValue}>
              {total.toFixed(2).replace('.', ',')} €
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Footer commander */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.commanderBtn}
          onPress={() => router.push('/commande/recap')}
        >
          <Text style={styles.commanderBtnText}>Commander</Text>
          <Text style={styles.commanderBtnPrice}>
            {total.toFixed(2).replace('.', ',')} €
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60, paddingBottom: spacing.lg,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 1, marginBottom: 4,
  },
  headerRight: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subtitle: { fontSize: 13, color: colors.textSecondary },
  viderText: { fontSize: 13, color: colors.error },

  // Empty state
  emptyState: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: layout.screenPadding, paddingTop: 80,
  },
  emptyIcon: { fontSize: 40, color: colors.gold, opacity: 0.3, marginBottom: spacing.xl },
  emptyTitle: { fontSize: 18, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.sm },
  emptySub: {
    fontSize: 14, color: colors.textSecondary, textAlign: 'center',
    lineHeight: 22, marginBottom: spacing.xl,
  },
  emptyBtn: {
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    backgroundColor: colors.backgroundDark, borderRadius: radius.md,
  },
  emptyBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 0.5 },

  // Groupes boutiques
  groupeBoutique: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  groupeHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginBottom: spacing.md, paddingBottom: spacing.md,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  groupeHeaderIcon: { fontSize: 14, color: colors.gold },
  groupeHeaderNom: { flex: 1, fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  groupeHeaderCount: { fontSize: 12, color: colors.textMuted },

  // Produit
  produitCard: {
    flexDirection: 'row', marginBottom: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    overflow: 'hidden', borderWidth: 0.5, borderColor: colors.border,
    ...shadows.soft,
  },
  produitImage: { width: 80, height: 100, backgroundColor: colors.border },
  produitInfo: { flex: 1, padding: spacing.md },
  produitBoutique: { fontSize: 11, color: colors.gold, marginBottom: 2, letterSpacing: 0.3 },
  produitNom: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  produitVariante: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.sm },
  produitFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantiteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  quantiteBtn: {
    width: 28, height: 28, borderRadius: radius.full,
    borderWidth: 0.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.background,
  },
  quantiteBtnText: { fontSize: 16, color: colors.textPrimary, lineHeight: 18 },
  quantite: { fontSize: 14, color: colors.textPrimary, minWidth: 20, textAlign: 'center' },
  produitPrix: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  deleteBtn: { padding: spacing.sm, alignSelf: 'flex-start' },
  deleteBtnText: { fontSize: 20, color: colors.textMuted },

  // Multi-boutique note
  multiBoutiqueNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    marginHorizontal: layout.screenPadding, marginTop: spacing.md,
    padding: spacing.md, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
  },
  multiBoutiqueIcon: { fontSize: 13, color: colors.gold, marginTop: 1 },
  multiBoutiqueText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },

  // Résumé
  resumeSection: {
    margin: layout.screenPadding, padding: layout.cardPadding,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, marginBottom: 120,
  },
  resumeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  resumeLabel: { fontSize: 14, color: colors.textSecondary },
  resumeValue: { fontSize: 14, color: colors.textPrimary },
  resumeTotal: {
    marginTop: spacing.sm, paddingTop: spacing.md,
    borderTopWidth: 0.5, borderTopColor: colors.border,
  },
  resumeTotalLabel: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  resumeTotalValue: { fontSize: 20, fontWeight: '400', color: colors.textPrimary },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: layout.screenPadding, paddingBottom: 34,
    backgroundColor: colors.background,
    borderTopWidth: 0.5, borderTopColor: colors.border,
  },
  commanderBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.backgroundDark, padding: spacing.lg, borderRadius: radius.md,
  },
  commanderBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
  commanderBtnPrice: { fontSize: 17, fontWeight: '400', color: colors.textLight },
});