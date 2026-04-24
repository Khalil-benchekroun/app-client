import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const adressesSauvegardees = [
  { id: '1', label: 'Domicile', adresse: '12 Rue du Faubourg Saint-Honoré, 75008 Paris' },
  { id: '2', label: 'Bureau', adresse: '25 Avenue Montaigne, 75008 Paris' },
  { id: '3', label: 'Hôtel', adresse: '15 Place Vendôme, 75001 Paris' },
];

export default function Adresse() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Adresse de livraison</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Recherche */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>◎</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Saisir une adresse..."
              placeholderTextColor={colors.textMuted}
              autoFocus
            />
          </View>

          {/* Position actuelle */}
          <TouchableOpacity
            style={styles.gpsBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.gpsIcon}>✦</Text>
            <View>
              <Text style={styles.gpsBtnText}>Utiliser ma position actuelle</Text>
              <Text style={styles.gpsBtnSub}>GPS — Paris 8ème</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Adresses sauvegardées */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresses enregistrées</Text>
          {adressesSauvegardees.map((adresse) => (
            <TouchableOpacity
              key={adresse.id}
              style={styles.adresseCard}
              onPress={() => router.back()}
            >
              <View style={styles.adresseIcon}>
                <Text style={styles.adresseIconText}>◎</Text>
              </View>
              <View style={styles.adresseInfo}>
                <Text style={styles.adresseLabel}>{adresse.label}</Text>
                <Text style={styles.adresseText}>{adresse.adresse}</Text>
              </View>
              <Text style={styles.adresseArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Explorer sans adresse */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.exploreBtnText}>Explorer sans adresse</Text>
            <Text style={styles.exploreBtnSub}>Les délais s'afficheront après saisie</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    letterSpacing: 0.5,
  },
  searchSection: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  searchIcon: {
    fontSize: 16,
    color: colors.gold,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  gpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    gap: spacing.md,
  },
  gpsIcon: {
    fontSize: 18,
    color: colors.gold,
  },
  gpsBtnText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  gpsBtnSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  adresseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    ...shadows.soft,
  },
  adresseIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  adresseIconText: {
    fontSize: 14,
    color: colors.gold,
  },
  adresseInfo: {
    flex: 1,
  },
  adresseLabel: {
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
  adresseArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
  exploreBtn: {
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  exploreBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  exploreBtnSub: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});