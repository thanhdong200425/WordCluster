import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface CardCounterProps {
  current: number;
  total: number;
}

export function CardCounter({ current, total }: CardCounterProps) {
  return (
    <View className="mt-4 items-center">
      <Text className="text-sm text-[#a0a4b8]">
        {current} / {total}
      </Text>
    </View>
  );
}
