import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const ARTICLES = [
  {
    id: '1',
    categorie: 'Tendances',
    titre: 'Les couleurs de la saison printemps-été 2026',
    extrait: 'Du terracotta au vert sauge, découvrez les teintes qui vont définir votre garde-robe cette année.',
    auteur: 'Équipe LIVRR',
    date: '22 avril 2026',
    lecture: '4 min',
    featured: true,
    tag: 'Mode',
  },
  {
    id: '2',
    categorie: 'Idées cadeaux',
    titre: 'Offrir de la beauté : notre sélection de coffrets',
    extrait: 'Que ce soit pour un anniversaire, la fête des mères ou simplement faire plaisir, ces coffrets beauté feront toujours leur effet.',
    auteur: 'Équipe LIVRR',
    date: '18 avril 2026',
    lecture: '3 min',
    featured: false,
    tag: 'Beauté',
  },
  {
    id: '3',
    categorie: 'Lifestyle',
    titre: 'Paris à porter : les boutiques incontournables du Marais',
    extrait: 'Une sélection des meilleures adresses mode et déco du quartier, maintenant livrables en moins d\'une heure.',
    auteur: 'Équipe LIVRR',
    date: '14 avril 2026',
    lecture: '5 min',
    featured: false,
    tag: 'Paris',
  },
  {
    id: '4',
    categorie: 'Tendances',
    titre: 'Le retour du lin : matière phare de l\'été',
    extrait: 'Légèreté, respirabilité et élégance naturelle — le lin s\'impose cette saison comme la matière incontournable.',
    auteur: 'Équipe LIVRR',
    date: '10 avril 2026',
    lecture: '3 min',
    featured: false,
    tag: 'Mode',
  },
  {
    id: '5',
    categorie: 'Idées cadeaux',
    titre: 'Fête des mères 2026 : 10 idées de cadeaux livrés en 1h',
    extrait: 'Bijoux, sacs, soins… Tout ce qu\'il faut pour gâter la personne qui compte le plus, sans vous déplacer.',
    auteur: 'Équipe LIVRR',
    date: '5 avril 2026',
    lecture: '4 min',
    featured: false,
    tag: 'Cadeaux',
  },
  {
    id: '6',
    categorie: 'Lifestyle',
    titre: 'Soirée réussie : de la tenue aux petits plats',
    extrait: 'Comment s\'habiller et dresser une belle table en une heure grâce à LIVRR, pour une soirée parfaite.',
    auteur: 'Équipe LIVRR',
    date: '1 avril 2026',
    lecture: '6 min',
    featured: false,
    tag: 'Événements',
  },
];

const CATEGORIES = ['Tous', 'Tendances', 'Idées cadeaux', 'Lifestyle'];

const COULEURS_TAGS = {
  Mode: { bg: '#EEF4FF', text: '#185FA5' },
  Beauté: { bg: '#FDF0F5', text: '#8B3258' },
  Paris: { bg: '#F0F9F4', text: '#2D6A4F' },
  Cadeaux: { bg: '#FFF8E8', text: '#A07840' },
  Événements: { bg: '#F5F0FF', text: '#534AB7' },
};

