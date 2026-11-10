import { Pressable, StyleSheet, Text } from "react-native";
import { futureNotes, journalEntries } from "@/content/house";
import { Body, Card, Eyebrow, Screen, Title } from "@/components/ui";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";
import { openDestination } from "@/lib/open";

export default function Journal() {
  const colors = useColors();
  const serif = Fonts?.serif ?? "serif";

  return (
    <Screen>
      <Eyebrow>The Tee Test Journal</Eyebrow>
      <Title>The method. Then the evidence.</Title>
      <Body>What we’ll measure. What we learn. What needs to change. There are no approved test results or finished product claims yet.</Body>
      {journalEntries.map((entry, index) => (
        <Pressable key={entry.title} accessibilityRole="button" onPress={() => openDestination(entry.href)}>
          <Card>
            <Eyebrow>{`0${index + 1} / ${entry.eyebrow}`}</Eyebrow>
            <Text style={[styles.rowTitle, { color: colors.foreground, fontFamily: serif }]}>{entry.title}</Text>
            <Body>{entry.caption}</Body>
          </Card>
        </Pressable>
      ))}
      <Eyebrow>Future entries / Not yet published</Eyebrow>
      {futureNotes.map((note) => (
        <Text key={note} style={[styles.future, { color: colors.mutedForeground, borderColor: colors.border }]}>{note}</Text>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  rowTitle: { fontSize: 28, lineHeight: 32 },
  future: { fontSize: 16, lineHeight: 22, borderTopWidth: 1, paddingVertical: 12 },
});
