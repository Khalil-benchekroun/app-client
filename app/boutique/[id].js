import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const produits = [
  { id: '1', nom: 'Robe en soie', prix: '245,00 €', categorie: 'Mode', dispo: true },
  { id: '2', nom: 'Sac cuir naturel', prix: '380,00 €', categorie: 'Accessoires', dispo: true },
  { id: '3', nom: 'Parfum signature', prix: '120,00 €', categorie: 'Beauté', dispo: false },
  { id: '4', nom: 'Foulard en soie', prix: '95,00 €', categorie: 'Accessoires', dispo: true },
  { id: '5', nom: 'Blazer structuré', prix: '320,00 €', categorie: 'Mode', dispo: true },
  { id: '6', nom: 'Crème visage luxe', prix: '180,00 €', categorie: 'Beauté', dispo: true },
];

const avis = [
  { id: '1', auteur: 'Sophie M.', note: 5, commentaire: 'Livraison ultra rapide, produits conformes. Je recommande vivement !', date: 'Il y a 2 jours' },
  { id: '2', auteur: 'Thomas L.', note: 4, commentaire: 'Très bonne expérience, emballage soigné. Légèrement en retard sur le délai annoncé.', date: 'Il y a 5 jours' },
  { id: '3', auteur: 'Marie C.', note: 5, commentaire: 'Boutique exceptionnelle, service client impeccable.', date: 'Il y a 1 semaine' },
];

function Etoiles({ note }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: 12, color: i <= note ? colors.gold : colors.border }}>
          ✦
        </Text>
      ))}
    </View>
  );
}

