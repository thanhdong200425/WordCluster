import { AppTheme } from "@/constants/appTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Crown } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface ProfileProMemberBadgeProps {
  t: AppTheme;
}

export function ProfileProMemberBadge({ t }: ProfileProMemberBadgeProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[t.proPillFillStart, t.proPillFillEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.pill, { borderColor: t.proPillBorder }]}
      >
        <Crown size={11} color={t.proAccent} strokeWidth={2.5} />
        <Text style={[styles.label, { color: t.proAccent }]}>PRO MEMBER</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
});
