import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

const MODES_EXPEDITION = [
  { id: 'livraison', label: 'Livraison à domicile', icon: '◎' },
  { id: 'click_collect', label: 'Click & Collect', icon: '◈' },
];

const modesLivraison = [
  { id: '1', label: 'Express < 1h', description: "Livraison en moins d'une heure", prix: 9.90 },
  { id: '2', label: "Aujourd'hui J0", description: 'Livraison dans la journée', prix: 6.90 },
  { id: '3', label: 'Programmée', description: 'Choisissez votre créneau', prix: 4.90 },
];

const creneaux = [
  { id: '1', jour: "Aujourd'hui", heure: '18h00 – 20h00' },
  { id: '2', jour: 'Demain', heure: '10h00 – 12h00' },
  { id: '3', jour: 'Demain', heure: '14h00 – 16h00' },
  { id: '4', jour: 'Demain', heure: '18h00 – 20h00' },
  { id: '5', jour: 'Après-demain', heure: '10h00 – 12h00' },
];

const BOUTIQUES_RETRAIT = [
  {
    id: '1',
    nom: 'Boutique Parisienne',
    adresse: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
    horaires: 'Lun–Sam 10h00 – 19h30',
    distance: '800m',
    creneauxRetrait: [
      { id: 'r1', label: "Aujourd'hui dès 16h00" },
      { id: 'r2', label: 'Demain dès 10h00' },
      { id: 'r3', label: 'Demain dès 14h00' },
    ],
  },
  {
    id: '2',
    nom: 'Maison Dorée',
    adresse: '28 Avenue Montaigne, 75008 Paris',
    horaires: 'Lun–Sam 10h00 – 20h00',
    distance: '1,2 km',
    creneauxRetrait: [
      { id: 'r4', label: 'Demain dès 10h00' },
      { id: 'r5', label: 'Demain dès 15h00' },
    ],
  },
];

