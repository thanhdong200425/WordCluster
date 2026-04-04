import { useColorScheme } from "@/hooks/use-color-scheme";

const ACCENT_START = "#5B6BF8";
const ACCENT_END = "#4B5BF0";

// Pro gold palette — shared across schemes (gradient is same; fills are alpha-based)
const PRO_GRADIENT_START = "#F9C74F";
const PRO_GRADIENT_END = "#F4A020";
const PRO_ACCENT = "#F4A020";

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
  // Pro tokens
  proAccent: PRO_ACCENT,
  proGradientStart: PRO_GRADIENT_START,
  proGradientEnd: PRO_GRADIENT_END,
  proPillBorder: "rgba(244, 160, 32, 0.45)",
  proPillFillStart: "rgba(249, 199, 79, 0.22)",
  proPillFillEnd: "rgba(244, 160, 32, 0.22)",
  proChipBg: "rgba(244, 160, 32, 0.15)",
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
  // Pro tokens
  proAccent: PRO_ACCENT,
  proGradientStart: PRO_GRADIENT_START,
  proGradientEnd: PRO_GRADIENT_END,
  proPillBorder: "rgba(244, 160, 32, 0.3)",
  proPillFillStart: "rgba(249, 199, 79, 0.15)",
  proPillFillEnd: "rgba(244, 160, 32, 0.15)",
  proChipBg: "rgba(244, 160, 32, 0.12)",
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
