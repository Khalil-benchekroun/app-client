import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useRef } from 'react';
import { colors, spacing, radius, layout, shadows } from '../../constants/theme';
import { useCart } from '../../context/CartContext';

// ── Catalogue produits mock ──────────────────────────────
// Chaque produit définit sa catégorie → détermine le type de variantes affichées
const PRODUITS = {
  '1':  { id: '1', nom: 'Robe en soie',       prix: 245,  boutique: 'Boutique Parisienne', boutiqueId: '1', categorie: 'Mode',        description: 'Robe fluide en soie naturelle, coupe midi élégante. Parfaite pour toutes les occasions, elle allie raffinement et confort.', composition: '100% Soie naturelle — Lavage à la main recommandé', delai: '45 min' },
  '2':  { id: '2', nom: 'Derby en cuir',       prix: 320,  boutique: 'Maison Dorée',        boutiqueId: '2', categorie: 'Chaussures',   description: 'Derby classique en cuir pleine fleur, semelle en cuir. Un incontournable de la garde-robe masculine.', composition: 'Cuir pleine fleur — Semelle cuir', delai: '55 min' },
  '3':  { id: '3', nom: 'Foulard en soie',     prix: 95,   boutique: 'Boutique Parisienne', boutiqueId: '1', categorie: 'Accessoires',  description: 'Foulard en soie imprimée, tombé parfait. S\'associe aussi bien à une tenue casual que sophistiquée.', composition: '100% Soie — Nettoyage à sec recommandé', delai: '45 min' },
  '4':  { id: '4', nom: 'Sac cuir naturel',    prix: 380,  boutique: 'Maison Dorée',        boutiqueId: '2', categorie: 'Accessoires',  description: 'Sac à main en cuir naturel tannage végétal. Fabriqué artisanalement, il gagne en beauté avec le temps.', composition: 'Cuir naturel tannage végétal — Doublure coton', delai: '55 min' },
  '5':  { id: '5', nom: 'Sérum éclat',         prix: 68,   boutique: 'Beauté Dorée',        boutiqueId: '5', categorie: 'Beauté',       description: 'Sérum concentré en vitamine C et acide hyaluronique. Illumine le teint et unifie le grain de peau.', composition: 'Vitamine C 15% — Acide hyaluronique — Sans paraben', delai: '60 min' },
  '6':  { id: '6', nom: 'Sneaker en toile',    prix: 155,  boutique: 'Le Concept Store',    boutiqueId: '3', categorie: 'Chaussures',   description: 'Sneaker en toile premium, semelle caoutchouc vulcanisé. Le parfait équilibre entre confort et style.', composition: 'Toile 100% coton — Semelle caoutchouc naturel', delai: '35 min' },
  '7':  { id: '7', nom: 'Blazer structuré',    prix: 320,  boutique: 'Maison Dorée',        boutiqueId: '2', categorie: 'Mode',         description: 'Blazer tailleur en laine mélangée, coupe droite structurée. Idéal pour sublimer une tenue professionnelle ou casual chic.', composition: '70% Laine — 30% Polyester — Doublure viscose', delai: '55 min' },
  '8':  { id: '8', nom: 'Pantalon lin',        prix: 145,  boutique: 'Boutique Parisienne', boutiqueId: '1', categorie: 'Mode',         description: 'Pantalon large en lin pur, taille élastiquée. Légèreté et élégance pour l\'été.', composition: '100% Lin — Lavage en machine 30°', delai: '45 min' },
  '9':  { id: '9', nom: 'Parfum signature',    prix: 120,  boutique: 'Beauté Dorée',        boutiqueId: '5', categorie: 'Beauté',       description: 'Eau de parfum aux notes de rose, musc blanc et bois de santal. Une fragrance signature intemporelle.', composition: 'Notes : Rose, Musc blanc, Santal — 50ml — EDP', delai: '60 min' },
  '10': { id: '10', nom: 'Bougie parfumée',    prix: 38,   boutique: 'Le Concept Store',    boutiqueId: '3', categorie: 'Lifestyle',    description: 'Bougie en cire végétale, mèche en coton. Parfum figue et bois de cèdre, 40h de combustion.', composition: 'Cire végétale — Mèche coton — Parfum figue & cèdre', delai: '35 min' },
  '11': { id: '11', nom: 'Huile visage',       prix: 45,   boutique: 'Beauté Dorée',        boutiqueId: '5', categorie: 'Beauté',       description: 'Huile sèche multi-usage enrichie en huile d\'argan et jojoba. Éclat immédiat, sans film gras.', composition: 'Huile d\'argan BIO — Jojoba — Vitamine E — 30ml', delai: '60 min' },
  '12': { id: '12', nom: 'Ceinture tressée',   prix: 65,   boutique: 'Maison Dorée',        boutiqueId: '2', categorie: 'Accessoires',  description: 'Ceinture tressée en cuir de veau, boucle dorée. Finitions artisanales, disponible en 3 longueurs.', composition: 'Cuir de veau — Boucle métal doré', delai: '55 min' },
};

