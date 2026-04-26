import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, layout, shadows } from '../constants/theme';

// ── Données mock (à connecter Supabase) ──────────────────────────────────────
const MON_CODE = 'LIVRR-KHAB12';

const MES_FILLEULS = [
  {
    id: 'PAR-041',
    nom: 'Alice K.',
    avatar: 'A',
    statut: 'converti',
    dateInvitation: '14/04/2026',
    commandeFilleul: 89,
    recompenseParrain: 15,
    recompenseFilleul: 10,
    recompensesVersees: true,
  },
  {
    id: 'PAR-039',
    nom: 'Julie P.',
    avatar: 'J',
    statut: 'en_attente',
    dateInvitation: '15/04/2026',
    commandeFilleul: null,
    recompenseParrain: null,
    recompenseFilleul: 10,
    recompensesVersees: false,
  },
  {
    id: 'PAR-035',
    nom: 'Nina F.',
    avatar: 'N',
    statut: 'en_attente',
    dateInvitation: '17/04/2026',
    commandeFilleul: null,
    recompenseParrain: null,
    recompenseFilleul: 10,
    recompensesVersees: false,
  },
];

// Règles actives (à récupérer via API)
const REGLES = {
  recompenseParrain: 15,
  recompenseFilleul: 10,
  commandeMinFilleul: 50,
  expirationLienJours: 30,
  pointsFideliteParrain: 200,
  maxFilleulsParParrain: 10,
};

const STATUT_CFG = {
  converti: {
    label: 'Converti ✓',
    color: colors.success,
    bg: '#E8F5EE',
  },
  en_attente: {
    label: 'En attente',
    color: colors.info,
    bg: '#EFF6FF',
  },
  expire: {
    label: 'Expiré',
    color: colors.textMuted,
    bg: colors.backgroundSoft,
  },
};

