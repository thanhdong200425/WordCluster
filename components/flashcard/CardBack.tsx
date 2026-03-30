import { ExpandableChip } from "@/components/flashcard/ExpandableChip";
import { ExpandableSection } from "@/components/flashcard/ExpandableSection";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface CardBackProps {
  definition: string;
  type?: string;
  example?: string;
  onFlip: () => void;
}

type ActiveChip = "example" | null;

export function CardBack({ definition, type, example, onFlip }: CardBackProps) {
  const theme = useAppTheme();
  const [activeChip, setActiveChip] = useState<ActiveChip>(null);

  const toggleChip = (chip: ActiveChip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
  };

  const hasChips = !!example;

  return (
    <View className="flex-1 px-6 py-6">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[11px] font-semibold uppercase"
          style={{ color: theme.textFaint, letterSpacing: 1.38 }}
        >
          Definition
        </Text>
        {type ? (
          <View
            className="rounded-lg px-2.5 py-1"
            style={{ backgroundColor: `${theme.accentStart}1F` }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: theme.accentStart }}
            >
              {type}
            </Text>
          </View>
        ) : null}
      </View>

      <Pressable onPress={onFlip} className="flex-1 items-center justify-center">
        <Text
          className="text-center text-base leading-6"
          style={{ color: theme.text }}
        >
          {definition}
        </Text>
      </Pressable>

      {example ? (
        <ExpandableSection visible={activeChip === "example"}>
          <View
            className="mb-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: theme.accentSurface }}
          >
            <Text
              className="mb-1.5 text-[10px] font-extrabold uppercase"
              style={{ color: theme.accentStart, letterSpacing: 1.5 }}
            >
              Example
            </Text>
            <Text
              className="text-sm italic leading-5"
              style={{ color: theme.text }}
            >
              {example}
            </Text>
          </View>
        </ExpandableSection>
      ) : null}

      {hasChips ? (
        <View className="flex-row gap-2">
          {example ? (
            <ExpandableChip
              label="Example"
              emoji="📝"
              isActive={activeChip === "example"}
              activeColor={theme.accentStart}
              activeBg={`${theme.accentStart}33`}
              onPress={() => toggleChip("example")}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
