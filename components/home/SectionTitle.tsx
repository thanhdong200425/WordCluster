import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <View className={`px-5 pb-2 pt-4 ${className ?? ""}`}>
      <Text className="text-sm font-semibold uppercase tracking-wider text-[#a0a4b8]">
        {title}
      </Text>
    </View>
  );
}
