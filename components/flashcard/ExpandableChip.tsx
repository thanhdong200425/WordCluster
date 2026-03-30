import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { Pressable } from "react-native";

interface ExpandableChipProps {
  label: string;
  emoji: string;
  isActive: boolean;
  activeColor: string;
  activeBg: string;
  onPress: () => void;
}

export function ExpandableChip({
  label,
  emoji,
  isActive,
  activeColor,
  activeBg,
  onPress,
}: ExpandableChipProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-xl px-3 py-2"
      style={{
        backgroundColor: isActive ? activeBg : theme.surface2,
      }}
    >
      <Text className="mr-1.5 text-xs">{emoji}</Text>
      <Text
        className="text-xs font-semibold"
        style={{ color: isActive ? activeColor : theme.textMuted }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
