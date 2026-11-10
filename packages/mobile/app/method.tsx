import { StyleSheet, Text, View } from "react-native";
import { methodSections } from "@/content/house";
import { Body, Eyebrow, Screen, Title } from "@/components/ui";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";

const washes = ["1", "5", "10", "20"];

export default function Method() {
  const colors = useColors();
  const serif = Fonts?.serif ?? "serif";

  return (
    <Screen>
      <Eyebrow>Method note 01 / Proposed protocol</Eyebrow>
      <Title>What we’ll measure before launch.</Title>
      <Body>This is our proposed approach to testing a cotton-first everyday tee. No samples, measurements, results, or tester findings are reported here.</Body>
      {methodSections.map((section) => (
        <View key={section.eyebrow} style={styles.section}>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Text style={[styles.heading, { color: colors.foreground, fontFamily: serif }]}>{section.title}</Text>
          {section.paragraphs.map((paragraph) => <Body key={paragraph}>{paragraph}</Body>)}
          {"washes" in section && section.washes && (
            <View style={styles.washes}>
              {washes.map((n) => (
                <View key={n} style={[styles.wash, { borderColor: colors.border }]}>
                  <Text style={[styles.washNum, { color: colors.foreground, fontFamily: serif }]}>{n}</Text>
                  <Text style={{ color: colors.mutedForeground }}>{n === "1" ? "wash" : "washes"}</Text>
                </View>
              ))}
            </View>
          )}
          {section.eyebrow.startsWith("03") && (
            <Body>At each checkpoint, compare dimensional change, twisting, seam distortion, color and appearance change, and surface fuzz or pilling. Publish the conditions beside the observations.</Body>
          )}
        </View>
      ))}
      <View style={[styles.limit, { backgroundColor: colors.surface, borderColor: colors.brass }]}>
        <Eyebrow>The honesty rule</Eyebrow>
        <Text style={[styles.heading, { color: colors.foreground, fontFamily: serif }]}>Internal tests are internal tests.</Text>
        <Body>These proposed comparisons are not accredited laboratory results. Perceived breathability is not measured airflow. A small adult pilot is not statistically representative, and positive comments or a waitlist do not validate a product.</Body>
        <Body>Claims requiring standardized independent evidence will need the appropriate commissioned tests, with the method and result specified before publication.</Body>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { gap: 8, marginTop: 12 },
  heading: { fontSize: 30, lineHeight: 34 },
  washes: { flexDirection: "row", marginVertical: 8 },
  wash: { flex: 1, alignItems: "center", paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1 },
  washNum: { fontSize: 32, lineHeight: 36 },
  limit: { borderTopWidth: 2, padding: 16, gap: 8, marginTop: 8 },
});