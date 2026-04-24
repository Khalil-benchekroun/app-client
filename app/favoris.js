import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const favoris = [
  { id: '1', nom: 'Robe en soie', boutique: 'Boutique Parisienne', prix: '245,00 €', dispo: true },
  { id: '2', nom: 'Sac cuir naturel', boutique: 'Boutique Parisienne', prix: '380,00 €', dispo: true },
  { id: '3', nom: 'Parfum signature', boutique: 'Maison de Mode', prix: '120,00 €', dispo: false },
  { id: '4', nom: 'Blazer structuré', boutique: 'Le Concept Store', prix: '320,00 €', dispo: true },
];

export default function Favoris() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mes favoris</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Liste favoris */}
        <View style={styles.section}>
          {favoris.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.push(`/produit/${item.id}`)}
            >
              <View style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardBoutique}>{item.boutique}</Text>
                <Text style={styles.cardNom}>{item.nom}</Text>
                <Text style={styles.cardPrix}>{item.prix}</Text>
                {!item.dispo && (
                  <Text style={styles.indispo}>Indisponible</Text>
                )}
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.favorisBtn}>
                  <Text style={styles.favorisBtnText}>♥</Text>
                </TouchableOpacity>
                {item.dispo && (
                  <TouchableOpacity style={styles.addBtn}>
                    <Text style={styles.addBtnText}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
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
    paddingBottom: spacing.lg,
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
  section: {
    padding: layout.screenPadding,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.soft,
  },
  cardImage: {
    width: 90,
    height: 100,
    backgroundColor: colors.backgroundSoft,
  },
  cardInfo: {
    flex: 1,
    padding: spacing.md,
  },
  cardBoutique: {
    fontSize: 11,
    color: colors.gold,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardNom: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardPrix: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  indispo: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  cardActions: {
    padding: spacing.md,
    gap: spacing.sm,
    alignItems: 'center',
  },
  favorisBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favorisBtnText: {
    fontSize: 16,
    color: colors.error,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    fontSize: 20,
    color: colors.gold,
    lineHeight: 22,
  },
});