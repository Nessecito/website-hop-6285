/** Thin wrapper around the preview analytics bridge. */

export function track(
  name: string,
  props?: Record<string, unknown>,
) {
  try {
    window.stonks?.event(name, props);
  } catch {
    // Analytics must never block conversion UI.
  }
}
