import { LearnScreen } from "@/components/learn/LearnScreen";
import { Text } from "@/components/ui/text";
import useSetsStorage from "@/stores/setsStorage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function LearnRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const storedSets = useSetsStorage(useShallow((state) => state.storedSets));
  const router = useRouter();
  const set = storedSets.find((set) => set.id === id);

  if (!set) {
    return (
      <View className="flex-1 items-center justify-center bg-[#121318]">
        <Text className="text-[#a0a4b8]">Set not found</Text>
      </View>
    );
  }

  return <LearnScreen items={set.items} onBack={() => router.back()} />;
}
