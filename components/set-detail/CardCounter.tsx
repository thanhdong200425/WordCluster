import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { View } from "react-native";

interface CardCounterProps {
  current: number;
  total: number;
}

export function CardCounter({ current, total }: CardCounterProps) {
  const theme = useAppTheme();

  return (
    <View className="mt-4 items-center">
      <Text className="text-sm" style={{ color: theme.textMuted }}>
        {current} / {total}
      </Text>
    </View>
  );
}
