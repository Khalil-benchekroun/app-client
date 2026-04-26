import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const ADRESSES_INITIALES = {
  livraison: {
    prenom: 'Khalil',
    nom: 'Benchekroun',
    rue: '12 Rue du Faubourg Saint-Honoré',
    complement: 'Appartement 4B',
    codePostal: '75008',
    ville: 'Paris',
    pays: 'France',
    telephone: '+33 6 00 00 00 00',
  },
  facturation: {
    memeQueLivraison: true,
    prenom: '',
    nom: '',
    rue: '',
    complement: '',
    codePostal: '',
    ville: '',
    pays: 'France',
    telephone: '',
  },
};

const ADRESSES_SAUVEGARDEES = [
  { id: '1', label: 'Domicile', rue: '12 Rue du Faubourg Saint-Honoré', codePostal: '75008', ville: 'Paris' },
  { id: '2', label: 'Bureau', rue: '25 Avenue Montaigne', codePostal: '75008', ville: 'Paris' },
  { id: '3', label: 'Hôtel', rue: '15 Place Vendôme', codePostal: '75001', ville: 'Paris' },
];

function FormulaireAdresse({ valeurs, onChange, titre }) {
  return (
    <View style={styles.formulaire}>
      <Text style={styles.formulaireTitre}>{titre}</Text>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: spacing.sm }]}>
          <Text style={styles.inputLabel}>Prénom</Text>
          <TextInput
            style={styles.input}
            value={valeurs.prenom}
            onChangeText={v => onChange({ ...valeurs, prenom: v })}
            placeholder="Prénom"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Nom</Text>
          <TextInput
            style={styles.input}
            value={valeurs.nom}
            onChangeText={v => onChange({ ...valeurs, nom: v })}
            placeholder="Nom"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Adresse</Text>
        <TextInput
          style={styles.input}
          value={valeurs.rue}
          onChangeText={v => onChange({ ...valeurs, rue: v })}
          placeholder="Numéro et nom de rue"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Complément (optionnel)</Text>
        <TextInput
          style={styles.input}
          value={valeurs.complement}
          onChangeText={v => onChange({ ...valeurs, complement: v })}
          placeholder="Appartement, étage, digicode..."
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { width: 120, marginRight: spacing.sm }]}>
          <Text style={styles.inputLabel}>Code postal</Text>
          <TextInput
            style={styles.input}
            value={valeurs.codePostal}
            onChangeText={v => onChange({ ...valeurs, codePostal: v })}
            placeholder="75008"
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.inputLabel}>Ville</Text>
          <TextInput
            style={styles.input}
            value={valeurs.ville}
            onChangeText={v => onChange({ ...valeurs, ville: v })}
            placeholder="Paris"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Pays</Text>
        <TextInput
          style={styles.input}
          value={valeurs.pays}
          onChangeText={v => onChange({ ...valeurs, pays: v })}
          placeholder="France"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Téléphone</Text>
        <TextInput
          style={styles.input}
          value={valeurs.telephone}
          onChangeText={v => onChange({ ...valeurs, telephone: v })}
          placeholder="+33 6 00 00 00 00"
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

