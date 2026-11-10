import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, serif } from "@/constants/theme";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text style={styles.eyebrow}>{children}</Text>;
}

export function Title({ children }: { children: ReactNode }) {
  return <Text style={styles.title}>{children}</Text>;
}

export function Body({ children }: { children: ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}

export function Button({
  label,
  onPress,
  variant = "primary",
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}) {
  const primary = variant === "primary";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, primary ? styles.primary : styles.secondary, pressed && styles.pressed]}
    >
      <Text style={[styles.buttonLabel, { color: primary ? colors.onPrimary : colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 24, paddingBottom: 56, gap: 14 },
  eyebrow: { color: colors.muted, fontSize: 11, fontWeight: "600", letterSpacing: 1.4, textTransform: "uppercase" },
  title: { color: colors.foreground, fontFamily: serif, fontSize: 40, lineHeight: 44 },
  body: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  button: { minHeight: 48, paddingHorizontal: 18, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  secondary: { backgroundColor: "transparent", borderColor: colors.border },
  pressed: { opacity: 0.86 },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  card: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, padding: 18, gap: 8 },
});
