import { useColorScheme } from "@/hooks/use-color-scheme";

const ACCENT_START = "#5B6BF8";
const ACCENT_END = "#4B5BF0";

const lightTokens = {
  bg: "#F4F4F7",
  surface: "#FFFFFF",
  surface2: "#EBEBEE",
  nav: "#FAFAFA",
  border: "#DCDDE6",
  border2: "#E0E1EA",
  text: "#1A1B2E",
  textMuted: "#64748B",
  textFaint: "#94A3B8",
  accentSurface: "#EEF0FF",
  dots: "#C8CAD8",
  tooltip: "#3A3C4E",
  accentStart: ACCENT_START,
  accentEnd: ACCENT_END,
};

const darkTokens = {
  bg: "#0F1015",
  surface: "#1C1E26",
  surface2: "#252832",
  nav: "#13141A",
  border: "#1E2028",
  border2: "#2A2D3A",
  text: "#FFFFFF",
  textMuted: "#9CA3AF",
  textFaint: "#6B7280",
  accentSurface: "#2D3462",
  dots: "#2D3748",
  tooltip: "#2A2D3A",
  accentStart: ACCENT_START,
  accentEnd: ACCENT_END,
};

export type AppTheme = typeof lightTokens;

export const appTheme = {
  light: lightTokens,
  dark: darkTokens,
};

export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  return scheme === "dark" ? appTheme.dark : appTheme.light;
}
