import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const cartes = [
  { id: '1', type: 'Visa', numero: '**** **** **** 4242', expiration: '12/27', principale: true },
  { id: '2', type: 'Mastercard', numero: '**** **** **** 8888', expiration: '06/26', principale: false },
];

export default function Paiements() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Moyens de paiement</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Cartes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes cartes</Text>
          {cartes.map((carte) => (
            <View key={carte.id} style={[styles.carteCard, carte.principale && styles.carteCardPrincipale]}>
              <View style={styles.carteHeader}>
                <Text style={styles.carteType}>{carte.type}</Text>
                {carte.principale && (
                  <View style={styles.principalBadge}>
                    <Text style={styles.principalBadgeText}>Principale</Text>
                  </View>
                )}
              </View>
              <Text style={styles.carteNumero}>{carte.numero}</Text>
              <View style={styles.carteFooter}>
                <Text style={styles.carteExpiration}>Expire {carte.expiration}</Text>
                <TouchableOpacity>
                  <Text style={styles.supprimerText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Ajouter carte */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.ajouterBtn}>
            <Text style={styles.ajouterIcon}>+</Text>
            <Text style={styles.ajouterText}>Ajouter une carte</Text>
          </TouchableOpacity>
        </View>

        {/* Autres moyens */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres moyens</Text>
          <View style={styles.autresCard}>
            <TouchableOpacity style={styles.autreItem}>
              <Text style={styles.autreIcon}>◎</Text>
              <Text style={styles.autreLabel}>Apple Pay</Text>
              <Text style={styles.autreArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.autreItem}>
              <Text style={styles.autreIcon}>✦</Text>
              <Text style={styles.autreLabel}>Google Pay</Text>
              <Text style={styles.autreArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sécurité */}
        <View style={styles.securityRow}>
          <Text style={styles.securityIcon}>◉</Text>
          <Text style={styles.securityText}>Paiements sécurisés par Monetico — données chiffrées SSL</Text>
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
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  carteCard: {
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.md,
    ...shadows.soft,
  },
  carteCardPrincipale: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.gold,
  },
  carteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  carteType: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  principalBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
  },
  principalBadgeText: {
    fontSize: 10,
    color: colors.backgroundDark,
    fontWeight: '400',
  },
  carteNumero: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textLight,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  carteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carteExpiration: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.6,
  },
  supprimerText: {
    fontSize: 13,
    color: colors.error,
  },
  ajouterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    gap: spacing.sm,
  },
  ajouterIcon: {
    fontSize: 20,
    color: colors.gold,
  },
  ajouterText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '400',
  },
  autresCard: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  autreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  autreIcon: {
    fontSize: 16,
    color: colors.gold,
    marginRight: spacing.md,
    width: 24,
  },
  autreLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  autreArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
  divider: {
    height: 0.5,
    backgroundColor: colors.border,
    marginLeft: spacing.lg,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.screenPadding,
    gap: spacing.sm,
  },
  securityIcon: {
    fontSize: 14,
    color: colors.success,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});