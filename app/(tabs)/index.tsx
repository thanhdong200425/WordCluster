import { HomeHeader } from "@/components/home/HomeHeader";
import { SearchBar } from "@/components/home/SearchBar";
import { WordFamilyCard } from "@/components/home/WordFamilyCard";
import useSetsStorage from "@/stores/setsStorage";
import { StoredSet } from "@/types/set";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useShallow } from "zustand/react/shallow";

// Default placeholder image
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=200&fit=crop";

export default function HomeScreen() {
  const [foundSets, setFoundSets] = useState<StoredSet[]>([]);
  const {
    storedSets: sets,
    searchQuery,
    setSearchQuery,
    isLoading,
    filteredSets,
  } = useSetsStorage(
    useShallow((state) => ({
      storedSets: state.storedSets,
      isLoading: state.isLoading,
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
      filteredSets: state.getFilteredSets,
    })),
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundSets(filteredSets());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filteredSets]);

  if (isLoading) {
    return (
      <ActivityIndicator className="flex-1 items-center justify-center bg-[#121318]" />
    );
  }

  const displaySets = searchQuery ? foundSets : sets;

  return (
    <ScrollView className="flex-1 bg-[#121318]">
      <HomeHeader />
      <SearchBar
        placeholder="Search roots (e.g., struct, bene)"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {displaySets.map((set) => (
        <WordFamilyCard
          key={set.id}
          title={set.title}
          meaning={set.description}
          wordCount={set.items.length}
          imageUrl={DEFAULT_IMAGE}
        />
      ))}
    </ScrollView>
  );
}
