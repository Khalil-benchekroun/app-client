import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Ajouter ou mettre à jour un article
  const ajouterAuPanier = (produit) => {
    // produit = { id, nom, prix, boutique, boutiqueId, couleur, variante, varianteType, image }
    setItems((prev) => {
      // Clé unique : même produit + même variante + même couleur
      const cle = `${produit.id}-${produit.variante || ''}-${produit.couleur || ''}`;
      const existant = prev.find((item) => item.cle === cle);
      if (existant) {
        return prev.map((item) =>
          item.cle === cle ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prev, { ...produit, cle, quantite: 1 }];
    });
  };

  const modifierQuantite = (cle, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cle === cle ? { ...item, quantite: item.quantite + delta } : item
        )
        .filter((item) => item.quantite > 0)
    );
  };

  const supprimerDuPanier = (cle) => {
    setItems((prev) => prev.filter((item) => item.cle !== cle));
  };

  const viderPanier = () => setItems([]);

  const nbArticles = items.reduce((s, i) => s + i.quantite, 0);
  const sousTotal = items.reduce((s, i) => s + i.prix * i.quantite, 0);

  // Grouper par boutique (pour livraisons séparées éventuelles)
  const parBoutique = items.reduce((acc, item) => {
    const key = item.boutiqueId || 'default';
    if (!acc[key]) acc[key] = { boutique: item.boutique, boutiqueId: item.boutiqueId, items: [] };
    acc[key].items.push(item);
    return acc;
  }, {});

  return (
    <CartContext.Provider
      value={{
        items,
        nbArticles,
        sousTotal,
        parBoutique,
        ajouterAuPanier,
        modifierQuantite,
        supprimerDuPanier,
        viderPanier,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans CartProvider');
  return ctx;
}