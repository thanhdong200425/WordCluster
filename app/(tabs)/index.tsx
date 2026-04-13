import { AllSetsCard } from "@/components/home/AllSetsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { HomeHeader } from "@/components/home/HomeHeader";
import { RecentSetsSection } from "@/components/home/RecentSetsSection";
import { SectionTitle } from "@/components/home/SectionTitle";
import { ProUpsellSheet } from "@/components/paywall/ProUpsellSheet";
import { WalkthroughController } from "@/components/walkthrough/WalkthroughController";
import { useAppTheme } from "@/constants/appTheme";
import { FREE_LEARN_SESSIONS_PER_SET } from "@/constants/limits";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useProGate } from "@/hooks/use-pro-gate";
import useLimitsStorage from "@/stores/limitsStorage";
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
  const { sheetRef, sheetProps, tryProceed } = useProGate();
  const { learnSessionsToday, ensureFreshDay, incrementLearnSession } =
    useLimitsStorage();

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
  const isEmpty = sets.length === 0 && !searchQuery;

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: theme.bg }}
        contentContainerStyle={isEmpty ? { flex: 1 } : undefined}
      >
        <HomeHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <RecentSetsSection sets={sets} />
            {displaySets.length > 0 && <SectionTitle title="All Sets" />}
            {displaySets.map((set) => (
              <AllSetsCard
                key={set.id}
                title={set.title}
                wordCount={set.items.length}
                onPress={() => router.push(`/set-detail/${set.id}`)}
                onStartSession={() => {
                  ensureFreshDay();
                  const count = learnSessionsToday[set.id] ?? 0;
                  const allowed = tryProceed(
                    count >= FREE_LEARN_SESSIONS_PER_SET,
                    {
                      title: "Learn session limit reached",
                      description: `You've used all ${FREE_LEARN_SESSIONS_PER_SET} free learn sessions for this set today. Go Pro for unlimited.`,
                    },
                  );
                  if (allowed) {
                    incrementLearnSession(set.id);
                    router.push(`/learn/${set.id}`);
                  }
                }}
              />
            ))}
            <View className="h-8" />
          </>
        )}
      </ScrollView>

      <WalkthroughController walkthroughKey="home" />

      <ProUpsellSheet
        sheetRef={sheetRef}
        title={sheetProps.title}
        description={sheetProps.description}
      />
    </>
  );
}
