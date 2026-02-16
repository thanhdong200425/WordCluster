import { Text } from "@/components/ui/text";
import { ChevronRight, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

interface SettingsMenuItemProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}

export function SettingsMenuItem({
  icon: Icon,
  label,
  onPress,
}: SettingsMenuItemProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between px-5 py-3.5 active:bg-white/5"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-3">
        <Icon size={20} color="#a0a4b8" />
        <Text className="text-base text-white">{label}</Text>
      </View>
      <ChevronRight size={18} color="#a0a4b8" />
    </Pressable>
  );
}
