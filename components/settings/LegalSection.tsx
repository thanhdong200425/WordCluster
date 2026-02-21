import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { Text } from "@/components/ui/text";
import * as WebBrowser from "expo-web-browser";
import { FileText, Shield } from "lucide-react-native";
import { View } from "react-native";

const PRIVACY_POLICY_URL =
  "https://thanhdong200425.github.io/WordCluster/public/privacy.html";
const TERMS_OF_SERVICE_URL =
  "https://thanhdong200425.github.io/WordCluster/public/terms.html";

export function LegalSection() {
  return (
    <View>
      <Text className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-[#a0a4b8]">
        Legal
      </Text>
      <SettingsMenuItem
        icon={Shield}
        label="Privacy Policy"
        onPress={() => WebBrowser.openBrowserAsync(PRIVACY_POLICY_URL)}
      />
      <SettingsMenuItem
        icon={FileText}
        label="Terms of Service"
        onPress={() => WebBrowser.openBrowserAsync(TERMS_OF_SERVICE_URL)}
      />
    </View>
  );
}
