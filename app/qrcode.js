import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors, spacing, radius, layout } from '../constants/theme';

// Map QR codes → boutiques (à brancher Supabase)
const QR_BOUTIQUES = {
  'LIVRR-BOUTIQUE-001': { id: '1', nom: 'Boutique Parisienne' },
  'LIVRR-BOUTIQUE-002': { id: '2', nom: 'Maison Dorée' },
  'LIVRR-BOUTIQUE-003': { id: '3', nom: 'Le Concept Store' },
  'LIVRR-BOUTIQUE-004': { id: '4', nom: 'Épicerie du Marais' },
  'LIVRR-BOUTIQUE-005': { id: '5', nom: 'Beauté Dorée' },
};

export default function QRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torche, setTorche] = useState(false);

  const handleScan = ({ data }) => {
    if (scanned) return;
    setScanned(true);

    const boutique = QR_BOUTIQUES[data];

    if (boutique) {
      // QR LIVRR reconnu → naviguer vers la boutique
      router.push(`/boutique/${boutique.id}`);
    } else if (data.startsWith('http')) {
      // URL externe → ouvrir le navigateur
      Alert.alert(
        'Lien externe',
        'Ce QR code pointe vers un site web. Souhaitez-vous l\'ouvrir ?',
        [
          { text: 'Annuler', style: 'cancel', onPress: () => setScanned(false) },
          { text: 'Ouvrir', onPress: () => { Linking.openURL(data); setScanned(false); } },
        ]
      );
    } else {
      // QR non reconnu
      Alert.alert(
        'QR Code non reconnu',
        'Ce code ne correspond à aucune boutique LIVRR.',
        [{ text: 'Réessayer', onPress: () => setScanned(false) }]
      );
    }
  };

  // Permission refusée
  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.permissionCard}>
            <Text style={styles.permissionIcon}>◈</Text>
            <Text style={styles.permissionTitre}>Accès à la caméra requis</Text>
            <Text style={styles.permissionSub}>
              LIVRR a besoin d'accéder à votre caméra pour scanner les QR codes des boutiques partenaires.
            </Text>
            <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
              <Text style={styles.permissionBtnText}>Autoriser la caméra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.permissionBtnSecondaire} onPress={() => Linking.openSettings()}>
              <Text style={styles.permissionBtnSecondaireText}>Ouvrir les réglages</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={torche}
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      />

      {/* Overlay sombre autour du cadre */}
      <View style={styles.overlay}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scanner un QR code</Text>
          <TouchableOpacity style={styles.torcheBtn} onPress={() => setTorche(!torche)}>
            <Text style={styles.torcheIcon}>{torche ? '◉' : '◎'}</Text>
          </TouchableOpacity>
        </View>

        {/* Zone de scan */}
        <View style={styles.scanZone}>
          <View style={styles.cadre}>
            {/* Coins du cadre */}
            <View style={[styles.coin, styles.coinTopLeft]} />
            <View style={[styles.coin, styles.coinTopRight]} />
            <View style={[styles.coin, styles.coinBottomLeft]} />
            <View style={[styles.coin, styles.coinBottomRight]} />

            {/* Ligne de scan animée */}
            {!scanned && <View style={styles.scanLine} />}

            {/* État scanné */}
            {scanned && (
              <View style={styles.scannedOverlay}>
                <Text style={styles.scannedIcon}>✓</Text>
              </View>
            )}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.footer}>
          <Text style={styles.footerTitre}>
            {scanned ? 'Code reconnu !' : 'Pointez vers le QR code'}
          </Text>
          <Text style={styles.footerSub}>
            {scanned
              ? 'Redirection en cours...'
              : 'Scannez le QR code affiché en boutique pour accéder directement à sa fiche LIVRR'}
          </Text>

          {scanned && (
            <TouchableOpacity
              style={styles.reessayerBtn}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.reessayerBtnText}>Scanner un autre code</Text>
            </TouchableOpacity>
          )}

          {/* Accès manuel */}
          {!scanned && (
            <TouchableOpacity
              style={styles.manuelBtn}
              onPress={() => router.push('/carte')}
            >
              <Text style={styles.manuelBtnText}>Voir la carte des boutiques ›</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  // Permission
  permissionContainer: {
    flex: 1, backgroundColor: colors.backgroundDark,
    padding: layout.screenPadding, paddingTop: 60,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  backIcon: { fontSize: 24, color: colors.textLight },
  permissionCard: { alignItems: 'center', paddingTop: spacing.xxl },
  permissionIcon: { fontSize: 48, color: colors.gold, marginBottom: spacing.xl },
  permissionTitre: {
    fontSize: 20, fontWeight: '400', color: colors.textLight,
    marginBottom: spacing.md, letterSpacing: 0.3,
  },
  permissionSub: {
    fontSize: 14, color: colors.textLight, opacity: 0.6,
    lineHeight: 22, textAlign: 'center', marginBottom: spacing.xxl,
  },
  permissionBtn: {
    width: '100%', height: 52,
    backgroundColor: colors.gold, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  permissionBtnText: { fontSize: 15, color: colors.backgroundDark, letterSpacing: 0.5 },
  permissionBtnSecondaire: { height: 44, alignItems: 'center', justifyContent: 'center' },
  permissionBtnSecondaireText: { fontSize: 14, color: colors.textLight, opacity: 0.5 },

  // Scanner overlay
  overlay: { flex: 1, justifyContent: 'space-between' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding, paddingTop: 60, paddingBottom: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerTitle: { fontSize: 16, fontWeight: '400', color: colors.textLight, letterSpacing: 0.5 },
  torcheBtn: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  torcheIcon: { fontSize: 18, color: colors.textLight },

  // Zone de scan
  scanZone: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cadre: {
    width: 240, height: 240,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  coin: {
    position: 'absolute', width: 30, height: 30,
    borderColor: colors.gold,
  },
  coinTopLeft: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  coinTopRight: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  coinBottomLeft: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  coinBottomRight: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  scanLine: {
    position: 'absolute', top: '50%', left: 10, right: 10,
    height: 1.5, backgroundColor: colors.gold,
    opacity: 0.8,
  },
  scannedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(201,169,110,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  scannedIcon: { fontSize: 48, color: colors.gold },

  // Footer
  footer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: layout.screenPadding, paddingBottom: 50,
    alignItems: 'center',
  },
  footerTitre: {
    fontSize: 18, fontWeight: '400', color: colors.textLight,
    marginBottom: spacing.sm, letterSpacing: 0.3,
  },
  footerSub: {
    fontSize: 13, color: colors.textLight, opacity: 0.6,
    textAlign: 'center', lineHeight: 20, marginBottom: spacing.lg,
  },
  reessayerBtn: {
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    backgroundColor: colors.gold, borderRadius: radius.md, marginBottom: spacing.md,
  },
  reessayerBtnText: { fontSize: 14, color: colors.backgroundDark, letterSpacing: 0.5 },
  manuelBtn: { paddingVertical: spacing.sm },
  manuelBtnText: { fontSize: 13, color: colors.gold },
});