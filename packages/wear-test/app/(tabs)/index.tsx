import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Body, Button, Card, Eyebrow, Screen, Title } from "@/components/ui";
import { colors, serif } from "@/constants/theme";
import { count, nextCheckpoint } from "@/lib/model";
import { useLog } from "@/lib/store";

export default function Today() {
  const { ready, state, setLabel, addEntry } = useLog();
  const [note, setNote] = useState("");
  const wears = count(state.entries, "wear");
  const washes = count(state.entries, "wash");
  const next = nextCheckpoint(state);

  function log(kind: "wear" | "wash") {
    addEntry(kind, note);
    setNote("");
  }

  return (
    <Screen>
      <Eyebrow>Pulido Wear Log / On this device</Eyebrow>
      <Title>What you wore. What you washed.</Title>
      <Body>Log real wears and washes for your own shirt. This is not a Wear Test Collective application, and nothing leaves the phone unless you share it.</Body>
      {!ready ? <Body>Opening your log…</Body> : null}
      <Text style={styles.label}>Garment or prototype label</Text>
      <TextInput
        value={state.label}
        onChangeText={setLabel}
        maxLength={80}
        style={styles.input}
        accessibilityLabel="Garment label"
      />
      <View style={styles.counts}>
        <View style={styles.count}><Text style={styles.number}>{wears}</Text><Text style={styles.countLabel}>wears</Text></View>
        <View style={styles.count}><Text style={styles.number}>{washes}</Text><Text style={styles.countLabel}>washes</Text></View>
      </View>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Optional note: collar, fit, a day at work"
        placeholderTextColor={colors.muted}
        style={[styles.input, styles.note]}
        accessibilityLabel="Optional note"
      />
      <Button label="Log a wear" onPress={() => log("wear")} />
      <Button label="Log a wash" variant="secondary" onPress={() => log("wash")} />
      {next && (
        <Card>
          <Eyebrow>Next suggested note</Eyebrow>
          <Text style={styles.cardTitle}>{next.title}</Text>
          <Body>{next.detail}</Body>
          <Button label="Open checkpoint" variant="secondary" onPress={() => router.push(`/checkpoint/${next.id}`)} />
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: 13, fontWeight: "600" },
  input: { minHeight: 48, borderWidth: 1, borderColor: "#80796B", backgroundColor: colors.background, color: colors.foreground, paddingHorizontal: 14, fontSize: 16 },
  note: { minHeight: 72, paddingTop: 12, textAlignVertical: "top" },
  counts: { flexDirection: "row", gap: 12 },
  count: { flex: 1, backgroundColor: colors.olive, padding: 16 },
  number: { color: colors.onOlive, fontFamily: serif, fontSize: 48, lineHeight: 52 },
  countLabel: { color: colors.onOlive, letterSpacing: 1, textTransform: "uppercase", fontSize: 12 },
  cardTitle: { color: colors.foreground, fontFamily: serif, fontSize: 28, lineHeight: 32 },
});
