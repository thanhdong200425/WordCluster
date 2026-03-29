import { NativeAdCard } from "@/components/ads/NativeAdCard";
import { HomeSetsTabBar } from "@/components/navigation/HomeSetsTabBar";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        tabBar={(props) => <HomeSetsTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="sets" />
      </Tabs>
      <NativeAdCard />
    </View>
  );
}
