import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../constants/theme';

// Données initiales (à brancher Supabase : supabase.auth.getUser())
const PROFIL_INITIAL = {
  prenom: 'Khalil',
  nom: 'Benchekroun',
  email: 'benchekrounkhalil10@gmail.com',
  telephone: '+33 6 00 00 00 00',
  dateNaissance: '01/01/1995',
};

export default function EditProfil() {
  const [prenom, setPrenom] = useState(PROFIL_INITIAL.prenom);
  const [nom, setNom] = useState(PROFIL_INITIAL.nom);
  const [email, setEmail] = useState(PROFIL_INITIAL.email);
  const [telephone, setTelephone] = useState(PROFIL_INITIAL.telephone);
  const [dateNaissance, setDateNaissance] = useState(PROFIL_INITIAL.dateNaissance);
  const [modifie, setModifie] = useState(false);

  const handleChange = (setter) => (val) => {
    setter(val);
    setModifie(true);
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
    setModifie(true);
  };

  const sauvegarder = () => {
    if (!prenom.trim() || !nom.trim() || !email.trim()) {
      Alert.alert('', 'Prénom, nom et email sont obligatoires.');
      return;
    }
    // À brancher Supabase : supabase.auth.updateUser({ data: { prenom, nom, telephone } })
    Alert.alert('✓ Profil mis à jour', 'Vos informations ont bien été enregistrées.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const changerMotDePasse = () => {
    router.push('/(auth)/mot-de-passe-oublie');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Modifier le profil</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{prenom[0]?.toUpperCase() || 'K'}</Text>
          </View>
          <TouchableOpacity style={styles.avatarEditBtn}>
            <Text style={styles.avatarEditText}>Changer la photo</Text>
          </TouchableOpacity>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
              <Text style={styles.inputLabel}>Prénom</Text>
              <TextInput
                style={styles.input}
                value={prenom}
                onChangeText={handleChange(setPrenom)}
                placeholder="Prénom"
                placeholderTextColor={colors.textMuted}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Nom</Text>
              <TextInput
                style={styles.input}
                value={nom}
                onChangeText={handleChange(setNom)}
                placeholder="Nom"
                placeholderTextColor={colors.textMuted}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={handleChange(setEmail)}
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
              value={telephone}
              onChangeText={handleChange(setTelephone)}
              placeholder="+33 6 00 00 00 00"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date de naissance</Text>
            <TextInput
              style={styles.input}
              value={dateNaissance}
              onChangeText={formatDate}
              placeholder="JJ/MM/AAAA"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* Changer mot de passe */}
          <TouchableOpacity style={styles.mdpBtn} onPress={changerMotDePasse}>
            <Text style={styles.mdpBtnText}>Changer le mot de passe</Text>
            <Text style={styles.mdpBtnArrow}>›</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.sauvegarderBtn, !modifie && styles.sauvegarderBtnDisabled]}
          onPress={sauvegarder}
          disabled={!modifie}
        >
          <Text style={styles.sauvegarderBtnText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding, paddingTop: 60, paddingBottom: spacing.lg,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.5 },
  avatarSection: {
    alignItems: 'center', paddingVertical: spacing.xl,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
  },
  avatar: {
    width: 80, height: 80, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gold, marginBottom: spacing.md,
  },
  avatarText: { fontSize: 32, color: colors.gold },
  avatarEditBtn: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.gold,
  },
  avatarEditText: { fontSize: 13, color: colors.gold },
  form: { padding: layout.screenPadding, paddingBottom: 120 },
  row: { flexDirection: 'row' },
  inputGroup: { marginBottom: spacing.lg },
  inputLabel: {
    fontSize: 11, color: colors.textSecondary,
    letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  input: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary, backgroundColor: colors.backgroundSoft,
  },
  mdpBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginTop: spacing.md,
  },
  mdpBtnText: { fontSize: 15, color: colors.textPrimary },
  mdpBtnArrow: { fontSize: 20, color: colors.textMuted },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: layout.screenPadding, paddingBottom: 34,
    backgroundColor: colors.background,
    borderTopWidth: 0.5, borderTopColor: colors.border,
  },
  sauvegarderBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  sauvegarderBtnDisabled: { opacity: 0.4 },
  sauvegarderBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
});