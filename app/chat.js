import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, radius, layout } from '../constants/theme';

const messages = [
  { id: '1', texte: 'Bonjour, votre commande est en cours de préparation.', expediteur: 'boutique', heure: '14:38' },
  { id: '2', texte: 'Merci ! Combien de temps encore ?', expediteur: 'client', heure: '14:39' },
  { id: '3', texte: 'Environ 10 minutes. Le livreur sera là vers 15h20.', expediteur: 'boutique', heure: '14:40' },
  { id: '4', texte: 'Parfait, merci beaucoup !', expediteur: 'client', heure: '14:41' },
];

export default function Chat() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Boutique Parisienne</Text>
          <Text style={styles.headerSub}>En ligne</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date */}
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>Aujourd'hui</Text>
        </View>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.expediteur === 'client' && styles.messageRowClient,
            ]}
          >
            {message.expediteur === 'boutique' && (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>B</Text>
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.expediteur === 'client' ? styles.messageBubbleClient : styles.messageBubbleBoutique,
            ]}>
              <Text style={[
                styles.messageTexte,
                message.expediteur === 'client' && styles.messageTexteClient,
              ]}>
                {message.texte}
              </Text>
              <Text style={[
                styles.messageHeure,
                message.expediteur === 'client' && styles.messageHeureClient,
              ]}>
                {message.heure}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Écrire un message..."
          placeholderTextColor={colors.textMuted}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>›</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: colors.background,
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
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 12,
    color: colors.success,
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xl,
  },
  dateRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
    backgroundColor: colors.backgroundSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  messageRowClient: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 13,
    color: colors.gold,
    fontWeight: '400',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  messageBubbleBoutique: {
    backgroundColor: colors.backgroundSoft,
    borderBottomLeftRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  messageBubbleClient: {
    backgroundColor: colors.backgroundDark,
    borderBottomRightRadius: 4,
  },
  messageTexte: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTexteClient: {
    color: colors.textLight,
  },
  messageHeure: {
    fontSize: 10,
    color: colors.textMuted,
    alignSelf: 'flex-end',
  },
  messageHeureClient: {
    color: colors.textLight,
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: layout.screenPadding,
    paddingBottom: 34,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg,
    borderWidth: 0.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnText: {
    fontSize: 24,
    color: colors.gold,
    lineHeight: 26,
  },
});