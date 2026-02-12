import { Text } from "@/components/ui/text";
import { differenceInHours } from "date-fns";
import { Pressable, View } from "react-native";

interface SetCardProps {
  title: string;
  wordCount: number;
  createdAt: string;
  onPress?: () => void;
}

export function SetCard({
  title,
  wordCount,
  createdAt,
  onPress,
}: SetCardProps) {
  const isNew = differenceInHours(new Date(), new Date(createdAt)) < 24;

  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mb-3 flex-row rounded-2xl border border-white/5 bg-[#1c1e26] p-4"
    >
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
          {wordCount ? (
            <Text
              className="mt-1 text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {wordCount} words
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
