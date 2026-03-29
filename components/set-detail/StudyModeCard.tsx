import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
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
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mb-3 flex-row items-center rounded-2xl border p-4"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      <View
        className="mr-4 h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBgColor }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-bold" style={{ color: theme.text }}>
          {title}
        </Text>
        <Text className="mt-0.5 text-xs" style={{ color: theme.textMuted }}>
          {description}
        </Text>
      </View>

      <Ionicons name="play" size={16} color={theme.textFaint} />
    </Pressable>
  );
}