// ── Variantes selon catégorie ────────────────────────────
const VARIANTES_PAR_CATEGORIE = {
  Mode: {
    type: 'taille',
    label: 'Taille',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  Chaussures: {
    type: 'pointure',
    label: 'Pointure',
    options: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  },
  Accessoires: {
    type: 'couleur_texte',
    label: 'Coloris',
    options: ['Noir', 'Camel', 'Ivoire', 'Bordeaux'],
  },
  Beauté: {
    type: 'unique',
    label: null,
    options: [],
  },
  Lifestyle: {
    type: 'unique',
    label: null,
    options: [],
  },
};

// ── Couleurs disponibles par produit ─────────────────────
const COULEURS_PAR_PRODUIT = {
  '1':  ['#0A0A0F', '#8B7355', '#F9F7F4', '#5C3D2E'],  // Mode : noir, camel, ivoire, brun
  '3':  ['#C9A96E', '#8B7355', '#0A0A0F', '#D4A0A0'],  // Accessoire : or, camel, noir, rose
  '4':  ['#8B7355', '#0A0A0F', '#5C3D2E'],              // Sac : camel, noir, brun
  '7':  ['#0A0A0F', '#6B6B6B', '#F9F7F4'],              // Blazer : noir, gris, ivoire
  '8':  ['#F9F7F4', '#8B7355', '#5C3D2E'],              // Pantalon : ivoire, camel, brun
  '12': ['#8B7355', '#0A0A0F', '#C9A96E'],              // Ceinture : camel, noir, or
};

// ── Noms des couleurs pour l'affichage ───────────────────
const NOM_COULEUR = {
  '#0A0A0F': 'Noir',
  '#8B7355': 'Camel',
  '#F9F7F4': 'Ivoire',
  '#5C3D2E': 'Brun',
  '#C9A96E': 'Or',
  '#D4A0A0': 'Rose poudré',
  '#6B6B6B': 'Gris',
};

// ── Produits similaires ──────────────────────────────────
const SIMILAIRES = {
  '1':  [{ id: '7', nom: 'Blazer structuré', prix: '320,00 €', boutique: 'Maison Dorée' }, { id: '8', nom: 'Pantalon lin', prix: '145,00 €', boutique: 'Boutique Parisienne' }],
  '2':  [{ id: '6', nom: 'Sneaker en toile', prix: '155,00 €', boutique: 'Le Concept Store' }, { id: '12', nom: 'Ceinture tressée', prix: '65,00 €', boutique: 'Maison Dorée' }],
  '3':  [{ id: '4', nom: 'Sac cuir naturel', prix: '380,00 €', boutique: 'Maison Dorée' }, { id: '12', nom: 'Ceinture tressée', prix: '65,00 €', boutique: 'Maison Dorée' }],
  '4':  [{ id: '3', nom: 'Foulard en soie', prix: '95,00 €', boutique: 'Boutique Parisienne' }, { id: '12', nom: 'Ceinture tressée', prix: '65,00 €', boutique: 'Maison Dorée' }],
  '5':  [{ id: '9', nom: 'Parfum signature', prix: '120,00 €', boutique: 'Beauté Dorée' }, { id: '11', nom: 'Huile visage', prix: '45,00 €', boutique: 'Beauté Dorée' }],
  '6':  [{ id: '2', nom: 'Derby en cuir', prix: '320,00 €', boutique: 'Maison Dorée' }],
  '7':  [{ id: '1', nom: 'Robe en soie', prix: '245,00 €', boutique: 'Boutique Parisienne' }, { id: '8', nom: 'Pantalon lin', prix: '145,00 €', boutique: 'Boutique Parisienne' }],
  '9':  [{ id: '5', nom: 'Sérum éclat', prix: '68,00 €', boutique: 'Beauté Dorée' }, { id: '11', nom: 'Huile visage', prix: '45,00 €', boutique: 'Beauté Dorée' }],
};

// ── Avis clients mock ────────────────────────────────────
const AVIS = {
  '1':  [
    { id: 'a1', auteur: 'Sophie M.', initiale: 'S', note: 5, commentaire: 'Absolument magnifique, la soie est d\'une qualité irréprochable. Livraison en 40 min chrono !', date: 'Il y a 2 jours', verifie: true },
    { id: 'a2', auteur: 'Camille R.', initiale: 'C', note: 4, commentaire: 'Très belle robe, taille légèrement grande. Je recommande de prendre une taille en dessous.', date: 'Il y a 5 jours', verifie: true },
    { id: 'a3', auteur: 'Laura D.', initiale: 'L', note: 5, commentaire: 'Parfaite pour mon dîner, reçue en 50 min. Je suis conquise par le service LIVRR.', date: 'Il y a 1 semaine', verifie: true },
  ],
  '2':  [
    { id: 'a4', auteur: 'Thomas B.', initiale: 'T', note: 5, commentaire: 'Qualité exceptionnelle, cuir souple et bien fini. Une très belle paire.', date: 'Il y a 3 jours', verifie: true },
    { id: 'a5', auteur: 'Marc L.', initiale: 'M', note: 4, commentaire: 'Très satisfait, prendre sa pointure habituelle. Livraison rapide.', date: 'Il y a 1 semaine', verifie: true },
  ],
  '3':  [
    { id: 'a6', auteur: 'Inès P.', initiale: 'I', note: 5, commentaire: 'Le coloris camel est sublime, exactement comme sur la photo. Très bonne qualité.', date: 'Il y a 1 jour', verifie: true },
    { id: 'a7', auteur: 'Julie F.', initiale: 'J', note: 5, commentaire: 'Reçu en 35 minutes. Emballage soigné, produit impeccable.', date: 'Il y a 4 jours', verifie: true },
  ],
  '4':  [
    { id: 'a8', auteur: 'Nathalie K.', initiale: 'N', note: 5, commentaire: 'Le cuir est magnifique et sent bon. Un investissement qui vaut chaque centime.', date: 'Il y a 2 jours', verifie: true },
  ],
  '5':  [
    { id: 'a9', auteur: 'Emma S.', initiale: 'E', note: 5, commentaire: 'Mon teint est transformé en une semaine ! Texture légère, absorbe instantanément.', date: 'Il y a 3 jours', verifie: true },
    { id: 'a10', auteur: 'Chloé V.', initiale: 'C', note: 4, commentaire: 'Très efficace, résultat visible rapidement. Je rachèterai.', date: 'Il y a 6 jours', verifie: true },
  ],
};

// ── Calcul note moyenne ──────────────────────────────────
const noteMoyenne = (id) => {
  const avis = AVIS[id];
  if (!avis || avis.length === 0) return null;
  const total = avis.reduce((s, a) => s + a.note, 0);
  return (total / avis.length).toFixed(1);
};

// ── Composant étoiles ────────────────────────────────────
const Etoiles = ({ note, taille = 14, couleur = colors.gold }) => {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: taille, color: i <= note ? couleur : colors.border }}>
          ★
        </Text>
      ))}
    </View>
  );
};

