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

WebBrowser.maybeCompleteAuthSession();

// ⚠️ Mêmes clés que dans login.js
const GOOGLE_CLIENT_ID_IOS = 'VOTRE_IOS_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID_ANDROID = 'VOTRE_ANDROID_CLIENT_ID.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID_WEB = 'VOTRE_WEB_CLIENT_ID.apps.googleusercontent.com';

export default function Inscription() {
  const [cguAccepted, setCguAccepted] = useState(false);
  const [dateNaissance, setDateNaissance] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [motDePasseConfirm, setMotDePasseConfirm] = useState('');

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
        // À brancher Supabase : récupérer le profil Google et créer le compte
        router.replace('/(tabs)');
      }
    } catch (e) {
      Alert.alert('Erreur', 'Inscription Google impossible. Réessayez.');
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
      // credential.fullName.givenName + familyName + email → créer compte Supabase
      router.replace('/(tabs)');
    } catch (e) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert('Erreur', 'Inscription Apple impossible. Réessayez.');
      }
    }
  };

  const formatDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else if (cleaned.length >= 5) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
    setDateNaissance(formatted);
  };

  const handleInscription = () => {
    if (!prenom || !nom || !email || !motDePasse) {
      Alert.alert('', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (motDePasse !== motDePasseConfirm) {
      Alert.alert('', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (!cguAccepted) {
      Alert.alert('', 'Veuillez accepter les CGU pour continuer.');
      return;
    }
    // À brancher Supabase : supabase.auth.signUp({ email, password, options: { data: { prenom, nom } } })
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LIVRR</Text>
        <Text style={styles.tagline}>L'élégance du local, la précision du digital</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Créer un compte</Text>

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

        {/* ── Formulaire ── */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              placeholderTextColor={colors.textMuted}
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={colors.textMuted}
              value={nom}
              onChangeText={setNom}
            />
          </View>
        </View>

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
          <Text style={styles.inputLabel}>Téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="+33 6 00 00 00 00"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date de naissance</Text>
          <TextInput
            style={styles.input}
            placeholder="JJ/MM/AAAA"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            value={dateNaissance}
            onChangeText={formatDate}
            maxLength={10}
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

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
          <TextInput
            style={[
              styles.input,
              motDePasseConfirm && motDePasse !== motDePasseConfirm && styles.inputError,
            ]}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
            value={motDePasseConfirm}
            onChangeText={setMotDePasseConfirm}
          />
          {motDePasseConfirm && motDePasse !== motDePasseConfirm && (
            <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
          )}
        </View>

        {/* CGU */}
        <TouchableOpacity
          style={styles.cguRow}
          onPress={() => setCguAccepted(!cguAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, cguAccepted && styles.checkboxChecked]}>
            {cguAccepted && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.cguText}>
            J'accepte les{' '}
            <Text style={styles.cguLink} onPress={() => router.push('/cgu')}>CGU</Text>
            {' '}et la{' '}
            <Text style={styles.cguLink}>politique de confidentialité</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.registerBtn, !cguAccepted && styles.registerBtnDisabled]}
          onPress={handleInscription}
          activeOpacity={cguAccepted ? 0.8 : 1}
        >
          <Text style={styles.registerBtnText}>Créer mon compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginBtnText}>Déjà un compte ? Se connecter</Text>
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

  // Sociaux
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
  row: { flexDirection: 'row', marginBottom: 0 },
  inputGroup: { marginBottom: spacing.lg },
  inputLabel: { fontSize: 12, color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.sm, textTransform: 'uppercase' },
  input: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary, backgroundColor: colors.backgroundSoft,
  },
  inputError: { borderColor: colors.error },
  errorText: { fontSize: 12, color: colors.error, marginTop: spacing.xs },

  // CGU
  cguRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xl, gap: spacing.sm },
  checkbox: {
    width: 22, height: 22, borderWidth: 1, borderColor: colors.border,
    borderRadius: 4, marginTop: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.backgroundSoft, flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: colors.backgroundDark, borderColor: colors.gold },
  checkmark: { fontSize: 13, color: colors.gold, fontWeight: '400' },
  cguText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  cguLink: { color: colors.gold },

  // Boutons
  registerBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg,
  },
  registerBtnDisabled: { opacity: 0.4 },
  registerBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 2 },
  loginBtn: { height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xxxl },
  loginBtnText: { fontSize: 13, color: colors.textSecondary },
});