import { Text } from "@/components/ui/text";
import { Image, Pressable, View } from "react-native";

interface WordFamilyCardProps {
  title: string;
  meaning: string;
  wordCount: number;
  progress?: number;
  isNew?: boolean;
  imageUrl: string;
  onPress?: () => void;
}

export function WordFamilyCard({
  title,
  meaning,
  wordCount,
  progress,
  isNew,
  imageUrl,
  onPress,
}: WordFamilyCardProps) {
  const hasProgress = progress !== undefined;
  const barColor = hasProgress && progress >= 50 ? "#5b6cff" : "#fb923c";

  return (
    <Pressable onPress={onPress} className="mx-5 mb-3 flex-row items-center rounded-2xl bg-[#1c1e26] p-4">
      <View className="mr-4 flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-bold text-white">{title}</Text>
          {isNew && (
            <View className="rounded-md bg-[#5b6cff] px-2 py-0.5">
              <Text className="text-xs font-semibold text-white">NEW</Text>
            </View>
          )}
        </View>
        <Text className="mt-1 text-sm text-[#a0a4b8]">{meaning}</Text>
        <Text className="mt-1 text-xs text-[#6b7080]">
          {wordCount} words
        </Text>

        {hasProgress ? (
          <View className="mt-3">
            <Text className="mb-1 text-xs font-medium" style={{ color: barColor }}>
              {progress}% learned
            </Text>
            <View className="h-2 rounded-full bg-[#2c2e3a]">
              <View
                className="h-2 rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: barColor,
                }}
              />
            </View>
          </View>
        ) : (
          <Pressable className="mt-3 self-start">
            <Text className="text-sm font-semibold text-[#5b6cff]">
              Start Session →
            </Text>
          </Pressable>
        )}
      </View>

      <Image
        source={{ uri: imageUrl }}
        className="h-24 w-24 rounded-2xl"
        resizeMode="cover"
      />
    </Pressable>
  );
}
