import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
