import { z } from "zod";
import { base } from "../__core/app";
import { removeSubscriber, saveSubscriber } from "../edition-list-store";

const fitTag = z.enum([
  "collar-loses-shape",
  "twists-or-shrinks",
  "thin-sheer-or-clingy",
  "fit-never-sits-right",
  "pills-fades-or-tired",
  "something-else",
]);

const priorityTag = z.enum(["fit-stays-familiar", "fabric-feels-right", "wear-it-again"]);
const cadenceTag = z.enum(["most-days", "few-times-a-week", "weekends", "less-often"]);
const email = z.string().trim().toLowerCase().pipe(z.email());

const hits = new Map<string, number[]>();

export function allowRequest(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headers.get("x-real-ip") || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 60 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const joinEditionList = base
  .input(
    z.object({
      email,
      source: z.enum(["fit", "closing"]),
      preference: fitTag.nullable(),
      priority: priorityTag.nullable(),
      cadence: cadenceTag.nullable(),
      heroVariant: z.enum(["follow", "close"]),
      consent: z.literal(true),
    }),
  )
  .handler(async ({ input, context }) => {
    if (!allowRequest(context.headers)) {
      return { ok: false as const, message: "Please wait a moment, then try again." };
    }
    await saveSubscriber({
      email: input.email,
      preference: input.preference,
      priority: input.priority,
      cadence: input.cadence,
      source: input.source,
      heroVariant: input.heroVariant,
    });
    return { ok: true as const };
  });

const leaveEditionList = base
  .input(z.object({ email }))
  .handler(async ({ input, context }) => {
    if (!allowRequest(context.headers)) {
      return { ok: false as const, message: "Please wait a moment, then try again." };
    }
    await removeSubscriber(input.email);
    return { ok: true as const };
  });

export const editionList = {
  join: joinEditionList,
  leave: leaveEditionList,
};
