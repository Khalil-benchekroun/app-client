import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../constants/theme';

export default function CGU() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>CGU / CGV</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.date}>Version en vigueur — Février 2026</Text>

          <Text style={styles.sectionTitle}>1. Présentation de LIVRR</Text>
          <Text style={styles.text}>
            LIVRR est une plateforme de mise en relation entre des boutiques partenaires et des clients souhaitant recevoir leurs achats en livraison express le jour même. LIVRR n'est pas vendeur des produits proposés sur la plateforme.
          </Text>

          <Text style={styles.sectionTitle}>2. Conditions d'utilisation</Text>
          <Text style={styles.text}>
            L'utilisation de l'application LIVRR est réservée aux personnes majeures. En créant un compte, vous certifiez avoir plus de 18 ans et acceptez l'ensemble des présentes conditions générales d'utilisation.
          </Text>

          <Text style={styles.sectionTitle}>3. Commandes et paiement</Text>
          <Text style={styles.text}>
            Les commandes sont passées directement auprès des boutiques partenaires via la plateforme LIVRR. Le paiement est sécurisé par Monetico (CIC). Les fonds sont encaissés par LIVRR et reversés aux boutiques après expiration du délai de retour.
          </Text>

          <Text style={styles.sectionTitle}>4. Livraison</Text>
          <Text style={styles.text}>
            Les délais de livraison affichés sont des estimations non contractuelles. LIVRR s'engage à mettre tout en œuvre pour respecter ces délais mais ne peut être tenu responsable en cas de retard dû à des circonstances exceptionnelles.
          </Text>

          <Text style={styles.sectionTitle}>5. Retours et remboursements</Text>
          <Text style={styles.text}>
            Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour initier un retour. Les remboursements sont effectués sous 3 à 5 jours ouvrés après validation du retour par la boutique.
          </Text>

          <Text style={styles.sectionTitle}>6. Données personnelles</Text>
          <Text style={styles.text}>
            LIVRR collecte et traite vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD). Vous disposez d'un droit d'accès, de rectification et de suppression de vos données depuis votre espace profil.
          </Text>

          <Text style={styles.sectionTitle}>7. Contact</Text>
          <Text style={styles.text}>
            Pour toute question relative aux présentes CGU/CGV, vous pouvez contacter notre équipe via le centre d'aide de l'application ou par email à contact@livrr.fr
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© LIVRR 2026 — Tous droits réservés</Text>
            <Text style={styles.footerText}>livrr.fr · livrr.app</Text>
          </View>
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
  content: {
    padding: layout.screenPadding,
  },
  date: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  text: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    marginTop: spacing.xxl,
    paddingTop: spacing.lg,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
});