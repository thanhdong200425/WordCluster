import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface CardFrontProps {
  term: string;
  type?: string;
}

export function CardFront({ term, type }: CardFrontProps) {
  return (
    <View className="flex-1 px-6 py-6">
      {/* Top row: label + type badge */}
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[10px] font-extrabold uppercase"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: 1.5 }}
        >
          TERM
        </Text>
        {type ? (
          <View
            className="rounded-lg px-2.5 py-1"
            style={{ backgroundColor: "rgba(173,70,255,0.12)" }}
          >
            <Text className="text-[10px] font-bold text-[#ad46ff]">
              {type}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Center: term */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-2xl font-bold text-[#e8eaf0]">
          {term}
        </Text>
      </View>

      {/* Bottom hint */}
      <Text
        className="text-center text-xs"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Tap to reveal definition
      </Text>
    </View>
  );
}
