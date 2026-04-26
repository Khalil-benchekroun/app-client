import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useEffect } from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

// ── Icônes SVG sur mesure ────────────────────────────────
// Chaque icône a une version outline (inactive) et filled (active)

function IconAccueil({ focused, color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <>
          <Path
            d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
            fill={color}
          />
        </>
      ) : (
        <>
          <Path
            d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
}

function IconExplorer({ focused, color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <>
          <Circle cx={11} cy={11} r={8} fill={color} opacity={0.15} />
          <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={1.5} />
          <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
          <Path d="M8 11H14M11 8V14" stroke={colors.navBackground} strokeWidth={1.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={1.5} />
          <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

function IconPanier({ focused, color, nbArticles }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <>
          <Path
            d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
            fill={color}
            opacity={0.15}
          />
          <Path
            d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <Path d="M3 6H21" stroke={color} strokeWidth={1.5} />
          <Path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <Path
            d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <Path d="M3 6H21" stroke={color} strokeWidth={1.5} />
          <Path d="M16 10C16 12.2 14.2 14 12 14C9.8 14 8 12.2 8 10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

function IconCommandes({ focused, color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <>
          <Rect x={3} y={3} width={18} height={18} rx={3} fill={color} opacity={0.15} />
          <Rect x={3} y={3} width={18} height={18} rx={3} stroke={color} strokeWidth={1.5} />
          <Path d="M8 8H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <Path d="M8 12H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <Path d="M8 16H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <Rect x={3} y={3} width={18} height={18} rx={3} stroke={color} strokeWidth={1.5} />
          <Path d="M8 8H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <Path d="M8 12H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
          <Path d="M8 16H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
}

function IconProfil({ focused, color }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <>
          <Circle cx={12} cy={8} r={4} fill={color} opacity={0.9} />
          <Path
            d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            fill="none"
          />
        </>
      ) : (
        <>
          <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.5} />
          <Path
            d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </>
      )}
    </Svg>
  );
}

// ── Badge panier ──────────────────────────────────────────
function BadgePanier({ count }) {
  if (!count || count === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 9 ? '9+' : count}</Text>
    </View>
  );
}

// ── Composant tab animé ───────────────────────────────────
function TabIconAnimated({ focused, icon, label, nbArticles }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const opacityLabelAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const dotAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    if (focused) {
      // Tap → légère montée + scale up
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.12,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        Animated.spring(translateYAnim, {
          toValue: -3,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        Animated.timing(opacityLabelAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(dotAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 12,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        Animated.timing(opacityLabelAnim, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(dotAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 300,
          friction: 12,
        }),
      ]).start();
    }
  }, [focused]);

  const color = focused ? colors.gold : colors.navInactive;

  const IconComponent = {
    accueil: IconAccueil,
    explorer: IconExplorer,
    panier: IconPanier,
    commandes: IconCommandes,
    profil: IconProfil,
  }[icon];

  return (
    <View style={styles.tabItem}>
      <Animated.View
        style={[
          styles.iconWrap,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        {/* Fond pill sur item actif */}
        {focused && (
          <Animated.View
            style={[
              styles.activePill,
              { opacity: dotAnim, transform: [{ scaleX: dotAnim }] },
            ]}
          />
        )}

        <IconComponent focused={focused} color={color} nbArticles={nbArticles} />

        {/* Badge panier */}
        {icon === 'panier' && (
          <View style={styles.badgeWrap}>
            <BadgePanier count={nbArticles} />
          </View>
        )}
      </Animated.View>

      {/* Label qui apparaît seulement quand actif */}
      <Animated.Text
        style={[
          styles.label,
          { color, opacity: opacityLabelAnim },
        ]}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>

      {/* Point doré sous l'icône inactive */}
      {!focused && (
        <View style={styles.dotInactive} />
      )}
    </View>
  );
}

// ── Layout principal ──────────────────────────────────────
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { nbArticles } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.navBackground,
          borderTopWidth: 0,
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
          // Ombre subtile vers le haut
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 20,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconAnimated icon="accueil" label="Accueil" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconAnimated icon="explorer" label="Explorer" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="panier"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconAnimated icon="panier" label="Panier" focused={focused} nbArticles={nbArticles} />
          ),
        }}
      />
      <Tabs.Screen
        name="commandes"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconAnimated icon="commandes" label="Commandes" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIconAnimated icon="profil" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 52,
    gap: 3,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 36,
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    width: 48,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(201, 169, 110, 0.12)',
  },
  label: {
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dotInactive: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  badgeWrap: {
    position: 'absolute',
    top: -4,
    right: 2,
  },
  badge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: colors.navBackground,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.navBackground,
  },
});