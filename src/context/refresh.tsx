import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LeaderboardRefreshContext from "./leaderboardRefreshContext";

export function LeaderboardRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [version, setVersion] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const tabIdRef = useRef<string>(
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const CHANNEL = "hiveact:leaderboard";
  const STORAGE_KEY = "hiveact:leaderboard:updated";

  // Setup cross-tab listeners
  useEffect(() => {
    // BroadcastChannel
    try {
      channelRef.current =
        typeof BroadcastChannel !== "undefined"
          ? new BroadcastChannel(CHANNEL)
          : null;
    } catch {
      channelRef.current = null;
    }

    const onBCMessage = (e: MessageEvent) => {
      const data = e?.data as { type?: string; senderId?: string } | undefined;
      if (
        data?.type === "leaderboard:refresh" &&
        data.senderId !== tabIdRef.current
      ) {
        setVersion((v) => v + 1);
      }
    };
    channelRef.current?.addEventListener("message", onBCMessage);

    // localStorage fallback
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const payload = JSON.parse(e.newValue) as { senderId?: string };
        if (payload?.senderId && payload.senderId !== tabIdRef.current) {
          setVersion((v) => v + 1);
        }
      } catch {
        console.log("Failed to parse storage event payload");
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      try {
        channelRef.current?.removeEventListener(
          "message",
          onBCMessage as EventListener
        );
        channelRef.current?.close();
      } catch {
        console.log("Failed to close BroadcastChannel");
      }
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const refresh = useCallback(() => {
    // Local bump
    setVersion((v) => v + 1);
    // Cross-tab via BroadcastChannel
    try {
      channelRef.current?.postMessage({
        type: "leaderboard:refresh",
        at: Date.now(),
        senderId: tabIdRef.current,
      });
    } catch {
      console.log("Failed to post message to BroadcastChannel");
    }
    // Cross-tab via localStorage (fallback)
    try {
      const payload = JSON.stringify({
        at: Date.now(),
        senderId: tabIdRef.current,
      });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      console.log("Failed to write to localStorage");
    }
  }, []);
  const value = useMemo(() => ({ version, refresh }), [version, refresh]);
  return (
    <LeaderboardRefreshContext.Provider value={value}>
      {children}
    </LeaderboardRefreshContext.Provider>
  );
}
