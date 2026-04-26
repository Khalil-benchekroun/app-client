import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../../constants/theme';

// ── Formatage numéro carte (1234 5678 9012 3456) ─────────
const formatNumeroCarte = (val) => {
  const chiffres = val.replace(/\D/g, '').slice(0, 16);
  return chiffres.replace(/(.{4})/g, '$1 ').trim();
};

// ── Formatage expiration (MM/AA) ─────────────────────────
const formatExpiration = (val) => {
  const chiffres = val.replace(/\D/g, '').slice(0, 4);
  if (chiffres.length >= 3) return chiffres.slice(0, 2) + '/' + chiffres.slice(2);
  return chiffres;
};

const MOYENS_PAIEMENT = [
  { id: 'carte', label: 'Carte bancaire', icon: '◈' },
  { id: 'apple', label: 'Apple Pay', icon: '◎' },
  { id: 'google', label: 'Google Pay', icon: '✦' },
];

export default function Paiement() {
  // ── Params reçus depuis recap.js ────────────────────────
  const { total, nbArticles, modeExpedition } = useLocalSearchParams();
  const totalNum = parseFloat(total) || 0;
  const isClickCollect = modeExpedition === 'click_collect';

  // ── Moyen de paiement sélectionné ───────────────────────
  const [moyenPaiement, setMoyenPaiement] = useState('carte');

  // ── États formulaire carte ───────────────────────────────
  const [numeroCarte, setNumeroCarte] = useState('');
  const [titulaire, setTitulaire] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Validation ───────────────────────────────────────────
  const carteValide = () =>
    numeroCarte.replace(/\s/g, '').length === 16 &&
    titulaire.trim().length >= 3 &&
    expiration.length === 5 &&
    cvv.length === 3;

  const peutPayer = () => {
    if (moyenPaiement === 'carte') return carteValide();
    return true; // Apple Pay / Google Pay — pas de form
  };

  // ── Confirmation paiement ────────────────────────────────
  const handleConfirmer = async () => {
    if (!peutPayer()) {
      Alert.alert('Informations incomplètes', 'Veuillez vérifier les informations de votre carte.');
      return;
    }
    setLoading(true);
    try {
      // Plus tard : appel Edge Function create-payment-intent + Stripe
      // Pour l'instant : simulation d'un délai puis confirmation
      await new Promise((resolve) => setTimeout(resolve, 1200));
      router.replace('/commande/confirmation');
    } catch (e) {
      Alert.alert('Erreur', 'Le paiement a échoué. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Paiement</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Récap montant — depuis les params */}
        <View style={styles.montantCard}>
          <Text style={styles.montantLabel}>Total à payer</Text>
          <Text style={styles.montantValue}>
            {totalNum.toFixed(2).replace('.', ',')} €
          </Text>
          <Text style={styles.montantSub}>
            {nbArticles} article{nbArticles > 1 ? 's' : ''} ·{' '}
            {isClickCollect ? 'Click & Collect' : 'Livraison à domicile'}
          </Text>
        </View>

        {/* Moyens de paiement */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Moyen de paiement</Text>
          {MOYENS_PAIEMENT.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.methodCard, moyenPaiement === m.id && styles.methodSelected]}
              onPress={() => setMoyenPaiement(m.id)}
            >
              <Text style={styles.methodIcon}>{m.icon}</Text>
              <Text style={styles.methodLabel}>{m.label}</Text>
              {moyenPaiement === m.id && <View style={styles.selectedDot} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Formulaire carte — visible seulement si carte sélectionnée */}
        {moyenPaiement === 'carte' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations carte</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Numéro de carte</Text>
              <TextInput
                style={[styles.input, numeroCarte.replace(/\s/g, '').length === 16 && styles.inputValid]}
                placeholder="0000 0000 0000 0000"
                placeholderTextColor={colors.textMuted}
                keyboardType="numeric"
                maxLength={19}
                value={numeroCarte}
                onChangeText={(val) => setNumeroCarte(formatNumeroCarte(val))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Titulaire</Text>
              <TextInput
                style={[styles.input, titulaire.trim().length >= 3 && styles.inputValid]}
                placeholder="NOM PRÉNOM"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="characters"
                value={titulaire}
                onChangeText={setTitulaire}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
                <Text style={styles.inputLabel}>Expiration</Text>
                <TextInput
                  style={[styles.input, expiration.length === 5 && styles.inputValid]}
                  placeholder="MM/AA"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  maxLength={5}
                  value={expiration}
                  onChangeText={(val) => setExpiration(formatExpiration(val))}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={[styles.input, cvv.length === 3 && styles.inputValid]}
                  placeholder="•••"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                  value={cvv}
                  onChangeText={setCvv}
                />
              </View>
            </View>
          </View>
        )}

        {/* Apple Pay / Google Pay — message simplifié */}
        {moyenPaiement !== 'carte' && (
          <View style={styles.section}>
            <View style={styles.walletInfo}>
              <Text style={styles.walletIcon}>
                {moyenPaiement === 'apple' ? '◎' : '✦'}
              </Text>
              <Text style={styles.walletText}>
                {moyenPaiement === 'apple'
                  ? 'Vous serez redirigé vers Apple Pay pour finaliser le paiement.'
                  : 'Vous serez redirigé vers Google Pay pour finaliser le paiement.'}
              </Text>
            </View>
          </View>
        )}

        {/* Sécurité */}
        <View style={styles.securityRow}>
          <Text style={styles.securityIcon}>◉</Text>
          <Text style={styles.securityText}>
            Paiement sécurisé — vos données sont chiffrées et protégées
          </Text>
        </View>

      </ScrollView>

      {/* Bouton confirmer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, (!peutPayer() || loading) && styles.confirmBtnDisabled]}
          onPress={handleConfirmer}
          disabled={!peutPayer() || loading}
        >
          <Text style={styles.confirmBtnText}>
            {loading ? 'Traitement en cours...' : 'Confirmer le paiement'}
          </Text>
          <Text style={styles.confirmBtnPrice}>
            {totalNum.toFixed(2).replace('.', ',')} €
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
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
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 1 },

  // Montant
  montantCard: {
    alignItems: 'center',
    padding: spacing.xxl,
    backgroundColor: colors.backgroundDark,
  },
  montantLabel: {
    fontSize: 12, color: colors.textLight, opacity: 0.6,
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  montantValue: {
    fontSize: 36, fontWeight: '400', color: colors.gold,
    letterSpacing: 1, marginBottom: spacing.sm,
  },
  montantSub: { fontSize: 13, color: colors.textLight, opacity: 0.5 },

  // Sections
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 15, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, marginBottom: spacing.md,
  },

  // Moyens de paiement
  methodCard: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.lg,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  methodSelected: { borderColor: colors.gold, backgroundColor: colors.background },
  methodIcon: { fontSize: 16, color: colors.gold, marginRight: spacing.md },
  methodLabel: { flex: 1, fontSize: 14, color: colors.textPrimary },
  selectedDot: { width: 8, height: 8, borderRadius: radius.full, backgroundColor: colors.gold },

  // Formulaire
  inputGroup: { marginBottom: spacing.lg },
  inputLabel: {
    fontSize: 12, color: colors.textSecondary, letterSpacing: 1,
    marginBottom: spacing.sm, textTransform: 'uppercase',
  },
  input: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary, backgroundColor: colors.backgroundSoft,
  },
  inputValid: { borderColor: colors.gold },
  row: { flexDirection: 'row' },

  // Wallet
  walletInfo: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
  },
  walletIcon: { fontSize: 24, color: colors.gold },
  walletText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 22 },

  // Sécurité
  securityRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: layout.screenPadding, gap: spacing.sm,
  },
  securityIcon: { fontSize: 14, color: colors.success },
  securityText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },

  // Footer
  footer: {
    padding: layout.screenPadding, paddingBottom: 34,
    borderTopWidth: 0.5, borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  confirmBtn: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.backgroundDark, padding: spacing.lg, borderRadius: radius.md,
  },
  confirmBtnDisabled: { opacity: 0.4 },
  confirmBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
  confirmBtnPrice: { fontSize: 17, fontWeight: '400', color: colors.textLight },
});