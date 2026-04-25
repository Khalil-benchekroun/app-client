import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout } from '../constants/theme';

const sujets = [
  { id: '1', label: 'Problème de livraison' },
  { id: '2', label: 'Remboursement / retour' },
  { id: '3', label: 'Produit non conforme' },
  { id: '4', label: 'Problème de paiement' },
  { id: '5', label: 'Question sur une commande' },
  { id: '6', label: 'Autre' },
];

export default function Contact() {
  const [sujetSelectionne, setSujetSelectionne] = useState(null);
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Contacter le SAV</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Disponibilité */}
        <View style={styles.disponibiliteCard}>
          <View style={styles.disponibiliteDot} />
          <View>
            <Text style={styles.disponibiliteTitle}>SAV disponible</Text>
            <Text style={styles.disponibiliteSub}>Lun–Dim · 9h00 – 20h00 · Réponse sous 2h</Text>
          </View>
        </View>

        {/* Chat rapide */}
        <TouchableOpacity
          style={styles.chatRapideBtn}
          onPress={() => router.push({ pathname: '/chat', params: { type: 'sav' } })}
        >
          <View style={styles.chatRapideBtnLeft}>
            <View style={styles.chatRapideIcon}>
              <Text style={styles.chatRapideIconText}>✦</Text>
            </View>
            <View>
              <Text style={styles.chatRapideTitle}>Chat en direct</Text>
              <Text style={styles.chatRapideSub}>Réponse immédiate · Disponible maintenant</Text>
            </View>
          </View>
          <Text style={styles.chatRapideArrow}>›</Text>
        </TouchableOpacity>

        {/* Sujet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ou envoyez-nous un message</Text>
          {sujets.map((sujet) => (
            <TouchableOpacity
              key={sujet.id}
              style={[styles.sujetCard, sujetSelectionne === sujet.id && styles.sujetCardSelected]}
              onPress={() => setSujetSelectionne(sujet.id)}
            >
              <View style={[styles.sujetDot, sujetSelectionne === sujet.id && styles.sujetDotSelected]} />
              <Text style={[styles.sujetLabel, sujetSelectionne === sujet.id && styles.sujetLabelSelected]}>
                {sujet.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Votre message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Décrivez votre problème en détail..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
          <Text style={styles.messageCount}>{message.length}/500 caractères</Text>
        </View>

        {/* Commande concernée */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commande concernée (optionnel)</Text>
          <TouchableOpacity style={styles.commandeSelector}>
            <Text style={styles.commandeSelectorText}>Sélectionner une commande</Text>
            <Text style={styles.commandeSelectorArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Info délai */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>◎</Text>
          <Text style={styles.infoText}>
            Notre équipe vous répondra par email et notification dans un délai de 2 heures ouvrées.
          </Text>
        </View>

      </ScrollView>

      {/* Bouton envoyer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.envoyerBtn, (!sujetSelectionne || !message) && styles.envoyerBtnDisabled]}
          onPress={() => (sujetSelectionne && message) && router.back()}
        >
          <Text style={styles.envoyerBtnText}>Envoyer le message</Text>
        </TouchableOpacity>
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
  disponibiliteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: layout.screenPadding,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    backgroundColor: '#E8F5E9',
    borderRadius: radius.lg,
    gap: spacing.md,
  },
  disponibiliteDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    flexShrink: 0,
  },
  disponibiliteTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.success,
    marginBottom: 2,
  },
  disponibiliteSub: {
    fontSize: 12,
    color: colors.success,
    opacity: 0.8,
  },
  section: {
    padding: layout.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  sujetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.backgroundSoft,
    gap: spacing.md,
  },
  sujetCardSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.background,
  },
  sujetDot: {
    width: 16,
    height: 16,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexShrink: 0,
  },
  sujetDotSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
  sujetLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  sujetLabelSelected: {
    color: colors.textPrimary,
  },
  messageInput: {
    height: 140,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundSoft,
    marginBottom: spacing.sm,
  },
  messageCount: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'right',
  },
  commandeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  commandeSelectorText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  commandeSelectorArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: layout.screenPadding,
    padding: spacing.lg,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    gap: spacing.sm,
    marginBottom: spacing.xxxl,
  },
  infoIcon: {
    fontSize: 14,
    color: colors.gold,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: layout.screenPadding,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  envoyerBtn: {
    height: 52,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  envoyerBtnDisabled: {
    opacity: 0.4,
  },
  envoyerBtnText: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.gold,
    letterSpacing: 1,
  },
  chatRapideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: layout.screenPadding,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.lg,
  },
  chatRapideBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  chatRapideIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatRapideIconText: {
    fontSize: 14,
    color: colors.gold,
  },
  chatRapideTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  chatRapideSub: {
    fontSize: 12,
    color: colors.gold,
    opacity: 0.8,
  },
  chatRapideArrow: {
    fontSize: 22,
    color: colors.gold,
  },
});