import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

const jeux = [
  {
    id: '1',
    boutique: 'Boutique Parisienne',
    type: 'Tirage au sort',
    titre: 'Gagnez un bon d\'achat de 150 €',
    description: 'Participez au grand tirage du mois et tentez de remporter un bon d\'achat de 150 €.',
    fin: '30 avr. 2026',
    participants: 842,
    lot: '150 € offerts',
    participe: false,
    couleur: colors.gold,
  },
  {
    id: '2',
    boutique: 'Maison Dorée',
    type: 'Quiz mode',
    titre: 'Le quiz de la saison printemps',
    description: 'Testez vos connaissances sur les tendances printemps-été et gagnez −20% sur votre prochaine commande.',
    fin: '15 mai 2026',
    participants: 316,
    lot: '−20% sur commande',
    participe: true,
    couleur: '#A0A0A0',
  },
  {
    id: '3',
    boutique: 'Élégance & Co.',
    type: 'Roue des cadeaux',
    titre: 'Tentez votre chance chaque jour',
    description: 'Une tentative par jour. Gagnez livraison offerte, réductions ou points fidélité.',
    fin: 'Permanent',
    participants: 2140,
    lot: 'Livraison, réductions, points',
    participe: false,
    couleur: colors.gold,
  },
];

function CarteJeu({ jeu }) {
  const [participe, setParticipe] = useState(jeu.participe);

  return (
    <View style={styles.carteJeu}>
      <View style={styles.carteHeader}>
        <View style={styles.carteTypeTag}>
          <Text style={styles.carteType}>{jeu.type}</Text>
        </View>
        {participe && (
          <View style={styles.carteBadgeParticipe}>
            <Text style={styles.carteBadgeParticipeText}>✓ Inscrit</Text>
          </View>
        )}
      </View>

      <Text style={styles.carteBoutique}>{jeu.boutique}</Text>
      <Text style={styles.carteTitre}>{jeu.titre}</Text>
      <Text style={styles.carteDescription}>{jeu.description}</Text>

      <View style={styles.carteStats}>
        <View style={styles.carteStat}>
          <Text style={styles.carteStatIcon}>◎</Text>
          <Text style={styles.carteStatLabel}>Lot : <Text style={{ color: colors.gold }}>{jeu.lot}</Text></Text>
        </View>
        <View style={styles.carteStat}>
          <Text style={styles.carteStatIcon}>◉</Text>
          <Text style={styles.carteStatLabel}>{jeu.participants.toLocaleString('fr-FR')} participants</Text>
        </View>
        <View style={styles.carteStat}>
          <Text style={styles.carteStatIcon}>✦</Text>
          <Text style={styles.carteStatLabel}>Fin : {jeu.fin}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.carteBtn, participe && styles.carteBtnParticipe]}
        onPress={() => !participe && setParticipe(true)}
        disabled={participe}
      >
        <Text style={[styles.carteBtnText, participe && styles.carteBtnTextParticipe]}>
          {participe ? '✓ Vous participez' : 'Participer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Jeux() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Jeux & Concours</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introIcon}>✦</Text>
          <View style={styles.introBody}>
            <Text style={styles.introTitle}>Tentez votre chance</Text>
            <Text style={styles.introSub}>Participez aux concours de vos boutiques préférées et gagnez des récompenses exclusives.</Text>
          </View>
        </View>

        {/* Mes participations */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>EN COURS</Text>
          {jeux.map((jeu) => (
            <CarteJeu key={jeu.id} jeu={jeu} />
          ))}
        </View>

        {/* Info */}
        <View style={styles.noteCard}>
          <Text style={styles.noteIcon}>◎</Text>
          <Text style={styles.noteText}>
            Les concours sont organisés directement par les boutiques partenaires. LIVRR ne prend pas part à l'attribution des lots.
          </Text>
        </View>

      </ScrollView>
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
  introCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundDark, borderRadius: radius.lg,
  },
  introIcon: { fontSize: 18, color: colors.gold, marginTop: 2 },
  introBody: { flex: 1 },
  introTitle: { fontSize: 15, fontWeight: '400', color: colors.textLight, marginBottom: 4 },
  introSub: { fontSize: 13, color: colors.textLight, opacity: 0.6, lineHeight: 20 },
  section: { paddingHorizontal: layout.screenPadding, paddingBottom: spacing.xl },
  sectionLabel: { fontSize: 11, color: colors.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: spacing.lg },
  carteJeu: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.xl, borderWidth: 0.5, borderColor: colors.border,
    padding: spacing.lg, marginBottom: spacing.lg,
    ...shadows.soft,
  },
  carteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  carteTypeTag: {
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    backgroundColor: colors.backgroundDark, borderRadius: radius.sm,
  },
  carteType: { fontSize: 10, color: colors.gold, letterSpacing: 0.5 },
  carteBadgeParticipe: {
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    backgroundColor: '#E8F5E9', borderRadius: radius.sm,
  },
  carteBadgeParticipeText: { fontSize: 10, color: colors.success },
  carteBoutique: { fontSize: 11, color: colors.gold, letterSpacing: 0.5, marginBottom: 4 },
  carteTitre: { fontSize: 16, fontWeight: '400', color: colors.textPrimary, marginBottom: spacing.sm, lineHeight: 22 },
  carteDescription: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.lg },
  carteStats: { gap: spacing.sm, marginBottom: spacing.lg },
  carteStat: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  carteStatIcon: { fontSize: 12, color: colors.gold, width: 16 },
  carteStatLabel: { fontSize: 12, color: colors.textSecondary },
  carteBtn: {
    height: 44, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  carteBtnParticipe: { backgroundColor: '#E8F5E9' },
  carteBtnText: { fontSize: 14, fontWeight: '400', color: colors.gold, letterSpacing: 0.5 },
  carteBtnTextParticipe: { color: colors.success },
  noteCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    marginHorizontal: layout.screenPadding, marginBottom: spacing.xxxl,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
  },
  noteIcon: { fontSize: 13, color: colors.gold, marginTop: 1 },
  noteText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});