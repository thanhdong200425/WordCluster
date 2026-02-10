import { Text } from "@/components/ui/text";
import { QUESTION_TYPE_META, type QuestionType } from "@/types/learn";
import { View } from "react-native";

interface QuestionTypeBadgeProps {
  type: QuestionType;
  round: 1 | 2;
}

export function QuestionTypeBadge({ type, round }: QuestionTypeBadgeProps) {
  const meta = QUESTION_TYPE_META[type];

  return (
    <View
      className="mb-4 flex-row items-center self-start rounded-lg px-2.5 py-1"
      style={{
        backgroundColor: `${meta.color}12`,
        borderWidth: 1,
        borderColor: `${meta.color}25`,
      }}
    >
      <Text className="mr-1 text-[11px]">{meta.icon}</Text>
      <Text
        className="font-bold uppercase"
        style={{ fontSize: 11, letterSpacing: 0.5, color: meta.color }}
      >
        {meta.label}
      </Text>
      <Text
        className="ml-1.5 font-semibold"
        style={{ fontSize: 10, color: "#4a4d5e" }}
      >
        · Round {round}
      </Text>
    </View>
  );
}
