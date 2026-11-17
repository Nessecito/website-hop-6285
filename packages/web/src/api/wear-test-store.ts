import { supabaseAdmin, unavailable } from "./supabase-admin";

export type StoredApplication = {
  email: string;
  name: string;
  size: string;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function saveApplication(entry: Omit<StoredApplication, "createdAt" | "updatedAt">) {
  const admin = supabaseAdmin();
  const saved = await admin.from("wear_test_applications").upsert(
    {
      email: entry.email,
      name: entry.name,
      size: entry.size,
      note: entry.note,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );
  if (saved.error) unavailable("wear-test", saved.error);
}
