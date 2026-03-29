import { AppTheme } from "@/constants/appTheme";
import { Button } from "heroui-native/button";
import { Card } from "heroui-native/card";
import { Input } from "heroui-native/input";
import { StyleSheet, Text, View } from "react-native";

interface DescriptionSectionProps {
  compactMode: boolean;
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  onToggleCompactMode: () => void;
  t: AppTheme;
}

const DescriptionSection = ({
  compactMode,
  value,
  onChange,
  onBlur,
  onToggleCompactMode,
  t,
}: DescriptionSectionProps) => {
  return (
    <View className="px-4 pt-3">
      {compactMode && !value ? (
        <Button
          variant="ghost"
          feedbackVariant="scale-highlight"
          onPress={onToggleCompactMode}
          className="self-start rounded-full px-3 py-0"
          style={[styles.descriptionToggle, { backgroundColor: t.surface2 }]}
        >
          <Button.Label className="text-[13px]" style={{ color: t.textMuted }}>
            + Description
          </Button.Label>
        </Button>
      ) : (
        <Card
          className="rounded-2xl px-4 py-3"
          style={{ backgroundColor: t.surface }}
        >
          <Text style={[styles.label, { color: t.textFaint }]}>
            Description
          </Text>
          <View style={[styles.editorShell, { borderColor: t.border }]}>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add a description..."
              placeholderTextColor={t.textFaint}
              className="min-h-[84px] rounded-none border-0 bg-transparent px-0 py-0 text-[15px] shadow-none"
              style={[styles.input, { color: t.text, textAlignVertical: "top" }]}
              multiline
            />
          </View>
        </Card>
      )}
    </View>
  );
};

export default DescriptionSection;

const styles = StyleSheet.create({
  descriptionToggle: {
    height: 34,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  editorShell: {
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 15,
  },
});
