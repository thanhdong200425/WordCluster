import { NativeAdCard } from "@/components/ads/NativeAdCard";
import { HomeSetsTabBar } from "@/components/navigation/HomeSetsTabBar";
import useRevenueCatStorage from "@/stores/revenueCatStorage";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { logger } from "react-native-logs";
import { useShallow } from "zustand/react/shallow";

const log = logger.createLogger();

export default function TabLayout() {
  const customerInfo = useRevenueCatStorage(
    useShallow((state) => state.customerInfo),
  );

  log.info("Customer info", customerInfo);

  console.log("Customer info");
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
