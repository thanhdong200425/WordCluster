import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

export function HomeHeader() {
  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <View className="flex-row items-center gap-3">
        <Image
          source={{
            uri: "https://ui-avatars.com/api/?name=Dong&background=5b6cff&color=fff&size=80",
          }}
          className="h-10 w-10 rounded-full"
        />
        <Text className="text-lg font-semibold text-white">Hello Dong</Text>
      </View>
      <Pressable hitSlop={8}>
        <Ionicons name="settings-outline" size={24} color="#a0a4b8" />
      </Pressable>
    </View>
  );
}
