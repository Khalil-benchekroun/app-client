import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../../constants/theme';

export default function Confirmation() {
  return (
    <View style={styles.container}>

      {/* Animation succès */}
      <View style={styles.successContainer}>
        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✦</Text>
        </View>
        <Text style={styles.successTitle}>Commande confirmée</Text>
        <Text style={styles.successSub}>Votre commande a été transmise à la boutique</Text>
      </View>

      {/* Détails commande */}
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Numéro de commande</Text>
          <Text style={styles.cardValue}>#LVR-2024-0042</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Boutique</Text>
          <Text style={styles.cardValue}>Boutique Parisienne</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Délai estimé</Text>
          <Text style={[styles.cardValue, { color: colors.gold }]}>45 minutes</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Total payé</Text>
          <Text style={styles.cardValue}>344,90 €</Text>
        </View>
        <View style={styles.cardDivider} />
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Adresse</Text>
          <Text style={[styles.cardValue, { maxWidth: 180, textAlign: 'right' }]}>
            12 Rue du Faubourg Saint-Honoré, Paris
          </Text>
        </View>
      </View>

      {/* Statut */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Suivi en temps réel</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: colors.gold }]} />
          <Text style={styles.statusText}>En attente d'acceptation par la boutique</Text>
        </View>
        <Text style={styles.statusInfo}>Vous serez notifié à chaque étape de votre livraison</Text>
      </View>

      {/* Boutons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push('/commandes')}
        >
          <Text style={styles.primaryBtnText}>Suivre ma commande</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.secondaryBtnText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 80,
    paddingHorizontal: layout.screenPadding,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  successIcon: {
    fontSize: 32,
    color: colors.gold,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  successSub: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: layout.cardPadding,
    marginBottom: spacing.lg,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  cardLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cardValue: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  cardDivider: {
    height: 0.5,
    backgroundColor: colors.border,
  },
  statusCard: {
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
    padding: layout.cardPadding,
    marginBottom: spacing.xxl,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.8,
  },
  statusInfo: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.5,
    marginTop: spacing.sm,
  },
  buttons: {
    gap: spacing.md,
  },
  primaryBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  secondaryBtn: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});