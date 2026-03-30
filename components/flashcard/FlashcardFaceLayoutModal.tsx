import { Text } from "@/components/ui/text";
import { useAppTheme } from "@/constants/appTheme";
import useFlashcardLayoutStore, {
  FieldId,
} from "@/stores/flashcardLayoutStore";
import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { FaceLayoutSection } from "./FaceLayoutSection";

interface FlashcardFaceLayoutModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FlashcardFaceLayoutModal({
  visible,
  onClose,
}: FlashcardFaceLayoutModalProps) {
  const theme = useAppTheme();
  const { frontFields, backFields, toggleField, swapFaces } =
    useFlashcardLayoutStore();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      >
        <Pressable
          style={[styles.card, { backgroundColor: theme.surface }]}
          onPress={(e) => e.stopPropagation()}
        >
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <FaceLayoutSection
              face="front"
              enabledFields={frontFields}
              onToggle={(field: FieldId) => toggleField("front", field)}
            />

            {/* Divider + swap */}
            <View style={styles.dividerRow}>
              <View
                style={[styles.dividerLine, { backgroundColor: theme.border }]}
              />
              <Pressable
                onPress={swapFaces}
                style={({ pressed }) => [
                  styles.swapButton,
                  { backgroundColor: theme.surface2, opacity: pressed ? 0.7 : 1 },
                ]}
                accessibilityLabel="Swap front and back face fields"
              >
                <Ionicons
                  name="swap-vertical"
                  size={14}
                  color={theme.textMuted}
                />
              </Pressable>
              <View
                style={[styles.dividerLine, { backgroundColor: theme.border }]}
              />
            </View>

            <FaceLayoutSection
              face="back"
              enabledFields={backFields}
              onToggle={(field: FieldId) => toggleField("back", field)}
            />

            <Text style={[styles.footer, { color: theme.textFaint }]}>
              First checked field is shown largest
            </Text>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  card: {
    width: "100%",
    borderRadius: 20,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 12,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  swapButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    marginTop: 12,
  },
});
