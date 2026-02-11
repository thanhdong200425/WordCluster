import { Text } from "@/components/ui/text";
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
                isActive ? styles.pillActive : styles.pillInactive,
              ]}
              className="rounded-xl px-4 py-2.5"
            >
              <Text
                className="font-semibold"
                style={{
                  fontSize: 13,
                  color: isActive ? "#00bc7d" : "#6b7080",
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
  pillActive: {
    backgroundColor: "rgba(0,188,125,0.12)",
    borderColor: "rgba(0,188,125,0.3)",
  },
  pillInactive: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderColor: "rgba(255,255,255,0.06)",
  },
});
