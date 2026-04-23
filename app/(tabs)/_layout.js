import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/theme';

function TabIcon({ icon, label, focused }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.icon, { color: focused ? colors.gold : colors.navInactive }]}>
        {icon}
      </Text>
      <Text style={[styles.label, { color: focused ? colors.gold : colors.navInactive }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

function TabBarWithInsets(props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 8 }]}>
      {props.children}
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.navBackground,
          borderTopWidth: 0,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◎" label="Accueil" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="✦" label="Explorer" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="commandes"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◈" label="Commandes" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="◉" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.navBackground,
    borderTopWidth: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    gap: 4,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});