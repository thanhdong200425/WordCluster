import { ExpandableChip } from "@/components/flashcard/ExpandableChip";
import { ExpandableSection } from "@/components/flashcard/ExpandableSection";
import { Text } from "@/components/ui/text";
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
  const [activeChip, setActiveChip] = useState<ActiveChip>(null);

  const toggleChip = (chip: ActiveChip) => {
    setActiveChip((prev) => (prev === chip ? null : chip));
  };

  const hasChips = !!example;

  return (
    <View className="flex-1 px-6 py-6">
      {/* Top row: label + type badge */}
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[10px] font-extrabold uppercase"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: 1.5 }}
        >
          DEFINITION
        </Text>
        {type ? (
          <View
            className="rounded-lg px-2.5 py-1"
            style={{ backgroundColor: "rgba(173,70,255,0.12)" }}
          >
            <Text className="text-[10px] font-bold text-[#ad46ff]">
              {type}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Center: definition (tappable for flip) */}
      <Pressable onPress={onFlip} className="flex-1 items-center justify-center">
        <Text className="text-center text-base leading-6 text-[#e8eaf0]">
          {definition}
        </Text>
      </Pressable>

      {/* Expandable content */}
      {example ? (
        <ExpandableSection visible={activeChip === "example"}>
          <View
            className="mb-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(91,108,255,0.08)" }}
          >
            <Text
              className="mb-1.5 text-[10px] font-extrabold uppercase"
              style={{ color: "#5b6cff", letterSpacing: 1.5 }}
            >
              EXAMPLE
            </Text>
            <Text className="text-sm italic leading-5 text-[#e8eaf0]">
              {example}
            </Text>
          </View>
        </ExpandableSection>
      ) : null}

      {/* Chips */}
      {hasChips ? (
        <View className="flex-row gap-2">
          {example ? (
            <ExpandableChip
              label="Example"
              emoji="📝"
              isActive={activeChip === "example"}
              activeColor="#5b6cff"
              activeBg="rgba(91,108,255,0.2)"
              onPress={() => toggleChip("example")}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
