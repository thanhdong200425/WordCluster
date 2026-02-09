import { SearchBar } from "@/components/home/SearchBar";
import { SetCard } from "@/components/sets/SetCard";
import { SetsHeader } from "@/components/sets/SetsHeader";
import { useSets } from "@/hooks/use-sets";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";

export default function SetsScreen() {
  const { sets, refreshSets } = useSets();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      refreshSets();
    }, [refreshSets]),
  );

  return (
    <ScrollView className="flex-1 bg-[#121318]">
      <SetsHeader totalSets={sets.length} />
      <SearchBar placeholder="Search sets..." />
      {sets.map((set) => (
        <SetCard
          key={set.id}
          title={set.title}
          meaning={set.description}
          wordCount={set.items.length}
          isNew
          onPress={() => router.push(`/set-detail/${set.id}`)}
        />
      ))}
    </ScrollView>
  );
}
