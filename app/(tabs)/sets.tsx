import BaseAlertDialog from "@/components/common/AlertDialog";
import { SearchBar } from "@/components/home/SearchBar";
import { SetCard } from "@/components/sets/SetCard";
import { SetsHeader } from "@/components/sets/SetsHeader";
import { useSets } from "@/hooks/use-sets";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";

const RightAction = (
  progress: SharedValue<number>,
  drag: SharedValue<number>,
  setId: string,
  onDelete: (id: string) => void,
) => {
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
      <Pressable
        onPress={() => onDelete(setId)}
        className="w-full h-full justify-center items-center"
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </Pressable>
    </Animated.View>
  );
};

export default function SetsScreen() {
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const { sets, refreshSets, deleteSet } = useSets();
  const router = useRouter();

  const handleSelectSet = (id: string) => {
    setSelectedSetId(id);
  };

  const handleDeleteSet = (id: string) => {
    deleteSet(id);
    setSelectedSetId(null);
    Toast.show({
      type: "success",
      text1: "Set deleted successfully",
    });
  };

  useFocusEffect(
    useCallback(() => {
      refreshSets();
    }, [refreshSets]),
  );

  return (
    <>
      <ScrollView className="flex-1 bg-[#121318]">
        <SetsHeader totalSets={sets.length} />
        <SearchBar placeholder="Search sets..." />
        {sets.map((set) => (
          <ReanimatedSwipeable
            key={set.id}
            renderRightActions={(prog, drag) =>
              RightAction(prog, drag, set.id, handleSelectSet)
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
