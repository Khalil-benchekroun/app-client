import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

// ─── Données boutiques ───────────────────────────────────────────────────────
const boutiques = [
  {
    id: '1',
    nom: 'Boutique Parisienne',
    categorie: 'Mode',
    distance: '800m',
    delai: '45 min',
    ouvert: true,
    livraison2h: true,
    lat: 48.8698,
    lng: 2.3078,
  },
  {
    id: '2',
    nom: 'Maison de Mode',
    categorie: 'Accessoires',
    distance: '1,2km',
    delai: '55 min',
    ouvert: true,
    livraison2h: true,
    lat: 48.8734,
    lng: 2.3102,
  },
  {
    id: '3',
    nom: 'Le Concept Store',
    categorie: 'Lifestyle',
    distance: '600m',
    delai: '35 min',
    ouvert: false,
    livraison2h: false,
    lat: 48.8712,
    lng: 2.3055,
  },
  {
    id: '4',
    nom: 'Épicerie du Marais',
    categorie: 'Épicerie fine',
    distance: '950m',
    delai: '50 min',
    ouvert: true,
    livraison2h: true,
    lat: 48.8756,
    lng: 2.3134,
  },
];

const FILTRES = ['Toutes', 'Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle'];

// ─── Écran : permission refusée ──────────────────────────────────────────────
function EcranPermissionRefusee({ onReessayer }) {
  return (
    <View style={styles.permissionContainer}>
      <View style={styles.permissionCard}>
        <Text style={styles.permissionIcon}>◎</Text>
        <Text style={styles.permissionTitre}>Localisation désactivée</Text>
        <Text style={styles.permissionSub}>
          LIVRR a besoin d'accéder à votre position pour afficher les boutiques
          près de vous et calculer les délais de livraison.
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={onReessayer}>
          <Text style={styles.permissionBtnText}>Autoriser la localisation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.permissionBtnSecondaire}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.permissionBtnSecondaireText}>
            Ouvrir les réglages →
          </Text>
        </TouchableOpacity>
        <Text style={styles.permissionNote}>
          Vous pouvez modifier cette autorisation à tout moment dans Réglages → LIVRR → Localisation
        </Text>
      </View>
    </View>
  );
}

// ─── Écran : chargement position ─────────────────────────────────────────────
function EcranChargement() {
  return (
    <View style={styles.permissionContainer}>
      <ActivityIndicator size="large" color={colors.gold} />
      <Text style={styles.chargementText}>Localisation en cours...</Text>
    </View>
  );
}

