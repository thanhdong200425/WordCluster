import { ExpandableChip } from "@/components/flashcard/ExpandableChip";
import { ExpandableSection } from "@/components/flashcard/ExpandableSection";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { FIELD_LABEL, FieldId } from "@/stores/flashcardLayoutStore";
import { useState } from "react";
import { Pressable, View } from "react-native";

export interface CardFaceItem {
  term: string;
  definition: string;
  example?: string;
  type?: string;
}

interface CardFaceProps {
  item: CardFaceItem;
  enabledFields: FieldId[];
  isFront: boolean;
  onFlip: () => void;
}

function getFieldValue(field: FieldId, item: CardFaceItem): string | undefined {
  switch (field) {
    case "term":
      return item.term;
    case "definition":
      return item.definition;
    case "example":
      return item.example;
    case "type":
      return item.type;
  }
}

export function CardFace({ item, enabledFields, isFront, onFlip }: CardFaceProps) {
  const theme = useAppTheme();
  const [activeChip, setActiveChip] = useState<"example" | null>(null);

  const primaryField = enabledFields[0];

  // Secondary fields that have a non-empty value
  const secondaryFields = enabledFields
    .slice(1)
    .filter((f) => {
      const val = getFieldValue(f, item);
      return val != null && val !== "";
    });

  const primaryValue = getFieldValue(primaryField, item) ?? "";

  // Show type badge only when type exists and isn't explicitly laid out as a field
  const showTypeBadge = !!item.type && !enabledFields.includes("type");

  // On back face, show example as an expandable chip if it's secondary (keeps current UX)
  const exampleAsChip =
    !isFront && secondaryFields.includes("example") && !!item.example;

  // Remaining secondary fields shown as inline text
  const inlineSecondaryFields = exampleAsChip
    ? secondaryFields.filter((f) => f !== "example")
    : secondaryFields;

  // Use larger text for short-value fields (term, type), readable size otherwise
  const primaryIsLarge =
    primaryField === "term" || primaryField === "type";

  const primaryContent = (
    <Text
      className={
        primaryIsLarge
          ? "text-center text-2xl font-bold"
          : "text-center text-base font-semibold leading-6"
      }
      style={{ color: theme.text }}
      numberOfLines={6}
    >
      {primaryValue}
    </Text>
  );

  return (
    <View className="flex-1 px-6 py-6">
      {/* Header: label of primary field + optional type badge */}
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[11px] font-semibold uppercase"
          style={{ color: theme.textFaint, letterSpacing: 1.38 }}
        >
          {FIELD_LABEL[primaryField]}
        </Text>
        {showTypeBadge ? (
          <View
            className="rounded-lg px-2.5 py-1"
            style={{ backgroundColor: `${theme.accentStart}1F` }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: theme.accentStart }}
            >
              {item.type}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Primary content — front: parent Pressable handles flip; back: internal Pressable */}
      {isFront ? (
        <View className="flex-1 items-center justify-center">
          {primaryContent}
        </View>
      ) : (
        <Pressable
          onPress={onFlip}
          className="flex-1 items-center justify-center"
        >
          {primaryContent}
        </Pressable>
      )}

      {/* Inline secondary fields */}
      {inlineSecondaryFields.length > 0 ? (
        <View className="mb-2 gap-1.5">
          {inlineSecondaryFields.map((field) => (
            <View key={field}>
              <Text
                className="text-[9px] font-semibold uppercase"
                style={{ color: theme.textFaint, letterSpacing: 1 }}
              >
                {FIELD_LABEL[field]}
              </Text>
              <Text
                className="text-xs leading-4"
                style={{ color: theme.textMuted }}
              >
                {getFieldValue(field, item)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Expandable example section (back face only) */}
      {exampleAsChip ? (
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
              {item.example}
            </Text>
          </View>
        </ExpandableSection>
      ) : null}

      {/* Example chip (back face only) */}
      {exampleAsChip ? (
        <View className="flex-row gap-2">
          <ExpandableChip
            label="Example"
            emoji="📝"
            isActive={activeChip === "example"}
            activeColor={theme.accentStart}
            activeBg={`${theme.accentStart}33`}
            onPress={() =>
              setActiveChip((prev) => (prev === "example" ? null : "example"))
            }
          />
        </View>
      ) : null}

      {/* Flip hint (front face only) */}
      {isFront ? (
        <Text
          className="text-center text-[13px]"
          style={{ color: theme.textFaint }}
        >
          Tap to reveal back
        </Text>
      ) : null}
    </View>
  );
}
