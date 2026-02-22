import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { initializeAds } from "@/lib/ads";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
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

  useEffect(() => {
    initializeAds();
    initializeRevenueCat();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <KeyboardProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
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
              <Stack.Screen name="test/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
            </Stack>
            <Toast />
          </SafeAreaView>
          <PortalHost />
        </GestureHandlerRootView>
        <StatusBar style="light" />
      </KeyboardProvider>
    </ThemeProvider>
  );
}
