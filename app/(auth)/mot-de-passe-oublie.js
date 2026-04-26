import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../../constants/theme';

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('');
  const [envoye, setEnvoye] = useState(false);

  const handleEnvoyer = () => {
    if (!email.trim()) {
      Alert.alert('', 'Veuillez entrer votre adresse email.');
      return;
    }
    // À brancher Supabase : supabase.auth.resetPasswordForEmail(email)
    setEnvoye(true);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        {!envoye ? (
          <>
            {/* Logo */}
            <Text style={styles.logo}>LIVRR</Text>

            <Text style={styles.title}>Mot de passe{'\n'}oublié ?</Text>
            <Text style={styles.sub}>
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </Text>

            {/* Input */}
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
                autoFocus
              />
            </View>

            <TouchableOpacity
              style={[styles.envoyerBtn, !email.trim() && styles.envoyerBtnDisabled]}
              onPress={handleEnvoyer}
            >
              <Text style={styles.envoyerBtnText}>Envoyer le lien</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.retourBtn} onPress={() => router.back()}>
              <Text style={styles.retourBtnText}>Retour à la connexion</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* État : email envoyé */}
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>

            <Text style={styles.title}>Email envoyé !</Text>
            <Text style={styles.sub}>
              Un lien de réinitialisation a été envoyé à{'\n'}
              <Text style={styles.emailHighlight}>{email}</Text>
              {'\n\n'}Vérifiez votre boîte mail et vos spams. Le lien est valable 24 heures.
            </Text>

            <TouchableOpacity
              style={styles.envoyerBtn}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={styles.envoyerBtnText}>Retour à la connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.retourBtn}
              onPress={() => { setEnvoye(false); setEmail(''); }}
            >
              <Text style={styles.retourBtnText}>Renvoyer un email</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundDark },
  header: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.md,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textLight },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
  },
  logo: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 8,
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    color: colors.textLight,
    letterSpacing: 0.5,
    lineHeight: 42,
    marginBottom: spacing.lg,
  },
  sub: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.6,
    lineHeight: 22,
    marginBottom: spacing.xxl,
  },
  emailHighlight: {
    color: colors.gold,
    opacity: 1,
  },
  inputGroup: { marginBottom: spacing.xl },
  inputLabel: {
    fontSize: 11,
    color: colors.textLight,
    opacity: 0.5,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  input: {
    height: 52,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.textLight,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  envoyerBtn: {
    height: 52,
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  envoyerBtnDisabled: { opacity: 0.4 },
  envoyerBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.backgroundDark,
    letterSpacing: 1,
  },
  retourBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retourBtnText: { fontSize: 13, color: colors.textLight, opacity: 0.5 },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  successIconText: { fontSize: 28, color: colors.gold },
});