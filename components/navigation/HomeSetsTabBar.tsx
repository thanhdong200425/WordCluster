import { useAppTheme } from "@/constants/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WalkthroughView = walkthroughable(View);

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
  const theme = useAppTheme();

  const activeColor = theme.accentStart;
  const inactiveColor = theme.textMuted;
  const BAR_HEIGHT = 56;

  return (
    <View
      className="flex-row items-center relative"
      style={{
        backgroundColor: theme.nav,
        borderTopWidth: 0.5,
        borderTopColor: theme.border,
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

        const tabButton = (
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

        if (route.name === "sets") {
          return (
            <CopilotStep
              key={route.key}
              text="Browse all your word sets from this tab"
              order={4}
              name="home-sets-tab"
            >
              <WalkthroughView style={{ flex: 1 }}>
                {tabButton}
              </WalkthroughView>
            </CopilotStep>
          );
        }

        return tabButton;
      })}

      {/* Center FAB — absolutely positioned, overlapping the bar */}
      <CopilotStep
        text="Tap here to create your first word set!"
        order={3}
        name="home-create-fab"
      >
        <WalkthroughView
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
              colors={[theme.accentStart, theme.accentEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: theme.accentStart,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.45,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="add" size={28} color="#fff" />
            </LinearGradient>
          </Pressable>
        </WalkthroughView>
      </CopilotStep>
    </View>
  );
}