export default function Recap() {
  // ── CartContext ──────────────────────────────────────────
  const { items, sousTotal, modifierQuantite, nbArticles } = useCart();

  // ── États locaux livraison ───────────────────────────────
  const [modeExpedition, setModeExpedition] = useState('livraison');
  const [modeLivraison, setModeLivraison] = useState('1');
  const [creneauSelectionne, setCreneauSelectionne] = useState(null);
  const [boutiqueRetrait, setBoutiqueRetrait] = useState(null);
  const [creneauRetrait, setCreneauRetrait] = useState(null);

  const isClickCollect = modeExpedition === 'click_collect';
  const modeSelectionne = modesLivraison.find(m => m.id === modeLivraison);
  const fraisLivraison = isClickCollect ? 0 : (modeSelectionne?.prix || 9.90);
  const total = sousTotal + fraisLivraison;

  const peutPayer = () => {
    if (items.length === 0) return false;
    if (isClickCollect) return boutiqueRetrait !== null && creneauRetrait !== null;
    if (modeLivraison === '3') return creneauSelectionne !== null;
    return true;
  };

  // ── Libellé variante ─────────────────────────────────────
  const afficherVariante = (item) => {
    const parts = [];
    if (item.variante) {
      const label = item.varianteType || 'Taille';
      parts.push(`${label} ${item.variante}`);
    }
    if (item.couleur) parts.push(item.couleur);
    return parts.join(' · ') || 'Taille unique';
  };

  // ── Panier vide ──────────────────────────────────────────
  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Récapitulatif</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>◈</Text>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySubtitle}>Ajoutez des articles depuis une boutique</Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={() => router.replace('/(tabs)')}
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
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Récapitulatif</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Produits du panier — depuis CartContext */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Mon panier · {nbArticles} article{nbArticles > 1 ? 's' : ''}
          </Text>
          {items.map((item) => (
            <View key={item.cle} style={styles.produitCard}>
              <View style={styles.produitImage} />
              <View style={styles.produitInfo}>
                <Text style={styles.produitNom}>{item.nom}</Text>
                <Text style={styles.produitVariante}>{afficherVariante(item)}</Text>
                {item.boutique ? (
                  <Text style={styles.produitBoutique}>{item.boutique}</Text>
                ) : null}
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
            </View>
          ))}
        </View>

        {/* Mode d'expédition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de récupération</Text>
          <View style={styles.expeditionRow}>
            {MODES_EXPEDITION.map(mode => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.expeditionCard,
                  modeExpedition === mode.id && styles.expeditionCardSelected,
                ]}
                onPress={() => {
                  setModeExpedition(mode.id);
                  setBoutiqueRetrait(null);
                  setCreneauRetrait(null);
                }}
              >
                <Text style={[
                  styles.expeditionIcon,
                  modeExpedition === mode.id && styles.expeditionIconSelected,
                ]}>
                  {mode.icon}
                </Text>
                <Text style={[
                  styles.expeditionLabel,
                  modeExpedition === mode.id && styles.expeditionLabelSelected,
                ]}>
                  {mode.label}
                </Text>
                {mode.id === 'click_collect' && (
                  <View style={styles.gratuitBadge}>
                    <Text style={styles.gratuitBadgeText}>Gratuit</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Adresse — uniquement si livraison */}
        {!isClickCollect && (
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
        )}

        {/* Mode de livraison — uniquement si livraison */}
        {!isClickCollect && (
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
        )}

        {/* Click & Collect */}
        {isClickCollect && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choisir une boutique</Text>
            {BOUTIQUES_RETRAIT.map(b => (
              <TouchableOpacity
                key={b.id}
                style={[
                  styles.boutiqueRetraitCard,
                  boutiqueRetrait === b.id && styles.boutiqueRetraitSelected,
                ]}
                onPress={() => {
                  setBoutiqueRetrait(b.id);
                  setCreneauRetrait(null);
                }}
              >
                <View style={styles.boutiqueRetraitTop}>
                  <View style={[styles.livraisonDot, boutiqueRetrait === b.id && styles.livraisonDotSelected]} />
                  <View style={{ flex: 1 }}>
                    <Text style={[
                      styles.boutiqueRetraitNom,
                      boutiqueRetrait === b.id && { color: colors.textPrimary },
                    ]}>
                      {b.nom}
                    </Text>
                    <Text style={styles.boutiqueRetraitAdresse}>{b.adresse}</Text>
                    <View style={styles.boutiqueRetraitMeta}>
                      <Text style={styles.boutiqueRetraitMetaText}>◎ {b.distance}</Text>
                      <Text style={styles.boutiqueRetraitMetaText}>· {b.horaires}</Text>
                    </View>
                  </View>
                </View>
                {boutiqueRetrait === b.id && (
                  <View style={styles.creneauxRetraitSection}>
                    <Text style={styles.creneauxTitle}>Créneau de retrait</Text>
                    {b.creneauxRetrait.map(cr => (
                      <TouchableOpacity
                        key={cr.id}
                        style={[styles.creneauCard, creneauRetrait === cr.id && styles.creneauCardSelected]}
                        onPress={() => setCreneauRetrait(cr.id)}
                      >
                        <View style={[styles.creneauDot, creneauRetrait === cr.id && styles.creneauDotSelected]} />
                        <Text style={styles.creneauJour}>{cr.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
            <View style={styles.clickCollectInfo}>
              <Text style={styles.clickCollectInfoIcon}>◎</Text>
              <Text style={styles.clickCollectInfoText}>
                Votre commande sera prête en boutique dans les 2 heures suivant la validation.
                Retrait gratuit, sans frais de livraison.
              </Text>
            </View>
          </View>
        )}

        {/* Résumé prix */}
        <View style={styles.section}>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>Sous-total</Text>
            <Text style={styles.prixValue}>{sousTotal.toFixed(2).replace('.', ',')} €</Text>
          </View>
          <View style={styles.prixRow}>
            <Text style={styles.prixLabel}>
              {isClickCollect ? 'Retrait en boutique' : `Livraison ${modeSelectionne?.label}`}
            </Text>
            <Text style={[styles.prixValue, isClickCollect && { color: colors.success }]}>
              {isClickCollect ? 'Gratuit' : `${fraisLivraison.toFixed(2).replace('.', ',')} €`}
            </Text>
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
          style={[styles.payBtn, !peutPayer() && styles.payBtnDisabled]}
          onPress={() => {
            if (peutPayer()) {
              router.push({
                pathname: '/commande/paiement',
                params: {
                  total: total.toFixed(2),
                  nbArticles,
                  modeExpedition,
                },
              });
            }
          }}
        >
          <Text style={styles.payBtnText}>
            {isClickCollect ? 'Confirmer le retrait' : 'Procéder au paiement'}
          </Text>
          <Text style={styles.payBtnPrice}>{total.toFixed(2).replace('.', ',')} €</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },

  // Panier vide
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl, marginTop: 80 },
  emptyIcon: { fontSize: 48, color: colors.gold, marginBottom: spacing.lg },
  emptyTitle: { fontSize: 20, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.sm },
  emptySubtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.xl, textAlign: 'center' },
  emptyBtn: {
    paddingHorizontal: spacing.xxl, paddingVertical: spacing.md,
    backgroundColor: colors.backgroundDark, borderRadius: radius.md,
  },
  emptyBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 1 },

  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, marginBottom: spacing.md,
  },

  // Produit
  produitCard: {
    flexDirection: 'row', marginBottom: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    overflow: 'hidden', borderWidth: 0.5, borderColor: colors.border,
  },
  produitImage: { width: 80, height: 90, backgroundColor: colors.border },
  produitInfo: { flex: 1, padding: spacing.md },
  produitNom: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  produitVariante: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  produitBoutique: { fontSize: 11, color: colors.gold, marginBottom: spacing.sm },
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

  // Expédition
  expeditionRow: { flexDirection: 'row', gap: spacing.sm },
  expeditionCard: {
    flex: 1, padding: spacing.lg, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft, alignItems: 'center', gap: spacing.xs,
  },
  expeditionCardSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  expeditionIcon: { fontSize: 20, color: colors.textMuted },
  expeditionIconSelected: { color: colors.gold },
  expeditionLabel: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', lineHeight: 18 },
  expeditionLabelSelected: { color: colors.textPrimary },
  gratuitBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, backgroundColor: '#E8F5EE', borderRadius: radius.sm },
  gratuitBadgeText: { fontSize: 10, color: colors.success, fontWeight: '400' },

  // Adresse
  adresseCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  adresseInfo: { flex: 1 },
  adresseNom: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  adresseText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  adresseEdit: { fontSize: 13, color: colors.gold },

  // Livraison
  livraisonCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.lg, borderRadius: radius.md, borderWidth: 0.5,
    borderColor: colors.border, marginBottom: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  livraisonSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  livraisonLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  livraisonDot: { width: 16, height: 16, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border, flexShrink: 0 },
  livraisonDotSelected: { borderColor: colors.gold, backgroundColor: colors.gold },
  livraisonLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  livraisonLabelSelected: { color: colors.textPrimary },
  livraisonDescription: { fontSize: 12, color: colors.textSecondary },
  livraisonPrix: { fontSize: 14, color: colors.textSecondary },
  livraisonPrixSelected: { color: colors.gold, fontWeight: '400' },

  // Créneaux
  creneauxSection: {
    marginTop: spacing.md, padding: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  creneauxTitle: {
    fontSize: 12, color: colors.textSecondary, letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: spacing.md,
  },
  creneauCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm, backgroundColor: colors.background, gap: spacing.md,
  },
  creneauCardSelected: { borderColor: colors.gold },
  creneauDot: { width: 14, height: 14, borderRadius: radius.full, borderWidth: 1.5, borderColor: colors.border, flexShrink: 0 },
  creneauDotSelected: { borderColor: colors.gold, backgroundColor: colors.gold },
  creneauJour: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  creneauHeure: { fontSize: 12, color: colors.textSecondary },

  // Click & Collect
  boutiqueRetraitCard: {
    padding: spacing.lg, borderRadius: radius.lg, borderWidth: 0.5,
    borderColor: colors.border, backgroundColor: colors.backgroundSoft, marginBottom: spacing.sm,
  },
  boutiqueRetraitSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  boutiqueRetraitTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  boutiqueRetraitNom: { fontSize: 14, fontWeight: '400', color: colors.textSecondary, marginBottom: 2 },
  boutiqueRetraitAdresse: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginBottom: spacing.xs },
  boutiqueRetraitMeta: { flexDirection: 'row', gap: spacing.sm },
  boutiqueRetraitMetaText: { fontSize: 11, color: colors.textMuted },
  creneauxRetraitSection: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 0.5, borderTopColor: colors.borderLight },
  clickCollectInfo: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    marginTop: spacing.md, padding: spacing.md,
    backgroundColor: '#E8F5EE', borderRadius: radius.md,
    borderWidth: 0.5, borderColor: '#BBF7D0',
  },
  clickCollectInfoIcon: { fontSize: 13, color: colors.success, marginTop: 1 },
  clickCollectInfoText: { flex: 1, fontSize: 12, color: colors.success, lineHeight: 18 },

  // Prix
  prixRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  prixLabel: { fontSize: 14, color: colors.textSecondary },
  prixValue: { fontSize: 14, color: colors.textPrimary },
  prixTotal: { marginTop: spacing.sm, paddingTop: spacing.md, borderTopWidth: 0.5, borderTopColor: colors.border },
  prixTotalLabel: { fontSize: 16, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3 },
  prixTotalValue: { fontSize: 20, fontWeight: '400', color: colors.textPrimary },

  // Footer
  footer: {
    padding: layout.screenPadding, paddingBottom: 34,
    borderTopWidth: 0.5, borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  payBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.backgroundDark, padding: spacing.lg, borderRadius: radius.md,
  },
  payBtnDisabled: { opacity: 0.4 },
  payBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
  payBtnPrice: { fontSize: 17, fontWeight: '400', color: colors.textLight },
});