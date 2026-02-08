import { Text } from "@/components/ui/text";
import { SafeAreaView, View } from "react-native";

export default function SetsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#121318]">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-[#a0a4b8]">Sets</Text>
      </View>
    </SafeAreaView>
  );
}
