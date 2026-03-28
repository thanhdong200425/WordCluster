import { Text, View } from "react-native";

interface SectionTitleProps {
  title: string;
  className?: string;
  variant?: "dark" | "light";
}

export function SectionTitle({
  title,
  className,
  variant = "light",
}: SectionTitleProps) {
  const textColor = variant === "light" ? "#64748b" : "#a0a4b8";

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
