import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useUserStorage from "@/stores/userStorage";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";

export function ProfileSection() {
  const { userName, setUserName } = useUserStorage();
  const [name, setName] = useState(userName);

  useEffect(() => {
    setName(userName);
  }, [userName]);

  const avatarUri = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "U")}&background=5b6cff&color=fff&size=160`;

  const handleSave = () => {
    if (!name.trim()) return;
    setUserName(name);
    Toast.show({ type: "success", text1: "Name updated" });
  };

  const hasChanges = name.trim() !== userName;

  return (
    <View className="items-center gap-4 px-5 py-6">
      <Image
        source={{ uri: avatarUri }}
        className="h-20 w-20 rounded-full"
      />
      <View className="w-full gap-2">
        <Text className="text-sm text-[#a0a4b8]">Display Name</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor="#666"
          className="rounded-lg bg-[#1c1e26] text-white"
        />
      </View>
      <Button
        className="w-full rounded-lg"
        onPress={handleSave}
        disabled={!hasChanges}
      >
        <Text>Save</Text>
      </Button>
    </View>
  );
}
