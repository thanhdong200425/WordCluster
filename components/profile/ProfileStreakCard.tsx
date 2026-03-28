import { AppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

interface ProfileStreakCardProps {
  streak: number;
  weekActivity: boolean[];
  t: AppTheme;
}

export function ProfileStreakCard({
  streak,
  weekActivity,
  t,
}: ProfileStreakCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: t.surface }]}>
      {/* Flame icon */}
      <View style={[styles.iconCircle, { backgroundColor: t.surface2 }]}>
        <Ionicons name="flame" size={22} color={t.accentStart} />
      </View>

      {/* Streak count */}
      <View style={styles.streakInfo}>
        <Text style={[styles.streakCount, { color: t.text }]}>{streak}</Text>
        <Text style={[styles.streakLabel, { color: t.textMuted }]}>
          day streak
        </Text>
      </View>

      {/* Week activity */}
      <View style={styles.weekSection}>
        <View style={styles.dayLabels}>
          {WEEK_LABELS.map((label, i) => (
            <Text key={i} style={[styles.dayLabel, { color: t.textFaint }]}>
              {label}
            </Text>
          ))}
        </View>
        <View style={styles.dots}>
          {weekActivity.map((active, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: active ? t.accentStart : t.dots },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  streakInfo: {
    gap: 2,
  },
  streakCount: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.4,
    lineHeight: 32,
  },
  streakLabel: {
    fontSize: 13,
    lineHeight: 19,
  },
  weekSection: {
    flex: 1,
    alignItems: "flex-end",
    gap: 8,
  },
  dayLabels: {
    flexDirection: "row",
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    width: 16,
    textAlign: "center",
  },
  dots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 999,
  },
});
