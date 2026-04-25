import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../constants/theme';

const faqs = [
  {
    id: '1',
    question: 'Comment fonctionne la livraison ?',
    reponse: 'LIVRR connecte les boutiques partenaires avec des livreurs professionnels. Une fois votre commande acceptée par la boutique, un livreur prend en charge votre colis et vous le livre en moins d\'une heure.',
  },
  {
    id: '2',
    question: 'Quels sont les délais de livraison ?',
    reponse: 'Nous proposons une livraison express en moins d\'une heure, une livraison J0 dans la journée, et une livraison programmée selon vos disponibilités.',
  },
  {
    id: '3',
    question: 'Comment retourner un article ?',
    reponse: 'Vous avez 14 jours pour initier un retour depuis votre espace commandes. Le livreur viendra récupérer l\'article à votre adresse. Le remboursement est effectué sous 3 à 5 jours ouvrés.',
  },
  {
    id: '4',
    question: 'Quels moyens de paiement sont acceptés ?',
    reponse: 'Nous acceptons les cartes bancaires (Visa, Mastercard), Apple Pay et Google Pay. Les paiements sont sécurisés par Monetico.',
  },
  {
    id: '5',
    question: 'Comment fonctionne le programme de fidélité ?',
    reponse: 'Vous cumulez des points à chaque commande. Ces points peuvent être convertis en réductions sur vos prochains achats. Les membres Premium bénéficient de points doublés.',
  },
  {
    id: '6',
    question: 'Qu\'est-ce que LIVRR Premium ?',
    reponse: 'LIVRR Premium est notre abonnement exclusif. Il donne accès à la livraison gratuite, des remises exclusives, l\'accès prioritaire aux nouvelles boutiques et des points de fidélité doublés.',
  },
];

export default function FAQ() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Aide & FAQ</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Contact SAV */}
        <View style={styles.savSection}>
          <Text style={styles.savTitle}>Besoin d'aide ?</Text>
          <Text style={styles.savSub}>Notre équipe est disponible 7j/7 de 9h à 20h</Text>
          <TouchableOpacity
            style={styles.savBtn}
            onPress={() => router.push('/contact')}
          >
            <Text style={styles.savBtnText}>Contacter le SAV</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqReponse}>{faq.reponse}</Text>
            </View>
          ))}
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
  savSection: {
    margin: layout.screenPadding,
    padding: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  savTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  savSub: {
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  savBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.gold,
    borderRadius: radius.full,
  },
  savBtnText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.backgroundDark,
    letterSpacing: 0.5,
  },
  section: {
    padding: layout.screenPadding,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.lg,
  },
  faqCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  faqReponse: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});