export default function FicheBoutique() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Image boutique */}
      <View style={styles.coverImage}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Infos boutique */}
      <View style={styles.boutiqueInfo}>
        <View style={styles.boutiqueHeader}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <View style={styles.boutiqueMeta}>
            <Text style={styles.boutiqueName}>Boutique Parisienne</Text>
            <Text style={styles.boutiqueCategory}>Mode · Accessoires</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Ouvert</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>800m</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>45 min</Text>
            <Text style={styles.statLabel}>Délai estimé</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>4,8 ✦</Text>
            <Text style={styles.statLabel}>Note</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>127</Text>
            <Text style={styles.statLabel}>Avis</Text>
          </View>
        </View>

        {/* Horaires */}
        <View style={styles.horaires}>
          <Text style={styles.horairesTitle}>Horaires</Text>
          <Text style={styles.horairesText}>Lun–Sam : 10h00 – 19h30</Text>
          <Text style={styles.horairesText}>Dimanche : Fermé</Text>
        </View>
      </View>

      {/* Sélection du commerçant */}
      <View style={styles.selectionSection}>
        <Text style={styles.sectionTitle}>Sélection du moment</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {produits.filter(p => p.dispo).slice(0, 3).map((produit) => (
            <TouchableOpacity
              key={produit.id}
              style={styles.selectionCard}
              onPress={() => router.push(`/produit/${produit.id}`)}
            >
              <View style={styles.selectionImage} />
              <Text style={styles.selectionCategorie}>{produit.categorie}</Text>
              <Text style={styles.selectionNom} numberOfLines={1}>{produit.nom}</Text>
              <Text style={styles.selectionPrix}>{produit.prix}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Produits */}
      <View style={styles.produitsSection}>
        <Text style={styles.sectionTitle}>Tous les produits</Text>
        {produits.map((produit) => (
          <TouchableOpacity
            key={produit.id}
            style={[styles.produitCard, !produit.dispo && styles.produitIndispo]}
            onPress={() => produit.dispo && router.push(`/produit/${produit.id}`)}
            disabled={!produit.dispo}
          >
            <View style={styles.produitImage} />
            <View style={styles.produitInfo}>
              <Text style={styles.produitCategorie}>{produit.categorie}</Text>
              <Text style={styles.produitNom}>{produit.nom}</Text>
              <Text style={styles.produitPrix}>{produit.prix}</Text>
            </View>
            {!produit.dispo ? (
              <View style={styles.indispoBadge}>
                <Text style={styles.indispoText}>Indisponible</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => router.push(`/produit/${produit.id}`)}
              >
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Avis */}
      <View style={styles.avisSection}>
        <View style={styles.avisTitre}>
          <Text style={styles.sectionTitle}>Avis clients</Text>
          <View style={styles.noteGlobale}>
            <Text style={styles.noteGlobaleValeur}>4,8</Text>
            <Etoiles note={5} />
            <Text style={styles.noteGlobaleCount}>127 avis</Text>
          </View>
        </View>

        {avis.map((avis) => (
          <View key={avis.id} style={styles.avisCard}>
            <View style={styles.avisHeader}>
              <View style={styles.avisAvatar}>
                <Text style={styles.avisAvatarText}>{avis.auteur[0]}</Text>
              </View>
              <View style={styles.avisInfo}>
                <Text style={styles.avisAuteur}>{avis.auteur}</Text>
                <Etoiles note={avis.note} />
              </View>
              <Text style={styles.avisDate}>{avis.date}</Text>
            </View>
            <Text style={styles.avisCommentaire}>{avis.commentaire}</Text>
          </View>
        ))}
      </View>

      {/* Contacter la boutique */}
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Une question ?</Text>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() =>
            router.push({
              pathname: '/chat',
              params: {
                type: 'boutique',
                boutiqueName: 'Boutique Parisienne',
                boutiqueId: id,
              },
            })
          }
        >
          <View style={styles.contactBtnLeft}>
            <View style={styles.contactBtnIcon}>
              <Text style={styles.contactBtnIconText}>✦</Text>
            </View>
            <View>
              <Text style={styles.contactBtnTitle}>Contacter la boutique</Text>
              <Text style={styles.contactBtnSub}>Réponse en quelques minutes</Text>
            </View>
          </View>
          <Text style={styles.contactBtnArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoIcon}>◎</Text>
          <Text style={styles.contactInfoText}>
            Posez vos questions directement à la boutique — disponibilité, taille, matière, délai...
          </Text>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coverImage: {
    height: 220,
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
  boutiqueInfo: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  boutiqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.gold,
  },
  boutiqueMeta: {
    flex: 1,
  },
  boutiqueName: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  boutiqueCategory: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 0.5,
    height: 30,
    backgroundColor: colors.border,
  },
  horaires: {
    padding: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  horairesTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  horairesText: {
    fontSize: 13,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  selectionSection: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.lg,
  },
  selectionCard: {
    width: 140,
    marginRight: spacing.md,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  selectionImage: {
    height: 140,
    backgroundColor: colors.backgroundSoft,
  },
  selectionCategorie: {
    fontSize: 10,
    color: colors.gold,
    padding: spacing.sm,
    paddingBottom: 2,
    letterSpacing: 0.5,
  },
  selectionNom: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    marginBottom: 2,
  },
  selectionPrix: {
    fontSize: 13,
    color: colors.textPrimary,
    padding: spacing.sm,
    paddingTop: 2,
  },
  produitsSection: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  produitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  produitIndispo: {
    opacity: 0.5,
  },
  produitImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.backgroundSoft,
  },
  produitInfo: {
    flex: 1,
    padding: spacing.md,
  },
  produitCategorie: {
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  produitNom: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  produitPrix: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  indispoBadge: {
    marginRight: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.sm,
  },
  indispoText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  addBtnText: {
    fontSize: 20,
    color: colors.gold,
    lineHeight: 22,
  },
  avisSection: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  avisTitre: {
    marginBottom: spacing.lg,
  },
  noteGlobale: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  noteGlobaleValeur: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  noteGlobaleCount: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  avisCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  avisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avisAvatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avisAvatarText: {
    fontSize: 15,
    color: colors.gold,
    fontWeight: '400',
  },
  avisInfo: {
    flex: 1,
  },
  avisAuteur: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  avisDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  avisCommentaire: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactSection: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  contactBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  contactBtnIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBtnIconText: {
    fontSize: 14,
    color: colors.gold,
  },
  contactBtnTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  contactBtnSub: {
    fontSize: 12,
    color: colors.gold,
    opacity: 0.8,
  },
  contactBtnArrow: {
    fontSize: 22,
    color: colors.gold,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  contactInfoIcon: {
    fontSize: 13,
    color: colors.gold,
    marginTop: 1,
  },
  contactInfoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});