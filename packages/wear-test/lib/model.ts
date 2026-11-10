export const RATINGS = [
  ["softness", "Softness"],
  ["movement", "Movement comfort"],
  ["breathability", "Perceived breathability"],
  ["fit", "Fit"],
  ["drape", "Drape"],
  ["opacity", "Opacity and confidence"],
  ["care", "Ease of care"],
  ["appearance", "Appearance after washing"],
  ["durability", "Perceived durability"],
  ["satisfaction", "Overall satisfaction"],
] as const;

export type RatingKey = (typeof RATINGS)[number][0];

export const CHECKPOINTS = [
  { id: "before-wear", title: "Before wear", detail: "How it feels in hand, before a day of wear.", needs: { wears: 0, washes: 0, days: 0 } },
  { id: "first-wear", title: "First wear", detail: "After the first time you actually wear it.", needs: { wears: 1, washes: 0, days: 0 } },
  { id: "three-wears", title: "After three wears", detail: "Once it has been through a few real days.", needs: { wears: 3, washes: 0, days: 0 } },
  { id: "five-washes", title: "Five washes", detail: "Care starts to show. Count real wash cycles.", needs: { wears: 0, washes: 5, days: 0 } },
  { id: "ten-washes", title: "Ten washes", detail: "A longer look at appearance and fit.", needs: { wears: 0, washes: 10, days: 0 } },
  { id: "thirty-days", title: "Thirty days", detail: "A month from the first logged wear or wash.", needs: { wears: 0, washes: 0, days: 30 } },
] as const;

export type CheckpointId = (typeof CHECKPOINTS)[number]["id"];
export type WearAgain = "yes" | "no" | "unsure";

export type Entry = { id: string; kind: "wear" | "wash"; at: string; note: string };

export type CheckpointRecord = {
  ratings: Partial<Record<RatingKey, number | null>>;
  wearAgain: WearAgain | null;
  annoyed: string;
  savedAt: string | null;
};

export type LogState = {
  label: string;
  entries: Entry[];
  checkpoints: Partial<Record<CheckpointId, CheckpointRecord>>;
};

const checkpointIds = new Set<string>(CHECKPOINTS.map((item) => item.id));
const ratingKeys = new Set<string>(RATINGS.map(([key]) => key));

export function emptyState(): LogState {
  return { label: "My everyday shirt", entries: [], checkpoints: {} };
}

export function count(entries: Entry[], kind: Entry["kind"]) {
  return entries.filter((entry) => entry.kind === kind).length;
}

export function daysSinceStart(entries: Entry[], now = new Date()) {
  const first = entries.reduce<string | null>((earliest, entry) => {
    if (!earliest || entry.at < earliest) return entry.at;
    return earliest;
  }, null);
  if (!first) return 0;
  const elapsed = now.getTime() - new Date(first).getTime();
  return Math.max(0, Math.floor(elapsed / 86_400_000));
}

export function isSuggested(id: CheckpointId, entries: Entry[], now = new Date()) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === id);
  if (!checkpoint) return false;
  return count(entries, "wear") >= checkpoint.needs.wears
    && count(entries, "wash") >= checkpoint.needs.washes
    && daysSinceStart(entries, now) >= checkpoint.needs.days;
}

export function suggestionLabel(id: CheckpointId) {
  const checkpoint = CHECKPOINTS.find((item) => item.id === id);
  if (!checkpoint) return "";
  const parts = [
    checkpoint.needs.wears ? `${checkpoint.needs.wears} wear${checkpoint.needs.wears === 1 ? "" : "s"}` : "",
    checkpoint.needs.washes ? `${checkpoint.needs.washes} washes` : "",
    checkpoint.needs.days ? `${checkpoint.needs.days} days` : "",
  ].filter(Boolean);
  return parts.length === 0 ? "Ready whenever you are" : `Suggested after ${parts.join(", ")}`;
}

