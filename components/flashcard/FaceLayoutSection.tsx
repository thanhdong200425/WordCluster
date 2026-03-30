import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import {
  CANONICAL_FIELDS,
  Face,
  FieldId,
} from "@/stores/flashcardLayoutStore";
import { StyleSheet, View } from "react-native";
import { FaceLayoutRow } from "./FaceLayoutRow";

interface FaceLayoutSectionProps {
  face: Face;
  enabledFields: FieldId[];
  onToggle: (field: FieldId) => void;
}

export function FaceLayoutSection({
  face,
  enabledFields,
  onToggle,
}: FaceLayoutSectionProps) {
  const theme = useAppTheme();
  const primaryField = enabledFields[0];

  return (
    <View>
      <Text style={[styles.title, { color: theme.textFaint }]}>
        {face === "front" ? "Front face" : "Back face"}
      </Text>
      <View style={[styles.list, { backgroundColor: theme.surface2 }]}>
        {CANONICAL_FIELDS.map((field, index) => (
          <FaceLayoutRow
            key={field}
            field={field}
            isEnabled={enabledFields.includes(field)}
            isPrimary={field === primaryField && enabledFields.includes(field)}
            isLast={index === CANONICAL_FIELDS.length - 1}
            onPress={() => onToggle(field)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  list: {
    borderRadius: 12,
    paddingHorizontal: 10,
  },
});
