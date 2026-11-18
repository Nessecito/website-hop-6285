import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { usePing } from "@/queries/ping";
import { useColors } from "@/hooks/use-colors";
import { Fonts } from "@/constants/theme";

/**
 * Home tab — polished under appllama-app-design-skill:
 * clear hierarchy, semantic colors, native safe areas, no decorative pills.
 */
export default function Index() {
  const colors = useColors();
  const ping = usePing();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>
          HOUSE OF PULIDO
        </Text>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.sans }]}>
          Made to become yours
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Everyday clothing, considered closely. Follow Edition 001 while the
          first tee is still being developed.
        </Text>
      </View>

      <View
        style={[
          styles.statusBlock,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.statusLabel, { color: colors.mutedForeground }]}>
          API
        </Text>
        {ping.isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : ping.isError ? (
          <Text style={[styles.statusValue, { color: colors.destructive }]}>
            Unavailable — check the local server
          </Text>
        ) : (
          <Text style={[styles.statusValue, { color: colors.foreground }]}>
            {ping.data?.message ?? "Connected"}
          </Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open explore tab for development notes"
        onPress={() => router.push("/explore")}
        style={({ pressed }) => [
          styles.cta,
          {
            backgroundColor: colors.primary,
            opacity: pressed ? 0.88 : 1,
          },
        ]}
      >
        <Text style={[styles.ctaLabel, { color: colors.primaryForeground }]}>
          Follow Edition 001
        </Text>
      </Pressable>

      <Text style={[styles.footnote, { color: colors.mutedForeground }]}>
        Occasional development notes. No launch-date promises.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 20,
  },
  header: {
    gap: 10,
    maxWidth: 420,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: -0.6,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusBlock: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  statusValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  cta: {
    minHeight: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
  },
});