export function nextCheckpoint(state: LogState, now = new Date()) {
  return CHECKPOINTS.find((item) => isSuggested(item.id, state.entries, now) && !state.checkpoints[item.id]?.savedAt) ?? null;
}

export function summarize(state: LogState, now = new Date()) {
  const lines = [
    "Pulido Wear Log",
    `Garment: ${state.label}`,
    `Wears: ${count(state.entries, "wear")}`,
    `Washes: ${count(state.entries, "wash")}`,
    `Days since first entry: ${daysSinceStart(state.entries, now)}`,
    "",
    "Log",
  ];
  const ordered = [...state.entries].sort((a, b) => (a.at < b.at ? -1 : 1));
  if (ordered.length === 0) lines.push("No wears or washes logged yet.");
  for (const entry of ordered) {
    lines.push(`- ${entry.at.slice(0, 10)} ${entry.kind}${entry.note ? ` — ${entry.note}` : ""}`);
  }
  lines.push("", "Checkpoints");
  for (const checkpoint of CHECKPOINTS) {
    const saved = state.checkpoints[checkpoint.id];
    if (!saved?.savedAt) {
      lines.push(`${checkpoint.title}: not recorded`);
      continue;
    }
    lines.push(`${checkpoint.title} (saved ${saved.savedAt.slice(0, 10)})`);
    for (const [key, label] of RATINGS) {
      const value = saved.ratings[key];
      lines.push(`  ${label}: ${value == null ? "n/a" : value}`);
    }
    lines.push(`  Would you choose to wear it again?: ${saved.wearAgain ?? "n/a"}`);
    if (saved.annoyed.trim()) lines.push(`  What annoyed you: ${saved.annoyed.trim()}`);
  }
  lines.push(
    "",
    "This note stayed on the device until it was shared. It is a personal log, not an accredited test and not a Wear Test Collective application.",
  );
  return lines.join("\n");
}

function ratingValue(value: unknown): number | null | undefined {
  if (value === null) return null;
  if (typeof value === "number" && value >= 1 && value <= 5) return value;
  return undefined;
}

export function normalize(value: unknown): LogState {
  const fallback = emptyState();
  if (!value || typeof value !== "object") return fallback;
  const raw = value as Record<string, unknown>;
  const label = typeof raw.label === "string" && raw.label.trim() ? raw.label.trim().slice(0, 80) : fallback.label;
  const entries: Entry[] = [];
  if (Array.isArray(raw.entries)) {
    for (const item of raw.entries) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      if ((row.kind !== "wear" && row.kind !== "wash") || typeof row.id !== "string" || typeof row.at !== "string") continue;
      entries.push({ id: row.id, kind: row.kind, at: row.at, note: typeof row.note === "string" ? row.note.slice(0, 500) : "" });
    }
  }
  const checkpoints: LogState["checkpoints"] = {};
  if (raw.checkpoints && typeof raw.checkpoints === "object") {
    for (const [id, item] of Object.entries(raw.checkpoints as Record<string, unknown>)) {
      if (!checkpointIds.has(id) || !item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      const ratings: CheckpointRecord["ratings"] = {};
      if (row.ratings && typeof row.ratings === "object") {
        for (const [key, score] of Object.entries(row.ratings as Record<string, unknown>)) {
          if (!ratingKeys.has(key)) continue;
          const parsed = ratingValue(score);
          if (parsed !== undefined) ratings[key as RatingKey] = parsed;
        }
      }
      const wearAgain = row.wearAgain === "yes" || row.wearAgain === "no" || row.wearAgain === "unsure" ? row.wearAgain : null;
      checkpoints[id as CheckpointId] = {
        ratings,
        wearAgain,
        annoyed: typeof row.annoyed === "string" ? row.annoyed.slice(0, 800) : "",
        savedAt: typeof row.savedAt === "string" ? row.savedAt : null,
      };
    }
  }
  return { label, entries, checkpoints };
}
