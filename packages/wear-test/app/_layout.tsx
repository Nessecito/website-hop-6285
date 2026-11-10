import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { LogProvider } from "@/lib/store";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LogProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.primary,
            headerTitleStyle: { color: colors.foreground },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="checkpoint/[id]" options={{ title: "Checkpoint" }} />
        </Stack>
      </LogProvider>
    </SafeAreaProvider>
  );
}
