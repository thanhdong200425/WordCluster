import { ReviewItem } from "@/components/test/ReviewItem";
import { Text } from "@/components/ui/text";
import useStreakStorage from "@/stores/streakStorage";
import type { GradedResult, TestQuestionType } from "@/types/test";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
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
  const recordStudySession = useStreakStorage((s) => s.recordStudySession);
  const [activeTab, setActiveTab] = useState<"overview" | "review">("overview");

  const correctCount = gradedResults.filter((r) => r.correct).length;
  const totalCount = gradedResults.length;
  const percentage =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
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
    recordStudySession();
    emojiScale.value = withDelay(
      200,
      withSpring(1, { damping: 12, stiffness: 200 }),
    );
    headerOpacity.value = withDelay(500, withTiming(1, { duration: 400 }));
    headerY.value = withDelay(500, withTiming(0, { duration: 400 }));
    barsOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
    barsY.value = withDelay(800, withTiming(0, { duration: 400 }));
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 300 }));
    contentY.value = withDelay(1000, withTiming(0, { duration: 300 }));
  }, [
    recordStudySession,
    emojiScale,
    headerOpacity,
    headerY,
    barsOpacity,
    barsY,
    contentOpacity,
    contentY,
  ]);

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
      <View className="items-center bg-[rgba(0,188,125,0.04)] px-6 pb-6 pt-8">
        <Animated.View style={emojiStyle}>
          <Text className="leading-[56px] text-[56px]">{meta.emoji}</Text>
        </Animated.View>

        <Animated.View style={headerStyle} className="mt-3 items-center">
          <Text className="text-[20px] font-extrabold text-[#e8eaf0]">
            {meta.message}
          </Text>

          <View className="mt-4 flex-row items-center gap-4">
            {/* Grade box */}
            <View
              style={{ backgroundColor: `${gradeColor}20` }}
              className="h-14 w-14 items-center justify-center rounded-2xl"
            >
              <Text
                className="text-[28px] font-black"
                style={{ color: gradeColor }}
              >
                {grade}
              </Text>
            </View>

            <View>
              <Text className="text-[36px] font-black text-[#00bc7d]">
                {percentage}%
              </Text>
              <Text className="text-xs text-[#6b7080]">
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
                className="w-24 text-right text-[10px] font-semibold text-[#6b7080]"
                numberOfLines={1}
              >
                {section.label}
              </Text>
              <View className="mx-3 h-1.5 flex-1 rounded-full bg-[rgba(255,255,255,0.06)]">
                <View
                  style={{
                    width: `${ratio * 100}%`,
                    backgroundColor: barColor,
                  }}
                  className="h-1.5 rounded-full"
                />
              </View>
              <Text className="w-8 text-[10px] font-bold text-[#a0a4b8]">
                {section.correct}/{section.total}
              </Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Tabs */}
      <Animated.View style={contentStyle}>
        <View className="mb-4 flex-row border-b border-b-[rgba(255,255,255,0.06)]">
          <Pressable
            onPress={() => setActiveTab("overview")}
            className={`flex-1 items-center pb-3 ${
              activeTab === "overview" ? "border-b-2 border-b-[#00bc7d]" : ""
            }`}
          >
            <Text
              className={`text-[13px] font-semibold ${
                activeTab === "overview" ? "text-[#e8eaf0]" : "text-[#6b7080]"
              }`}
            >
              Overview
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab("review")}
            className={`flex-1 items-center pb-3 ${
              activeTab === "review" ? "border-b-2 border-b-[#00bc7d]" : ""
            }`}
          >
            <Text
              className={`text-[13px] font-semibold ${
                activeTab === "review" ? "text-[#e8eaf0]" : "text-[#6b7080]"
              }`}
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
                  style={{
                    backgroundColor: r.correct ? "#00bc7d" : "#ff6b8a",
                  }}
                  className="h-3 w-3 rounded-[3px]"
                />
              ))}
            </View>

            {/* Buttons */}
            <View className="gap-3 px-5">
              <Pressable
                onPress={onRetake}
                className="flex-row items-center justify-center rounded-xl bg-[#00bc7d] py-4 shadow-[0_4px_12px_rgba(0,188,125,0.3)]"
              >
                <Ionicons name="refresh" size={18} color="#fff" />
                <Text className="ml-2 text-[15px] font-bold text-white">
                  Retake Test
                </Text>
              </Pressable>

              <Pressable
                onPress={onBack}
                className="flex-row items-center justify-center rounded-xl border-[1.5px] border-[rgba(255,255,255,0.1)] bg-transparent py-4"
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
                <Text className="text-[32px]">{"✨"}</Text>
                <Text className="mt-2 font-semibold text-[#6b7080]">
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
