import useRevenueCatStorage from "@/stores/revenueCatStorage";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";

interface GateConfig {
  title: string;
  description: string;
}

interface ProGateReturn {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  sheetProps: GateConfig;
  /**
   * Returns true if the action is allowed (user is Pro or limit not reached).
   * When blocked, opens the upsell sheet automatically.
   */
  checkGate: (limitReached: boolean, config: GateConfig) => boolean;
}

export function useProGate(): ProGateReturn {
  const isPro = useRevenueCatStorage((s) => s.isPro);
  const sheetRef = useRef<BottomSheetModal | null>(null);
  const [sheetProps, setSheetProps] = useState<GateConfig>({
    title: "",
    description: "",
  });

  const checkGate = useCallback(
    (limitReached: boolean, config: GateConfig): boolean => {
      if (isPro || !limitReached) return true;
      if (!sheetRef.current) return false;
      setSheetProps(config);
      sheetRef.current?.present();
      return false;
    },
    [isPro],
  );

  return { sheetRef, sheetProps, checkGate };
}
