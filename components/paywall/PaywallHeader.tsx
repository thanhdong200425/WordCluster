import { AppTheme } from "@/constants/appTheme";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface PaywallHeaderProps {
  t: AppTheme;
  onBack: () => void;
}

export function PaywallHeader({ t, onBack }: PaywallHeaderProps) {
  return (
    <View style={styles.container}>
      <PressableFeedback
        onPress={onBack}
        style={[
          styles.backButton,
          {
            backgroundColor: t.surface,
            borderColor: t.border,
          },
        ]}
      >
        <ChevronLeft size={18} color={t.textMuted} />
      </PressableFeedback>
      <Text style={[styles.title, { color: t.text }]}>Upgrade to Pro</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 0.5,
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
