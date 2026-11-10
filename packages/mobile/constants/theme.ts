import { Platform } from "react-native";

/**
 * App color tokens. Recolor these to brand the app — every screen and component
 * reads from here via `useColors()` (see `hooks/use-colors.ts`), so changing a
 * value here updates the whole app in both light and dark mode.
 *
 * The token names mirror the web app's design tokens (`packages/web/src/web/styles.css`)
 * so the two platforms share one vocabulary: `background`, `foreground`, `card`,
 * `primary`, `muted`, `border`, etc. Values are plain hex/rgba strings — React
 * Native's StyleSheet does not support CSS color functions like `oklch()`.
 */
export const Colors = {
  light: {
    background: "#F3EFE5",
    foreground: "#292721",
    card: "#EAE4D8",
    cardForeground: "#292721",
    primary: "#581E2A",
    primaryForeground: "#F3EFE5",
    secondary: "#EAE4D8",
    secondaryForeground: "#292721",
    muted: "#EAE4D8",
    mutedForeground: "#625E54",
    accent: "#343D30",
    accentForeground: "#F3EFE5",
    border: "#C9C0AF",
    destructive: "#581E2A",
    success: "#343D30",
    warning: "#A58B58",
    olive: "#343D30",
    brass: "#A58B58",
    surface: "#EAE4D8",
  },
  dark: {
    background: "#242820",
    foreground: "#F3EFE5",
    card: "#343D30",
    cardForeground: "#F3EFE5",
    primary: "#C46B78",
    primaryForeground: "#242820",
    secondary: "#343D30",
    secondaryForeground: "#F3EFE5",
    muted: "#343D30",
    mutedForeground: "#C9C0AF",
    accent: "#F3EFE5",
    accentForeground: "#242820",
    border: "#4A5444",
    destructive: "#E7B6BE",
    success: "#C9C0AF",
    warning: "#C4A86A",
    olive: "#1A1E18",
    brass: "#C4A86A",
    surface: "#343D30",
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ColorScheme];

/**
 * Platform-appropriate font families. Use for `fontFamily` in styles, or load a
 * custom font with `useFonts` from `expo-font` and reference it here.
 */
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', sans-serif",
    mono: "'SF Mono', 'Roboto Mono', monospace",
  },
});
