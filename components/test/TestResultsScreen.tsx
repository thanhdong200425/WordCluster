import { ReviewItem } from "@/components/test/ReviewItem";
import { Text } from "@/components/ui/text";
import type { GradedResult, TestQuestionType } from "@/types/test";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface TestResultsScreenProps {
  gradedResults: GradedResult[];
  onRetake: () => void;
  onBack: () => void;
}

interface SectionStat {
  type: TestQuestionType;
  label: string;
  total: number;
  correct: number;
}

function getGrade(pct: number) {
  if (pct >= 90) return "A";
  if (pct >= 80) return "B";
  if (pct >= 70) return "C";
  if (pct >= 60) return "D";
  return "F";
}

function getResultMeta(pct: number) {
  if (pct === 100) return { emoji: "🏆", message: "Perfect Score!" };
  if (pct >= 80) return { emoji: "🌟", message: "Excellent!" };
  if (pct >= 60) return { emoji: "👍", message: "Good Work!" };
  if (pct >= 40) return { emoji: "📚", message: "Keep Studying!" };
  return { emoji: "💪", message: "Don't Give Up!" };
}

function getGradeColor(pct: number) {
  if (pct >= 80) return "#00bc7d";
  if (pct >= 60) return "#fb923c";
  return "#ff6b8a";
}

