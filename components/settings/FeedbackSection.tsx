import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { Text } from "@/components/ui/text";
import { MessageSquare } from "lucide-react-native";
import { Linking, View } from "react-native";

const FEEDBACK_EMAIL = "thanhdong200425@gmail.com";
const FEEDBACK_SUBJECT = "Lexio - Feedback";

export function FeedbackSection() {
  const handleSendFeedback = () => {
    const mailto = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(FEEDBACK_SUBJECT)}`;
    Linking.openURL(mailto);
  };

  return (
    <View>
      <Text className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-[#a0a4b8]">
        Support
      </Text>
      <SettingsMenuItem
        icon={MessageSquare}
        label="Send Feedback"
        onPress={handleSendFeedback}
      />
    </View>
  );
}
