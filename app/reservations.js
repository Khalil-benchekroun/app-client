import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const SERVICES = [
  {
    id: '1',
    nom: 'Manucure express',
    boutique: 'Beauté Dorée',
    boutiqueId: '5',
    categorie: 'Beauté',
    duree: '45 min',
    prix: 35,
    description: 'Soin des ongles, pose vernis semi-permanent au choix parmi 50 teintes.',
    disponible: true,
    icon: '◈',
    prochainsDispo: ['Auj. 15h00', 'Auj. 16h30', 'Demain 10h00', 'Demain 14h00'],
  },
  {
    id: '2',
    nom: 'Soin visage éclat',
    boutique: 'Beauté Dorée',
    boutiqueId: '5',
    categorie: 'Beauté',
    duree: '60 min',
    prix: 85,
    description: 'Nettoyage en profondeur, gommage, masque hydratant et massage du visage.',
    disponible: true,
    icon: '✦',
    prochainsDispo: ['Demain 11h00', 'Demain 15h30', 'Sam. 10h00'],
  },
  {
    id: '3',
    nom: 'Dégustation vins',
    boutique: 'Épicerie du Marais',
    boutiqueId: '4',
    categorie: 'Gastronomie',
    duree: '90 min',
    prix: 55,
    description: 'Sélection de 6 vins de la maison commentés par notre sommelier.',
    disponible: true,
    icon: '◉',
    prochainsDispo: ['Ven. 18h00', 'Sam. 16h00', 'Dim. 15h00'],
  },
  {
    id: '4',
    nom: 'Conseil styling',
    boutique: 'Boutique Parisienne',
    boutiqueId: '1',
    categorie: 'Mode',
    duree: '60 min',
    prix: 0,
    description: 'Séance de conseil personnalisé avec notre styliste. Sélection d\'une tenue complète.',
    disponible: true,
    icon: '§',
    prochainsDispo: ['Auj. 17h00', 'Demain 10h30', 'Demain 14h00'],
  },
  {
    id: '5',
    nom: 'Essayage privé',
    boutique: 'Maison Dorée',
    boutiqueId: '2',
    categorie: 'Mode',
    duree: '45 min',
    prix: 0,
    description: 'Accès exclusif à notre cabine d\'essayage privatisée avec une sélection pré-choisie.',
    disponible: false,
    icon: '◎',
    prochainsDispo: [],
  },
];

const MES_RESERVATIONS = [
  {
    id: 'RES-021',
    serviceId: '1',
    nom: 'Manucure express',
    boutique: 'Beauté Dorée',
    date: 'Auj. 15h00',
    statut: 'confirmé',
    prix: 35,
  },
];

const CATEGORIES = ['Tous', 'Beauté', 'Mode', 'Gastronomie'];