export function TestResultsScreen({
  gradedResults,
  onRetake,
  onBack,
}: TestResultsScreenProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "review">("overview");

  const correctCount = gradedResults.filter((r) => r.correct).length;
  const totalCount = gradedResults.length;
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const grade = getGrade(percentage);
  const meta = getResultMeta(percentage);
  const gradeColor = getGradeColor(percentage);
  const wrongResults = useMemo(
    () => gradedResults.filter((r) => !r.correct),
    [gradedResults],
  );

  const sectionStats = useMemo<SectionStat[]>(() => {
    const map = new Map<string, SectionStat>();
    for (const r of gradedResults) {
      const key = r.sectionLabel;
      const existing = map.get(key);
      if (existing) {
        existing.total += 1;
        if (r.correct) existing.correct += 1;
      } else {
        map.set(key, {
          type: r.type,
          label: r.sectionLabel,
          total: 1,
          correct: r.correct ? 1 : 0,
        });
      }
    }
    return Array.from(map.values());
  }, [gradedResults]);

  // Staggered entrance animations
  const emojiScale = useSharedValue(0.5);
  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(10);
  const barsOpacity = useSharedValue(0);
  const barsY = useSharedValue(10);
  const contentOpacity = useSharedValue(0);
  const contentY = useSharedValue(10);

  useEffect(() => {
    emojiScale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 200 }));
    headerOpacity.value = withDelay(500, withTiming(1, { duration: 400 }));
    headerY.value = withDelay(500, withTiming(0, { duration: 400 }));
    barsOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    barsY.value = withDelay(800, withTiming(0, { duration: 400 }));
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 300 }));
    contentY.value = withDelay(1000, withTiming(0, { duration: 300 }));
  }, [emojiScale, headerOpacity, headerY, barsOpacity, barsY, contentOpacity, contentY]);

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));
  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));
  const barsStyle = useAnimatedStyle(() => ({
    opacity: barsOpacity.value,
    transform: [{ translateY: barsY.value }],
  }));
  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentY.value }],
  }));

  return (
    <ScrollView
      className="flex-1 bg-[#121318]"
      contentContainerClassName="pb-10"
    >
      {/* Score Header */}
      <View className="items-center px-6 pb-6 pt-8" style={styles.headerBg}>
        <Animated.View style={emojiStyle}>
          <Text style={{ fontSize: 56 }}>{meta.emoji}</Text>
        </Animated.View>

        <Animated.View style={headerStyle} className="mt-3 items-center">
          <Text className="font-extrabold text-[#e8eaf0]" style={{ fontSize: 20 }}>
            {meta.message}
          </Text>

          <View className="mt-4 flex-row items-center gap-4">
            {/* Grade box */}
            <View
              style={[styles.gradeBox, { backgroundColor: `${gradeColor}20` }]}
              className="items-center justify-center rounded-2xl"
            >
              <Text className="font-black" style={{ fontSize: 28, color: gradeColor }}>
                {grade}
              </Text>
            </View>

            <View>
              <Text className="font-black text-[#00bc7d]" style={{ fontSize: 36 }}>
                {percentage}%
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7080" }}>
                {correctCount} of {totalCount} correct
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Section Breakdown */}
      <Animated.View style={barsStyle} className="px-5 py-4">
        {sectionStats.map((section) => {
          const ratio = section.total > 0 ? section.correct / section.total : 0;
          const barColor =
            ratio === 1 ? "#00bc7d" : ratio >= 0.5 ? "#fb923c" : "#ff6b8a";
          return (
            <View key={section.label} className="mb-3 flex-row items-center">
              <Text
                className="w-24 text-right font-semibold"
                style={{ fontSize: 10, color: "#6b7080" }}
                numberOfLines={1}
              >
                {section.label}
              </Text>
              <View style={styles.barTrack} className="mx-3 flex-1 rounded-full">
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${ratio * 100}%`,
                      backgroundColor: barColor,
                    },
                  ]}
                  className="rounded-full"
                />
              </View>
              <Text
                className="w-8 font-bold"
                style={{ fontSize: 10, color: "#a0a4b8" }}
              >
                {section.correct}/{section.total}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Tabs */}
      <Animated.View style={contentStyle}>
        <View className="mb-4 flex-row border-b" style={styles.tabBorder}>
          <Pressable
            onPress={() => setActiveTab("overview")}
            className="flex-1 items-center pb-3"
            style={activeTab === "overview" ? styles.tabActive : undefined}
          >
            <Text
              className="font-semibold"
              style={{
                fontSize: 13,
                color: activeTab === "overview" ? "#e8eaf0" : "#6b7080",
              }}
            >
              Overview
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("review")}
            className="flex-1 items-center pb-3"
            style={activeTab === "review" ? styles.tabActive : undefined}
          >
            <Text
              className="font-semibold"
              style={{
                fontSize: 13,
                color: activeTab === "review" ? "#e8eaf0" : "#6b7080",
              }}
            >
              Review ({wrongResults.length} wrong)
            </Text>
          </Pressable>
        </View>

        {activeTab === "overview" ? (
          <View>
            {/* Dot grid */}
            <View className="mb-6 flex-row flex-wrap items-center justify-center gap-1.5 px-8">
              {gradedResults.map((r) => (
                <View
                  key={r.id}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: r.correct ? "#00bc7d" : "#ff6b8a",
                    },
                  ]}
                />
              ))}
            </View>

            {/* Buttons */}
            <View className="gap-3 px-5">
              <Pressable
                onPress={onRetake}
                style={styles.primaryButton}
                className="flex-row items-center justify-center rounded-xl py-4"
              >
                <Ionicons name="refresh" size={18} color="#fff" />
                <Text className="ml-2 text-[15px] font-bold text-white">
                  Retake Test
                </Text>
              </Pressable>

              <Pressable
                onPress={onBack}
                style={styles.secondaryButton}
                className="flex-row items-center justify-center rounded-xl py-4"
              >
                <Ionicons name="chevron-back" size={18} color="#a0a4b8" />
                <Text className="ml-1 text-[15px] font-semibold text-[#a0a4b8]">
                  Back to Set
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            {wrongResults.length === 0 ? (
              <View className="items-center py-10">
                <Text style={{ fontSize: 32 }}>{"✨"}</Text>
                <Text className="mt-2 font-semibold" style={{ color: "#6b7080" }}>
                  All answers correct! Nothing to review.
                </Text>
              </View>
            ) : (
              wrongResults.map((r) => (
                <ReviewItem key={r.id} result={r} questionNumber={r.id} />
              ))
            )}
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: "rgba(0,188,125,0.04)",
  },
  gradeBox: {
    width: 56,
    height: 56,
  },
  barTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  barFill: {
    height: 6,
  },
  tabBorder: {
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#00bc7d",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  primaryButton: {
    backgroundColor: "#00bc7d",
    shadowColor: "rgba(0,188,125,0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
});
