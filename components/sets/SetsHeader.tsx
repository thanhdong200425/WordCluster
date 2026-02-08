import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

interface SetsHeaderProps {
  totalSets: number;
}

export function SetsHeader({ totalSets }: SetsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-3">
      <View>
        <Text className="text-2xl font-bold text-[#e8eaf0]">My Sets</Text>
        <Text className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          {totalSets} sets total
        </Text>
      </View>
      <Pressable
        onPress={() => router.push("/create-set")}
        className="h-12 w-12 items-center justify-center rounded-full bg-[#5b6cff]"
        style={{
          shadowColor: "#5b6cff",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
