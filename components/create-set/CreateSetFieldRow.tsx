import { FieldSectionHeader } from "@/components/create-set/FieldSectionHeader";
import { AppTheme } from "@/constants/appTheme";
import { cn } from "@/lib/utils";
import { CreateSetFormData } from "@/schemas/create-set-schema";
import { Input } from "heroui-native/input";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface CreateSetFieldRowProps {
  control: Control<CreateSetFormData>;
  index: number;
  name: keyof CreateSetFormData["items"][number];
  label: string;
  placeholder: string;
  t: AppTheme;
  error?: string;
  multiline?: boolean;
  isDeletable?: boolean;
  onDelete?: () => void;
  containerClassName?: string;
}

export function CreateSetFieldRow({
  control,
  index,
  name,
  label,
  placeholder,
  t,
  error,
  multiline = false,
  isDeletable = false,
  onDelete,
  containerClassName,
}: CreateSetFieldRowProps) {
  return (
    <View
      className={cn("px-3.5 pt-3", containerClassName)}
      style={[
        styles.row,
        {
          borderBottomColor: t.border,
        },
      ]}
    >
      {isDeletable && onDelete ? (
        <FieldSectionHeader label={label} t={t} onDelete={onDelete} />
      ) : (
        <Text style={[styles.label, { color: t.textFaint }]}>{label}</Text>
      )}
      <Controller
        control={control}
        name={`items.${index}.${name}`}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value ?? ""}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={t.textFaint}
            multiline={multiline}
            className={cn(
              "h-auto rounded-none border-0 bg-transparent px-0 pt-0 text-[15px]",
              multiline ? "min-h-[40px] pb-1" : "min-h-[32px] pb-3",
            )}
            style={[
              styles.input,
              {
                color: t.text,
                textAlignVertical: multiline ? "top" : "center",
              },
            ]}
          />
        )}
      />
      {error ? (
        <Text style={[styles.error, { color: "#ef4444" }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  input: {
    fontSize: 15,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  error: {
    fontSize: 12,
    marginTop: -6,
    marginBottom: 10,
  },
});
