import { Text } from "@/components/ui/text";
import { View } from "react-native";

interface DefinitionCardProps {
  definition: string;
}

export function DefinitionCard({ definition }: DefinitionCardProps) {
  return (
    <View
      className="mx-5 rounded-2xl bg-white px-6 py-8"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <Text className="mb-4 text-center text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
        DEFINITION
      </Text>
      <Text className="text-center text-base leading-6 text-gray-800">
        {definition}
      </Text>
    </View>
  );
}
