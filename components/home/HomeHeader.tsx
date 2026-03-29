import { useAppTheme } from "@/constants/appTheme";
import useUserStorage from "@/stores/userStorage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface HomeHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
} as const;

const HEADER_HEIGHT = 52;

export function HomeHeader({ searchQuery, onSearchChange }: HomeHeaderProps) {
  const router = useRouter();
  const theme = useAppTheme();
  const userName = useUserStorage((state) => state.userName);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const progress = useSharedValue(0);

  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const expand = () => {
    setIsExpanded(true);
    progress.value = withSpring(1, { damping: 22, stiffness: 280 });
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const collapse = () => {
    inputRef.current?.blur();
    setIsExpanded(false);
    onSearchChange("");
    progress.value = withTiming(0, { duration: 260 });
  };

  // Collapsed row fades out as progress → 1
  const collapsedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.8], [1, 0]),
  }));

  // Expanded row fades in as progress → 1
  const expandedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.3, 1], [0, 1]),
  }));

  return (
    <View style={{ height: HEADER_HEIGHT, position: "relative" }}>
      {/* ── Collapsed row ─────────────────────────────────────── */}
      <Animated.View
        style={[styles.row, collapsedStyle]}
        pointerEvents={isExpanded ? "none" : "auto"}
      >
        {/* Search icon button */}
        <PressableFeedback
          onPress={expand}
          style={[styles.iconBtn, { backgroundColor: theme.surface }, SHADOW]}
        >
          <Ionicons name="search" size={16} color={theme.textMuted} />
        </PressableFeedback>

        <View style={{ flex: 1 }} />

        {/* Initials pill + Settings */}
        <View style={styles.rightGroup}>
          <PressableFeedback
            onPress={() => router.push("/profile")}
            style={styles.initialsGradient}
          >
            <LinearGradient
              colors={[theme.accentStart, theme.accentEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.initialsGradient}
            >
              <Text style={styles.initialsText}>{initials}</Text>
            </LinearGradient>
          </PressableFeedback>

          <PressableFeedback
            onPress={() => router.push("/settings")}
            style={[
              styles.iconBtn,
              styles.roundBtn,
              { backgroundColor: theme.surface },
              SHADOW,
            ]}
          >
            <Ionicons name="settings-outline" size={16} color={theme.textMuted} />
          </PressableFeedback>
        </View>
      </Animated.View>

      {/* ── Expanded row ───────────────────────────────────────── */}
      <Animated.View
        style={[styles.row, expandedStyle]}
        pointerEvents={isExpanded ? "auto" : "none"}
      >
        {/* Search input */}
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.surface },
            SHADOW,
          ]}
        >
          <Ionicons
            name="search"
            size={16}
            color={theme.textFaint}
            style={{ marginRight: 8 }}
          />
          <TextInput
            ref={inputRef}
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search roots (e.g., struct, bene)"
            placeholderTextColor={theme.textFaint}
            style={[styles.input, { color: theme.text }]}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Cancel button */}
        <PressableFeedback onPress={collapse} style={styles.cancelBtn}>
          <Text style={[styles.cancelText, { color: theme.accentStart }]}>
            Cancel
          </Text>
        </PressableFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  roundBtn: {
    borderRadius: 18,
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  initialsGradient: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  initialsText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: -0.2,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  cancelBtn: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
