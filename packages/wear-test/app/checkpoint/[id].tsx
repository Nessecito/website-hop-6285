import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Body, Button, Eyebrow, Screen, Title } from "@/components/ui";
import { colors, serif } from "@/constants/theme";
import { CHECKPOINTS, RATINGS, isSuggested, suggestionLabel, type CheckpointId, type RatingKey, type WearAgain } from "@/lib/model";
import { useLog } from "@/lib/store";

const choices: WearAgain[] = ["yes", "no", "unsure"];

export default function Checkpoint() {
  const { ready } = useLog();
  if (!ready) return <Screen><Body>Opening your log…</Body></Screen>;
  return <CheckpointForm />;
}

function CheckpointForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const checkpoint = CHECKPOINTS.find((item) => item.id === id);
  const { state, saveCheckpoint } = useLog();
  const saved = checkpoint ? state.checkpoints[checkpoint.id] : undefined;
  const [ratings, setRatings] = useState(saved?.ratings ?? {});
  const [wearAgain, setWearAgain] = useState<WearAgain | null>(saved?.wearAgain ?? null);
  const [annoyed, setAnnoyed] = useState(saved?.annoyed ?? "");

  if (!checkpoint) {
    return <Screen><Title>That checkpoint is not part of the plan.</Title></Screen>;
  }

  function setRating(key: RatingKey, value: number | null) {
    setRatings((current) => ({ ...current, [key]: value }));
  }

  function save() {
    if (!checkpoint) return;
    saveCheckpoint(checkpoint.id as CheckpointId, { ratings, wearAgain, annoyed });
    router.back();
  }

  const suggested = isSuggested(checkpoint.id, state.entries);

  return (
    <Screen>
      <Eyebrow>{suggested ? "Suggested by your log" : suggestionLabel(checkpoint.id)}</Eyebrow>
      <Title>{checkpoint.title}</Title>
      <Body>{checkpoint.detail} Scores are impressions from 1 to 5. Choose N/A when a question does not apply.</Body>
      {RATINGS.map(([key, label]) => (
        <View key={key} style={styles.block}>
          <Text style={styles.prompt}>{label}</Text>
          <View style={styles.scale}>
            {[1, 2, 3, 4, 5].map((score) => {
              const selected = ratings[key] === score;
              return (
                <Pressable key={score} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => setRating(key, score)} style={[styles.score, selected && styles.selected]}>
                  <Text style={[styles.scoreLabel, selected && styles.selectedLabel]}>{score}</Text>
                </Pressable>
              );
            })}
            <Pressable accessibilityRole="button" accessibilityState={{ selected: ratings[key] === null }} onPress={() => setRating(key, null)} style={[styles.na, ratings[key] === null && styles.selected]}>
              <Text style={[styles.scoreLabel, ratings[key] === null && styles.selectedLabel]}>N/A</Text>
            </Pressable>
          </View>
        </View>
      ))}
      <Text style={styles.prompt}>Would you choose to wear it again?</Text>
      <View style={styles.scale}>
        {choices.map((choice) => {
          const selected = wearAgain === choice;
          return (
            <Pressable key={choice} accessibilityRole="button" accessibilityState={{ selected }} onPress={() => setWearAgain(choice)} style={[styles.choice, selected && styles.selected]}>
              <Text style={[styles.scoreLabel, selected && styles.selectedLabel]}>{choice}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.prompt}>What annoyed you, or when did you avoid wearing it?</Text>
      <TextInput value={annoyed} onChangeText={setAnnoyed} multiline style={styles.input} accessibilityLabel="What annoyed you" />
      <Button label="Save checkpoint" onPress={save} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { gap: 8 },
  prompt: { color: colors.foreground, fontFamily: serif, fontSize: 22, lineHeight: 26 },
  scale: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  score: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, paddingHorizontal: 8 },
  na: { minHeight: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, paddingHorizontal: 12 },
  choice: { minHeight: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16 },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  scoreLabel: { color: colors.foreground, fontWeight: "600", textTransform: "capitalize" },
  selectedLabel: { color: colors.onPrimary },
  input: { minHeight: 96, borderWidth: 1, borderColor: "#80796B", color: colors.foreground, padding: 12, fontSize: 16, textAlignVertical: "top" },
});
