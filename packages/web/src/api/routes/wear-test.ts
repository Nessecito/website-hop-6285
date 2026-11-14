import { z } from "zod";
import { base } from "../__core/app";
import { saveApplication } from "../wear-test-store";
import { allowRequest } from "./edition-list";

const email = z.string().trim().toLowerCase().pipe(z.email());

const applyWearTest = base
  .input(
    z.object({
      name: z.string().trim().min(1).max(80),
      email,
      size: z.enum(["XS", "S", "M", "L", "XL", "XXL", "3XL+", "Varies"]),
      note: z.string().trim().max(500).nullable(),
      adult: z.literal(true),
    }),
  )
  .handler(async ({ input, context }) => {
    if (!allowRequest(context.headers)) {
      return { ok: false as const, message: "Please wait a moment, then try again." };
    }
    await saveApplication({
      name: input.name,
      email: input.email,
      size: input.size,
      note: input.note,
    });
    return { ok: true as const };
  });

export const wearTest = {
  apply: applyWearTest,
};
