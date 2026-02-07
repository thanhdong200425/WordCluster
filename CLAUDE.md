# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npx expo start` — Start dev server (or `npm start`)
- `npx expo start --ios` — Start with iOS simulator
- `npx expo start --android` — Start with Android emulator
- `npx expo start --web` — Start web build
- `npm run lint` — Run ESLint via `expo lint`

No test framework is configured.

## Architecture

This is a React Native app built with **Expo SDK 54** and **Expo Router** (file-based routing). It targets iOS, Android, and Web. The new React Native architecture and React Compiler (experimental) are both enabled.

### Routing

Routes live in `app/`. The app uses a `Stack` navigator at the root with a `(tabs)` group for bottom tab navigation. Add new screens by creating files in `app/` or `app/(tabs)/`.

### Theme System

- Color definitions: `constants/theme.ts` (light/dark palettes)
- `useColorScheme()` — detects system preference (has a web-specific variant in `use-color-scheme.web.ts` for hydration)
- `useThemeColor(props, colorName)` — resolves a color from the theme, with optional per-component overrides
- `ThemedText` and `ThemedView` — base components that automatically apply theme colors

### Platform-Specific Code

Uses file extension convention: `.ios.tsx` and `.web.ts` for platform variants (see `icon-symbol.ios.tsx`, `use-color-scheme.web.ts`).

### Path Aliases

`@/*` maps to the project root (configured in `tsconfig.json`).

### Key Dependencies

- **expo-router** — file-based routing
- **react-native-reanimated** — animations (parallax scroll, collapsibles)
- **expo-haptics** — iOS haptic feedback
- **expo-symbols** — SF Symbols on iOS, Material Icons fallback elsewhere
- **@react-navigation/bottom-tabs** — tab navigation

### TypeScript

Strict mode is enabled. The project uses TypeScript ~5.9.

### Rules

Use yarn by default, if commands require to use npx, use npx, don't use npm
