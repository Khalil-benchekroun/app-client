import { ExpoRoot } from 'expo-router';
import { requireNativeModule } from 'expo-modules-core';

export function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}