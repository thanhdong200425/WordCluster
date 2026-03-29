import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { differenceInHours } from "date-fns";
import { Pressable, View } from "react-native";

interface SetCardProps {
  title: string;
  wordCount: number;
  createdAt: string;
  onPress?: () => void;
}

export function SetCard({
  title,
  wordCount,
  createdAt,
  onPress,
}: SetCardProps) {
  const theme = useAppTheme();
  const isNew = differenceInHours(new Date(), new Date(createdAt)) < 24;

  return (
    <Pressable
      onPress={onPress}
      className="mx-5 mb-3 flex-row rounded-2xl border p-4"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      <View className="flex-1 justify-between">
        <View>
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold" style={{ color: theme.text }}>
              {title}
            </Text>
            {isNew && (
              <View
                className="rounded-full px-2.5 py-0.5"
                style={{ backgroundColor: theme.accentSurface }}
              >
                <Text
                  className="text-[10px] font-bold uppercase"
                  style={{ color: theme.accentStart }}
                >
                  NEW
                </Text>
              </View>
            )}
          </View>
          {wordCount ? (
            <Text className="mt-1 text-sm" style={{ color: theme.textFaint }}>
              {wordCount} words
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