export default function Blog() {
  const [categorieActive, setCategorieActive] = useState('Tous');

  const articlesFiltres = ARTICLES.filter(
    a => categorieActive === 'Tous' || a.categorie === categorieActive
  );

  const featured = ARTICLES.find(a => a.featured);
  const reste = articlesFiltres.filter(a => !a.featured || categorieActive !== 'Tous');

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Magazine</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Article featured (visible seulement sur "Tous") */}
        {categorieActive === 'Tous' && featured && (
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => router.push(`/blog/${featured.id}`)}
          >
            <View style={styles.featuredImage}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>À LA UNE</Text>
              </View>
            </View>
            <View style={styles.featuredContent}>
              <View style={styles.tagRow}>
                <View style={[
                  styles.tag,
                  { backgroundColor: COULEURS_TAGS[featured.tag]?.bg || '#F9F7F4' }
                ]}>
                  <Text style={[
                    styles.tagText,
                    { color: COULEURS_TAGS[featured.tag]?.text || colors.textSecondary }
                  ]}>
                    {featured.tag}
                  </Text>
                </View>
                <Text style={styles.articleMeta}>{featured.lecture} de lecture</Text>
              </View>
              <Text style={styles.featuredTitre}>{featured.titre}</Text>
              <Text style={styles.featuredExtrait} numberOfLines={2}>{featured.extrait}</Text>
              <Text style={styles.featuredDate}>{featured.date}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Filtres catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
        >
          {CATEGORIES.map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.catChip, categorieActive === c && styles.catChipActif]}
              onPress={() => setCategorieActive(c)}
            >
              <Text style={[styles.catChipText, categorieActive === c && styles.catChipTextActif]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste articles */}
        <View style={styles.liste}>
          {reste.map(a => (
            <TouchableOpacity
              key={a.id}
              style={styles.articleCard}
              onPress={() => router.push(`/blog/${a.id}`)}
            >
              <View style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.tagRow}>
                  <View style={[
                    styles.tag,
                    { backgroundColor: COULEURS_TAGS[a.tag]?.bg || '#F9F7F4' }
                  ]}>
                    <Text style={[
                      styles.tagText,
                      { color: COULEURS_TAGS[a.tag]?.text || colors.textSecondary }
                    ]}>
                      {a.tag}
                    </Text>
                  </View>
                  <Text style={styles.articleMeta}>{a.lecture}</Text>
                </View>
                <Text style={styles.articleTitre} numberOfLines={2}>{a.titre}</Text>
                <Text style={styles.articleExtrait} numberOfLines={2}>{a.extrait}</Text>
                <Text style={styles.articleDate}>{a.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section idées cadeaux (thématique) */}
        {categorieActive === 'Tous' && (
          <View style={styles.themeSection}>
            <View style={styles.themeSectionHeader}>
              <Text style={styles.themeSectionTitre}>Idées pour chaque occasion</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: layout.screenPadding }}>
              {[
                { label: 'Fête des mères', icon: '✦', couleur: colors.backgroundDark },
                { label: 'Anniversaire', icon: '◈', couleur: '#8B3258' },
                { label: 'Saint-Valentin', icon: '◉', couleur: '#A07840' },
                { label: 'Soirée', icon: '§', couleur: '#185FA5' },
              ].map(t => (
                <TouchableOpacity
                  key={t.label}
                  style={[styles.themeCard, { backgroundColor: t.couleur }]}
                >
                  <Text style={styles.themeIcon}>{t.icon}</Text>
                  <Text style={styles.themeLabel}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
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

  // Featured
  featuredCard: {
    marginHorizontal: layout.screenPadding, marginTop: spacing.lg,
    marginBottom: spacing.md, borderRadius: radius.xl,
    borderWidth: 0.5, borderColor: colors.border, overflow: 'hidden',
    ...shadows.soft,
  },
  featuredImage: {
    height: 200, backgroundColor: colors.backgroundDark,
    justifyContent: 'flex-end', padding: spacing.lg,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    backgroundColor: colors.gold, borderRadius: radius.sm,
  },
  featuredBadgeText: { fontSize: 9, color: colors.backgroundDark, letterSpacing: 1 },
  featuredContent: { padding: spacing.lg },
  featuredTitre: {
    fontSize: 18, fontWeight: '400', color: colors.textPrimary,
    lineHeight: 26, marginBottom: spacing.sm,
  },
  featuredExtrait: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.sm },
  featuredDate: { fontSize: 11, color: colors.textMuted },

  // Filtres
  categoriesRow: { paddingLeft: layout.screenPadding, paddingVertical: spacing.lg },
  catChip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginRight: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  catChipActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  catChipText: { fontSize: 13, color: colors.textSecondary },
  catChipTextActif: { color: colors.gold },

  // Tag
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  tag: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  tagText: { fontSize: 11, fontWeight: '400' },
  articleMeta: { fontSize: 11, color: colors.textMuted },

  // Articles
  liste: { paddingHorizontal: layout.screenPadding },
  articleCard: {
    flexDirection: 'row', marginBottom: spacing.lg,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden', backgroundColor: colors.background,
    ...shadows.soft,
  },
  articleImage: { width: 110, backgroundColor: colors.backgroundSoft },
  articleContent: { flex: 1, padding: spacing.md },
  articleTitre: {
    fontSize: 14, fontWeight: '400', color: colors.textPrimary,
    lineHeight: 20, marginBottom: 4,
  },
  articleExtrait: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, marginBottom: spacing.sm },
  articleDate: { fontSize: 11, color: colors.textMuted },

  // Thèmes
  themeSection: { marginBottom: spacing.xl },
  themeSectionHeader: { paddingHorizontal: layout.screenPadding, marginBottom: spacing.md },
  themeSectionTitre: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3 },
  themeCard: {
    width: 120, height: 80, borderRadius: radius.lg,
    marginRight: spacing.md, padding: spacing.md,
    justifyContent: 'space-between',
  },
  themeIcon: { fontSize: 18, color: colors.gold },
  themeLabel: { fontSize: 13, color: colors.textLight, fontWeight: '400' },
});