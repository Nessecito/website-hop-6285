import { supabaseAdmin, unavailable } from "./supabase-admin";

export type StoredSubscriber = {
  email: string;
  preference: string | null;
  priority: string | null;
  cadence: string | null;
  source: "fit" | "closing";
  heroVariant: "follow" | "close";
  createdAt: string;
  updatedAt: string;
};

export async function saveSubscriber(entry: Omit<StoredSubscriber, "createdAt" | "updatedAt">) {
  const admin = supabaseAdmin();
  const existing = await admin
    .from("edition_list")
    .select("preference, priority, cadence")
    .eq("email", entry.email)
    .maybeSingle();
  if (existing.error) unavailable("edition-list", existing.error);

  const saved = await admin.from("edition_list").upsert(
    {
      email: entry.email,
      preference: entry.preference ?? existing.data?.preference ?? null,
      priority: entry.priority ?? existing.data?.priority ?? null,
      cadence: entry.cadence ?? existing.data?.cadence ?? null,
      source: entry.source,
      hero_variant: entry.heroVariant,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );
  if (saved.error) unavailable("edition-list", saved.error);
}

export async function removeSubscriber(email: string) {
  const admin = supabaseAdmin();
  const removed = await admin.from("edition_list").delete().eq("email", email);
  if (removed.error) unavailable("edition-list", removed.error);
}
