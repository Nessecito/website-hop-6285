import { Text, View, StyleSheet } from "react-native";
import { editorialSite, journey, questions, shirtFeedbackEmail } from "@/content/house";
import { Body, Button, Card, Eyebrow, Lead, Screen, Title } from "@/components/ui";
import { Fonts } from "@/constants/theme";
import { useColors } from "@/hooks/use-colors";
import { openDestination } from "@/lib/open";

export default function Home() {
  const colors = useColors();
  const serif = Fonts?.serif ?? "serif";

  return (
    <Screen>
      <Eyebrow>From Fort Worth · With Vanessa & Ryan</Eyebrow>
      <Title>Everyday clothing, considered closely.</Title>
      <Lead>A family name from Fort Worth. A new chapter, made together.</Lead>
      <Body>
        We’re Vanessa and Ryan, carrying the Pulido name into clothing and building our first everyday tee in the open. Come follow the materials, the questions, and the small decisions that make it ours.
      </Body>
      <Button label="Read the field notes" onPress={() => openDestination(editorialSite)} />
      <Button label="Share your shirt story" variant="secondary" onPress={() => openDestination(shirtFeedbackEmail)} />
      <Text style={[styles.note, { color: colors.mutedForeground }]}>
        The story button opens a draft in your email app. Nothing is collected here.
      </Text>

      <View style={[styles.plate, { backgroundColor: colors.olive }]}>
        <Text style={[styles.plateEyebrow, { color: colors.accentForeground }]}>The Pulido point of view</Text>
        <Text style={[styles.plateCopy, { color: colors.accentForeground, fontFamily: serif }]}>
          Consider the material.{"\n"}Learn through wear.{"\n"}Earn the claim.
        </Text>
        <Text style={[styles.plateFoot, { color: colors.accentForeground }]}>Our goal: garments worth passing on.</Text>
      </View>

      <Eyebrow>The guiding question</Eyebrow>
      <Lead>What makes you reach for it again?</Lead>
      <Body>Maybe the fit changes. Maybe the seams twist. Maybe it simply stops feeling like your favorite. We’re starting with the details you notice in everyday wear.</Body>
      {questions.map(([n, title, body]) => (
        <Card key={n}>
          <Eyebrow>{n} / Research question</Eyebrow>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: serif }]}>{title}</Text>
          <Body>{body}</Body>
        </Card>
      ))}

      <Eyebrow>The first tee</Eyebrow>
      <Title>Small steps. A thoughtful beginning.</Title>
      <Body>
        We’ve put the everyday wearer at the center of our brief, built the testing checklist, and begun our first fabric comparisons. These are founder-reported milestones, not finished test results.
      </Body>
      {journey.map(([eyebrow, title, body]) => (
        <Card key={eyebrow}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Text style={[styles.cardTitle, { color: colors.foreground, fontFamily: serif }]}>{title}</Text>
          <Body>{body}</Body>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: { fontSize: 13, lineHeight: 18 },
  plate: { padding: 24, gap: 16, marginTop: 8 },
  plateEyebrow: { fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: "600" },
  plateCopy: { fontSize: 32, lineHeight: 38 },
  plateFoot: { fontSize: 13, letterSpacing: 0.6 },
  cardTitle: { fontSize: 26, lineHeight: 30 },
});
