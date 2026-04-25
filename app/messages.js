import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const conversations = [
  {
    id: '1',
    type: 'boutique',
    nom: 'Boutique Parisienne',
    dernier: 'Oui, le sac cuir est disponible en noir et en cognac.',
    heure: 'Il y a 5 min',
    nonLu: 1,
    boutiqueId: '1',
    en_ligne: true,
  },
  {
    id: '2',
    type: 'boutique',
    nom: 'Maison Dorée',
    dernier: 'Votre commande est prête pour la livraison.',
    heure: 'Hier',
    nonLu: 0,
    boutiqueId: '2',
    en_ligne: false,
  },
  {
    id: '3',
    type: 'sav',
    nom: 'Service Client LIVRR',
    dernier: 'Votre remboursement a bien été effectué.',
    heure: 'Il y a 3 jours',
    nonLu: 0,
    en_ligne: true,
  },
  {
    id: '4',
    type: 'boutique',
    nom: 'Élégance & Co.',
    dernier: 'Bien sûr, je vous envoie les photos du modèle.',
    heure: 'Il y a 1 sem.',
    nonLu: 0,
    boutiqueId: '4',
    en_ligne: false,
  },
];

function AvatarLetter({ lettre, type, en_ligne }) {
  return (
    <View style={styles.avatarWrapper}>
      <View style={[styles.avatar, type === 'sav' && styles.avatarSAV]}>
        <Text style={styles.avatarText}>{lettre}</Text>
      </View>
      {en_ligne && <View style={[styles.onlineBadge, type === 'sav' && styles.onlineBadgeSAV]} />}
    </View>
  );
}

export default function Messages() {
  const boutiqueConvs = conversations.filter(c => c.type === 'boutique');
  const savConvs = conversations.filter(c => c.type === 'sav');

  const handleOpen = (conv) => {
    router.push({
      pathname: '/chat',
      params: {
        type: conv.type,
        boutiqueName: conv.nom,
        boutiqueId: conv.boutiqueId,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* SAV LIVRR */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SERVICE CLIENT</Text>
          {savConvs.map((conv) => (
            <TouchableOpacity
              key={conv.id}
              style={styles.convCard}
              onPress={() => handleOpen(conv)}
            >
              <AvatarLetter lettre="L" type="sav" en_ligne={conv.en_ligne} />
              <View style={styles.convBody}>
                <View style={styles.convTop}>
                  <Text style={styles.convNom}>{conv.nom}</Text>
                  <Text style={styles.convHeure}>{conv.heure}</Text>
                </View>
                <View style={styles.convBottom}>
                  <Text style={styles.convDernier} numberOfLines={1}>{conv.dernier}</Text>
                  {conv.nonLu > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{conv.nonLu}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Boutiques */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>BOUTIQUES</Text>
          {boutiqueConvs.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyTitle}>Aucune conversation</Text>
              <Text style={styles.emptySub}>
                Visitez une boutique et contactez-la directement.
              </Text>
            </View>
          ) : (
            boutiqueConvs.map((conv) => (
              <TouchableOpacity
                key={conv.id}
                style={styles.convCard}
                onPress={() => handleOpen(conv)}
              >
                <AvatarLetter lettre={conv.nom[0]} type="boutique" en_ligne={conv.en_ligne} />
                <View style={styles.convBody}>
                  <View style={styles.convTop}>
                    <Text style={styles.convNom}>{conv.nom}</Text>
                    <Text style={styles.convHeure}>{conv.heure}</Text>
                  </View>
                  <View style={styles.convBottom}>
                    <Text style={styles.convDernier} numberOfLines={1}>{conv.dernier}</Text>
                    {conv.nonLu > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{conv.nonLu}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>◎</Text>
          <Text style={styles.infoText}>
            Pour toute question sur une livraison ou un remboursement, contactez le{' '}
            <Text
              style={styles.infoLink}
              onPress={() => router.push('/contact')}
            >
              SAV LIVRR
            </Text>
            . Pour toute question sur un produit ou une boutique, contactez directement la boutique.
          </Text>
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
  sectionLabel: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  convCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderLight,
  },
  avatarWrapper: {
    position: 'relative',
    flexShrink: 0,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  avatarSAV: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.gold,
  },
  avatarText: {
    fontSize: 18,
    color: colors.gold,
    fontWeight: '400',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.background,
  },
  onlineBadgeSAV: {
    backgroundColor: colors.gold,
  },
  convBody: {
    flex: 1,
  },
  convTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  convNom: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  convHeure: {
    fontSize: 11,
    color: colors.textMuted,
  },
  convBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  convDernier: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    color: colors.backgroundDark,
    fontWeight: '400',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  emptyIcon: {
    fontSize: 24,
    color: colors.gold,
    opacity: 0.4,
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    gap: spacing.sm,
    marginBottom: spacing.xxxl,
  },
  infoIcon: {
    fontSize: 13,
    color: colors.gold,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  infoLink: {
    color: colors.gold,
    textDecorationLine: 'underline',
  },
});