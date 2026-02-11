import { TestScreen } from "@/components/test/TestScreen";
import { Text } from "@/components/ui/text";
import { useSets } from "@/hooks/use-sets";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function TestRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSet } = useSets();
  const router = useRouter();
  const set = getSet(id);

  if (!set) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121318]">
        <Text className="text-[#a0a4b8]">Set not found</Text>
      </View>
    );
  }

  return <TestScreen items={set.items} onBack={() => router.back()} />;
}
