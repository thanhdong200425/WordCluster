import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";
import { useCopilot } from "react-native-copilot";
import { SafeAreaView } from "react-native-safe-area-context";

export function WalkthroughTooltip() {
  const {
    isFirstStep,
    isLastStep,
    goToNext,
    goToPrev,
    stop,
    currentStep,
  } = useCopilot();

  return (
   <SafeAreaView style={{ flex: 1 }}>
     <View className="rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/20" style={{borderRadius: 16, marginBottom: 16}}>
      <Text className="mb-3.5 text-sm leading-5 text-card-foreground">
        {currentStep?.text}
      </Text>

      <View className="flex-row items-center justify-between">
        <Pressable onPress={() => void stop()} hitSlop={8}>
          <Text className="text-[13px] font-medium text-muted-foreground">
            Skip
          </Text>
        </Pressable>

        <View className="flex-row gap-2">
          {!isFirstStep && (
            <Pressable
              onPress={() => void goToPrev()}
              className="rounded-[10px] bg-secondary px-3.5 py-1.5"
              hitSlop={6}
            >
              <Text className="text-[13px] font-semibold text-secondary-foreground">
                Back
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() =>
              void (isLastStep ? stop() : goToNext())
            }
            hitSlop={6}
          >
            <LinearGradient
              colors={["#5B6BF8", "#4B5BF0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 10 }}
            >
              <View className="px-4 py-1.5">
                <Text className="text-[13px] font-semibold text-white">
                  {isLastStep ? "Done" : "Next"}
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
   </SafeAreaView>
  );
}
