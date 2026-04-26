import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, radius, layout } from '../../constants/theme';

const ARTICLES = {
  '1': {
    id: '1',
    categorie: 'Tendances',
    tag: 'Mode',
    titre: 'Les couleurs de la saison printemps-été 2026',
    auteur: 'Équipe LIVRR',
    date: '22 avril 2026',
    lecture: '4 min',
    contenu: [
      {
        type: 'intro',
        texte: 'Le printemps-été 2026 s\'annonce sous le signe de la douceur et de la naturalité. Les créateurs parisiens s\'accordent sur une palette commune : des teintes inspirées par la nature, loin des couleurs saturées des saisons précédentes.',
      },
      {
        type: 'titre',
        texte: 'Le terracotta, couleur phare de la saison',
      },
      {
        type: 'paragraphe',
        texte: 'Décliné du plus pâle au plus profond, le terracotta s\'impose comme la teinte incontournable. On le retrouve en robes fluides, en vestes oversize et même dans les accessoires. Chez nos boutiques partenaires, Boutique Parisienne propose une sélection exclusive de pièces dans cette gamme chromatique.',
      },
      {
        type: 'titre',
        texte: 'Le vert sauge, la sobriété élégante',
      },
      {
        type: 'paragraphe',
        texte: 'Discret mais affirmé, le vert sauge séduit par sa capacité à se marier avec tout. Une teinte particulièrement mise en avant chez Maison Dorée, qui a construit toute une collection capsule autour de cette nuance.',
      },
      {
        type: 'titre',
        texte: 'Comment adopter ces couleurs ?',
      },
      {
        type: 'paragraphe',
        texte: 'L\'astuce des stylistes parisiens : partir d\'une base neutre (écru, blanc cassé, beige sable) et y ajouter une touche de couleur de saison. Une ceinture terracotta, un foulard vert sauge — suffisant pour être dans l\'air du temps sans se risquer au total look.',
      },
      {
        type: 'citation',
        texte: 'La mode n\'est pas quelque chose qui existe seulement dans les vêtements. La mode est dans le ciel, dans la rue.',
        source: 'Coco Chanel',
      },
    ],
    produits: [
      { id: '1', nom: 'Robe en soie', boutique: 'Boutique Parisienne', prix: '245,00 €', boutiqueId: '1' },
      { id: '8', nom: 'Pantalon lin', boutique: 'Boutique Parisienne', prix: '145,00 €', boutiqueId: '1' },
      { id: '3', nom: 'Foulard en soie', boutique: 'Boutique Parisienne', prix: '95,00 €', boutiqueId: '1' },
    ],
  },
  '2': {
    id: '2',
    categorie: 'Idées cadeaux',
    tag: 'Beauté',
    titre: 'Offrir de la beauté : notre sélection de coffrets',
    auteur: 'Équipe LIVRR',
    date: '18 avril 2026',
    lecture: '3 min',
    contenu: [
      {
        type: 'intro',
        texte: 'Un coffret beauté, c\'est toujours une bonne idée. Livrable en moins d\'une heure, il peut même devenir le cadeau de dernière minute le plus chic qui soit. Voici notre sélection chez les boutiques partenaires LIVRR.',
      },
      {
        type: 'titre',
        texte: 'Le coffret soin visage de Beauté Dorée',
      },
      {
        type: 'paragraphe',
        texte: 'Composé du sérum éclat vitamine C et de l\'huile visage nourrissante, ce duo est une valeur sûre. Présenté dans un écrin noir mat aux initiales dorées, il incarne le luxe accessible.',
      },
      {
        type: 'titre',
        texte: 'Le coffret parfum Élégance & Co.',
      },
      {
        type: 'paragraphe',
        texte: 'Trois miniatures de leur gamme signature, joliment présentées. Idéal pour découvrir la maison avant d\'investir dans un flacon complet.',
      },
    ],
    produits: [
      { id: '5', nom: 'Sérum éclat', boutique: 'Beauté Dorée', prix: '68,00 €', boutiqueId: '5' },
      { id: '11', nom: 'Huile visage', boutique: 'Beauté Dorée', prix: '45,00 €', boutiqueId: '5' },
      { id: '9', nom: 'Parfum signature', boutique: 'Beauté Dorée', prix: '120,00 €', boutiqueId: '5' },
    ],
  },
};

const COULEURS_TAGS = {
  Mode: { bg: '#EEF4FF', text: '#185FA5' },
  Beauté: { bg: '#FDF0F5', text: '#8B3258' },
  Paris: { bg: '#F0F9F4', text: '#2D6A4F' },
  Cadeaux: { bg: '#FFF8E8', text: '#A07840' },
};

