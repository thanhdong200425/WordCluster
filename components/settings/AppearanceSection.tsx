import { AppTheme } from "@/constants/appTheme";
import { ThemePreference } from "@/stores/themePreferenceStorage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AppearanceSectionProps {
  preference: ThemePreference;
  onSelect: (pref: ThemePreference) => void;
  t: AppTheme;
}

type Segment = {
  key: ThemePreference;
  icon: keyof typeof Ionicons.glyphMap;
};

const SEGMENTS: Segment[] = [
  { key: "light", icon: "sunny-outline" },
  { key: "dark", icon: "moon-outline" },
  { key: "system", icon: "desktop-outline" },
];

export function AppearanceSection({
  preference,
  onSelect,
  t,
}: AppearanceSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: t.textFaint }]}>
        APPEARANCE
      </Text>
      <View style={[styles.segmentedContainer, { backgroundColor: t.surface }]}>
        {SEGMENTS.map(({ key, icon }) => {
          const isActive = preference === key;
          return (
            <Pressable
              key={key}
              onPress={() => onSelect(key)}
              style={styles.segmentBtn}
            >
              {isActive ? (
                <LinearGradient
                  colors={[t.accentStart, t.accentEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.segmentInner}
                >
                  <Ionicons name={icon} size={18} color="#fff" />
                </LinearGradient>
              ) : (
                <View style={styles.segmentInner}>
                  <Ionicons name={icon} size={18} color={t.textMuted} />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  segmentedContainer: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    height: 50,
  },
  segmentBtn: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  segmentInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
