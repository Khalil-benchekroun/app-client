import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../constants/theme';

const notifications = [
  { id: '1', titre: 'Commande acceptée', description: 'Quand la boutique accepte votre commande', active: true },
  { id: '2', titre: 'En préparation', description: 'Quand la boutique prépare votre commande', active: true },
  { id: '3', titre: 'En livraison', description: 'Quand le livreur prend en charge votre commande', active: true },
  { id: '4', titre: 'Commande livrée', description: 'Quand votre commande est livrée', active: true },
  { id: '5', titre: 'Promotions', description: 'Offres spéciales et réductions', active: false },
  { id: '6', titre: 'Nouveautés', description: 'Nouvelles boutiques et produits', active: false },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Commandes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suivi de commande</Text>
          {notifications.slice(0, 4).map((notif) => (
            <View key={notif.id} style={styles.notifCard}>
              <View style={styles.notifInfo}>
                <Text style={styles.notifTitre}>{notif.titre}</Text>
                <Text style={styles.notifDescription}>{notif.description}</Text>
              </View>
              <Switch
                value={notif.active}
                trackColor={{ false: colors.border, true: colors.gold }}
                thumbColor={colors.background}
              />
            </View>
          ))}
        </View>

        {/* Marketing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing</Text>
          {notifications.slice(4).map((notif) => (
            <View key={notif.id} style={styles.notifCard}>
              <View style={styles.notifInfo}>
                <Text style={styles.notifTitre}>{notif.titre}</Text>
                <Text style={styles.notifDescription}>{notif.description}</Text>
              </View>
              <Switch
                value={notif.active}
                trackColor={{ false: colors.border, true: colors.gold }}
                thumbColor={colors.background}
              />
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
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  notifInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  notifTitre: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  notifDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});