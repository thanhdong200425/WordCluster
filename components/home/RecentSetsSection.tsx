import { SectionTitle } from "@/components/home/SectionTitle";
import { Text } from "@/components/ui/text";
import { StoredSet } from "@/types/set";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

interface RecentSetsSectionProps {
  sets: StoredSet[];
  maxCount?: number;
}

function RecentSetCard({ set }: { set: StoredSet }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/set-detail/${set.id}`)}
      className="mr-3 w-40 rounded-2xl bg-[#1c1e26] p-4"
      style={{ borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" }}
    >
      <View className="mb-3 h-9 w-9 items-center justify-center rounded-xl bg-[#5b6cff]/15">
        <Ionicons name="book-outline" size={18} color="#5b6cff" />
      </View>
      <Text className="text-sm font-bold text-white" numberOfLines={1}>
        {set.title}
      </Text>
      <Text className="mt-1 text-xs text-[#6b7080]">
        {set.items.length} {set.items.length === 1 ? "word" : "words"}
      </Text>
    </Pressable>
  );
}

export function RecentSetsSection({
  sets,
  maxCount = 5,
}: RecentSetsSectionProps) {
  const recentSets = [...sets]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, maxCount);

  if (recentSets.length < 2) return null;

  return (
    <View>
      <SectionTitle title="Recent" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5 pb-2"
      >
        {recentSets.map((set) => (
          <RecentSetCard key={set.id} set={set} />
        ))}
      </ScrollView>
    </View>
  );
}