export default function Article() {
  const { id } = useLocalSearchParams();
  const article = ARTICLES[id] || ARTICLES['1'];
  const tagCouleur = COULEURS_TAGS[article.tag] || { bg: colors.backgroundSoft, text: colors.textSecondary };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Image hero */}
        <View style={styles.heroImage}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu */}
        <View style={styles.content}>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={[styles.tag, { backgroundColor: tagCouleur.bg }]}>
              <Text style={[styles.tagText, { color: tagCouleur.text }]}>{article.tag}</Text>
            </View>
            <Text style={styles.metaText}>{article.lecture} de lecture · {article.date}</Text>
          </View>

          <Text style={styles.titre}>{article.titre}</Text>

          <View style={styles.auteurRow}>
            <View style={styles.auteurAvatar}>
              <Text style={styles.auteurAvatarText}>L</Text>
            </View>
            <Text style={styles.auteurNom}>{article.auteur}</Text>
          </View>

          {/* Contenu article */}
          {article.contenu.map((bloc, i) => {
            if (bloc.type === 'intro') return (
              <Text key={i} style={styles.intro}>{bloc.texte}</Text>
            );
            if (bloc.type === 'titre') return (
              <Text key={i} style={styles.sousTitre}>{bloc.texte}</Text>
            );
            if (bloc.type === 'paragraphe') return (
              <Text key={i} style={styles.paragraphe}>{bloc.texte}</Text>
            );
            if (bloc.type === 'citation') return (
              <View key={i} style={styles.citationBlock}>
                <Text style={styles.citationTexte}>« {bloc.texte} »</Text>
                <Text style={styles.citationSource}>— {bloc.source}</Text>
              </View>
            );
            return null;
          })}

          {/* Produits associés */}
          {article.produits && article.produits.length > 0 && (
            <View style={styles.produitsSection}>
              <Text style={styles.produitsSectionTitre}>Produits de cet article</Text>
              <Text style={styles.produitsSectionSub}>Livrés en moins d'une heure</Text>
              {article.produits.map(p => (
                <TouchableOpacity
                  key={p.id}
                  style={styles.produitCard}
                  onPress={() => router.push(`/produit/${p.id}`)}
                >
                  <View style={styles.produitImage} />
                  <View style={styles.produitInfo}>
                    <Text style={styles.produitBoutique}>{p.boutique}</Text>
                    <Text style={styles.produitNom}>{p.nom}</Text>
                    <Text style={styles.produitPrix}>{p.prix}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.produitBtn}
                    onPress={() => router.push(`/produit/${p.id}`)}
                  >
                    <Text style={styles.produitBtnText}>Voir ›</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Autres articles */}
          <View style={styles.autresSection}>
            <Text style={styles.autresSectionTitre}>Lire aussi</Text>
            <TouchableOpacity
              style={styles.autreCard}
              onPress={() => router.push('/blog/2')}
            >
              <View style={styles.autreImage} />
              <View style={styles.autreInfo}>
                <Text style={styles.autreNom} numberOfLines={2}>
                  Offrir de la beauté : notre sélection de coffrets
                </Text>
                <Text style={styles.autreMeta}>Beauté · 3 min</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heroImage: {
    height: 280,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'flex-start',
    padding: layout.screenPadding,
    paddingTop: 60,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 24, color: colors.textLight },
  content: { padding: layout.screenPadding },
  metaRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    marginBottom: spacing.lg, marginTop: spacing.lg,
  },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm },
  tagText: { fontSize: 11, fontWeight: '400' },
  metaText: { fontSize: 12, color: colors.textMuted },
  titre: {
    fontSize: 26, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, lineHeight: 36, marginBottom: spacing.lg,
  },
  auteurRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginBottom: spacing.xl, paddingBottom: spacing.xl,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  auteurAvatar: {
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gold,
  },
  auteurAvatarText: { fontSize: 13, color: colors.gold },
  auteurNom: { fontSize: 13, color: colors.textSecondary },
  intro: {
    fontSize: 16, color: colors.textPrimary, lineHeight: 28,
    marginBottom: spacing.xl, fontStyle: 'italic',
  },
  sousTitre: {
    fontSize: 18, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, marginBottom: spacing.md, marginTop: spacing.xl,
  },
  paragraphe: {
    fontSize: 15, color: colors.textSecondary,
    lineHeight: 26, marginBottom: spacing.lg,
  },
  citationBlock: {
    borderLeftWidth: 3, borderLeftColor: colors.gold,
    paddingLeft: spacing.lg, marginVertical: spacing.xl,
  },
  citationTexte: {
    fontSize: 16, color: colors.textPrimary,
    fontStyle: 'italic', lineHeight: 26, marginBottom: spacing.sm,
  },
  citationSource: { fontSize: 12, color: colors.gold },

  // Produits
  produitsSection: {
    marginTop: spacing.xl, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.xl,
    borderWidth: 0.5, borderColor: colors.border,
  },
  produitsSectionTitre: {
    fontSize: 16, fontWeight: '400', color: colors.textPrimary, marginBottom: 2,
  },
  produitsSectionSub: { fontSize: 12, color: colors.gold, marginBottom: spacing.lg },
  produitCard: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: spacing.md, gap: spacing.md,
  },
  produitImage: {
    width: 56, height: 56, borderRadius: radius.md,
    backgroundColor: colors.border, flexShrink: 0,
  },
  produitInfo: { flex: 1 },
  produitBoutique: { fontSize: 10, color: colors.gold, letterSpacing: 0.5, marginBottom: 2 },
  produitNom: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  produitPrix: { fontSize: 13, color: colors.textSecondary },
  produitBtn: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.backgroundDark, borderRadius: radius.sm,
  },
  produitBtnText: { fontSize: 12, color: colors.gold },

  // Autres articles
  autresSection: { marginTop: spacing.xl, marginBottom: spacing.xxxl },
  autresSectionTitre: {
    fontSize: 16, fontWeight: '400', color: colors.textPrimary,
    marginBottom: spacing.lg, letterSpacing: 0.3,
  },
  autreCard: {
    flexDirection: 'row', gap: spacing.md,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden',
  },
  autreImage: { width: 100, height: 80, backgroundColor: colors.backgroundSoft },
  autreInfo: { flex: 1, padding: spacing.md, justifyContent: 'center' },
  autreNom: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, lineHeight: 20, marginBottom: 4 },
  autreMeta: { fontSize: 11, color: colors.textMuted },
});