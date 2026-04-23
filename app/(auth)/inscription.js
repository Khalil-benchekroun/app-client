import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { colors, spacing, radius, layout } from '../../constants/theme';

export default function Inscription() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>LIVRR</Text>
        <Text style={styles.tagline}>L'élégance du local, la précision du digital</Text>
      </View>

      {/* Formulaire */}
      <View style={styles.form}>
        <Text style={styles.title}>Créer un compte</Text>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={colors.textMuted}
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
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Téléphone</Text>
          <TextInput
            style={styles.input}
            placeholder="+33 6 00 00 00 00"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date de naissance</Text>
          <TextInput
            style={styles.input}
            placeholder="JJ/MM/AAAA"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
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

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            secureTextEntry
          />
        </View>

        {/* CGU */}
        <TouchableOpacity style={styles.cguRow}>
          <View style={styles.checkbox} />
          <Text style={styles.cguText}>
            J'accepte les <Text style={styles.cguLink}>CGU</Text> et la <Text style={styles.cguLink}>politique de confidentialité</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Créer mon compte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Déjà un compte ? Se connecter</Text>
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
  row: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
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
  cguRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 4,
    marginTop: 2,
  },
  cguText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  cguLink: {
    color: colors.gold,
  },
  registerBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  registerBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 2,
  },
  loginBtn: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  loginBtnText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});