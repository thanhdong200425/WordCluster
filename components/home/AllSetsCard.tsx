import { useAppTheme } from "@/constants/appTheme";
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
  const theme = useAppTheme();

  return (
    <PressableFeedback onPress={onPress} className="mx-4 mb-3">
      <Card
        className="rounded-2xl px-5 py-5"
        style={{ backgroundColor: theme.surface }}
      >
        <Text
          className="text-[17px] font-bold"
          style={{ color: theme.text }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text className="mt-1 text-[14px]" style={{ color: theme.textFaint }}>
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
            <Text
              className="text-[14px] font-medium"
              style={{ color: theme.accentStart }}
            >
              Start Session →
            </Text>
          </View>
        </PressableFeedback>
      </Card>
    </PressableFeedback>
  );
}
