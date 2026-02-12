import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 items-center justify-center bg-[#121318] px-6">
        <View className="w-full max-w-md items-center rounded-3xl border border-[#2a2d3a] bg-[#1c1f2a] px-6 py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-[#5b6cff]/20">
            <Ionicons name="alert-circle-outline" size={34} color="#8f9bff" />
          </View>

          <Text className="text-center text-2xl font-bold text-[#e8eaf0]">
            Page not found
          </Text>
          <Text className="mt-2 text-center text-base text-[#a0a4b8]">
            This page does not exist or may have been moved.
          </Text>

          <Button
            className="mt-8 w-full rounded-xl bg-[#5b6cff]"
            onPress={() => router.replace("/(tabs)")}
          >
            <Text className="font-semibold text-white">Back to Home</Text>
          </Button>
        </View>
      </View>
    </>
  );
}
