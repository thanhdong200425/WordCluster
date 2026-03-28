import { SectionTitle } from "@/components/home/SectionTitle";
import { StoredSet } from "@/types/set";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "heroui-native/card";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Text, View } from "react-native";

interface RecentSetsSectionProps {
  sets: StoredSet[];
  maxCount?: number;
}

function RecentSetCard({ set }: { set: StoredSet }) {
  const router = useRouter();

  return (
    <PressableFeedback
      onPress={() => router.push(`/set-detail/${set.id}`)}
      className="flex-1"
    >
      <Card className="bg-white rounded-2xl p-4 flex-1">
        <View className="mb-4 h-10 w-10 items-center justify-center rounded-xl bg-[#eef0ff]">
          <Ionicons name="book-outline" size={18} color="#5b6bf8" />
        </View>
        <Text
          className="text-[15px] font-bold text-[#1a1b2e]"
          numberOfLines={1}
        >
          {set.title}
        </Text>
        <Text className="mt-1 text-[13px] text-[#94a3b8]">
          {set.items.length} {set.items.length === 1 ? "word" : "words"}
        </Text>
      </Card>
    </PressableFeedback>
  );
}

export function RecentSetsSection({
  sets,
  maxCount = 2,
}: RecentSetsSectionProps) {
  const recentSets = [...sets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, maxCount);

  if (recentSets.length === 0) return null;

  return (
    <View>
      <SectionTitle title="Recent" />
      <View className="flex-row gap-3 px-4 pb-3">
        {recentSets.map((set) => (
          <RecentSetCard key={set.id} set={set} />
        ))}
        {recentSets.length === 1 && <View className="flex-1" />}
      </View>
    </View>
  );
}
