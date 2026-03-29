import { useAppTheme } from "@/constants/appTheme";
import { Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  const theme = useAppTheme();
  const textColor = theme.textMuted;

  return (
    <View className={`px-4 pb-2 pt-4 ${className ?? ""}`}>
      <Text
        style={{ color: textColor, fontSize: 12, fontWeight: "600", letterSpacing: 1.2 }}
      >
        {title.toUpperCase()}
      </Text>
    </View>
  );
}
