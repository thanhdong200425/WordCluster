import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
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
import { HiddenCopilotStepNumber } from "@/components/walkthrough/HiddenCopilotStepNumber";
import { WalkthroughTooltip } from "@/components/walkthrough/WalkthroughTooltip";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
import useThemePreferenceStorage from "@/stores/themePreferenceStorage";
import { Appearance, Dimensions } from "react-native";
import { CopilotProvider } from "react-native-copilot";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
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
  const width = Dimensions.get("window").width - 2 * scale(20);
  const insets = useSafeAreaInsets();
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
                <CopilotProvider
                  tooltipComponent={WalkthroughTooltip}
                  stepNumberComponent={HiddenCopilotStepNumber}
                  verticalOffset={scale(30) + insets.bottom}
                  tooltipStyle={{width}}
                >
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
                </CopilotProvider>
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
