import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { icon: '◎', label: 'Mes adresses',           route: '/adresse' },
  { icon: '◈', label: 'Moyens de paiement',     route: '/paiements' },
  { icon: '✦', label: 'Mes favoris',             route: '/favoris' },
  { icon: '◉', label: 'Notifications',           route: '/notifications' },
  { icon: '§', label: 'Messages',                route: '/messages' },
  { icon: '◈', label: 'Parrainage',              route: '/parrainage' },
  { icon: '◈', label: 'Fidélité & points',       route: '/fidelite' },
  { icon: '✦', label: 'Jeux & concours',         route: '/jeux' },
  { icon: '◈', label: 'Services & réservations', route: '/reservations' },
  { icon: '◈', label: 'Scanner QR boutique',     route: '/qrcode' },
  { icon: '?', label: 'Aide & FAQ',              route: '/faq' },
  { icon: '§', label: 'CGU / CGV',               route: '/cgu' },
];

// Routes accessibles sans compte
const ITEMS_INVITES = ['/faq', '/cgu'];

export default function Profil() {
  const { user, isLoggedIn, displayName, initiale, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Se déconnecter ?',
      'Vous devrez vous reconnecter pour accéder à votre compte.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const handleMenuItem = (item) => {
    if (!isLoggedIn && !ITEMS_INVITES.includes(item.route)) {
      Alert.alert(
        'Connexion requise',
        'Créez un compte ou connectez-vous pour accéder à cette fonctionnalité.',
        [
          { text: 'Plus tard', style: 'cancel' },
          { text: 'Se connecter', onPress: () => router.push('/(auth)/login') },
        ]
      );
      return;
    }
    router.push(item.route);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Text style={styles.title}>Mon profil</Text>
      </View>

      {/* ── Mode invité ── */}
      {!isLoggedIn ? (
        <View style={styles.inviteSection}>
          <View style={styles.inviteAvatar}>
            <Text style={styles.inviteAvatarIcon}>◎</Text>
          </View>
          <Text style={styles.inviteTitre}>Vous naviguez en mode invité</Text>
          <Text style={styles.inviteSub}>
            Connectez-vous pour accéder à vos commandes, favoris,
            points de fidélité et bien plus.
          </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push('/(auth)/inscription')}
          >
            <Text style={styles.registerBtnText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* ── Mode connecté ── */
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initiale}</Text>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          {user?.email ? (
            <Text style={styles.userEmail}>{user.email}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/edit-profil')}
          >
            <Text style={styles.editBtnText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Premium */}
      <View style={styles.abonnementCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.abonnementTitle}>LIVRR Free</Text>
          <Text style={styles.abonnementSub}>
            Passez à Premium pour des avantages exclusifs
          </Text>
        </View>
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => isLoggedIn ? router.push('/premium') : router.push('/(auth)/login')}
        >
          <Text style={styles.upgradeBtnText}>Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Menu — items verrouillés si invité */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => {
          const verrouille = !isLoggedIn && !ITEMS_INVITES.includes(item.route);
          return (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => handleMenuItem(item)}
            >
              <Text style={[styles.menuIcon, verrouille && styles.menuIconLocked]}>
                {item.icon}
              </Text>
              <Text style={[styles.menuLabel, verrouille && styles.menuLabelLocked]}>
                {item.label}
              </Text>
              <Text style={styles.menuArrow}>
                {verrouille ? '⊘' : '›'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      {isLoggedIn ? (
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.inviteFooter}>
          <Text style={styles.inviteFooterText}>
            En créant un compte, vous acceptez nos{' '}
            <Text
              style={styles.inviteFooterLink}
              onPress={() => router.push('/cgu')}
            >
              CGU
            </Text>
          </Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  title: { fontSize: 28, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },

  // Invité
  inviteSection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    marginBottom: spacing.xl,
  },
  inviteAvatar: {
    width: 80, height: 80, borderRadius: radius.full,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1, borderColor: colors.border,
  },
  inviteAvatarIcon: { fontSize: 32, color: colors.textMuted },
  inviteTitre: {
    fontSize: 18, fontWeight: '400', color: colors.textPrimary,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  inviteSub: {
    fontSize: 13, color: colors.textSecondary, textAlign: 'center',
    lineHeight: 20, marginBottom: spacing.xl,
  },
  loginBtn: {
    width: '100%', height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  loginBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
  registerBtn: {
    width: '100%', height: 52,
    borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  registerBtnText: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },

  // Connecté
  avatarSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80, height: 80, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1, borderColor: colors.gold,
  },
  avatarText: { fontSize: 32, fontWeight: '400', color: colors.gold },
  userName: { fontSize: 20, fontWeight: '400', color: colors.textPrimary, marginBottom: 4 },
  userEmail: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg },
  editBtn: {
    paddingHorizontal: spacing.xl, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
  },
  editBtnText: { fontSize: 13, color: colors.textPrimary },

  // Premium
  abonnementCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
    marginBottom: spacing.xl,
  },
  abonnementTitle: { fontSize: 15, fontWeight: '400', color: colors.textLight, marginBottom: 4 },
  abonnementSub: { fontSize: 11, color: colors.textLight, opacity: 0.6, marginRight: spacing.md },
  upgradeBtn: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.gold, borderRadius: radius.full, flexShrink: 0,
  },
  upgradeBtnText: { fontSize: 13, fontWeight: '400', color: colors.backgroundDark },

  // Menu
  menuSection: {
    marginHorizontal: layout.screenPadding,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  menuIcon: { fontSize: 16, color: colors.gold, marginRight: spacing.md, width: 24 },
  menuIconLocked: { color: colors.textMuted },
  menuLabel: { flex: 1, fontSize: 15, color: colors.textPrimary },
  menuLabelLocked: { color: colors.textMuted },
  menuArrow: { fontSize: 18, color: colors.textMuted },

  // Footer
  logoutBtn: {
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg, alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoutText: { fontSize: 15, color: colors.error },
  inviteFooter: {
    padding: layout.screenPadding, alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  inviteFooterText: { fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  inviteFooterLink: { color: colors.gold },
});