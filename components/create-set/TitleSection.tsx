import { AppTheme } from "@/constants/appTheme";
import type { CreateSetFormData } from "@/schemas/create-set-schema";
import { Card } from "heroui-native/card";
import { Input } from "heroui-native/input";
import { type FieldErrors } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface TitleSectionProps {
  errors: FieldErrors<CreateSetFormData>;
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  t: AppTheme;
}

export function TitleSection({
  errors,
  value,
  onChange,
  onBlur,
  t,
}: TitleSectionProps) {
  return (
    <View className="px-4 pt-5">
      <Card
        className="rounded-2xl px-4 py-3"
        style={{ backgroundColor: t.surface }}
      >
        <Text style={[styles.label, { color: t.textFaint }]}>Set Title</Text>
        <Input
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder="Subject, chapter, unit"
          placeholderTextColor={t.textFaint}
          className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-[20px] font-bold"
          style={[styles.input, { color: t.text }]}
        />
      </Card>
      {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    paddingHorizontal: 0,
    paddingVertical: 0,
    letterSpacing: -0.3,
  },
  error: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
});
