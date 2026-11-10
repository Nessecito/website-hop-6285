import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";

const serif = Fonts?.serif ?? "serif";

export function Screen({ children }: { children: ReactNode }) {
  const colors = useColors();
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>{children}</Text>;
}

export function Title({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.title, { color: colors.foreground, fontFamily: serif }]}>{children}</Text>;
}

export function Body({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.body, { color: colors.mutedForeground }]}>{children}</Text>;
}

export function Lead({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <Text style={[styles.lead, { color: colors.foreground, fontFamily: serif }]}>{children}</Text>;
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
  const colors = useColors();
  const primary = variant === "primary";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? colors.primary : "transparent",
          borderColor: primary ? colors.primary : colors.border,
          opacity: pressed ? 0.86 : 1,
        },
      ]}
    >
      <Text style={[styles.buttonLabel, { color: primary ? colors.primaryForeground : colors.foreground }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children }: { children: ReactNode }) {
  const colors = useColors();
  return <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>{children}</View>;
}

export function Rule() {
  const colors = useColors();
  return <View style={[styles.rule, { backgroundColor: colors.brass }]} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 56, gap: 14 },
  eyebrow: { fontSize: 11, fontWeight: "600", letterSpacing: 1.4, textTransform: "uppercase" },
  title: { fontSize: 40, lineHeight: 44, fontWeight: "500" },
  lead: { fontSize: 26, lineHeight: 32, fontWeight: "500" },
  body: { fontSize: 16, lineHeight: 24 },
  button: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  card: { borderWidth: 1, padding: 18, gap: 8 },
  rule: { height: 1, marginVertical: 6 },
});
