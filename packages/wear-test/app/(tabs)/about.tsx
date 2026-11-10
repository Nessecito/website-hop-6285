import { Alert, Linking, Share, StyleSheet, Text } from "react-native";
import { Body, Button, Eyebrow, Screen, Title } from "@/components/ui";
import { colors, serif } from "@/constants/theme";
import { summarize } from "@/lib/model";
import { useLog } from "@/lib/store";

export default function About() {
  const { state, reset } = useLog();

  async function share() {
    await Share.share({ message: summarize(state) });
  }

  function email() {
    const text = summarize(state);
    const body = text.length > 1500 ? `${text.slice(0, 1500)}\n\n[truncated — use Share for the full log]` : text;
    const href = `mailto:Vanessa@houseofpulido.com?subject=${encodeURIComponent("Wear log — a note for Vanessa and Ryan")}&body=${encodeURIComponent(`Hi Vanessa and Ryan,\n\n${body}\n`)}`;
    return Linking.openURL(href);
  }

  function clear() {
    Alert.alert("Clear this log?", "Wears, washes, and checkpoints on this device will be removed. This cannot be undone.", [
      { text: "Keep the log", style: "cancel" },
      { text: "Clear log", style: "destructive", onPress: reset },
    ]);
  }

  return (
    <Screen>
      <Eyebrow>A private notebook</Eyebrow>
      <Title>Your log. Your choice to share.</Title>
      <Body>Pulido Wear Log records what you wear and wash, plus the checkpoint questions from the proposed tee test. It stays in storage on this device.</Body>
      <Text style={styles.heading}>What this is not</Text>
      <Body>The Wear Test Collective is not open. This app does not apply you to it, reserve a prototype, or turn a note into an accredited result. A gift, if one ever exists, will never depend on praise.</Body>
      <Body>You can delete any entry, or clear the whole log. Quotes and photos are not collected here.</Body>
      <Button label="Share the full log" onPress={share} />
      <Button label="Email the log to Vanessa" variant="secondary" onPress={email} />
      <Text style={styles.note}>Email opens a draft. You decide whether to send it.</Text>
      <Button label="Clear log on this device" variant="secondary" onPress={clear} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: colors.foreground, fontFamily: serif, fontSize: 28, lineHeight: 32, marginTop: 8 },
  note: { color: colors.muted, fontSize: 13, lineHeight: 18 },
});
