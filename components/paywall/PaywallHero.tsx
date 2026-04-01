import { AppTheme } from "@/constants/appTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Crown } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface PaywallHeroProps {
  t: AppTheme;
}

export function PaywallHero({ t }: PaywallHeroProps) {
  return (
    <LinearGradient
      colors={["#5B6BF8", "#4B5BF0", "#3A4DE8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      <View style={styles.content}>
        <View style={styles.crownWrap}>
          <Crown size={30} color="#FFFFFF" strokeWidth={2.2} />
        </View>
        <Text style={styles.title}>Lexio Pro</Text>
        <Text style={styles.subtitle}>
          Everything, unlimited. No compromises.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 188,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#5B6BF8",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  circleTopRight: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 999,
    top: -40,
    right: -10,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  circleBottomLeft: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 999,
    left: 20,
    bottom: -20,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
  },
  crownWrap: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },
});
