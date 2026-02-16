import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function SettingsHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center gap-3 px-5 py-3">
      <Pressable hitSlop={8} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>
      <Text className="text-xl font-semibold text-white">Settings</Text>
    </View>
  );
}
