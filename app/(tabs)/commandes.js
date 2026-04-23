import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';

const commandes = [
  { id: '1', boutique: 'Boutique Exemple', statut: 'En livraison', montant: '124,00 €', date: "Aujourd'hui 14:32", couleur: '#E8F5E9', textColor: '#2D6A4F' },
  { id: '2', boutique: 'Maison de Mode', statut: 'Livrée', montant: '89,00 €', date: 'Hier 11:15', couleur: colors.backgroundSoft, textColor: colors.textSecondary },
  { id: '3', boutique: 'Le Concept Store', statut: 'Livrée', montant: '210,00 €', date: '20 avr. 16:45', couleur: colors.backgroundSoft, textColor: colors.textSecondary },
];

export default function Commandes() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Commandes</Text>
        <Text style={styles.subtitle}>Suivez vos livraisons en temps réel</Text>
      </View>

      {/* En cours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>En cours</Text>
        {commandes.filter(c => c.statut === 'En livraison').map((commande) => (
          <TouchableOpacity key={commande.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.boutiqueName}>{commande.boutique}</Text>
              <View style={[styles.badge, { backgroundColor: commande.couleur }]}>
                <Text style={[styles.badgeText, { color: commande.textColor }]}>{commande.statut}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.date}>{commande.date}</Text>
              <Text style={styles.montant}>{commande.montant}</Text>
            </View>
            {/* Barre de progression */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Acceptée</Text>
              <Text style={styles.progressLabel}>En préparation</Text>
              <Text style={[styles.progressLabel, { color: colors.gold }]}>En livraison</Text>
              <Text style={styles.progressLabel}>Livrée</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Historique */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historique</Text>
        {commandes.filter(c => c.statut === 'Livrée').map((commande) => (
          <TouchableOpacity key={commande.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.boutiqueName}>{commande.boutique}</Text>
              <View style={[styles.badge, { backgroundColor: commande.couleur }]}>
                <Text style={[styles.badgeText, { color: commande.textColor }]}>{commande.statut}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.date}>{commande.date}</Text>
              <Text style={styles.montant}>{commande.montant}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  card: {
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    ...shadows.soft,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  boutiqueName: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  montant: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.borderLight,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.gold,
    borderRadius: radius.full,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
});