import { CreateSetFieldRow } from "@/components/create-set/CreateSetFieldRow";
import { FieldSectionHeader } from "@/components/create-set/FieldSectionHeader";
import { AppTheme } from "@/constants/appTheme";
import type { CreateSetFormData } from "@/schemas/create-set-schema";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "heroui-native/button";
import { Card } from "heroui-native/card";
import { Menu } from "heroui-native/menu";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Select } from "heroui-native/select";
import { StickyNote, Tag } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export type AddFieldType = "example" | "type";

const TYPE_OPTIONS = [
  { label: "Noun", value: "noun" },
  { label: "Verb", value: "verb" },
  { label: "Adjective", value: "adjective" },
  { label: "Adverb", value: "adverb" },
  { label: "Pronoun", value: "pronoun" },
  { label: "Preposition", value: "preposition" },
  { label: "Conjunction", value: "conjunction" },
  { label: "Interjection", value: "interjection" },
];

interface TermCardProps {
  index: number;
  control: Control<CreateSetFormData>;
  errors?: FieldErrors<CreateSetFormData["items"][number]>;
  t: AppTheme;
  isPro?: boolean;
  onFieldLimitReached?: () => void;
}

export function TermCard({
  index,
  control,
  errors,
  t,
  isPro = false,
  onFieldLimitReached,
}: TermCardProps) {
  const watchedFields = useWatch({
    control,
    name: `items.${index}`,
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibleFields, setVisibleFields] = useState<Set<AddFieldType>>(() => {
    const fields = new Set<AddFieldType>();

    if (watchedFields.example) fields.add("example");
    if (watchedFields.type) fields.add("type");
    return fields;
  });

  useEffect(() => {
    setVisibleFields((prev) => {
      const next = new Set(prev);

      if (watchedFields.example) next.add("example");
      if (watchedFields.type) next.add("type");

      return next;
    });
  }, [watchedFields.example, watchedFields.type]);

  useEffect(() => {
    if (errors?.term || errors?.definition || errors?.example || errors?.type) {
      setIsExpanded(true);
    }
  }, [errors?.definition, errors?.example, errors?.term, errors?.type]);

  const FREE_FIELD_LIMIT = 3;
  const isFieldLocked = !isPro && index >= FREE_FIELD_LIMIT;

  const handleAddField = (type: AddFieldType) => {
    if (isFieldLocked) {
      onFieldLimitReached?.();
      return;
    }
    setVisibleFields((prev) => new Set(prev).add(type));
    setIsExpanded(true);
  };

  const handleDeleteField = (type: AddFieldType) => {
    setVisibleFields((prev) => new Set([...prev].filter((t) => t !== type)));
  };

  const hasAllFields =
    visibleFields.has("example") && visibleFields.has("type");

  return (
    <Card
      className="overflow-hidden rounded-2xl"
      style={{
        backgroundColor: t.surface,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: t.bg === "#F4F4F7" ? 0.04 : 0,
        shadowRadius: 16,
        elevation: t.bg === "#F4F4F7" ? 2 : 0,
      }}
    >
      <Card.Header
        className="flex-row items-center justify-between p-2"
        style={{
          borderBottomWidth: isExpanded ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: t.border,
        }}
      >
        <View className="flex-row items-center gap-2.5">
          <View
            className="h-[22px] w-[22px] items-center justify-center rounded-full"
            style={{ backgroundColor: t.accentStart }}
          >
            <Text style={styles.badgeText}>{index + 1}</Text>
          </View>
          <Text style={[styles.cardLabel, { color: t.textFaint }]}>Card</Text>
        </View>

        <PressableFeedback
          onPress={() => setIsExpanded((prev) => !prev)}
          className="h-[26px] w-[26px] items-center justify-center rounded-full"
          style={{ backgroundColor: t.surface2 }}
        >
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={14}
            color={t.textMuted}
          />
        </PressableFeedback>
      </Card.Header>

      {isExpanded ? (
        <>
          <Card.Body className="p-0">
            <CreateSetFieldRow
              control={control}
              index={index}
              name="term"
              label="Term"
              placeholder="Enter term"
              t={t}
              error={errors?.term?.message}
            />

            <CreateSetFieldRow
              control={control}
              index={index}
              name="definition"
              label="Definition"
              placeholder="Enter definition"
              t={t}
              error={errors?.definition?.message}
              containerClassName="pb-0"
            />

            {visibleFields.has("example") ? (
              <CreateSetFieldRow
                control={control}
                index={index}
                name="example"
                label="Example"
                placeholder="Enter example"
                t={t}
                error={errors?.example?.message}
                multiline
                isDeletable
                onDelete={() => handleDeleteField("example")}
              />
            ) : null}

            {visibleFields.has("type") ? (
              <View
                className="px-3.5 pb-3 pt-3"
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: t.border,
                }}
              >
                <FieldSectionHeader
                  label="Type"
                  t={t}
                  onDelete={() => handleDeleteField("type")}
                />
                <Controller
                  control={control}
                  name={`items.${index}.type`}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={
                        value
                          ? (TYPE_OPTIONS.find((o) => o.value === value) ??
                            undefined)
                          : undefined
                      }
                      onValueChange={(option) => onChange(option?.value ?? "")}
                    >
                      <Select.Trigger
                        variant="default"
                        className="min-h-[32px] rounded-xl border px-3 py-2"
                        style={{ borderColor: t.border, backgroundColor: t.bg }}
                      >
                        <Select.Value
                          className="text-[15px]"
                          style={{ color: t.text }}
                          placeholder="Select type"
                        />
                        <Select.TriggerIndicator />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Overlay />
                        <Select.Content
                          presentation="popover"
                          width={"trigger"}
                        >
                          {TYPE_OPTIONS.map((option) => (
                            <Select.Item
                              key={option.value}
                              label={option.label}
                              value={option.value}
                            />
                          ))}
                        </Select.Content>
                      </Select.Portal>
                    </Select>
                  )}
                />
              </View>
            ) : null}
          </Card.Body>

          {!hasAllFields ? (
            <Card.Footer
              className="flex-row px-3.5 py-3"
              style={{
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: t.border,
              }}
            >
              <Menu>
                <Menu.Trigger asChild>
                  <Button
                    variant="ghost"
                    feedbackVariant="scale-highlight"
                    className="rounded-full px-3 py-0"
                    style={[
                      styles.addFieldButton,
                      { backgroundColor: t.surface2 },
                    ]}
                  >
                    <Ionicons name="add" size={14} color={t.textMuted} />
                    <Button.Label
                      className="text-[13px]"
                      style={{ color: t.textMuted }}
                    >
                      Add field
                    </Button.Label>
                    <Ionicons
                      name="chevron-down"
                      size={12}
                      color={t.textMuted}
                    />
                  </Button>
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Overlay />
                  <Menu.Content
                    presentation="popover"
                    width={188}
                    className="rounded-xl"
                    style={{ backgroundColor: t.surface }}
                  >
                    {!visibleFields.has("example") ? (
                      <Menu.Item
                        className="gap-3 px-4 py-3"
                        onPress={() => handleAddField("example")}
                      >
                        <StickyNote size={16} color={t.textMuted} />
                        <Menu.ItemTitle
                          className="text-sm"
                          style={{ color: t.text }}
                        >
                          Example
                        </Menu.ItemTitle>
                      </Menu.Item>
                    ) : null}
                    {!visibleFields.has("type") ? (
                      <Menu.Item
                        className="gap-3 px-4 py-3"
                        onPress={() => handleAddField("type")}
                      >
                        <Tag size={16} color={t.textMuted} />
                        <Menu.ItemTitle
                          className="text-sm"
                          style={{ color: t.text }}
                        >
                          Type
                        </Menu.ItemTitle>
                      </Menu.Item>
                    ) : null}
                  </Menu.Content>
                </Menu.Portal>
              </Menu>
            </Card.Footer>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  addFieldButton: {
    height: 34,
  },
});
