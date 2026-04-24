import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

export default function Paiement() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Paiement</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Récap montant */}
        <View style={styles.montantCard}>
          <Text style={styles.montantLabel}>Total à payer</Text>
          <Text style={styles.montantValue}>344,90 €</Text>
          <Text style={styles.montantSub}>2 articles · Boutique Parisienne</Text>
        </View>

        {/* Moyens de paiement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moyen de paiement</Text>

          {/* Carte bancaire */}
          <TouchableOpacity style={[styles.methodCard, styles.methodSelected]}>
            <Text style={styles.methodIcon}>◈</Text>
            <Text style={styles.methodLabel}>Carte bancaire</Text>
            <View style={styles.selectedDot} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodCard}>
            <Text style={styles.methodIcon}>◎</Text>
            <Text style={styles.methodLabel}>Apple Pay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.methodCard}>
            <Text style={styles.methodIcon}>✦</Text>
            <Text style={styles.methodLabel}>Google Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Formulaire carte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations carte</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Numéro de carte</Text>
            <TextInput
              style={styles.input}
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Titulaire</Text>
            <TextInput
              style={styles.input}
              placeholder="NOM PRÉNOM"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
              <Text style={styles.inputLabel}>Expiration</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="•••"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* Sécurité */}
        <View style={styles.securityRow}>
          <Text style={styles.securityIcon}>◉</Text>
          <Text style={styles.securityText}>Paiement sécurisé par Monetico — vos données sont chiffrées</Text>
        </View>

      </ScrollView>

      {/* Bouton confirmer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => router.push('/commande/confirmation')}
        >
          <Text style={styles.confirmBtnText}>Confirmer le paiement</Text>
          <Text style={styles.confirmBtnPrice}>344,90 €</Text>
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
    letterSpacing: 1,
  },
  montantCard: {
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.backgroundDark,
  },
  montantLabel: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.6,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  montantValue: {
    fontSize: 36,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  montantSub: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.5,
  },
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundSoft,
  },
  methodSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.background,
  },
  methodIcon: {
    fontSize: 16,
    color: colors.gold,
    marginRight: spacing.md,
  },
  methodLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    height: 52,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundSoft,
  },
  row: {
    flexDirection: 'row',
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
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  confirmBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundDark,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  confirmBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  confirmBtnPrice: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textLight,
  },
});