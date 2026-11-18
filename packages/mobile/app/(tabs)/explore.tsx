import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColors } from "@/hooks/use-colors";
import { Fonts } from "@/constants/theme";

const notes = [
  {
    title: "Fit worth returning to",
    body: "We are listening for the details that make a tee feel familiar after wash and wear.",
  },
  {
    title: "Fabric tested in real rotation",
    body: "Cotton-first candidates are evaluated for weight, recovery, opacity, and hand — not claimed finished.",
  },
  {
    title: "Evidence before claims",
    body: "Durability and sustainability language waits on product-specific proof.",
  },
] as const;

/**
 * Explore tab — list hierarchy without pill clusters (appllama-app-design anti-slop).
 */
export default function Explore() {
  const colors = useColors();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={[styles.safe, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.eyebrow, { color: colors.mutedForeground }]}>
          Development notes
        </Text>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: Fonts.sans }]}>
          What we are learning
        </Text>
        <Text style={[styles.lede, { color: colors.mutedForeground }]}>
          A quiet record of Edition 001 work. Nothing here is a finished product
          claim.
        </Text>

        <View style={styles.list}>
          {notes.map((note, index) => (
            <View
              key={note.title}
              style={[
                styles.row,
                {
                  borderTopColor: colors.border,
                  borderTopWidth: index === 0 ? StyleSheet.hairlineWidth : 0,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.rowTitle, { color: colors.foreground }]}>
                {note.title}
              </Text>
              <Text style={[styles.rowBody, { color: colors.mutedForeground }]}>
                {note.body}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 12,
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
  lede: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
  },
  row: {
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  rowBody: {
    fontSize: 15,
    lineHeight: 22,
  },
});
