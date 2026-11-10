import { StyleSheet, Text } from "react-native";
import { principles, releaseGates } from "@/content/house";
import { Body, Card, Eyebrow, Lead, Screen, Title } from "@/components/ui";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";

export default function House() {
  const colors = useColors();
  const serif = Fonts?.serif ?? "serif";

  return (
    <Screen>
      <Eyebrow>The House · Fort Worth, Texas</Eyebrow>
      <Title>A name remembered. A story still being made.</Title>
      <Lead>Before it was a label, Pulido’s was a name at the table.</Lead>
      <Body>
        The Pulido’s restaurant legacy is part of Fort Worth’s family story. For us—Vanessa and Ryan—carrying the name into clothing is a personal next chapter.
      </Body>
      <Body>
        House of Pulido is our independent clothing venture, not the restaurant’s successor. We’re beginning with the everyday tee: something familiar, useful, and worth giving our attention to.
      </Body>
      <Body>The customer brief is written, the testing checklist is built, and our first fabric comparisons are underway.</Body>

      <Eyebrow>What guides the work</Eyebrow>
      {principles.map(([n, title, body]) => (
        <Card key={n}>
          <Eyebrow>{n}</Eyebrow>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: serif }]}>{title}</Text>
          <Body>{body}</Body>
        </Card>
      ))}

      <Eyebrow>First Edition / Development hub</Eyebrow>
      <Title>Start with what gets worn.</Title>
      <Body>
        “First Edition” names this development chapter. It is not a numbered production run or a promise of availability. No orders, reservations, or preorders are being taken.
      </Body>
      <Eyebrow>Release requirements / No gates confirmed complete</Eyebrow>
      {releaseGates.map(([n, title, body]) => (
        <Card key={n}>
          <Eyebrow>{`Gate ${n}`}</Eyebrow>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: serif }]}>{title}</Text>
          <Body>{body}</Body>
        </Card>
      ))}
      <Text style={[styles.caption, { color: colors.mutedForeground }]}>
        A material score will only appear with its evidence, methods, and limitations. Missing evidence means not evaluated. No scores are available yet.
      </Text>

      <Eyebrow>Wear Test Collective / Not open</Eyebrow>
      <Title>Your experience. A better next version.</Title>
      <Body>
        We plan a small consenting adult pilot, with different routines and preferences. Applications are not open. The budget, recruitment criteria, and prototype availability still need to be confirmed.
      </Body>
      <Body>
        Day-to-day wear logging lives in a separate app, Pulido Wear Log. It keeps wears, washes, and checkpoint notes on your device. A personal log is not a tester application, and it is not sent to the house unless you share it yourself.
      </Body>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardTitle: { fontSize: 26, lineHeight: 30 },
  caption: { fontSize: 13, lineHeight: 18 },
});
