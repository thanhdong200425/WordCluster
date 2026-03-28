import { Card } from "heroui-native/card";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Text, View } from "react-native";

interface AllSetsCardProps {
  title: string;
  wordCount: number;
  onPress?: () => void;
  onStartSession?: () => void;
}

export function AllSetsCard({
  title,
  wordCount,
  onPress,
  onStartSession,
}: AllSetsCardProps) {
  return (
    <PressableFeedback onPress={onPress} className="mx-4 mb-3">
      <Card className="bg-white rounded-2xl px-5 py-5">
        <Text className="text-[17px] font-bold text-[#1a1b2e]" numberOfLines={1}>
          {title}
        </Text>
        <Text className="mt-1 text-[14px] text-[#94a3b8]">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </Text>
        <PressableFeedback
          onPress={(e) => {
            e.stopPropagation?.();
            onStartSession?.();
          }}
          className="mt-3 self-start"
        >
          <View>
            <Text className="text-[14px] font-medium text-[#5b6bf8]">
              Start Session →
            </Text>
          </View>
        </PressableFeedback>
      </Card>
    </PressableFeedback>
  );
}
