import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

interface TimerSelectorProps {
  value: number;
  onChange: (minutes: number) => void;
}

const OPTIONS = [
  { label: "No Timer", value: 0 },
  { label: "5 min", value: 5 },
  { label: "10 min", value: 10 },
  { label: "15 min", value: 15 },
  { label: "20 min", value: 20 },
];

export function TimerSelector({ value, onChange }: TimerSelectorProps) {
  const theme = useAppTheme();
  return (
    <View className="mx-5">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2"
      >
        {OPTIONS.map((opt) => {
          const isActive = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[
                styles.pill,
                isActive
                  ? {
                      backgroundColor: "rgba(0,188,125,0.12)",
                      borderColor: "rgba(0,188,125,0.3)",
                    }
                  : {
                      backgroundColor: theme.surface2,
                      borderColor: theme.border,
                    },
              ]}
              className="rounded-xl px-4 py-2.5"
            >
              <Text
                className="font-semibold"
                style={{
                  fontSize: 13,
                  color: isActive ? "#00bc7d" : theme.textMuted,
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderWidth: 1.5,
  },
});
