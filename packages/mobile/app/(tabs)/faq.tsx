import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { faqs } from "@/content/house";
import { Body, Button, Eyebrow, Screen, Title } from "@/components/ui";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";
import { openDestination } from "@/lib/open";

export default function Faq() {
  const colors = useColors();
  const serif = Fonts?.serif ?? "serif";
  const [open, setOpen] = useState<string | null>(faqs[0]?.q ?? null);

  return (
    <Screen>
      <Eyebrow>Questions / Honest answers</Eyebrow>
      <Title>Asked, answered plainly.</Title>
      <Body>No scores, prices, sizes, or dates are promised here. If an answer isn’t known yet, it says so.</Body>
      {faqs.map((item) => {
        const expanded = open === item.q;
        return (
          <View key={item.q} style={[styles.row, { borderColor: colors.border }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded }}
              onPress={() => setOpen(expanded ? null : item.q)}
              style={styles.summary}
            >
              <Text style={[styles.question, { color: colors.foreground, fontFamily: serif }]}>{item.q}</Text>
              <Text style={[styles.mark, { color: colors.brass }]}>{expanded ? "–" : "+"}</Text>
            </Pressable>
            {expanded && (
              <View style={styles.answer}>
                <Body>{item.a}</Body>
                {item.href && item.label && <Button label={item.label} variant="secondary" onPress={() => openDestination(item.href!)} />}
              </View>
            )}
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { borderTopWidth: 1, paddingVertical: 8 },
  summary: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: 12 },
  question: { flex: 1, fontSize: 22, lineHeight: 26 },
  mark: { fontSize: 28, width: 24, textAlign: "center" },
  answer: { gap: 12, paddingBottom: 12 },
});
