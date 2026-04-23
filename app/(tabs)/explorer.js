import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, layout } from '../../constants/theme';

export default function Explorer() {
  const sections = [
    { titre: 'Mode', items: ['Robes', 'Manteaux', 'Chaussures', 'Sacs'] },
    { titre: 'Beauté', items: ['Soins', 'Parfums', 'Maquillage'] },
    { titre: 'Lifestyle', items: ['Épicerie fine', 'Déco', 'Cadeaux'] },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
        <Text style={styles.subtitle}>Découvrez nos boutiques partenaires</Text>
      </View>

      {/* Recherche */}
      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchIcon}>✦</Text>
        <Text style={styles.searchText}>Rechercher un produit, une boutique...</Text>
      </TouchableOpacity>

      {/* Sélections */}
      <View style={styles.selectionsRow}>
        {['Nouveautés', 'Coups de cœur', 'Tendances'].map((s) => (
          <TouchableOpacity key={s} style={styles.selectionCard}>
            <View style={styles.selectionImage} />
            <Text style={styles.selectionLabel}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sections par catégorie */}
      {sections.map((section) => (
        <View key={section.titre} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.titre}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.itemsRow}>
            {section.items.map((item) => (
              <TouchableOpacity key={item} style={styles.itemCard}>
                <View style={styles.itemImage} />
                <Text style={styles.itemLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  searchIcon: {
    fontSize: 14,
    color: colors.gold,
    marginRight: spacing.sm,
  },
  searchText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  selectionsRow: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  selectionCard: {
    flex: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  selectionImage: {
    height: 80,
    backgroundColor: colors.backgroundSoft,
  },
  selectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textPrimary,
    padding: spacing.sm,
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.textPrimary,
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  itemsRow: {
    paddingLeft: layout.screenPadding,
  },
  itemCard: {
    width: 110,
    marginRight: spacing.md,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  itemImage: {
    height: 110,
    backgroundColor: colors.backgroundSoft,
  },
  itemLabel: {
    fontSize: 12,
    color: colors.textPrimary,
    padding: spacing.sm,
    letterSpacing: 0.3,
  },
});