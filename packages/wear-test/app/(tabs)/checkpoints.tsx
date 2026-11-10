import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { Body, Eyebrow, Screen, Title } from "@/components/ui";
import { colors, serif } from "@/constants/theme";
import { CHECKPOINTS, isSuggested, suggestionLabel } from "@/lib/model";
import { useLog } from "@/lib/store";

export default function Checkpoints() {
  const { state } = useLog();

  return (
    <Screen>
      <Eyebrow>Proposed checkpoints</Eyebrow>
      <Title>Rate what you notice.</Title>
      <Body>Suggestions follow your log. You can answer early. A 1–5 score is your impression, with N/A when a question does not apply. Perceived breathability is not a lab measurement.</Body>
      {CHECKPOINTS.map((checkpoint) => {
        const saved = Boolean(state.checkpoints[checkpoint.id]?.savedAt);
        const suggested = isSuggested(checkpoint.id, state.entries);
        return (
          <Pressable key={checkpoint.id} accessibilityRole="button" onPress={() => router.push(`/checkpoint/${checkpoint.id}`)} style={styles.row}>
            <View style={styles.copy}>
              <Text style={styles.name}>{checkpoint.title}</Text>
              <Text style={styles.meta}>{saved ? "Recorded" : suggested ? "Suggested now" : suggestionLabel(checkpoint.id)}</Text>
            </View>
            <Text style={styles.open}>Open</Text>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 64, flexDirection: "row", alignItems: "center", gap: 12, borderTopWidth: 1, borderColor: colors.border, paddingVertical: 10 },
  copy: { flex: 1, gap: 2 },
  name: { color: colors.foreground, fontFamily: serif, fontSize: 24 },
  meta: { color: colors.muted, fontSize: 13 },
  open: { color: colors.primary, fontWeight: "600" },
});
