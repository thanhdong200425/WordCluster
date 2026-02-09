import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface DefinitionCardProps {
  definition: string;
}

export function DefinitionCard({ definition }: DefinitionCardProps) {
  return (
    <View
      className="mx-5 rounded-2xl bg-[#282b37] px-6 py-8"
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Text className="mb-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
        DEFINITION
      </Text>
      <Text className="text-center text-base leading-6 text-white">
        {definition}
      </Text>
    </View>
  );
}
