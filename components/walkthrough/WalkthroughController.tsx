import useWalkthroughStorage, {
  WalkthroughKey,
} from "@/stores/walkthroughStorage";
import { useEffect, useRef } from "react";
import { useCopilot } from "react-native-copilot";

interface WalkthroughControllerProps {
  walkthroughKey: WalkthroughKey;
  delay?: number;
}

export function WalkthroughController({
  walkthroughKey,
  delay = 600,
}: WalkthroughControllerProps) {
  const { start, copilotEvents } = useCopilot();
  const startRef = useRef(start);
  startRef.current = start;
  const markSeen = useWalkthroughStorage((state) => state.markSeen);
  const hasSeen = useWalkthroughStorage((state) => {
    switch (walkthroughKey) {
      case "home":
        return state.hasSeenHome;
      case "setDetail":
        return state.hasSeenSetDetail;
      case "learn":
        return state.hasSeenLearn;
      case "flashcard":
        return state.hasSeenFlashcard;
    }
  });

  useEffect(() => {
    const listener = () => markSeen(walkthroughKey);
    copilotEvents.on("stop", listener);
    return () => {
      copilotEvents.off("stop", listener);
    };
  }, [copilotEvents, markSeen, walkthroughKey]);

  // Do not depend on `start`: its identity can change during the tour (e.g. when
  // copilot internal state updates). That would re-run this effect, schedule
  // start() again after `delay`, and reset the walkthrough to step 1.
  useEffect(() => {
    if (hasSeen) return;
    const timer = setTimeout(() => {
      void startRef.current();
    }, delay);
    return () => clearTimeout(timer);
  }, [hasSeen, delay]);

  return null;
}
