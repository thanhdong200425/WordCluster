import BaseAlertDialog from "@/components/common/AlertDialog";
import RightDeleteAction from "@/components/common/RightDeleteAction";
import { SearchBar } from "@/components/home/SearchBar";
import { SetCard } from "@/components/sets/SetCard";
import { SetsHeader } from "@/components/sets/SetsHeader";
import useSetsStorage from "@/stores/setsStorage";
import { StoredSet } from "@/types/set";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Toast from "react-native-toast-message";
import { useShallow } from "zustand/react/shallow";

export default function SetsScreen() {
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [foundSets, setFoundSets] = useState<StoredSet[]>([]);
  const {
    storedSets: sets,
    searchQuery,
    setSearchQuery,
    isLoading,
    deleteSet,
    filteredSets,
  } = useSetsStorage(
    useShallow((state) => ({
      storedSets: state.storedSets,
      isLoading: state.isLoading,
      deleteSet: state.deleteSet,
      searchQuery: state.searchQuery,
      setSearchQuery: state.setSearchQuery,
      filteredSets: state.getFilteredSets,
    })),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchQuery);
      setFoundSets(filteredSets());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, setSearchQuery, filteredSets]);

  const router = useRouter();

  const handleSelectSet = (id: string | number) => {
    setSelectedSetId(String(id));
  };

  const handleDeleteSet = (id: string) => {
    deleteSet(id);
    setSelectedSetId(null);
    Toast.show({
      type: "success",
      text1: "Set deleted successfully",
    });
  };

  if (isLoading) {
    return (
      <ActivityIndicator className="flex-1 items-center justify-center bg-[#121318]" />
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-[#121318]">
        <SetsHeader totalSets={sets.length} />
        <SearchBar
          placeholder="Search sets..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {(searchQuery ? foundSets : sets).map((set) => (
          <ReanimatedSwipeable
            key={set.id}
            renderRightActions={(prog, drag) =>
              RightDeleteAction({
                progress: prog,
                drag,
                setId: set.id,
                onDelete: () => handleSelectSet(set.id),
              })
            }
          >
            <SetCard
              key={set.id}
              title={set.title}
              wordCount={set.items.length}
              createdAt={set.createdAt}
              onPress={() => router.push(`/set-detail/${set.id}`)}
            />
          </ReanimatedSwipeable>
        ))}
      </ScrollView>
      {selectedSetId ? (
        <BaseAlertDialog
          isOpen={!!selectedSetId}
          title="Delete set"
          description="This action cannot be undone. This will permanently delete your set."
          onCancel={() => setSelectedSetId(null)}
          onContinue={() => handleDeleteSet(selectedSetId)}
        />
      ) : null}
    </>
  );
}
