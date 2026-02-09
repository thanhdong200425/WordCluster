import { Text } from "@/components/ui/text";
import { Pressable, View } from "react-native";

interface SetCardProps {
  title: string;
  meaning: string;
  wordCount: number;
  progress?: number;
  isNew?: boolean;
  onPress?: () => void;
}

export function SetCard({
  title,
  meaning,
  wordCount,
  progress,
  isNew,
  onPress,
}: SetCardProps) {
  const hasProgress = progress !== undefined;
  const barColor = hasProgress && progress >= 50 ? "#5b6cff" : "#fb923c";

  return (
    <Pressable onPress={onPress} className="mx-5 mb-3 flex-row rounded-2xl border border-white/5 bg-[#1c1e26] p-4">
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold text-[#e8eaf0]">{title}</Text>
            {isNew && (
              <View className="rounded-full bg-[#5b6cff]/20 px-2.5 py-0.5">
                <Text className="text-[10px] font-bold uppercase text-[#5b6cff]">
                  NEW
                </Text>
              </View>
            )}
          </View>
          <Text
            className="mt-1 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {meaning} · {wordCount}
          </Text>
        </View>

        {hasProgress && (
          <View>
            <Text
              className="mb-1.5 text-[10px] font-bold uppercase tracking-wide"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {progress}% LEARNED
            </Text>
            <View className="h-1.5 rounded-full bg-white/10">
              <View
                className="h-1.5 rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: barColor,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}
