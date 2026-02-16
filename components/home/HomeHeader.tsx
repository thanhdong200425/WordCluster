import { Text } from "@/components/ui/text";
import useUserStorage from "@/stores/userStorage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, View } from "react-native";

export function HomeHeader() {
  const router = useRouter();
  const userName = useUserStorage((state) => state.userName);

  const avatarUri = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=5b6cff&color=fff&size=80`;

  return (
    <View className="flex-row items-center justify-between px-5 py-3">
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: avatarUri }} className="h-10 w-10 rounded-full" />
        <Text className="text-lg font-semibold text-white">
          Hello {userName}
        </Text>
      </View>
      <Pressable hitSlop={8} onPress={() => router.push("/settings")}>
        <Ionicons name="settings-outline" size={24} color="#a0a4b8" />
      </Pressable>
    </View>
  );
}
