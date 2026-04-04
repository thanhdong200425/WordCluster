import { AppearanceSection } from "@/components/settings/AppearanceSection";
import { FeedbackSection } from "@/components/settings/FeedbackSection";
import { LegalSection } from "@/components/settings/LegalSection";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { UpgradeSection } from "@/components/settings/UpgradeSection";
import { useAppTheme } from "@/constants/appTheme";
import { useSubscriptionDetails } from "@/hooks/use-subscription-details";
import useThemePreferenceStorage from "@/stores/themePreferenceStorage";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  const t = useAppTheme();
  const { preference, setPreference } = useThemePreferenceStorage();
  const { isPro, renewalDateLabel, pricePerMonthLabel, refetch: refetchSubscription } =
    useSubscriptionDetails();
  const [statusBarStyle, setStatusBarStyle] = useState<"dark" | "light">(
    "dark",
  );

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("dark");
      refetchSubscription();
      return () => setStatusBarStyle("light");
    }, [refetchSubscription]),
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
          <UpgradeSection
            t={t}
            isPro={isPro}
            renewalDateLabel={renewalDateLabel}
            pricePerMonthLabel={pricePerMonthLabel}
          />
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
