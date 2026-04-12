import { SettingsMenuItem } from "@/components/settings/SettingsMenuItem";
import { AppTheme } from "@/constants/appTheme";
import { requestAppRating } from "@/services/storeReview";
import { MessageSquare, Star } from "lucide-react-native";
import { Linking, StyleSheet, Text, View } from "react-native";

const FEEDBACK_EMAIL = "thanhdong200425@gmail.com";
const FEEDBACK_SUBJECT = "Lexio - Feedback";

interface FeedbackSectionProps {
  t: AppTheme;
}

export function FeedbackSection({ t }: FeedbackSectionProps) {
  const handleSendFeedback = () => {
    const mailto = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(FEEDBACK_SUBJECT)}`;
    Linking.openURL(mailto);
  };

  return (
    <View>
      <Text style={[styles.sectionTitle, { color: t.textFaint }]}>SUPPORT</Text>
      <SettingsMenuItem
        icon={Star}
        label="Rate Lexio"
        onPress={() => {
          void requestAppRating();
        }}
        t={t}
      />
      <SettingsMenuItem
        icon={MessageSquare}
        label="Send Feedback"
        onPress={handleSendFeedback}
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
