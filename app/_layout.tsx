import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PortalHost } from "heroui-native/portal";
import { HeroUINativeProvider } from "heroui-native/provider";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
// import { initializeAds } from "@/lib/ads";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
import useThemePreferenceStorage from "@/stores/themePreferenceStorage";
import { Appearance } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { initialize: initializeRevenueCat } = useRevenueCatStorage(
    useShallow((state) => ({
      initialize: state.initialize,
    })),
  );
  const themePreference = useThemePreferenceStorage(
    (state) => state.preference,
  );

  useEffect(() => {
    // initializeAds();
    initializeRevenueCat();
  }, [initializeRevenueCat]);

  useEffect(() => {
    if (themePreference === "system") {
      Appearance.setColorScheme(null);
    } else {
      Appearance.setColorScheme(themePreference);
    }
  }, [themePreference]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
          <HeroUINativeProvider>
            <SafeAreaView style={{ flex: 1 }} className="bg-[#121318]">
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="create-set"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="set-detail/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="flashcard/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="learn/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="test/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="edit/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="settings"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen name="paywall" options={{ headerShown: false }} />
              </Stack>
            </SafeAreaView>
            <PortalHost />
          </HeroUINativeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
        <StatusBar style="light" />
      </KeyboardProvider>
    </ThemeProvider>
  );
}
