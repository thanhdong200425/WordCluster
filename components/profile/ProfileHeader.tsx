import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  t: AppTheme;
}

export function ProfileHeader({ t }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingLeft: 20 }]}>
      <PressableFeedback
        onPress={() => router.back()}
        style={[styles.backBtn, { backgroundColor: t.surface }]}
      >
        <Ionicons name="chevron-back" size={18} color={t.textMuted} />
      </PressableFeedback>
      <Text style={[styles.title, { color: t.text }]}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
});
