import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { FeedbackSection } from "@/components/settings/FeedbackSection";
import { LegalSection } from "@/components/settings/LegalSection";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { useAppTheme } from "@/constants/appTheme";
import useThemePreferenceStorage from "@/stores/themePreferenceStorage";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  const t = useAppTheme();
  const { preference, setPreference } = useThemePreferenceStorage();
  const [statusBarStyle, setStatusBarStyle] = useState<"dark" | "light">(
    "dark",
  );

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("dark");
      return () => setStatusBarStyle("light");
    }, []),
  );

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <ScrollView
        style={{ flex: 1, backgroundColor: t.bg }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <SettingsHeader t={t} />
        <View style={{ gap: 8 }}>
          <AppearanceSection
            preference={preference}
            onSelect={setPreference}
            t={t}
          />
          <LegalSection t={t} />
          <LegalDivider t={t} />
          <FeedbackSection t={t} />
        </View>
      </ScrollView>
    </>
  );
}

function LegalDivider({ t }: { t: ReturnType<typeof useAppTheme> }) {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: t.border,
        marginHorizontal: 20,
      }}
    />
  );
}
