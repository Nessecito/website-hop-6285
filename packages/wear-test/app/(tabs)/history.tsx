import { Pressable, StyleSheet, Text, View } from "react-native";
import { Body, Eyebrow, Screen, Title } from "@/components/ui";
import { colors, serif } from "@/constants/theme";
import { useLog } from "@/lib/store";

function when(iso: string) {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function History() {
  const { state, removeEntry } = useLog();

  return (
    <Screen>
      <Eyebrow>The record</Eyebrow>
      <Title>Wears and washes.</Title>
      {state.entries.length === 0 ? <Body>Nothing logged yet. A wear or a wash on Today starts the record.</Body> : null}
      {state.entries.map((entry) => (
        <View key={entry.id} style={styles.row}>
          <View style={styles.copy}>
            <Text style={styles.kind}>{entry.kind}</Text>
            <Text style={styles.when}>{when(entry.at)}</Text>
            {entry.note ? <Text style={styles.note}>{entry.note}</Text> : null}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${entry.kind}`} onPress={() => removeEntry(entry.id)} style={styles.remove}>
            <Text style={styles.removeLabel}>Remove</Text>
          </Pressable>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, borderTopWidth: 1, borderColor: colors.border, paddingVertical: 12 },
  copy: { flex: 1, gap: 2 },
  kind: { color: colors.foreground, fontFamily: serif, fontSize: 24, textTransform: "capitalize" },
  when: { color: colors.muted, fontSize: 13 },
  note: { color: colors.foreground, fontSize: 15, lineHeight: 21 },
  remove: { minHeight: 44, minWidth: 72, alignItems: "center", justifyContent: "center" },
  removeLabel: { color: colors.primary, fontWeight: "600" },
});
