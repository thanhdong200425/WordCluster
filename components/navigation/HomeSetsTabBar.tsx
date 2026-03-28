import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICONS: Record<string, ReturnType<typeof require>> = {
  index: require("@/icons/home.svg"),
  sets: require("@/icons/sets.svg"),
};

export function HomeSetsTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const activeColor = "#5b6bf8";
  const inactiveColor = "#64748b";
  const BAR_HEIGHT = 56;

  return (
    <View
      className="bg-[#fafafa] border-t border-[#dcdde6] flex-row items-center relative"
      style={{
        borderTopWidth: 0.5,
        paddingBottom: insets.bottom,
        height: BAR_HEIGHT + insets.bottom,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const color = isFocused ? activeColor : inactiveColor;
        const iconSource = TAB_ICONS[route.name];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        const isLeft = index === 0;

        return (
          <PlatformPressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={() => {
              if (process.env.EXPO_OS === "ios") {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            }}
            style={{
              flex: 1,
              alignItems: "center",
              paddingRight: isLeft ? 16 : 0,
              paddingLeft: isLeft ? 0 : 16,
              height: BAR_HEIGHT,
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center", gap: 3 }}>
              {iconSource ? (
                <Image
                  source={iconSource}
                  style={{ width: 28, height: 28 }}
                  contentFit="contain"
                  tintColor={color}
                />
              ) : null}
            </View>
          </PlatformPressable>
        );
      })}

      {/* Center FAB — absolutely positioned, overlapping the bar */}
      <View
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: [{ translateX: -30 }, { translateY: -22 }],
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => router.push("/create-set")}
          onPressIn={() => {
            if (process.env.EXPO_OS === "ios") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Create new set"
          style={{ width: 60, height: 60 }}
        >
          <LinearGradient
            colors={["#5b6bf8", "#4b5bf0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#5b6bf8",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.45,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
