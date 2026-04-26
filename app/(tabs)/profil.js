import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { icon: '◎', label: 'Mes adresses', route: '/adresse' },
  { icon: '◈', label: 'Moyens de paiement', route: '/paiements' },
  { icon: '✦', label: 'Mes favoris', route: '/favoris' },
  { icon: '◉', label: 'Notifications', route: '/notifications' },
  { icon: '§', label: 'Messages', route: '/messages' },
  { icon: '◈', label: 'Parrainage', route: '/parrainage' },
  { icon: '◈', label: 'Fidélité & points', route: '/fidelite' },
  { icon: '✦', label: 'Jeux & concours', route: '/jeux' },
  { icon: '◈', label: 'Services & réservations', route: '/reservations' },
  { icon: '◈', label: 'Scanner QR boutique', route: '/qrcode' },
  { icon: '?', label: 'Aide & FAQ', route: '/faq' },
  { icon: '§', label: 'CGU / CGV', route: '/cgu' },
];

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <View style={styles.header}>
        <Text style={styles.title}>Mon profil</Text>
      </View>

      {/* Avatar + infos */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initiale}</Text>
        </View>
        <Text style={styles.userName}>{displayName}</Text>
        {user?.email ? (
          <Text style={styles.userEmail}>{user.email}</Text>
        ) : null}
        {isLoggedIn ? (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/edit-profil')}
          >
            <Text style={styles.editBtnText}>Modifier le profil</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.editBtnText}>Se connecter</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Premium */}
      <View style={styles.abonnementCard}>
        <View>
          <Text style={styles.abonnementTitle}>LIVRR Free</Text>
          <Text style={styles.abonnementSub}>Passez à Premium pour des avantages exclusifs</Text>
        </View>
        <TouchableOpacity
          style={styles.upgradeBtn}
          onPress={() => router.push('/premium')}
        >
          <Text style={styles.upgradeBtnText}>Premium</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => item.route && router.push(item.route)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Déconnexion — visible seulement si connecté */}
      {isLoggedIn ? (
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginText}>Se connecter / Créer un compte</Text>
        </TouchableOpacity>
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
  abonnementCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
    marginBottom: spacing.xl,
  },
  abonnementTitle: { fontSize: 15, fontWeight: '400', color: colors.textLight, marginBottom: 4 },
  abonnementSub: { fontSize: 11, color: colors.textLight, opacity: 0.6, maxWidth: 180 },
  upgradeBtn: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    backgroundColor: colors.gold, borderRadius: radius.full,
  },
  upgradeBtnText: { fontSize: 13, fontWeight: '400', color: colors.backgroundDark },
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
  menuLabel: { flex: 1, fontSize: 15, color: colors.textPrimary },
  menuArrow: { fontSize: 20, color: colors.textMuted },
  logoutBtn: {
    marginHorizontal: layout.screenPadding,
    padding: spacing.lg, alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoutText: { fontSize: 15, color: colors.error },
  loginText: { fontSize: 15, color: colors.gold },
});