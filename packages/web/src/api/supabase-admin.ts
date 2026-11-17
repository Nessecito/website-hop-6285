import { createAdminClient } from "@supabase/server/core";

export function supabaseAdmin() {
  return createAdminClient();
}

export function unavailable(scope: string, error: { code?: string; message?: string }) {
  console.error(`[${scope}]`, error.code || "request failed");
  throw new Error(`${scope} unavailable`);
}