// ─── Carte principale ─────────────────────────────────────────────────────────
export default function Carte() {
  const [permissionStatus, setPermissionStatus] = useState(null); // null | 'loading' | 'granted' | 'denied'
  const [position, setPosition] = useState(null);
  const [filtreActif, setFiltreActif] = useState('Toutes');
  const [ouvertSeulement, setOuvertSeulement] = useState(false);
  const [moins2h, setMoins2h] = useState(false);
  const [boutiqueSurvol, setBoutiqueSurvol] = useState(null);

  // ── Demande de permission au montage ──
  useEffect(() => {
    demanderPermission();
  }, []);

  const demanderPermission = async () => {
    setPermissionStatus('loading');
    try {
      // Vérifier le statut actuel
      const { status: statusActuel } = await Location.getForegroundPermissionsAsync();

      if (statusActuel === 'granted') {
        // Déjà accordé → récupérer la position directement
        await recupererPosition();
        return;
      }

      // Demander la permission (déclenche la popup système)
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        await recupererPosition();
      } else {
        setPermissionStatus('denied');
      }
    } catch (e) {
      setPermissionStatus('denied');
    }
  };

  const recupererPosition = async () => {
    setPermissionStatus('loading');
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setPosition({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setPermissionStatus('granted');
    } catch (e) {
      // Fallback : Paris centre si GPS indisponible
      setPosition({ latitude: 48.8698, longitude: 2.3078 });
      setPermissionStatus('granted');
    }
  };

  // ── Filtrage boutiques ──
  const boutiquesFiltrees = boutiques.filter((b) => {
    if (filtreActif !== 'Toutes' && b.categorie !== filtreActif) return false;
    if (ouvertSeulement && !b.ouvert) return false;
    if (moins2h && !b.livraison2h) return false;
    return true;
  });

  // ── États de permission ──
  if (permissionStatus === null || permissionStatus === 'loading') {
    return (
      <View style={styles.container}>
        <HeaderCarte />
        <EcranChargement />
      </View>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <View style={styles.container}>
        <HeaderCarte />
        <EcranPermissionRefusee onReessayer={demanderPermission} />
      </View>
    );
  }

  // ── Carte accordée ──
  return (
    <View style={styles.container}>
      <HeaderCarte />

      {/* Filtres catégorie */}
      <View style={styles.filtresContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtresRow}
        >
          {FILTRES.map((filtre) => (
            <TouchableOpacity
              key={filtre}
              style={[
                styles.filtreChip,
                filtreActif === filtre && styles.filtreChipActive,
              ]}
              onPress={() => setFiltreActif(filtre)}
            >
              <Text
                style={[
                  styles.filtreText,
                  filtreActif === filtre && styles.filtreTextActive,
                ]}
              >
                {filtre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtres toggle */}
        <View style={styles.filtresExtra}>
          <TouchableOpacity
            style={[styles.filtreExtra, ouvertSeulement && styles.filtreExtraActive]}
            onPress={() => setOuvertSeulement(!ouvertSeulement)}
          >
            <Text
              style={[
                styles.filtreExtraText,
                ouvertSeulement && styles.filtreExtraTextActive,
              ]}
            >
              ◎ Ouvert maintenant
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filtreExtra, moins2h && styles.filtreExtraActive]}
            onPress={() => setMoins2h(!moins2h)}
          >
            <Text
              style={[
                styles.filtreExtraText,
                moins2h && styles.filtreExtraTextActive,
              ]}
            >
              {'✦ Livraison < 2h'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Zone carte */}
      <View style={styles.mapContainer}>

        {/* Carte simulée avec position réelle affichée */}
        <View style={styles.mapPlaceholder}>

          {/* Grille de fond façon carte */}
          <View style={styles.mapGrid} pointerEvents="none">
            {[...Array(8)].map((_, i) => (
              <View key={`h${i}`} style={[styles.mapGridLine, styles.mapGridLineH, { top: `${i * 14}%` }]} />
            ))}
            {[...Array(6)].map((_, i) => (
              <View key={`v${i}`} style={[styles.mapGridLine, styles.mapGridLineV, { left: `${i * 20}%` }]} />
            ))}
          </View>

          {/* Info position */}
          <View style={styles.mapInfo}>
            <Text style={styles.mapInfoText}>
              {position
                ? `${position.latitude.toFixed(4)}° N · ${position.longitude.toFixed(4)}° E`
                : 'Paris 8ème'}
            </Text>
            <Text style={styles.mapInfoSub}>Zone de livraison active</Text>
          </View>

          {/* Pins boutiques */}
          {boutiquesFiltrees.map((b, i) => {
            const positions = [
              { top: '28%', left: '38%' },
              { top: '18%', right: '22%' },
              { top: '50%', left: '25%' },
              { top: '20%', left: '55%' },
            ];
            const pos = positions[parseInt(b.id) - 1] || { top: '40%', left: '40%' };
            return (
              <TouchableOpacity
                key={b.id}
                style={[styles.pin, !b.ouvert && styles.pinFerme, pos]}
                onPress={() => {
                  if (b.ouvert) {
                    setBoutiqueSurvol(boutiqueSurvol === b.id ? null : b.id);
                  }
                }}
              >
                <Text style={[styles.pinText, !b.ouvert && styles.pinTextFerme]}>
                  {b.distance}
                </Text>
                {boutiqueSurvol === b.id && (
                  <View style={styles.pinTooltip}>
                    <Text style={styles.pinTooltipNom} numberOfLines={1}>{b.nom}</Text>
                    <Text style={styles.pinTooltipDelai}>{b.delai}</Text>
                    <TouchableOpacity onPress={() => router.push(`/boutique/${b.id}`)}>
                      <Text style={styles.pinTooltipCta}>Voir →</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Pin position utilisateur */}
          <View style={styles.userPin}>
            <View style={styles.userPinPulse} />
            <View style={styles.userPinDot} />
          </View>

          {/* Bouton recentrer */}
          <TouchableOpacity
            style={styles.recentrerBtn}
            onPress={recupererPosition}
          >
            <Text style={styles.recentrerIcon}>◎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Liste boutiques en bas */}
      <View style={styles.boutiquesList}>
        <Text style={styles.boutiquesListTitle}>
          {boutiquesFiltrees.filter((b) => b.ouvert).length} boutique
          {boutiquesFiltrees.filter((b) => b.ouvert).length > 1 ? 's' : ''} disponible
          {boutiquesFiltrees.filter((b) => b.ouvert).length > 1 ? 's' : ''}
          {position ? ' · Position GPS active' : ''}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {boutiquesFiltrees.map((boutique) => (
            <TouchableOpacity
              key={boutique.id}
              style={[
                styles.boutiqueCard,
                !boutique.ouvert && styles.boutiqueCardFermee,
              ]}
              onPress={() =>
                boutique.ouvert && router.push(`/boutique/${boutique.id}`)
              }
            >
              <View style={styles.boutiqueCardImage} />
              <View style={styles.boutiqueCardInfo}>
                <Text style={styles.boutiqueCardNom} numberOfLines={1}>
                  {boutique.nom}
                </Text>
                <Text style={styles.boutiqueCardDetails}>
                  {boutique.categorie} · {boutique.distance}
                </Text>
                <View style={styles.boutiqueCardFooter}>
                  <View
                    style={[
                      styles.statutBadge,
                      {
                        backgroundColor: boutique.ouvert
                          ? '#E8F5E9'
                          : colors.backgroundSoft,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statutText,
                        {
                          color: boutique.ouvert
                            ? colors.success
                            : colors.textMuted,
                        },
                      ]}
                    >
                      {boutique.ouvert ? boutique.delai : 'Fermé'}
                    </Text>
                  </View>
                  {boutique.livraison2h && (
                    <View style={styles.livraison2hBadge}>
                      <Text style={styles.livraison2hText}>{'< 2h'}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {boutiquesFiltrees.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Aucune boutique pour ces filtres
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

// ── Header extrait pour réutilisation ──
function HeaderCarte() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Carte des boutiques</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingTop: 60,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  title: { fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.5 },

  // Permission
  permissionContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: layout.screenPadding,
  },
  permissionCard: {
    width: '100%', alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.xl,
    borderWidth: 0.5, borderColor: colors.border,
  },
  permissionIcon: { fontSize: 48, color: colors.gold, marginBottom: spacing.lg },
  permissionTitre: {
    fontSize: 20, fontWeight: '400', color: colors.textPrimary,
    marginBottom: spacing.md, letterSpacing: 0.3,
  },
  permissionSub: {
    fontSize: 14, color: colors.textSecondary, lineHeight: 22,
    textAlign: 'center', marginBottom: spacing.xl,
  },
  permissionBtn: {
    width: '100%', height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.md,
  },
  permissionBtnText: { fontSize: 15, color: colors.gold, letterSpacing: 0.5 },
  permissionBtnSecondaire: {
    paddingVertical: spacing.sm,
  },
  permissionBtnSecondaireText: { fontSize: 14, color: colors.textSecondary },
  permissionNote: {
    fontSize: 11, color: colors.textMuted, textAlign: 'center',
    lineHeight: 16, marginTop: spacing.lg,
  },
  chargementText: {
    fontSize: 14, color: colors.textSecondary, marginTop: spacing.lg,
  },

  // Filtres
  filtresContainer: {
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  filtresRow: { paddingLeft: layout.screenPadding, marginBottom: spacing.sm },
  filtreChip: {
    paddingHorizontal: spacing.lg, paddingVertical: spacing.sm,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    marginRight: spacing.sm, backgroundColor: colors.backgroundSoft,
  },
  filtreChipActive: { backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark },
  filtreText: { fontSize: 13, color: colors.textSecondary },
  filtreTextActive: { color: colors.gold },
  filtresExtra: {
    flexDirection: 'row', paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md, gap: spacing.sm,
  },
  filtreExtra: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.full, borderWidth: 0.5, borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  filtreExtraActive: { backgroundColor: colors.backgroundDark, borderColor: colors.gold },
  filtreExtraText: { fontSize: 11, color: colors.textSecondary },
  filtreExtraTextActive: { color: colors.gold },

  // Carte
  mapContainer: { flex: 1 },
  mapPlaceholder: {
    flex: 1, backgroundColor: '#EDF0F5',
    position: 'relative', overflow: 'hidden',
  },
  mapGrid: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  mapGridLine: { position: 'absolute', backgroundColor: '#D8DCE4' },
  mapGridLineH: { left: 0, right: 0, height: 0.5 },
  mapGridLineV: { top: 0, bottom: 0, width: 0.5 },
  mapInfo: {
    position: 'absolute', bottom: spacing.lg, left: spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 0.5, borderColor: colors.border,
  },
  mapInfoText: { fontSize: 11, color: colors.textPrimary, fontWeight: '400' },
  mapInfoSub: { fontSize: 10, color: colors.textMuted, marginTop: 2 },

  // Pins boutiques
  pin: {
    position: 'absolute',
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: spacing.sm, paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 2, borderColor: colors.gold,
    zIndex: 10,
  },
  pinFerme: { backgroundColor: colors.backgroundSoft, borderColor: colors.border },
  pinText: { fontSize: 10, color: colors.gold, fontWeight: '400' },
  pinTextFerme: { color: colors.textMuted },
  pinTooltip: {
    position: 'absolute', bottom: 36, left: -60,
    width: 160,
    backgroundColor: colors.background,
    borderRadius: radius.lg, borderWidth: 1, borderColor: colors.gold,
    padding: spacing.md,
    ...shadows.medium,
  },
  pinTooltipNom: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  pinTooltipDelai: { fontSize: 11, color: colors.textSecondary, marginBottom: spacing.sm },
  pinTooltipCta: { fontSize: 12, color: colors.gold },

  // Pin utilisateur
  userPin: {
    position: 'absolute', bottom: '42%', left: '48%',
    alignItems: 'center', justifyContent: 'center',
  },
  userPinPulse: {
    position: 'absolute',
    width: 32, height: 32, borderRadius: radius.full,
    backgroundColor: 'rgba(201, 169, 110, 0.2)',
    borderWidth: 1, borderColor: 'rgba(201, 169, 110, 0.4)',
  },
  userPinDot: {
    width: 14, height: 14, borderRadius: radius.full,
    backgroundColor: colors.gold,
    borderWidth: 2.5, borderColor: colors.background,
  },

  // Bouton recentrer
  recentrerBtn: {
    position: 'absolute', top: spacing.lg, right: spacing.lg,
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 0.5, borderColor: colors.border,
    ...shadows.soft,
  },
  recentrerIcon: { fontSize: 20, color: colors.gold },

  // Liste boutiques
  boutiquesList: {
    backgroundColor: colors.background,
    paddingTop: spacing.md, paddingBottom: spacing.xl,
    borderTopWidth: 0.5, borderTopColor: colors.border,
    ...shadows.medium,
  },
  boutiquesListTitle: {
    fontSize: 13, color: colors.textSecondary,
    paddingHorizontal: layout.screenPadding, marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  boutiqueCard: {
    width: 180, marginLeft: layout.screenPadding,
    backgroundColor: colors.card, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden', ...shadows.soft,
  },
  boutiqueCardFermee: { opacity: 0.5 },
  boutiqueCardImage: { height: 90, backgroundColor: colors.backgroundSoft },
  boutiqueCardInfo: { padding: spacing.sm },
  boutiqueCardNom: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, marginBottom: 2 },
  boutiqueCardDetails: { fontSize: 11, color: colors.textSecondary, marginBottom: spacing.sm },
  boutiqueCardFooter: { flexDirection: 'row', gap: spacing.xs, flexWrap: 'wrap' },
  statutBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm },
  statutText: { fontSize: 10, fontWeight: '400' },
  livraison2hBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.sm, backgroundColor: '#EEF4FF' },
  livraison2hText: { fontSize: 10, color: '#4A7FD4' },
  emptyState: {
    width: 240, marginLeft: layout.screenPadding,
    alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl,
  },
  emptyStateText: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
});