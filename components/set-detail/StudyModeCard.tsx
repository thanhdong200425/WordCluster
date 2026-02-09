import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface StudyModeCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  onPress?: () => void;
}

export function StudyModeCard({
  title,
  description,
  iconName,
  iconColor,
  iconBgColor,
  onPress,
}: StudyModeCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mb-3 flex-row items-center rounded-2xl border border-white/5 bg-[#1c1e26] p-4"
    >
      <View
        className="mr-4 h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBgColor }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold text-[#e8eaf0]">{title}</Text>
        <Text className="mt-0.5 text-xs text-[#a0a4b8]">{description}</Text>
      </View>

      <Ionicons name="play" size={16} color="rgba(255,255,255,0.3)" />
    </Pressable>
  );
}