export default function Adresse() {
  const [onglet, setOnglet] = useState('livraison');
  const [livraison, setLivraison] = useState(ADRESSES_INITIALES.livraison);
  const [facturation, setFacturation] = useState(ADRESSES_INITIALES.facturation);
  const [modalVisible, setModalVisible] = useState(false);
  const [modifie, setModifie] = useState(false);

  const handleLivraisonChange = (val) => {
    setLivraison(val);
    setModifie(true);
  };

  const handleFacturationChange = (val) => {
    setFacturation(val);
    setModifie(true);
  };

  const toggleMemeLivraison = () => {
    setFacturation(prev => ({ ...prev, memeQueLivraison: !prev.memeQueLivraison }));
    setModifie(true);
  };

  const sauvegarder = () => {
    // À brancher Supabase
    Alert.alert('✓ Adresses mises à jour', 'Vos adresses ont bien été enregistrées.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const selectionnerAdresse = (adresse) => {
    if (onglet === 'livraison') {
      setLivraison(prev => ({
        ...prev,
        rue: adresse.rue,
        codePostal: adresse.codePostal,
        ville: adresse.ville,
      }));
    } else {
      setFacturation(prev => ({
        ...prev,
        rue: adresse.rue,
        codePostal: adresse.codePostal,
        ville: adresse.ville,
        memeQueLivraison: false,
      }));
    }
    setModalVisible(false);
    setModifie(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mes adresses</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.headerAction}>Enregistrées</Text>
          </TouchableOpacity>
        </View>

        {/* Onglets */}
        <View style={styles.onglets}>
          {[
            { id: 'livraison', label: 'Livraison' },
            { id: 'facturation', label: 'Facturation' },
          ].map(o => (
            <TouchableOpacity
              key={o.id}
              style={[styles.onglet, onglet === o.id && styles.ongletActif]}
              onPress={() => setOnglet(o.id)}
            >
              <Text style={[styles.ongletText, onglet === o.id && styles.ongletTextActif]}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Adresse livraison */}
        {onglet === 'livraison' && (
          <>
            {/* Résumé actuel */}
            <View style={styles.resumeCard}>
              <View style={styles.resumeIcon}>
                <Text style={styles.resumeIconText}>◎</Text>
              </View>
              <View style={styles.resumeInfo}>
                <Text style={styles.resumeLabel}>Adresse actuelle</Text>
                <Text style={styles.resumeAdresse}>
                  {livraison.rue}, {livraison.codePostal} {livraison.ville}
                </Text>
              </View>
            </View>

            <FormulaireAdresse
              valeurs={livraison}
              onChange={handleLivraisonChange}
              titre="Adresse de livraison"
            />
          </>
        )}

        {/* Adresse facturation */}
        {onglet === 'facturation' && (
          <>
            {/* Toggle même que livraison */}
            <TouchableOpacity style={styles.toggleRow} onPress={toggleMemeLivraison}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Identique à l'adresse de livraison</Text>
                <Text style={styles.toggleSub}>
                  {livraison.rue}, {livraison.codePostal} {livraison.ville}
                </Text>
              </View>
              <View style={[styles.toggle, facturation.memeQueLivraison && styles.toggleActif]}>
                <View style={[styles.toggleThumb, facturation.memeQueLivraison && styles.toggleThumbActif]} />
              </View>
            </TouchableOpacity>

            {!facturation.memeQueLivraison && (
              <FormulaireAdresse
                valeurs={facturation}
                onChange={handleFacturationChange}
                titre="Adresse de facturation"
              />
            )}

            {facturation.memeQueLivraison && (
              <View style={styles.memeAdresseInfo}>
                <Text style={styles.memeAdresseInfoIcon}>◎</Text>
                <Text style={styles.memeAdresseInfoText}>
                  Votre adresse de facturation est identique à votre adresse de livraison.
                  Désactivez l'option ci-dessus pour en saisir une différente.
                </Text>
              </View>
            )}
          </>
        )}

        <View style={{ height: 100 }} />
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

      {/* Modal adresses enregistrées */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adresses enregistrées</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalFermer}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSub}>
              Sélectionnez une adresse à utiliser pour {onglet === 'livraison' ? 'la livraison' : 'la facturation'}
            </Text>
            {ADRESSES_SAUVEGARDEES.map(a => (
              <TouchableOpacity
                key={a.id}
                style={styles.adresseCard}
                onPress={() => selectionnerAdresse(a)}
              >
                <View style={styles.adresseIcon}>
                  <Text style={styles.adresseIconText}>◎</Text>
                </View>
                <View style={styles.adresseInfo}>
                  <Text style={styles.adresseLabel}>{a.label}</Text>
                  <Text style={styles.adresseText}>{a.rue}, {a.codePostal} {a.ville}</Text>
                </View>
                <Text style={styles.adresseArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  headerAction: { fontSize: 13, color: colors.gold },

  // Onglets
  onglets: {
    flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.border,
    paddingHorizontal: layout.screenPadding,
  },
  onglet: { paddingVertical: spacing.md, marginRight: spacing.xl, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  ongletActif: { borderBottomColor: colors.gold },
  ongletText: { fontSize: 15, color: colors.textMuted },
  ongletTextActif: { color: colors.textPrimary, fontWeight: '400' },

  // Résumé
  resumeCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    margin: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
  },
  resumeIcon: {
    width: 40, height: 40, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center',
  },
  resumeIconText: { fontSize: 16, color: colors.gold },
  resumeInfo: { flex: 1 },
  resumeLabel: { fontSize: 11, color: colors.textLight, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  resumeAdresse: { fontSize: 13, color: colors.textLight, lineHeight: 18 },

  // Formulaire
  formulaire: { padding: layout.screenPadding },
  formulaireTitre: {
    fontSize: 13, color: colors.textSecondary, letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: spacing.lg,
  },
  row: { flexDirection: 'row' },
  inputGroup: { marginBottom: spacing.lg },
  inputLabel: {
    fontSize: 11, color: colors.textSecondary, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  input: {
    height: 52, borderWidth: 0.5, borderColor: colors.border,
    borderRadius: radius.md, paddingHorizontal: spacing.lg,
    fontSize: 15, color: colors.textPrimary, backgroundColor: colors.backgroundSoft,
  },

  // Toggle même adresse
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    margin: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  toggleInfo: { flex: 1, marginRight: spacing.md },
  toggleLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  toggleSub: { fontSize: 12, color: colors.textSecondary },
  toggle: {
    width: 44, height: 26, borderRadius: radius.full,
    backgroundColor: colors.border, padding: 3,
  },
  toggleActif: { backgroundColor: colors.gold },
  toggleThumb: {
    width: 20, height: 20, borderRadius: radius.full,
    backgroundColor: colors.background, alignSelf: 'flex-start',
  },
  toggleThumbActif: { alignSelf: 'flex-end' },

  // Info même adresse
  memeAdresseInfo: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    marginHorizontal: layout.screenPadding, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  memeAdresseInfoIcon: { fontSize: 13, color: colors.gold, marginTop: 1 },
  memeAdresseInfoText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

  // Footer
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

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalCard: {
    backgroundColor: colors.background, borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalTitle: { fontSize: 18, fontWeight: '400', color: colors.textPrimary },
  modalFermer: { fontSize: 28, color: colors.textMuted, lineHeight: 30 },
  modalSub: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.xl },
  adresseCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm, ...shadows.soft,
  },
  adresseIcon: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center', marginRight: spacing.md,
  },
  adresseIconText: { fontSize: 14, color: colors.gold },
  adresseInfo: { flex: 1 },
  adresseLabel: { fontSize: 14, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  adresseText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  adresseArrow: { fontSize: 20, color: colors.textMuted },
});