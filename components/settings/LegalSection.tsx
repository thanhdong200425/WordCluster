import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { AppTheme } from "@/constants/appTheme";
import * as WebBrowser from "expo-web-browser";
import { FileText, Shield } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const PRIVACY_POLICY_URL =
  "https://thanhdong200425.github.io/WordCluster/public/privacy.html";
const TERMS_OF_SERVICE_URL =
  "https://thanhdong200425.github.io/WordCluster/public/terms.html";

interface LegalSectionProps {
  t: AppTheme;
}

export function LegalSection({ t }: LegalSectionProps) {
  return (
    <View>
      <Text style={[styles.sectionTitle, { color: t.textFaint }]}>LEGAL</Text>
      <SettingsMenuItem
        icon={Shield}
        label="Privacy Policy"
        onPress={() => WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL)}
        t={t}
      />
      <SettingsMenuItem
        icon={FileText}
        label="Terms of Service"
        onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_SERVICE_URL)}
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
