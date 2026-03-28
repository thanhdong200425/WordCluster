import { useAppTheme } from "@/constants/appTheme";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileNameSection } from "@/components/profile/ProfileNameSection";
import { ProfileStreakCard } from "@/components/profile/ProfileStreakCard";
import useStreakStorage from "@/stores/streakStorage";
import useUserStorage from "@/stores/userStorage";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { ScrollView } from "react-native";

export default function ProfileScreen() {
  const t = useAppTheme();
  const userName = useUserStorage((state) => state.userName);
  const { getCurrentStreak, getWeekActivity } = useStreakStorage();
  const [statusBarStyle, setStatusBarStyle] = useState<"dark" | "light">("dark");

  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("dark");
      return () => setStatusBarStyle("light");
    }, []),
  );

  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  const streak = getCurrentStreak();
  const weekActivity = getWeekActivity();

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <ScrollView
        style={{ flex: 1, backgroundColor: t.bg }}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <ProfileHeader t={t} />
        <ProfileAvatar initials={initials} />
        <ProfileStreakCard streak={streak} weekActivity={weekActivity} t={t} />
        <ProfileNameSection t={t} />
      </ScrollView>
    </>
  );
}
