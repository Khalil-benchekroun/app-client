import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../../constants/theme';

export default function Login() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LIVRR</Text>
        <Text style={styles.tagline}>L'élégance du local, la précision du digital</Text>
      </View>

      {/* Formulaire */}
      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="votre@email.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.loginBtnText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push('/(auth)/inscription')}
        >
          <Text style={styles.registerBtnText}>Créer un compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.skipBtnText}>Explorer sans compte</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.backgroundDark,
  },
  logo: {
    fontSize: 32,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 10,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: 12,
    color: colors.textLight,
    opacity: 0.6,
    letterSpacing: 1,
    textAlign: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  form: {
    padding: layout.screenPadding,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 1,
    marginBottom: spacing.xxl,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotText: {
    fontSize: 13,
    color: colors.gold,
  },
  loginBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  loginBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 2,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
  },
  registerBtn: {
    height: 52,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  registerBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  skipBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  skipBtnText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});