export default function FicheProduit() {
  const { id } = useLocalSearchParams();
  const { ajouterAuPanier } = useCart();

  const produit = PRODUITS[id];

  // ── Variantes selon catégorie ────────────────────────────
  const variantesConfig = VARIANTES_PAR_CATEGORIE[produit?.categorie] || VARIANTES_PAR_CATEGORIE.Mode;
  const couleursDisponibles = COULEURS_PAR_PRODUIT[id] || null;

  // ── États sélection ──────────────────────────────────────
  const [varianteSelectionnee, setVarianteSelectionnee] = useState(
    variantesConfig.options.length > 0 ? variantesConfig.options[0] : null
  );
  const [couleurSelectionnee, setCouleurSelectionnee] = useState(
    couleursDisponibles ? couleursDisponibles[0] : null
  );
  const [favori, setFavori] = useState(false);
  // 'idle' | 'added'
  const [etatPanier, setEtatPanier] = useState('idle');
  const scaleBtn = useRef(new Animated.Value(1)).current;
  const opacityBtn = useRef(new Animated.Value(1)).current;

  if (!produit) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtnSolo} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Produit introuvable</Text>
        </View>
      </View>
    );
  }

  const avis = AVIS[id] || [];
  const moyenne = noteMoyenne(id);
  const similaires = SIMILAIRES[id] || [];
  const prixFormate = produit.prix.toFixed(2).replace('.', ',') + ' €';

  // ── Ajouter au panier ────────────────────────────────────
  const handleAjouterAuPanier = () => {
    if (etatPanier === 'added') {
      // Déjà ajouté → aller directement au panier
      router.push('/(tabs)/panier');
      return;
    }

    if (variantesConfig.options.length > 0 && !varianteSelectionnee) {
      Alert.alert('', `Veuillez choisir ${variantesConfig.label.toLowerCase()}.`);
      return;
    }

    ajouterAuPanier({
      id: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      boutique: produit.boutique,
      boutiqueId: produit.boutiqueId,
      variante: varianteSelectionnee,
      varianteType: variantesConfig.label,
      couleur: couleurSelectionnee ? NOM_COULEUR[couleurSelectionnee] || couleurSelectionnee : null,
      image: null,
    });

    // Animation : scale down → up + transition vers état "added"
    Animated.sequence([
      Animated.timing(scaleBtn, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.spring(scaleBtn, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }),
    ]).start();

    setEtatPanier('added');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Image produit */}
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favorisBtn} onPress={() => setFavori(!favori)}>
            <Text style={[styles.favorisIcon, favori && { color: colors.gold }]}>
              {favori ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>

          {/* Boutique */}
          <TouchableOpacity
            style={styles.boutiqueTag}
            onPress={() => router.push(`/boutique/${produit.boutiqueId}`)}
          >
            <Text style={styles.boutiqueTagText}>{produit.boutique} ›</Text>
          </TouchableOpacity>

          {/* Nom + Prix */}
          <View style={styles.header}>
            <Text style={styles.productName}>{produit.nom}</Text>
            <Text style={styles.productPrice}>{prixFormate}</Text>
          </View>

          <Text style={styles.productCategory}>{produit.categorie}</Text>

          {/* Note moyenne */}
          {moyenne && (
            <TouchableOpacity
              style={styles.noteResume}
              onPress={() => {/* scroll vers avis */}}
            >
              <Etoiles note={Math.round(parseFloat(moyenne))} taille={13} />
              <Text style={styles.noteResumeVal}>{moyenne}</Text>
              <Text style={styles.noteResumeCount}>({avis.length} avis)</Text>
            </TouchableOpacity>
          )}

          {/* Délai livraison */}
          <View style={styles.delaiRow}>
            <Text style={styles.delaiIcon}>◎</Text>
            <Text style={styles.delaiText}>
              Livraison estimée en{' '}
              <Text style={styles.delaiHighlight}>{produit.delai}</Text>
            </Text>
          </View>

          {/* ── Couleurs (si disponibles pour ce produit) ── */}
          {couleursDisponibles && (
            <View style={styles.section}>
              <View style={styles.sectionLabelRow}>
                <Text style={styles.sectionLabel}>Couleur</Text>
                {couleurSelectionnee && (
                  <Text style={styles.sectionValeur}>
                    {NOM_COULEUR[couleurSelectionnee] || couleurSelectionnee}
                  </Text>
                )}
              </View>
              <View style={styles.couleursRow}>
                {couleursDisponibles.map((couleur) => (
                  <TouchableOpacity
                    key={couleur}
                    style={[
                      styles.couleurBtn,
                      { backgroundColor: couleur },
                      couleurSelectionnee === couleur && styles.couleurSelected,
                      couleur === '#F9F7F4' && styles.couleurClair,
                    ]}
                    onPress={() => setCouleurSelectionnee(couleur)}
                  />
                ))}
              </View>
            </View>
          )}

          {/* ── Variantes selon catégorie ── */}
          {variantesConfig.options.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionLabelRow}>
                <Text style={styles.sectionLabel}>{variantesConfig.label}</Text>
                {varianteSelectionnee && (
                  <Text style={styles.sectionValeur}>{varianteSelectionnee}</Text>
                )}
              </View>
              <View style={styles.variantesRow}>
                {variantesConfig.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.varianteBtn,
                      varianteSelectionnee === option && styles.varianteBtnSelected,
                      // Pointures : bouton plus large
                      variantesConfig.type === 'pointure' && styles.varianteBtnPointure,
                    ]}
                    onPress={() => setVarianteSelectionnee(option)}
                  >
                    <Text style={[
                      styles.varianteBtnText,
                      varianteSelectionnee === option && styles.varianteBtnTextSelected,
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Produit sans variante (Beauté, Lifestyle) */}
          {variantesConfig.type === 'unique' && (
            <View style={styles.section}>
              <View style={styles.uniqueBadge}>
                <Text style={styles.uniqueBadgeText}>◉ Taille unique — prêt à être livré</Text>
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>{produit.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Composition</Text>
            <Text style={styles.description}>{produit.composition}</Text>
          </View>

          {/* ── Section avis clients ── */}
          <View style={styles.avisSection}>
            <View style={styles.avisSectionHeader}>
              <Text style={styles.avisSectionTitre}>Avis clients</Text>
              {moyenne && (
                <View style={styles.avisMoyenneBox}>
                  <Text style={styles.avisMoyenneNum}>{moyenne}</Text>
                  <Etoiles note={Math.round(parseFloat(moyenne))} taille={12} />
                  <Text style={styles.avisCount}>{avis.length} avis</Text>
                </View>
              )}
            </View>

            {avis.length === 0 ? (
              <View style={styles.avisVide}>
                <Text style={styles.avisVideText}>Aucun avis pour ce produit.</Text>
                <Text style={styles.avisVideSub}>Soyez le premier à partager votre expérience.</Text>
              </View>
            ) : (
              avis.map((a) => (
                <View key={a.id} style={styles.avisCard}>
                  <View style={styles.avisHeader}>
                    <View style={styles.avisAvatar}>
                      <Text style={styles.avisAvatarText}>{a.initiale}</Text>
                    </View>
                    <View style={styles.avisHeaderInfo}>
                      <View style={styles.avisHeaderTop}>
                        <Text style={styles.avisAuteur}>{a.auteur}</Text>
                        {a.verifie && (
                          <View style={styles.avisVerifieBadge}>
                            <Text style={styles.avisVerifieText}>Achat vérifié</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.avisNoteRow}>
                        <Etoiles note={a.note} taille={12} />
                        <Text style={styles.avisDate}>{a.date}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.avisCommentaire}>{a.commentaire}</Text>
                </View>
              ))
            )}
          </View>

          {/* Produits similaires */}
          {similaires.length > 0 && (
            <View style={styles.similairesSection}>
              <Text style={styles.similairesTitre}>Vous aimerez aussi</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similairesRow}>
                {similaires.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.similaireCard}
                    onPress={() => router.push(`/produit/${p.id}`)}
                  >
                    <View style={styles.similaireImage} />
                    <Text style={styles.similaireBoutique}>{p.boutique}</Text>
                    <Text style={styles.similaireNom} numberOfLines={2}>{p.nom}</Text>
                    <Text style={styles.similairePrix}>{p.prix}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

        </View>
      </ScrollView>

      {/* Bouton panier fixe */}
      <View style={styles.footer}>
        {etatPanier === 'idle' ? (
          // ── État initial : prix + bouton ajouter ──
          <>
            <View style={styles.footerPrice}>
              <Text style={styles.footerPriceLabel}>Prix</Text>
              <Text style={styles.footerPriceValue}>{prixFormate}</Text>
            </View>
            <Animated.View style={{ transform: [{ scale: scaleBtn }] }}>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={handleAjouterAuPanier}
              >
                <Text style={styles.addToCartText}>Ajouter au panier</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        ) : (
          // ── État ajouté : bouton plein largeur "Voir mon panier" ──
          <Animated.View style={[styles.voirPanierWrap, { transform: [{ scale: scaleBtn }] }]}>
            <TouchableOpacity
              style={styles.voirPanierBtn}
              onPress={() => router.push('/(tabs)/panier')}
            >
              <Text style={styles.voirPanierCheck}>✓</Text>
              <View style={styles.voirPanierCenter}>
                <Text style={styles.voirPanierText}>Voir mon panier</Text>
                <Text style={styles.voirPanierSub}>{produit.nom} ajouté</Text>
              </View>
              <Text style={styles.voirPanierArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continuerBtn}
              onPress={() => {
                setEtatPanier('idle');
                router.back();
              }}
            >
              <Text style={styles.continuerBtnText}>Continuer mes achats</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Image
  imageContainer: { height: 380, backgroundColor: colors.backgroundSoft },
  backBtn: {
    position: 'absolute', top: 50, left: layout.screenPadding,
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.soft,
  },
  backBtnSolo: {
    position: 'absolute', top: 50, left: layout.screenPadding,
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 10,
  },
  backIcon: { fontSize: 24, color: colors.textPrimary },
  favorisBtn: {
    position: 'absolute', top: 50, right: layout.screenPadding,
    width: 40, height: 40, borderRadius: radius.full,
    backgroundColor: colors.background,
    alignItems: 'center', justifyContent: 'center',
    ...shadows.soft,
  },
  favorisIcon: { fontSize: 18, color: colors.textPrimary },

  // Contenu
  content: { padding: layout.screenPadding, paddingBottom: 120 },
  boutiqueTag: { marginBottom: spacing.md },
  boutiqueTagText: { fontSize: 13, color: colors.gold, letterSpacing: 0.3 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: spacing.sm,
  },
  productName: {
    fontSize: 22, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.5, flex: 1, marginRight: spacing.md,
  },
  productPrice: { fontSize: 22, fontWeight: '400', color: colors.textPrimary },
  productCategory: { fontSize: 13, color: colors.textSecondary, marginBottom: spacing.sm },

  // Note résumé
  noteResume: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  noteResumeVal: { fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  noteResumeCount: { fontSize: 13, color: colors.textSecondary },

  // Délai
  delaiRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundSoft, padding: spacing.md,
    borderRadius: radius.md, marginBottom: spacing.xl,
    borderWidth: 0.5, borderColor: colors.border,
  },
  delaiIcon: { fontSize: 14, color: colors.gold, marginRight: spacing.sm },
  delaiText: { fontSize: 13, color: colors.textSecondary },
  delaiHighlight: { color: colors.textPrimary, fontWeight: '400' },

  // Sections génériques
  section: { marginBottom: spacing.xl },
  sectionLabelRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: 12, color: colors.textSecondary,
    letterSpacing: 1, textTransform: 'uppercase',
  },
  sectionValeur: { fontSize: 13, color: colors.textPrimary, fontWeight: '400' },
  description: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },

  // Couleurs
  couleursRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  couleurBtn: {
    width: 34, height: 34, borderRadius: radius.full,
    borderWidth: 0.5, borderColor: colors.border,
  },
  couleurClair: { borderColor: colors.border },
  couleurSelected: { borderWidth: 2.5, borderColor: colors.gold },

  // Variantes (tailles, pointures, coloris texte)
  variantesRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  varianteBtn: {
    minWidth: 48, height: 48, paddingHorizontal: spacing.sm,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.backgroundSoft,
  },
  varianteBtnPointure: { minWidth: 52 },
  varianteBtnSelected: {
    backgroundColor: colors.backgroundDark, borderColor: colors.backgroundDark,
  },
  varianteBtnText: { fontSize: 13, color: colors.textPrimary },
  varianteBtnTextSelected: { color: colors.gold },

  // Taille unique
  uniqueBadge: {
    padding: spacing.md, backgroundColor: colors.backgroundSoft,
    borderRadius: radius.md, borderWidth: 0.5, borderColor: colors.border,
  },
  uniqueBadgeText: { fontSize: 13, color: colors.textSecondary },

  // Section avis
  avisSection: {
    marginBottom: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  avisSectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: spacing.lg,
  },
  avisSectionTitre: {
    fontSize: 17, fontWeight: '400', color: colors.textPrimary, letterSpacing: 0.3,
  },
  avisMoyenneBox: { alignItems: 'flex-end', gap: 4 },
  avisMoyenneNum: { fontSize: 22, fontWeight: '400', color: colors.textPrimary },
  avisCount: { fontSize: 11, color: colors.textSecondary },

  avisCard: {
    marginBottom: spacing.lg, padding: spacing.lg,
    backgroundColor: colors.backgroundSoft, borderRadius: radius.lg,
    borderWidth: 0.5, borderColor: colors.border,
  },
  avisHeader: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  avisAvatar: {
    width: 36, height: 36, borderRadius: radius.full,
    backgroundColor: colors.backgroundDark,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  avisAvatarText: { fontSize: 14, color: colors.gold, fontWeight: '400' },
  avisHeaderInfo: { flex: 1 },
  avisHeaderTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: 4 },
  avisAuteur: { fontSize: 14, fontWeight: '400', color: colors.textPrimary },
  avisVerifieBadge: {
    paddingHorizontal: spacing.sm, paddingVertical: 2,
    backgroundColor: '#E8F5EE', borderRadius: radius.sm,
  },
  avisVerifieText: { fontSize: 10, color: colors.success },
  avisNoteRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avisDate: { fontSize: 11, color: colors.textMuted },
  avisCommentaire: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },

  avisVide: { padding: spacing.xl, alignItems: 'center' },
  avisVideText: { fontSize: 14, color: colors.textPrimary, marginBottom: 4 },
  avisVideSub: { fontSize: 12, color: colors.textSecondary },

  // Similaires
  similairesSection: { marginBottom: spacing.xxxl },
  similairesTitre: {
    fontSize: 17, fontWeight: '400', color: colors.textPrimary,
    letterSpacing: 0.3, marginBottom: spacing.lg,
  },
  similairesRow: { marginLeft: -layout.screenPadding, paddingLeft: layout.screenPadding },
  similaireCard: {
    width: 140, marginRight: spacing.md,
    borderRadius: radius.lg, borderWidth: 0.5, borderColor: colors.border,
    overflow: 'hidden', ...shadows.soft,
  },
  similaireImage: { height: 160, backgroundColor: colors.backgroundSoft },
  similaireBoutique: { fontSize: 10, color: colors.gold, padding: spacing.sm, paddingBottom: 2, letterSpacing: 0.3 },
  similaireNom: { fontSize: 12, color: colors.textPrimary, paddingHorizontal: spacing.sm, marginBottom: 2, lineHeight: 17 },
  similairePrix: { fontSize: 13, fontWeight: '400', color: colors.textPrimary, padding: spacing.sm, paddingTop: 2 },

  // Produit introuvable
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 150 },
  notFoundText: { fontSize: 16, color: colors.textSecondary },

  // Footer
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    padding: layout.screenPadding, paddingBottom: 34,
    backgroundColor: colors.background,
    borderTopWidth: 0.5, borderTopColor: colors.border,
  },
  footerPrice: { flex: 1 },
  footerPriceLabel: { fontSize: 11, color: colors.textSecondary, letterSpacing: 0.5 },
  footerPriceValue: { fontSize: 20, fontWeight: '400', color: colors.textPrimary },
  addToCartBtn: {
    backgroundColor: colors.backgroundDark,
    paddingHorizontal: spacing.xl, paddingVertical: spacing.lg,
    borderRadius: radius.md,
  },
  addToCartText: { fontSize: 14, fontWeight: '400', color: colors.gold, letterSpacing: 1 },

  // État "ajouté"
  voirPanierWrap: { flex: 1 },
  voirPanierBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.success,
    padding: spacing.lg, borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  voirPanierCheck: { fontSize: 18, color: '#fff', marginRight: spacing.md },
  voirPanierCenter: { flex: 1 },
  voirPanierText: { fontSize: 15, fontWeight: '400', color: '#fff', letterSpacing: 0.3 },
  voirPanierSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  voirPanierArrow: { fontSize: 22, color: '#fff', opacity: 0.8 },
  continuerBtn: { alignItems: 'center', paddingVertical: spacing.xs },
  continuerBtnText: { fontSize: 12, color: colors.textMuted },
});