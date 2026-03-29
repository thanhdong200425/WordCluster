import { AllSetsCard } from "@/components/home/AllSetsCard";
import { HomeHeader } from "@/components/home/HomeHeader";
import { RecentSetsSection } from "@/components/home/RecentSetsSection";
import { SectionTitle } from "@/components/home/SectionTitle";
import { useAppTheme } from "@/constants/appTheme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import useSetsStorage from "@/stores/setsStorage";
import { StoredSet } from "@/types/set";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Spinner } from "heroui-native/spinner";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function HomeScreen() {
  const [foundSets, setFoundSets] = useState<StoredSet[]>([]);
  const router = useRouter();
  const theme = useAppTheme();
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme === "dark" ? "light" : "dark";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setFoundSets(filteredSets());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, filteredSets]);

  if (isLoading) {
    return (
      <>
        <StatusBar style={statusBarStyle} />
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: theme.bg }}
        >
          <Spinner />
        </View>
      </>
    );
  }

  const displaySets = searchQuery ? foundSets : sets;

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <ScrollView className="flex-1" style={{ backgroundColor: theme.bg }}>
        <HomeHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <RecentSetsSection sets={sets} />
        {displaySets.length > 0 && <SectionTitle title="All Sets" />}
        {displaySets.map((set) => (
          <AllSetsCard
            key={set.id}
            title={set.title}
            wordCount={set.items.length}
            onPress={() => router.push(`/set-detail/${set.id}`)}
            onStartSession={() => router.push(`/learn/${set.id}`)}
          />
        ))}
        <View className="h-8" />
      </ScrollView>
    </>
  );
}
