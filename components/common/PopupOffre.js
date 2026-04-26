import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { colors, spacing, radius } from '../../constants/theme';

const CLE_STORAGE = 'livrr_popup_vu';

// Offre actuelle (à brancher API/Supabase)
const OFFRE = {
  id: 'promo_mai_2026',
  type: 'bienvenue', // 'bienvenue' | 'promo' | 'nouveaute'
  titre: 'Bienvenue sur LIVRR',
  sousTitre: 'OFFRE DE LANCEMENT',
  description: 'Profitez de la livraison offerte sur votre première commande avec le code ci-dessous.',
  code: 'BIENVENUE',
  cta: 'Utiliser mon code',
  ctaRoute: '/(tabs)/explorer',
  expiration: '31 mai 2026',
};

export default function PopupOffre({ forceShow = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (forceShow) { setVisible(true); return; }
    verifierAffichage();
  }, []);

  const verifierAffichage = async () => {
    try {
      const vu = await AsyncStorage.getItem(CLE_STORAGE);
      const dejaMontree = vu ? JSON.parse(vu) : {};
      if (!dejaMontree[OFFRE.id]) setVisible(true);
    } catch {
      setVisible(true);
    }
  };

  const fermer = async () => {
    setVisible(false);
    try {
      const vu = await AsyncStorage.getItem(CLE_STORAGE);
      const dejaMontree = vu ? JSON.parse(vu) : {};
      dejaMontree[OFFRE.id] = true;
      await AsyncStorage.setItem(CLE_STORAGE, JSON.stringify(dejaMontree));
    } catch {}
  };

  const utiliser = async () => {
    await fermer();
    router.push(OFFRE.ctaRoute);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={fermer}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Bouton fermer */}
          <TouchableOpacity style={styles.fermerBtn} onPress={fermer}>
            <Text style={styles.fermerIcon}>×</Text>
          </TouchableOpacity>

          {/* Visuel décoratif */}
          <View style={styles.visuel}>
            <Text style={styles.visuelLogo}>LIVRR</Text>
            <View style={styles.visuelDeco}>
              <Text style={styles.visuelDecoText}>✦</Text>
            </View>
          </View>

          {/* Contenu */}
          <View style={styles.content}>
            <Text style={styles.sousTitre}>{OFFRE.sousTitre}</Text>
            <Text style={styles.titre}>{OFFRE.titre}</Text>
            <Text style={styles.description}>{OFFRE.description}</Text>

            {/* Code promo */}
            <View style={styles.codeBlock}>
              <Text style={styles.codeLabel}>VOTRE CODE</Text>
              <Text style={styles.codeValue}>{OFFRE.code}</Text>
            </View>

            <Text style={styles.expiration}>Valable jusqu'au {OFFRE.expiration}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.ctaBtn} onPress={utiliser}>
              <Text style={styles.ctaBtnText}>{OFFRE.cta}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusTardBtn} onPress={fermer}>
              <Text style={styles.plusTardText}>Plus tard</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,15,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.background,
    borderRadius: radius.xl,
    overflow: 'hidden',
  },
  fermerBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: 'rgba(10,10,15,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fermerIcon: { fontSize: 20, color: colors.textLight, lineHeight: 22 },

  // Visuel haut
  visuel: {
    height: 160,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visuelLogo: {
    fontSize: 32,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 10,
    marginBottom: spacing.sm,
  },
  visuelDeco: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(201,169,110,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visuelDecoText: { fontSize: 18, color: colors.gold },

  // Contenu
  content: { padding: spacing.xl, paddingBottom: spacing.md },
  sousTitre: {
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  titre: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  codeBlock: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.goldLight,
    borderStyle: 'dashed',
    marginBottom: spacing.sm,
  },
  codeLabel: {
    fontSize: 10,
    color: colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  codeValue: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.goldDark,
    letterSpacing: 4,
  },
  expiration: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },

  // Actions
  actions: {
    padding: spacing.xl,
    paddingTop: spacing.md,
    gap: spacing.sm,
  },
  ctaBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  plusTardBtn: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusTardText: { fontSize: 14, color: colors.textMuted },
});