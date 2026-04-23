import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';

function TabIcon({ icon, label, focused }) {
  return (
    <View style={styles.tabItem}>
      <Text style={[styles.icon, { color: focused ? colors.gold : colors.navInactive }]}>
        {icon}
      </Text>
      <Text style={[styles.label, { color: focused ? colors.gold : colors.navInactive }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
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
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 10,
    fontFamily: 'DMSans-Regular',
    letterSpacing: 0.5,
  },
});