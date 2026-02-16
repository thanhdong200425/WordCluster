import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { Text } from "@/components/ui/text";
import { FileText, Shield } from "lucide-react-native";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";

const PRIVACY_POLICY_URL = "https://example.com/privacy";
const TERMS_OF_SERVICE_URL = "https://example.com/terms";

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
