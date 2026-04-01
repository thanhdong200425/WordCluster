import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { AppTheme } from "@/constants/appTheme";
import { useRouter } from "expo-router";
import { Crown } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface UpgradeSectionProps {
  t: AppTheme;
}

export function UpgradeSection({ t }: UpgradeSectionProps) {
  const router = useRouter();

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: t.textFaint }]}>PRO</Text>
      <SettingsMenuItem
        icon={Crown}
        label="Upgrade to Pro"
        onPress={() => router.push("/paywall")}
        t={t}
        showBorder={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
});