export default function Parrainage() {
  const [onglet, setOnglet] = useState('parrain'); // parrain | filleuls | comment
  const [codeCopie, setCodeCopie] = useState(false);

  const convertis = MES_FILLEULS.filter(f => f.statut === 'converti');
  const enAttente = MES_FILLEULS.filter(f => f.statut === 'en_attente');
  const gainsTotal = convertis.reduce((s, f) => s + (f.recompenseParrain || 0), 0);
  const pointsGagnes = convertis.length * REGLES.pointsFideliteParrain;

  const copierCode = () => {
    Clipboard.setString(MON_CODE);
    setCodeCopie(true);
    setTimeout(() => setCodeCopie(false), 2000);
  };

  const partagerCode = async () => {
    try {
      await Share.share({
        message: `Rejoins LIVRR et profite de ${REGLES.recompenseFilleul}€ de réduction sur ta première commande ! Utilise mon code : ${MON_CODE}\n\nLes meilleures boutiques parisiennes livrées en moins d'une heure. 🛍️`,
        title: 'Mon code de parrainage LIVRR',
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Parrainage</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>PROGRAMME DE PARRAINAGE</Text>
          <Text style={styles.heroTitle}>
            Invitez vos proches,{'\n'}profitez ensemble
          </Text>
          <Text style={styles.heroSub}>
            Recevez{' '}
            <Text style={styles.heroHighlight}>{REGLES.recompenseParrain}€</Text>
            {' '}dès la 1ère commande de votre filleul.{'\n'}
            Votre filleul reçoit{' '}
            <Text style={styles.heroHighlight}>{REGLES.recompenseFilleul}€</Text>
            {' '}de réduction immédiate.
          </Text>

          {/* Code promo */}
          <View style={styles.codeBlock}>
            <Text style={styles.codeLabel}>VOTRE CODE</Text>
            <Text style={styles.codeValue}>{MON_CODE}</Text>
          </View>

          {/* Actions */}
          <View style={styles.heroActions}>
            <TouchableOpacity
              style={[styles.heroBtn, styles.heroBtnPrimary]}
              onPress={partagerCode}
            >
              <Text style={styles.heroBtnPrimaryText}>Partager mon code</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.heroBtn, styles.heroBtnSecondaire]}
              onPress={copierCode}
            >
              <Text style={styles.heroBtnSecondaireText}>
                {codeCopie ? '✓ Copié !' : 'Copier'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heroNote}>
            Lien valable {REGLES.expirationLienJours} jours · Max {REGLES.maxFilleulsParParrain} filleuls
          </Text>
        </View>

        {/* Stats rapides */}
        <View style={styles.statsRow}>
          {[
            { label: 'Filleuls', val: MES_FILLEULS.length, color: colors.textPrimary },
            { label: 'Convertis', val: convertis.length, color: colors.success },
            { label: 'Gains', val: `${gainsTotal}€`, color: colors.goldDark },
            { label: 'Points bonus', val: `+${pointsGagnes}`, color: colors.gold },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Onglets */}
        <View style={styles.onglets}>
          {[
            { id: 'parrain', label: 'Mon code' },
            { id: 'filleuls', label: `Mes filleuls (${MES_FILLEULS.length})` },
            { id: 'comment', label: 'Comment ça marche' },
          ].map((o) => (
            <TouchableOpacity
              key={o.id}
              style={[styles.onglet, onglet === o.id && styles.ongletActif]}
              onPress={() => setOnglet(o.id)}
            >
              <Text style={[styles.ongletText, onglet === o.id && styles.ongletTextActif]}>
                {o.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Onglet Mon code ── */}
        {onglet === 'parrain' && (
          <View style={styles.section}>

            {/* Lien de parrainage */}
            <View style={styles.lienCard}>
              <Text style={styles.lienCardLabel}>LIEN DE PARRAINAGE</Text>
              <Text style={styles.lienCardUrl}>
                https://livrr.fr/ref/{MON_CODE.toLowerCase().replace('livrr-', '')}
              </Text>
              <TouchableOpacity
                style={styles.lienCopierBtn}
                onPress={() => {
                  Clipboard.setString(`https://livrr.fr/ref/${MON_CODE.toLowerCase().replace('livrr-', '')}`);
                  Alert.alert('', 'Lien copié dans le presse-papier');
                }}
              >
                <Text style={styles.lienCopierBtnText}>Copier le lien</Text>
              </TouchableOpacity>
            </View>

            {/* Partage réseaux */}
            <Text style={styles.sectionTitle}>Partager via</Text>
            <View style={styles.reseauxRow}>
              {[
                { label: 'WhatsApp', icon: '◎' },
                { label: 'SMS', icon: '✦' },
                { label: 'Email', icon: '◈' },
                { label: 'Plus', icon: '⊕' },
              ].map((r) => (
                <TouchableOpacity
                  key={r.label}
                  style={styles.reseauCard}
                  onPress={partagerCode}
                >
                  <Text style={styles.reseauIcon}>{r.icon}</Text>
                  <Text style={styles.reseauLabel}>{r.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Règles résumées */}
            <View style={styles.reglesCard}>
              <Text style={styles.reglesCardTitle}>Conditions du programme</Text>
              {[
                { label: 'Récompense parrain', val: `+${REGLES.recompenseParrain}€` },
                { label: 'Récompense filleul', val: `−${REGLES.recompenseFilleul}€` },
                { label: 'Commande minimum', val: `${REGLES.commandeMinFilleul}€` },
                { label: 'Points fidélité bonus', val: `+${REGLES.pointsFideliteParrain} pts` },
                { label: 'Validité du lien', val: `${REGLES.expirationLienJours} jours` },
                { label: 'Max filleuls', val: `${REGLES.maxFilleulsParParrain} personnes` },
              ].map((r, i, arr) => (
                <View
                  key={r.label}
                  style={[
                    styles.regleLigne,
                    i === arr.length - 1 && { borderBottomWidth: 0 },
                  ]}
                >
                  <Text style={styles.regleLigneLabel}>{r.label}</Text>
                  <Text style={styles.regleLigneVal}>{r.val}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Onglet Filleuls ── */}
        {onglet === 'filleuls' && (
          <View style={styles.section}>
            {MES_FILLEULS.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>✦</Text>
                <Text style={styles.emptyTitle}>Aucun filleul pour l'instant</Text>
                <Text style={styles.emptySub}>
                  Partagez votre code pour inviter vos proches à rejoindre LIVRR.
                </Text>
                <TouchableOpacity style={styles.emptyBtn} onPress={partagerCode}>
                  <Text style={styles.emptyBtnText}>Partager mon code</Text>
                </TouchableOpacity>
              </View>
            ) : (
              MES_FILLEULS.map((f) => {
                const sc = STATUT_CFG[f.statut] || STATUT_CFG.expire;
                return (
                  <View key={f.id} style={styles.filleulCard}>
                    <View style={styles.filleulLeft}>
                      <View style={styles.filleulAvatar}>
                        <Text style={styles.filleulAvatarText}>{f.avatar}</Text>
                      </View>
                      <View style={styles.filleulInfo}>
                        <View style={styles.filleulTopRow}>
                          <Text style={styles.filleulNom}>{f.nom}</Text>
                          <View style={[styles.statutBadge, { backgroundColor: sc.bg }]}>
                            <View style={[styles.statutDot, { backgroundColor: sc.color }]} />
                            <Text style={[styles.statutText, { color: sc.color }]}>
                              {sc.label}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.filleulDate}>Invité le {f.dateInvitation}</Text>

                        {f.statut === 'converti' && (
                          <View style={styles.filleulRecompenses}>
                            <Text style={styles.filleulRecompensesText}>
                              Commande : {f.commandeFilleul}€ ·{' '}
                              <Text style={{ color: colors.success }}>
                                +{f.recompenseParrain}€ crédité ✓
                              </Text>
                            </Text>
                          </View>
                        )}

                        {f.statut === 'en_attente' && (
                          <Text style={styles.filleulAttente}>
                            En attente de la 1ère commande (min. {REGLES.commandeMinFilleul}€)
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })
            )}

            {/* Inviter plus */}
            {MES_FILLEULS.length > 0 && (
              <TouchableOpacity style={styles.inviterPlusBtn} onPress={partagerCode}>
                <Text style={styles.inviterPlusBtnText}>
                  + Inviter d'autres proches ({MES_FILLEULS.length}/{REGLES.maxFilleulsParParrain})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* ── Onglet Comment ça marche ── */}
        {onglet === 'comment' && (
          <View style={styles.section}>
            {[
              {
                n: '1',
                titre: 'Partagez votre code',
                detail: `Envoyez votre code ${MON_CODE} ou votre lien personnel à vos proches par SMS, WhatsApp ou email.`,
              },
              {
                n: '2',
                titre: 'Votre filleul s\'inscrit',
                detail: `Il crée son compte LIVRR en utilisant votre code. Il reçoit automatiquement ${REGLES.recompenseFilleul}€ de réduction sur sa 1ère commande.`,
              },
              {
                n: '3',
                titre: 'Il passe sa 1ère commande',
                detail: `Son panier doit atteindre au minimum ${REGLES.commandeMinFilleul}€ pour déclencher les récompenses des deux côtés.`,
              },
              {
                n: '4',
                titre: 'Vous recevez votre récompense',
                detail: `${REGLES.recompenseParrain}€ sont crédités automatiquement sur votre compte LIVRR + ${REGLES.pointsFideliteParrain} points de fidélité bonus.`,
              },
            ].map((step, i, arr) => (
              <View key={step.n} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>{step.n}</Text>
                  </View>
                  {i < arr.length - 1 && <View style={styles.stepLine} />}
                </View>
                <View style={styles.stepBody}>
                  <Text style={styles.stepTitre}>{step.titre}</Text>
                  <Text style={styles.stepDetail}>{step.detail}</Text>
                </View>
              </View>
            ))}

            {/* Note légale */}
            <View style={styles.noteCard}>
              <Text style={styles.noteIcon}>◎</Text>
              <Text style={styles.noteText}>
                Les récompenses sont créditées après validation de la 1ère commande.
                En cas d'annulation ou de remboursement, les récompenses sont annulées.
                Programme valable dans la limite de {REGLES.maxFilleulsParParrain} filleuls par parrain.
              </Text>
            </View>

            {/* CTA */}
            <TouchableOpacity style={styles.ctaBtn} onPress={partagerCode}>
              <Text style={styles.ctaBtnText}>Partager mon code maintenant</Text>
            </TouchableOpacity>
          </View>
        )}

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

  // Hero
  heroCard: {
    margin: layout.screenPadding,
    padding: spacing.xl,
    backgroundColor: colors.backgroundDark,
    borderRadius: radius.xl,
  },
  heroLabel: {
    fontSize: 10, color: colors.gold, letterSpacing: 2,
    textTransform: 'uppercase', marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: 26, fontWeight: '400', color: colors.textLight,
    letterSpacing: 0.3, lineHeight: 34, marginBottom: spacing.md,
  },
  heroSub: {
    fontSize: 14, color: colors.textLight, opacity: 0.6,
    lineHeight: 22, marginBottom: spacing.xl,
  },
  heroHighlight: { color: colors.gold, opacity: 1, fontWeight: '400' },
  codeBlock: {
    alignItems: 'center', padding: spacing.lg,
    backgroundColor: 'rgba(201,169,110,0.12)',
    borderRadius: radius.lg, borderWidth: 1,
    borderColor: 'rgba(201,169,110,0.3)',
    marginBottom: spacing.lg,
  },
  codeLabel: {
    fontSize: 10, color: colors.gold, letterSpacing: 2,
    textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  codeValue: {
    fontSize: 22, fontWeight: '400', color: colors.gold,
    letterSpacing: 4, fontFamily: 'monospace',
  },
  heroActions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  heroBtn: { flex: 1, height: 44, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  heroBtnPrimary: { backgroundColor: colors.gold },
  heroBtnPrimaryText: { fontSize: 14, fontWeight: '400', color: colors.backgroundDark, letterSpacing: 0.5 },
  heroBtnSecondaire: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroBtnSecondaireText: { fontSize: 14, color: colors.textLight },
  heroNote: { fontSize: 11, color: colors.textLight, opacity: 0.3, textAlign: 'center' },

  // Stats
  statsRow: {
    flexDirection: 'row', paddingHorizontal: layout.screenPadding,
    gap: spacing.sm, marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1, alignItems: 'center', padding: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  statVal: { fontSize: 18, fontWeight: '400', marginBottom: 2 },
  statLabel: { fontSize: 10, color: colors.textMuted, textAlign: 'center' },

  // Onglets
  onglets: {
    flexDirection: 'row', paddingHorizontal: layout.screenPadding,
    marginBottom: spacing.lg, gap: spacing.sm,
    borderBottomWidth: 0.5, borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  onglet: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.full,
  },
  ongletActif: { backgroundColor: colors.backgroundDark },
  ongletText: { fontSize: 12, color: colors.textMuted },
  ongletTextActif: { color: colors.gold },

  // Section générique
  section: { paddingHorizontal: layout.screenPadding, paddingBottom: spacing.xxxl },
  sectionTitle: {
    fontSize: 13, color: colors.textSecondary, letterSpacing: 0.5,
    textTransform: 'uppercase', fontSize: 10, marginBottom: spacing.md,
    marginTop: spacing.lg,
  },

  // Lien card
  lienCard: {
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.md,
  },
  lienCardLabel: {
    fontSize: 10, color: colors.textMuted, letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  lienCardUrl: {
    fontSize: 13, color: colors.textSecondary,
    marginBottom: spacing.md, lineHeight: 18,
  },
  lienCopierBtn: {
    alignSelf: 'flex-start', paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm, backgroundColor: colors.backgroundDark,
    borderRadius: radius.sm,
  },
  lienCopierBtnText: { fontSize: 12, color: colors.gold },

  // Réseaux sociaux
  reseauxRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  reseauCard: {
    flex: 1, alignItems: 'center', padding: spacing.md,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border, gap: 6,
  },
  reseauIcon: { fontSize: 18, color: colors.gold },
  reseauLabel: { fontSize: 11, color: colors.textSecondary },

  // Règles
  reglesCard: {
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
  },
  reglesCardTitle: {
    fontSize: 14, fontWeight: '400', color: colors.textPrimary,
    marginBottom: spacing.md, letterSpacing: 0.3,
  },
  regleLigne: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.sm, borderBottomWidth: 0.5, borderBottomColor: colors.borderLight,
  },
  regleLigneLabel: { fontSize: 13, color: colors.textSecondary },
  regleLigneVal: { fontSize: 14, fontWeight: '400', color: colors.goldDark },

  // Filleuls
  filleulCard: {
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  filleulLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  filleulAvatar: {
    width: 44, height: 44, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gold, flexShrink: 0,
  },
  filleulAvatarText: { fontSize: 18, color: colors.gold },
  filleulInfo: { flex: 1 },
  filleulTopRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 4,
  },
  filleulNom: { fontSize: 15, fontWeight: '400', color: colors.textPrimary },
  statutBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: spacing.sm, paddingVertical: 3,
    borderRadius: radius.full,
  },
  statutDot: { width: 6, height: 6, borderRadius: radius.full },
  statutText: { fontSize: 11, fontWeight: '400' },
  filleulDate: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  filleulRecompenses: {
    backgroundColor: '#E8F5EE', paddingHorizontal: spacing.sm,
    paddingVertical: 4, borderRadius: radius.sm, alignSelf: 'flex-start',
  },
  filleulRecompensesText: { fontSize: 12, color: colors.textSecondary },
  filleulAttente: { fontSize: 12, color: colors.info, fontStyle: 'italic' },

  inviterPlusBtn: {
    marginTop: spacing.lg, height: 48,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
    borderStyle: 'dashed',
  },
  inviterPlusBtnText: { fontSize: 13, color: colors.textSecondary },

  // Empty state
  emptyState: {
    alignItems: 'center', paddingVertical: spacing.xxxl, gap: spacing.sm,
  },
  emptyIcon: { fontSize: 32, color: colors.gold, opacity: 0.4, marginBottom: spacing.md },
  emptyTitle: { fontSize: 16, fontWeight: '400', color: colors.textPrimary },
  emptySub: { fontSize: 13, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  emptyBtn: {
    marginTop: spacing.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
    backgroundColor: colors.backgroundDark, borderRadius: radius.md,
  },
  emptyBtnText: { fontSize: 14, color: colors.gold, letterSpacing: 0.5 },

  // Comment ça marche
  stepRow: {
    flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.lg,
  },
  stepLeft: { alignItems: 'center', width: 40 },
  stepNum: {
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumText: { fontSize: 16, color: colors.gold, fontWeight: '400' },
  stepLine: {
    flex: 1, width: 1, backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  stepBody: { flex: 1, paddingTop: spacing.sm, paddingBottom: spacing.xl },
  stepTitre: {
    fontSize: 15, fontWeight: '400', color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  stepDetail: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

  noteCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm,
    padding: spacing.lg, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  noteIcon: { fontSize: 13, color: colors.gold, marginTop: 1 },
  noteText: { flex: 1, fontSize: 12, color: colors.textSecondary, lineHeight: 18 },

  ctaBtn: {
    height: 52, backgroundColor: colors.backgroundDark,
    borderRadius: radius.md, alignItems: 'center', justifyContent: 'center',
  },
  ctaBtnText: { fontSize: 15, fontWeight: '400', color: colors.gold, letterSpacing: 1 },
});