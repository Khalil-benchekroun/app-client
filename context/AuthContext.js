import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const STORAGE_KEY = 'livrr_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // null = non connecté
  const [loading, setLoading] = useState(true);

  // ── Au démarrage : lire la session sauvegardée ──────────
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((data) => {
        if (data) setUser(JSON.parse(data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // ── Connexion email / mot de passe ──────────────────────
  // Pour l'instant : demo — accepte tout champ non vide
  // À remplacer plus tard par : supabase.auth.signInWithPassword({ email, password })
  const login = async (email, motDePasse) => {
    const userData = {
      email,
      prenom: '',
      nom: '',
      telephone: '',
    };
    setUser(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  // ── Inscription email ────────────────────────────────────
  // data = { email, prenom, nom, telephone, dateNaissance, ... }
  // À remplacer plus tard par : supabase.auth.signUp() + insert clients
  const register = async (data) => {
    const userData = {
      email: data.email || '',
      prenom: data.prenom || '',
      nom: data.nom || '',
      telephone: data.telephone || '',
      dateNaissance: data.dateNaissance || '',
    };
    setUser(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  // ── Connexion Google / Apple ─────────────────────────────
  // Appelée depuis login.js après succès OAuth
  // data = { email, prenom, nom } extrait du token Google/Apple
  const loginSocial = async (data) => {
    const userData = {
      email: data.email || '',
      prenom: data.prenom || '',
      nom: data.nom || '',
      telephone: '',
    };
    setUser(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return userData;
  };

  // ── Mise à jour du profil ────────────────────────────────
  // Appelée depuis edit-profil.js
  const updateProfile = async (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  // ── Déconnexion ──────────────────────────────────────────
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  // ── Nom affiché (prenom ou email si prenom vide) ─────────
  const displayName = user?.prenom
    ? user.prenom
    : user?.email?.split('@')[0] || 'Profil';

  // ── Initiale pour l'avatar ───────────────────────────────
  const initiale = (user?.prenom?.[0] || user?.email?.[0] || 'L').toUpperCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        displayName,
        initiale,
        login,
        register,
        loginSocial,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
};
