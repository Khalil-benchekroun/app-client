import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const boutiques = [
  { id: '1', nom: 'Boutique Parisienne', categorie: 'Mode', distance: '800m', delai: '45 min', ouvert: true, livraison2h: true, lat: 48.8698, lng: 2.3078 },
  { id: '2', nom: 'Maison de Mode', categorie: 'Accessoires', distance: '1,2km', delai: '55 min', ouvert: true, livraison2h: true, lat: 48.8734, lng: 2.3102 },
  { id: '3', nom: 'Le Concept Store', categorie: 'Lifestyle', distance: '600m', delai: '35 min', ouvert: false, livraison2h: false, lat: 48.8712, lng: 2.3055 },
  { id: '4', nom: 'Épicerie du Marais', categorie: 'Épicerie fine', distance: '950m', delai: '50 min', ouvert: true, livraison2h: true, lat: 48.8756, lng: 2.3134 },
];

const filtres = ['Toutes', 'Mode', 'Beauté', 'Accessoires', 'Épicerie fine', 'Lifestyle'];

export default function Carte() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Carte des boutiques</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filtres rapides */}
      <View style={styles.filtresContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtresRow}>
          {filtres.map((filtre, index) => (
            <TouchableOpacity
              key={filtre}
              style={[styles.filtreChip, index === 0 && styles.filtreChipActive]}
            >
              <Text style={[styles.filtreText, index === 0 && styles.filtreTextActive]}>
                {filtre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtres additionnels */}
        <View style={styles.filtresExtra}>
          <TouchableOpacity style={styles.filtreExtra}>
            <Text style={styles.filtreExtraText}>◎ Ouvert maintenant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtreExtra}>
            <Text style={styles.filtreExtraText}>✦ Livraison &lt; 2h</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filtreExtra}>
            <Text style={styles.filtreExtraText}>◈ Distance</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Carte simulée */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Carte interactive</Text>
          <Text style={styles.mapPlaceholderSub}>Paris 8ème · Zone de livraison active</Text>

          {/* Pins boutiques simulés */}
          <View style={styles.pinsContainer}>
            {boutiques.map((boutique) => (
              <TouchableOpacity
                key={boutique.id}
                style={[styles.pin, !boutique.ouvert && styles.pinFermé]}
                onPress={() => router.push(`/boutique/${boutique.id}`)}
              >
                <Text style={styles.pinText}>{boutique.distance}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Position utilisateur */}
          <View style={styles.userPin}>
            <Text style={styles.userPinText}>◉</Text>
          </View>
        </View>
      </View>

      {/* Liste boutiques en bas */}
      <View style={styles.boutiquesList}>
        <Text style={styles.boutiquesListTitle}>
          {boutiques.filter(b => b.ouvert).length} boutiques disponibles
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {boutiques.map((boutique) => (
            <TouchableOpacity
              key={boutique.id}
              style={[styles.boutiqueCard, !boutique.ouvert && styles.boutiqueCardFermee]}
              onPress={() => boutique.ouvert && router.push(`/boutique/${boutique.id}`)}
            >
              <View style={styles.boutiqueCardImage} />
              <View style={styles.boutiqueCardInfo}>
                <Text style={styles.boutiqueCardNom} numberOfLines={1}>{boutique.nom}</Text>
                <Text style={styles.boutiqueCardDetails}>{boutique.categorie} · {boutique.distance}</Text>
                <View style={styles.boutiqueCardFooter}>
                  <View style={[
                    styles.statutBadge,
                    { backgroundColor: boutique.ouvert ? '#E8F5E9' : colors.backgroundSoft }
                  ]}>
                    <Text style={[
                      styles.statutText,
                      { color: boutique.ouvert ? colors.success : colors.textMuted }
                    ]}>
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
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  filtresContainer: {
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  filtresRow: {
    paddingLeft: layout.screenPadding,
    marginBottom: spacing.sm,
  },
  filtreChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginRight: spacing.sm,
    backgroundColor: colors.backgroundSoft,
  },
  filtreChipActive: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.backgroundDark,
  },
  filtreText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  filtreTextActive: {
    color: colors.gold,
  },
  filtresExtra: {
    flexDirection: 'row',
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filtreExtra: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
  },
  filtreExtraText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8EDF2',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8A9BB0',
    marginBottom: 4,
  },
  mapPlaceholderSub: {
    fontSize: 12,
    color: '#A0B0C0',
  },
  pinsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin: {
    position: 'absolute',
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  pinFermé: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.border,
  },
  pinText: {
    fontSize: 10,
    color: colors.gold,
    fontWeight: '400',
  },
  userPin: {
    position: 'absolute',
    bottom: '40%',
    left: '50%',
  },
  userPinText: {
    fontSize: 24,
    color: colors.gold,
  },
  boutiquesList: {
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    ...shadows.medium,
  },
  boutiquesListTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  boutiqueCard: {
    width: 180,
    marginLeft: layout.screenPadding,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  boutiqueCardFermee: {
    opacity: 0.5,
  },
  boutiqueCardImage: {
    height: 90,
    backgroundColor: colors.backgroundSoft,
  },
  boutiqueCardInfo: {
    padding: spacing.sm,
  },
  boutiqueCardNom: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  boutiqueCardDetails: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  boutiqueCardFooter: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  statutBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  statutText: {
    fontSize: 10,
    fontWeight: '400',
  },
  livraison2hBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: '#EEF4FF',
  },
  livraison2hText: {
    fontSize: 10,
    color: '#4A7FD4',
  },
});