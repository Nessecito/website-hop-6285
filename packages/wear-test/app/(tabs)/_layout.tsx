import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "shirt" : "shirt-outline"} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkpoints"
        options={{
          title: "Checks",
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "checkmark-circle" : "checkmark-circle-outline"} size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? "information-circle" : "information-circle-outline"} size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