export default function Reservations() {
  const [onglet, setOnglet] = useState('services'); // services | historique
  const [categorieActive, setCategorieActive] = useState('Tous');
  const [serviceSelectionne, setServiceSelectionne] = useState(null);
  const [creneauChoisi, setCreneauChoisi] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [reservations, setReservations] = useState(MES_RESERVATIONS);

  const servicesFiltres = SERVICES.filter(
    s => categorieActive === 'Tous' || s.categorie === categorieActive
  );

  const confirmerReservation = () => {
    if (!serviceSelectionne || !creneauChoisi) return;
    const nouvelleResa = {
      id: `RES-0${Math.floor(Math.random() * 900) + 100}`,
      serviceId: serviceSelectionne.id,
      nom: serviceSelectionne.nom,
      boutique: serviceSelectionne.boutique,
      date: creneauChoisi,
      statut: 'confirmé',
      prix: serviceSelectionne.prix,
    };
    setReservations(prev => [nouvelleResa, ...prev]);
    setConfirmModal(false);
    setServiceSelectionne(null);
    setCreneauChoisi(null);
    Alert.alert('Réservation confirmée ✓', `${serviceSelectionne.nom} — ${creneauChoisi}`);
  };

  const annulerReservation = (id) => {
    Alert.alert(
      'Annuler la réservation ?',
      'Cette action est irréversible.',
      [
        { text: 'Garder', style: 'cancel' },
        {
          text: 'Annuler',
          style: 'destructive',
          onPress: () => setReservations(prev => prev.filter(r => r.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Services</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Onglets */}
      <View style={styles.onglets}>
        {[
          { id: 'services', label: 'Réserver' },
          { id: 'historique', label: `Mes réservations (${reservations.length})` },
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

      {onglet === 'services' && (
        <>
          {/* Filtres catégorie */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            {CATEGORIES.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.catChip, categorieActive === c && styles.catChipActif]}
                onPress={() => setCategorieActive(c)}
              >
                <Text style={[styles.catChipText, categorieActive === c && styles.catChipTextActif]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.liste}>
            {servicesFiltres.map(s => (
              <View key={s.id} style={[styles.serviceCard, !s.disponible && { opacity: 0.5 }]}>
                <View style={styles.serviceTop}>
                  <View style={styles.serviceIconBox}>
                    <Text style={styles.serviceIcon}>{s.icon}</Text>
                  </View>
                  <View style={styles.serviceInfo}>
                    <View style={styles.serviceNameRow}>
                      <Text style={styles.serviceNom}>{s.nom}</Text>
                      {!s.disponible && (
                        <View style={styles.indispoBadge}>
                          <Text style={styles.indispoText}>Indisponible</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.serviceBoutique}>{s.boutique} · {s.categorie}</Text>
                    <View style={styles.serviceMeta}>
                      <Text style={styles.serviceMetaText}>◎ {s.duree}</Text>
                      <Text style={styles.serviceMetaText}>
                        {s.prix === 0 ? 'Gratuit' : `${s.prix}€`}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.serviceDesc}>{s.description}</Text>

                {s.disponible && s.prochainsDispo.length > 0 && (
                  <>
                    <Text style={styles.dispoLabel}>PROCHAINS CRÉNEAUX</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.creneauxRow}>
                      {s.prochainsDispo.map(c => (
                        <TouchableOpacity
                          key={c}
                          style={styles.creneauChip}
                          onPress={() => {
                            setServiceSelectionne(s);
                            setCreneauChoisi(c);
                            setConfirmModal(true);
                          }}
                        >
                          <Text style={styles.creneauChipText}>{c}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {onglet === 'historique' && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.liste}>
          {reservations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>◈</Text>
              <Text style={styles.emptyTitle}>Aucune réservation</Text>
              <Text style={styles.emptySub}>Réservez votre premier service depuis l'onglet Réserver.</Text>
            </View>
          ) : (
            reservations.map(r => (
              <View key={r.id} style={styles.resaCard}>
                <View style={styles.resaHeader}>
                  <Text style={styles.resaId}>{r.id}</Text>
                  <View style={styles.resaStatutBadge}>
                    <View style={styles.resaStatutDot} />
                    <Text style={styles.resaStatutText}>{r.statut}</Text>
                  </View>
                </View>
                <Text style={styles.resaNom}>{r.nom}</Text>
                <Text style={styles.resaBoutique}>{r.boutique}</Text>
                <View style={styles.resaFooter}>
                  <Text style={styles.resaDate}>◎ {r.date}</Text>
                  <Text style={styles.resaPrix}>{r.prix === 0 ? 'Gratuit' : `${r.prix}€`}</Text>
                </View>
                <TouchableOpacity
                  style={styles.annulerBtn}
                  onPress={() => annulerReservation(r.id)}
                >
                  <Text style={styles.annulerBtnText}>Annuler la réservation</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* Modal confirmation */}
      <Modal visible={confirmModal} transparent animationType="slide" onRequestClose={() => setConfirmModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitre}>Confirmer la réservation</Text>

            {serviceSelectionne && (
              <View style={styles.modalRecap}>
                <View style={styles.modalRecapRow}>
                  <Text style={styles.modalRecapLabel}>Service</Text>
                  <Text style={styles.modalRecapVal}>{serviceSelectionne.nom}</Text>
                </View>
                <View style={styles.modalRecapRow}>
                  <Text style={styles.modalRecapLabel}>Boutique</Text>
                  <Text style={styles.modalRecapVal}>{serviceSelectionne.boutique}</Text>
                </View>
                <View style={styles.modalRecapRow}>
                  <Text style={styles.modalRecapLabel}>Créneau</Text>
                  <Text style={[styles.modalRecapVal, { color: colors.gold }]}>{creneauChoisi}</Text>
                </View>
                <View style={styles.modalRecapRow}>
                  <Text style={styles.modalRecapLabel}>Durée</Text>
                  <Text style={styles.modalRecapVal}>{serviceSelectionne.duree}</Text>
                </View>
                <View style={[styles.modalRecapRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.modalRecapLabel}>Prix</Text>
                  <Text style={[styles.modalRecapVal, { fontWeight: '400', fontSize: 16 }]}>
                    {serviceSelectionne.prix === 0 ? 'Gratuit' : `${serviceSelectionne.prix}€`}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalAnnulerBtn} onPress={() => setConfirmModal(false)}>
                <Text style={styles.modalAnnulerBtnText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmerBtn} onPress={confirmerReservation}>
                <Text style={styles.modalConfirmerBtnText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
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

  onglets: {
    flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: colors.border,
    paddingHorizontal: layout.screenPadding, gap: spacing.xl,
  },
  onglet: { paddingVertical: spacing.md, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  ongletActif: { borderBottomColor: colors.gold },
  ongletText: { fontSize: 14, color: colors.textMuted },
  ongletTextActif: { color: colors.textPrimary, fontWeight: '400' },

  categoriesRow: { paddingLeft: layout.screenPadding, paddingVertical: spacing.md },
  catChip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginRight: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  catChipActif: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  catChipText: { fontSize: 13, color: colors.textSecondary },
  catChipTextActif: { color: colors.gold },

  liste: { padding: layout.screenPadding, paddingBottom: 40 },

  serviceCard: {
    backgroundColor: colors.backgroundSoft, borderRadius: radius.xl,
    borderWidth: 0.5, borderColor: colors.border,
    padding: spacing.lg, marginBottom: spacing.md,
    ...shadows.soft,
  },
  serviceTop: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  serviceIconBox: {
    width: 48, height: 48, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.gold,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  serviceIcon: { fontSize: 18, color: colors.gold },
  serviceInfo: { flex: 1 },
  serviceNameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 2 },
  serviceNom: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  indispoBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.sm,
    borderWidth: 0.5, borderColor: colors.border,
  },
  indispoText: { fontSize: 10, color: colors.textMuted },
  serviceBoutique: { fontSize: 12, color: colors.gold, marginBottom: spacing.xs },
  serviceMeta: { flexDirection: 'row', gap: spacing.md },
  serviceMetaText: { fontSize: 12, color: colors.textSecondary },
  serviceDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.md },
  dispoLabel: {
    fontSize: 10, color: colors.textMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  creneauxRow: { marginBottom: spacing.xs },
  creneauChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.gold,
    marginRight: spacing.sm, backgroundColor: colors.background,
  },
  creneauChipText: { fontSize: 13, color: colors.gold },

  // Historique
  emptyState: { alignItems: 'center', paddingTop: 80, gap: spacing.sm },
  emptyIcon: { fontSize: 32, color: colors.gold, opacity: 0.3, marginBottom: spacing.md },
  emptyTitle: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  emptySub: { fontSize: 13, color: colors.textSecondary, textAlign: 'center' },
  resaCard: {
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.md,
  },
  resaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  resaId: { fontSize: 11, color: colors.gold, fontFamily: 'monospace', letterSpacing: 1 },
  resaStatutBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#E8F5EE', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.full },
  resaStatutDot: { width: 6, height: 6, borderRadius: radius.full, backgroundColor: colors.success },
  resaStatutText: { fontSize: 11, color: colors.success },
  resaNom: { fontSize: 15, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  resaBoutique: { fontSize: 12, color: colors.textSecondary, marginBottom: spacing.md },
  resaFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  resaDate: { fontSize: 13, color: colors.textSecondary },
  resaPrix: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  annulerBtn: {
    alignSelf: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
  },
  annulerBtnText: { fontSize: 12, color: colors.error },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalCard: {
    backgroundColor: colors.background, borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: 40,
  },
  modalTitre: { fontSize: 18, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.xl },
  modalRecap: {
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    padding: spacing.lg, marginBottom: spacing.xl,
  },
  modalRecapRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.sm, borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  modalRecapLabel: { fontSize: 13, color: colors.textSecondary },
  modalRecapVal: { fontSize: 13, color: colors.textPrimary, fontWeight: '400' },
  modalActions: { flexDirection: 'row', gap: spacing.sm },
  modalAnnulerBtn: {
    flex: 1, height: 52, borderRadius: radius.md,
    borderWidth: 0.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  modalAnnulerBtnText: { fontSize: 14, color: colors.textSecondary },
  modalConfirmerBtn: {
    flex: 2, height: 52, borderRadius: radius.md,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
  },
  modalConfirmerBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 0.5 },
});