import { HapticTab } from "@/components/haptic-tab";
import "@/lib/nativewind-inteprop";
import { Image } from "expo-image";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5b6cff",
        tabBarInactiveTintColor: "#a0a4b8",
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#1c1e26",
          borderTopColor: "#2c2e3a",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/icons/home.svg")}
              style={{ width: size, height: size }}
              contentFit="contain"
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sets"
        options={{
          title: "Sets",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/icons/sets.svg")}
              style={{ width: size, height: size }}
              contentFit="contain"
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
