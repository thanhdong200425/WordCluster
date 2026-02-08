import { Pressable, Text, View } from "react-native";
import { Input } from "../ui/input";

interface DescriptionSectionProps {
  compactMode: boolean;
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  onToggleCompactMode: () => void;
}

const DescriptionSection = ({
  compactMode,
  value,
  onChange,
  onBlur,
  onToggleCompactMode,
}: DescriptionSectionProps) => {
  return (
    <View className="px-5 pb-2">
      {compactMode ? (
        <Pressable onPress={onToggleCompactMode}>
          <Text className="text-sm font-bold text-[#4255ff]">
            + Description
          </Text>
        </Pressable>
      ) : (
        <>
          <View className="mb-1 border-b border-[#cbd5e1]">
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Add a description..."
              placeholderTextColor="#a0a4b8"
              className="border-0 bg-transparent pb-2 text-[20px] font-medium text-white shadow-none px-1"
              multiline
            />
          </View>
          <Text className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
            DESCRIPTION
          </Text>
        </>
      )}
    </View>
  );
};

export default DescriptionSection;
