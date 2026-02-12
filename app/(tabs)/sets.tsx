import { SearchBar } from "@/components/home/SearchBar";
import { SetCard } from "@/components/sets/SetCard";
import { SetsHeader } from "@/components/sets/SetsHeader";
import { useSets } from "@/hooks/use-sets";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  actionContainer: {
    width: 100,
    backgroundColor: "#f55f45",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
});

const RightAction = (progress: SharedValue<number>) => {
  const styleAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.2, 1],
      [0, 1, 1],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      progress.value,
      [0, 0.6, 1],
      [0.6, 1, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  });
  return (
    <Animated.View style={[styles.actionContainer, styleAnimation]}>
      <Ionicons name="trash-outline" size={24} color="white" />
    </Animated.View>
  );
};

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
        <ReanimatedSwipeable key={set.id} renderRightActions={RightAction}>
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
  );
}
