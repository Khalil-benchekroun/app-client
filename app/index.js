import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/theme';

export default function Index() {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Toujours aller vers les tabs —
      // le mode invité est autorisé, le profil gère l'affichage
      router.replace('/(tabs)');
    }
  }, [loading]);

  // Écran de chargement pendant la lecture AsyncStorage
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});