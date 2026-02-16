import { FeedbackSection } from "@/components/settings/FeedbackSection";
import { LegalSection } from "@/components/settings/LegalSection";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ScrollView, View } from "react-native";

export default function SettingsScreen() {
  return (
    <ScrollView className="flex-1 bg-[#121318]">
      <SettingsHeader />
      <ProfileSection />
      <Divider />
      <LegalSection />
      <Divider />
      <FeedbackSection />
    </ScrollView>
  );
}

function Divider() {
  return <View className="mx-5 h-px bg-[#2c2e3a]" />;
}
