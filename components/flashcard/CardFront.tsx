import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import { View } from "react-native";

interface CardFrontProps {
  term: string;
  type?: string;
}

export function CardFront({ term, type }: CardFrontProps) {
  const theme = useAppTheme();

  return (
    <View className="flex-1 px-6 py-6">
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[11px] font-semibold uppercase"
          style={{ color: theme.textFaint, letterSpacing: 1.38 }}
        >
          Term
        </Text>
        {type ? (
          <View
            className="rounded-lg px-2.5 py-1"
            style={{ backgroundColor: `${theme.accentStart}1F` }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: theme.accentStart }}
            >
              {type}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="flex-1 items-center justify-center">
        <Text
          className="text-center text-2xl font-bold"
          style={{ color: theme.text }}
        >
          {term}
        </Text>
      </View>

      <Text
        className="text-center text-[13px]"
        style={{ color: theme.textFaint }}
      >
        Tap to reveal back
      </Text>
    </View>
  );
}
