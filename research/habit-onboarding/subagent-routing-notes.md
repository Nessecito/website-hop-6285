# Subagent demo: explore → where routing lives

Spawned Cursor **explore** on this repo. Summary:

- **Web router:** `wouter` — routes in `packages/web/src/web/app.tsx`
- **Layout:** `packages/web/src/web/components/site-layout.tsx`
- **Titles:** `pageTitles` / `usePageTitle()` in `app.tsx`
- **Mobile:** Expo Router under `packages/mobile/app/` with tabs Home + Explore

This is the pattern from AGENTS.md: name **explore** for “where does X live?” instead of overloading the main chat.
