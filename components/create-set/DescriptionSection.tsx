import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "heroui-native/button";
import { Card } from "heroui-native/card";
import { Input } from "heroui-native/input";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

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
  const springConfig = { damping: 22, stiffness: 200, mass: 0.85 } as const;

  const layoutTransition = LinearTransition.springify()
    .damping(springConfig.damping)
    .stiffness(springConfig.stiffness)
    .mass(springConfig.mass);

  const entering = FadeIn.springify()
    .damping(springConfig.damping)
    .stiffness(springConfig.stiffness)
    .mass(springConfig.mass);

  const exiting = FadeOut.springify()
    .damping(springConfig.damping)
    .stiffness(springConfig.stiffness)
    .mass(springConfig.mass);

  return (
    <Animated.View className="px-4 pt-3" layout={layoutTransition}>
      {compactMode ? (
        <Animated.View
          entering={entering}
          exiting={exiting}
          className="self-start"
        >
          <Button
            variant="ghost"
            feedbackVariant="scale-highlight"
            onPress={onToggleCompactMode}
            className="h-[34px] self-start rounded-full px-3 py-0"
            style={{ backgroundColor: t.surface2 }}
          >
            <Button.Label
              className="text-[13px]"
              style={{ color: t.textMuted }}
            >
              + Description
            </Button.Label>
          </Button>
        </Animated.View>
      ) : (
        <Animated.View entering={entering} exiting={exiting}>
          <Card
            className="rounded-2xl px-4 py-3"
            style={{ backgroundColor: t.surface }}
          >
            <View className="flex-row items-center justify-between">
              <Text
                className="mb-[10px] text-[10px] font-semibold uppercase tracking-[1.2px]"
                style={{ color: t.textFaint }}
              >
                Description
              </Text>

              {/* Add a rubbish icon to the right of the text */}
              <PressableFeedback onPress={onToggleCompactMode}>
                <Ionicons name="trash-outline" size={16} color={t.textMuted} />
              </PressableFeedback>
            </View>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add a description..."
              placeholderTextColor={t.textFaint}
              className="min-h-[84px] rounded-none border-0 bg-transparent px-0 py-0 text-[15px] shadow-none"
              style={{ color: t.text, textAlignVertical: "top" }}
              multiline
            />
          </Card>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default DescriptionSection;
