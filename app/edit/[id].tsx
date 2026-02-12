import { useLocalSearchParams } from "expo-router";
import CreateSetScreen from "../create-set";

export default function EditSetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CreateSetScreen isEditMode={true} setId={id} />;
}
