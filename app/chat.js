import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useRef } from 'react';
import { colors, spacing, radius, layout } from '../constants/theme';

// Messages SAV (existant)
const messagesSAV = [
  { id: '1', texte: 'Bonjour, comment puis-je vous aider ?', expediteur: 'marque', heure: '14:38' },
  { id: '2', texte: 'J\'ai un problème avec ma livraison.', expediteur: 'client', heure: '14:39' },
  { id: '3', texte: 'Je comprends. Pouvez-vous me donner votre numéro de commande ?', expediteur: 'marque', heure: '14:40' },
];

// Messages boutique (nouveau)
const messagesBoutique = [
  { id: '1', texte: 'Bonjour ! Bienvenue chez nous. Comment puis-je vous aider ?', expediteur: 'marque', heure: '14:38' },
  { id: '2', texte: 'Avez-vous ce sac en noir ?', expediteur: 'client', heure: '14:39' },
  { id: '3', texte: 'Oui, le sac cuir naturel est disponible en noir et en cognac. Je vous envoie les photos.', expediteur: 'marque', heure: '14:40' },
];

export default function Chat() {
  const params = useLocalSearchParams();
  const type = params.type || 'sav'; // 'boutique' ou 'sav'
  const boutiqueName = params.boutiqueName || 'Boutique Parisienne';
  const boutiqueId = params.boutiqueId;

  const isBoutique = type === 'boutique';

  const headerTitle = isBoutique ? boutiqueName : 'Service Client LIVRR';
  const headerSub = isBoutique ? 'Répond généralement en quelques minutes' : 'Lun–Dim · 9h – 20h · Réponse sous 2h';
  const avatarLetter = isBoutique ? boutiqueName[0] : 'L';
  const messages = isBoutique ? messagesBoutique : messagesSAV;

  const [inputMessage, setInputMessage] = useState('');
  const [messagesList, setMessagesList] = useState(messages);
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: String(messagesList.length + 1),
      texte: inputMessage.trim(),
      expediteur: 'client',
      heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessagesList(prev => [...prev, newMsg]);
    setInputMessage('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={[styles.headerAvatar, isBoutique && styles.headerAvatarBoutique]}>
            <Text style={styles.headerAvatarText}>{avatarLetter}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle} numberOfLines={1}>{headerTitle}</Text>
            <View style={styles.headerSubRow}>
              <View style={[styles.onlineDot, !isBoutique && styles.onlineDotSAV]} />
              <Text style={styles.headerSub} numberOfLines={1}>{headerSub}</Text>
            </View>
          </View>
        </View>

        {/* Bouton infos boutique si type boutique */}
        {isBoutique ? (
          <TouchableOpacity
            style={styles.headerAction}
            onPress={() => boutiqueId && router.push(`/boutique/${boutiqueId}`)}
          >
            <Text style={styles.headerActionIcon}>ℹ</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Bandeau contextuel */}
      {isBoutique && (
        <View style={styles.contextBanner}>
          <Text style={styles.contextBannerIcon}>◎</Text>
          <Text style={styles.contextBannerText}>
            Vous contactez directement la boutique — pour toute question sur vos commandes LIVRR, utilisez le{' '}
            <Text style={styles.contextBannerLink} onPress={() => router.push('/contact')}>SAV LIVRR</Text>
          </Text>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {/* Date */}
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>Aujourd'hui</Text>
        </View>

        {messagesList.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.expediteur === 'client' && styles.messageRowClient,
            ]}
          >
            {message.expediteur === 'marque' && (
              <View style={[styles.avatar, isBoutique && styles.avatarBoutique]}>
                <Text style={styles.avatarText}>{avatarLetter}</Text>
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.expediteur === 'client'
                ? styles.messageBubbleClient
                : styles.messageBubbleMarque,
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
          placeholder={isBoutique ? 'Écrire à la boutique...' : 'Écrire au service client...'}
          placeholderTextColor={colors.textMuted}
          multiline
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !inputMessage.trim() && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!inputMessage.trim()}
        >
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
    flexShrink: 0,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerAvatarBoutique: {
    backgroundColor: colors.backgroundDark,
    borderWidth: 1,
    borderColor: colors.gold,
  },
  headerAvatarText: {
    fontSize: 15,
    color: colors.gold,
    fontWeight: '400',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.success,
  },
  onlineDotSAV: {
    backgroundColor: colors.gold,
  },
  headerSub: {
    fontSize: 11,
    color: colors.textMuted,
    flex: 1,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.md,
    backgroundColor: '#FDF8F0',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0E8D5',
    gap: spacing.sm,
  },
  contextBannerIcon: {
    fontSize: 13,
    color: colors.gold,
    marginTop: 1,
  },
  contextBannerText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  contextBannerLink: {
    color: colors.gold,
    textDecorationLine: 'underline',
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
  avatarBoutique: {
    borderWidth: 1,
    borderColor: colors.gold,
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
  messageBubbleMarque: {
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
  sendBtnDisabled: {
    opacity: 0.4,
  },
  sendBtnText: {
    fontSize: 24,
    color: colors.gold,
    lineHeight: 26,
  },
});