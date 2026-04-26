import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Padding minimum sous la status bar quand il n'y a pas de notch
const BASE_HEADER_PADDING = 16;

/**
 * Retourne le paddingTop correct pour les headers selon le device.
 *
 * Usage :
 *   const { headerPadding, bottomPadding } = useHeaderHeight();
 *   <View style={[styles.header, { paddingTop: headerPadding }]}>
 *
 * Remplace les paddingTop: 60 hardcodés dans tous les écrans.
 * - Sur iPhone avec notch / Dynamic Island : insets.top + 16 (~60–70px)
 * - Sur iPhone SE (pas de notch) : 20 + 16 = 36px
 * - Sur Android : statusBarHeight + 16
 */
export function useHeaderHeight() {
  const insets = useSafeAreaInsets();

  return {
    // Pour les headers d'écran (remplace paddingTop: 60)
    headerPadding: insets.top + BASE_HEADER_PADDING,

    // Pour le padding bas des ScrollView (remplace paddingBottom fixe)
    // Tient compte de la tab bar (80px) + safe area bas
    bottomPadding: insets.bottom + 80 + 16,

    // Juste le safe area top brut (pour les overlays, images)
    topInset: insets.top,

    // Juste le safe area bas brut
    bottomInset: insets.bottom,
  };
}