import { Button } from "heroui-native/button";
import { Dialog } from "heroui-native/dialog";
import { View } from "react-native";

interface BaseAlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onContinue: () => void;
}

const BaseAlertDialog = ({
  isOpen,
  title,
  description,
  onCancel,
  onContinue,
}: BaseAlertDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <View className="mb-5 gap-1.5">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </View>
          <View className="flex-row justify-end gap-3">
            <Button variant="ghost" size="sm" onPress={onCancel}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onPress={onContinue}>
              Continue
            </Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default BaseAlertDialog;
