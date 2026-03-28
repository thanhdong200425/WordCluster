import { AppTheme } from "@/constants/appTheme";
import useUserStorage from "@/stores/userStorage";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

interface ProfileNameSectionProps {
  t: AppTheme;
}

export function ProfileNameSection({ t }: ProfileNameSectionProps) {
  const { userName, setUserName } = useUserStorage();
  const [name, setName] = useState(userName);

  useEffect(() => {
    setName(userName);
  }, [userName]);

  const hasChanges = name.trim() !== userName;

  const handleSave = () => {
    if (!name.trim()) return;
    setUserName(name);
    Toast.show({ type: "success", text1: "Name updated" });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: t.textMuted }]}>Display Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={t.textFaint}
        style={[
          styles.input,
          {
            backgroundColor: t.surface,
            borderColor: t.border2,
            color: t.text,
          },
        ]}
        returnKeyType="done"
      />
      <PressableFeedback
        onPress={handleSave}
        isDisabled={!hasChanges}
        style={styles.saveBtn}
      >
        <Text
          style={[
            styles.saveText,
            { color: hasChanges ? t.accentStart : t.textFaint },
          ]}
        >
          Save
        </Text>
      </PressableFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    gap: 10,
  },
  label: {
    fontSize: 13,
    lineHeight: 19.5,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 0.5,
    paddingHorizontal: 16,
    fontSize: 15,
    letterSpacing: -0.2,
  },
  saveBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
  saveText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
