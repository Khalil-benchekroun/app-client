import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="boutique/[id]" />
        <Stack.Screen name="produit/[id]" />
        <Stack.Screen name="commande/recap" />
        <Stack.Screen name="commande/paiement" />
        <Stack.Screen name="commande/confirmation" />
        <Stack.Screen name="commande/suivi" />
        <Stack.Screen name="commande/retour" />
        <Stack.Screen name="adresse" />
        <Stack.Screen name="favoris" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="faq" />
        <Stack.Screen name="cgu" />
        <Stack.Screen name="paiements" />
        <Stack.Screen name="chat" />
      </Stack>
    </>
  );
}