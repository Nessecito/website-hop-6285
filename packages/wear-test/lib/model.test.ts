import { describe, expect, test } from "bun:test";
import { daysSinceStart, emptyState, isSuggested, nextCheckpoint, normalize, summarize } from "./model";

const now = new Date("2026-11-09T18:00:00.000Z");

describe("wear log", () => {
  test("suggests the first wear only after one wear is logged", () => {
    const state = emptyState();
    expect(isSuggested("before-wear", state.entries, now)).toBe(true);
    expect(isSuggested("first-wear", state.entries, now)).toBe(false);
    state.entries.push({ id: "1", kind: "wear", at: "2026-11-09T12:00:00.000Z", note: "" });
    expect(isSuggested("first-wear", state.entries, now)).toBe(true);
    expect(isSuggested("five-washes", state.entries, now)).toBe(false);
  });

  test("counts thirty days from the earliest entry", () => {
    const entries = [{ id: "1", kind: "wash" as const, at: "2026-10-09T18:00:00.000Z", note: "" }];
    expect(daysSinceStart(entries, now)).toBe(31);
    expect(isSuggested("thirty-days", entries, now)).toBe(true);
  });

  test("skips checkpoints that are already saved", () => {
    const state = emptyState();
    state.checkpoints["before-wear"] = { ratings: {}, wearAgain: null, annoyed: "", savedAt: "2026-11-09T00:00:00.000Z" };
    expect(nextCheckpoint(state, now)?.id).toBeUndefined();
  });

  test("writes counts into the shared note", () => {
    const state = emptyState();
    state.entries.push({ id: "1", kind: "wear", at: "2026-11-08T12:00:00.000Z", note: "collar" });
    const text = summarize(state, now);
    expect(text).toContain("Wears: 1");
    expect(text).toContain("Washes: 0");
    expect(text).toContain("collar");
    expect(text).toContain("not a Wear Test Collective application");
  });

  test("drops malformed stored records", () => {
    const state = normalize({ label: "  Prototype A  ", entries: [{ id: 1, kind: "wear" }, { id: "ok", kind: "wash", at: "2026-11-01", note: "cold" }], checkpoints: { "nope": {}, "first-wear": { ratings: { fit: 4, softness: 9 }, wearAgain: "yes", annoyed: "seam" } } });
    expect(state.label).toBe("Prototype A");
    expect(state.entries).toEqual([{ id: "ok", kind: "wash", at: "2026-11-01", note: "cold" }]);
    expect(state.checkpoints["first-wear"]?.ratings.fit).toBe(4);
    expect(state.checkpoints["first-wear"]?.ratings.softness).toBeUndefined();
  });
});
