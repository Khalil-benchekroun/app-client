import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { colors, spacing, radius, layout } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

// ⚠️ Remplace par tes vraies clés Google (Google Cloud Console)
const GOOGLE_CLIENT_ID_IOS = 'VOTRE_IOS_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID_ANDROID = 'VOTRE_ANDROID_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID_WEB = 'VOTRE_WEB_CLIENT_ID.apps.googleusercontent.com';

export default function Login() {
  const { login, loginSocial } = useAuth();

  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Google Auth ──────────────────────────────────────────
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_CLIENT_ID_IOS,
    androidClientId: GOOGLE_CLIENT_ID_ANDROID,
    webClientId: GOOGLE_CLIENT_ID_WEB,
  });

  const handleGoogle = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        // Plus tard : récupérer le profil via result.authentication.accessToken
        // Pour l'instant : on crée un user minimal
        await loginSocial({ email: '', prenom: '', nom: '' });
        router.replace('/(tabs)');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Connexion Google impossible. Réessayez.');
    }
  };

  // ── Apple Auth (iOS uniquement) ──────────────────────────
  const handleApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      await loginSocial({
        email: credential.email || '',
        prenom: credential.fullName?.givenName || '',
        nom: credential.fullName?.familyName || '',
      });
      router.replace('/(tabs)');
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Erreur', 'Connexion Apple impossible. Réessayez.');
      }
    }
  };

  // ── Email / mot de passe ─────────────────────────────────
  const handleLogin = async () => {
    if (!email || !motDePasse) {
      Alert.alert('', 'Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    try {
      // À remplacer plus tard par : supabase.auth.signInWithPassword({ email, password })
      await login(email, motDePasse);
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Erreur', 'Connexion impossible. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LIVRR</Text>
        <Text style={styles.tagline}>L'élégance du local, la précision du digital</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Connexion</Text>

        {/* ── Boutons sociaux ── */}
        <View style={styles.sociauxRow}>

          {/* Google */}
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={handleGoogle}
            disabled={!request}
          >
            <Text style={styles.socialBtnIcon}>G</Text>
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          {/* Apple — uniquement sur iOS */}
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.socialBtn, styles.socialBtnApple]}
              onPress={handleApple}
            >
              <Text style={[styles.socialBtnIcon, { color: colors.textLight }]}></Text>
              <Text style={[styles.socialBtnText, { color: colors.textLight }]}>Apple</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou par email</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* ── Formulaire email ── */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="votre@email.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={motDePasse}
            onChangeText={setMotDePasse}
          />
        </View>

        <TouchableOpacity
          style={styles.forgotBtn}
          onPress={() => router.push('/(auth)/mot-de-passe-oublie')}
        >
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginBtnText}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Text>
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
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.backgroundDark,
  },
  logo: { fontSize: 32, fontWeight: '400', color: colors.gold, letterSpacing: 10, marginBottom: spacing.sm },
  tagline: { fontSize: 12, color: colors.textLight, opacity: 0.6, letterSpacing: 1, textAlign: 'center', paddingHorizontal: layout.screenPadding },
  form: { padding: layout.screenPadding, paddingTop: spacing.xxl },
  title: { fontSize: 24, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1, marginBottom: spacing.xl },

  // Boutons sociaux
  sociauxRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  socialBtn: {
    flex: 1, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.backgroundSoft, gap: spacing.sm,
  },
  socialBtnApple: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  socialBtnIcon: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  socialBtnText: { fontSize: 14, color: colors.textPrimary, fontWeight: '400' },

  // Divider
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  dividerLine: { flex: 1, height: 0.5, backgroundColor: colors.border },
  dividerText: { fontSize: 12, color: colors.textMuted, paddingHorizontal: spacing.md },

  // Formulaire
  inputGroup: { marginBottom: spacing.lg },
  inputLabel: { fontSize: 12, color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.sm, textTransform: 'uppercase' },
  input: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary, backgroundColor: colors.backgroundSoft,
  },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: spacing.xl },
  forgotText: { fontSize: 13, color: colors.gold },
  loginBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
  },
  loginBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 2 },
  registerBtn: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  registerBtnText: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },
  skipBtn: { height: 44, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxxl },
  skipBtnText: { fontSize: 13, color: colors.textMuted },
});