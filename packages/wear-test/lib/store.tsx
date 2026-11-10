import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { emptyState, normalize, type CheckpointId, type CheckpointRecord, type Entry, type LogState } from "./model";

const KEY = "pulido-wear-log-v1";

type LogApi = {
  ready: boolean;
  state: LogState;
  setLabel: (label: string) => void;
  addEntry: (kind: Entry["kind"], note: string) => void;
  removeEntry: (id: string) => void;
  saveCheckpoint: (id: CheckpointId, draft: Omit<CheckpointRecord, "savedAt">) => void;
  reset: () => void;
};

const LogContext = createContext<LogApi | null>(null);

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function LogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LogState>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY).then((raw) => {
      if (!active) return;
      if (raw) {
        try {
          setState(normalize(JSON.parse(raw)));
        } catch {
          setState(emptyState());
        }
      }
      setReady(true);
    }).catch(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => undefined);
  }, [ready, state]);

  const api: LogApi = {
    ready,
    state,
    setLabel: (label) => setState((current) => ({ ...current, label: label.slice(0, 80) })),
    addEntry: (kind, note) => setState((current) => ({
      ...current,
      entries: [{ id: uid(), kind, at: new Date().toISOString(), note: note.trim().slice(0, 500) }, ...current.entries],
    })),
    removeEntry: (id) => setState((current) => ({ ...current, entries: current.entries.filter((entry) => entry.id !== id) })),
    saveCheckpoint: (id, draft) => setState((current) => ({
      ...current,
      checkpoints: { ...current.checkpoints, [id]: { ...draft, savedAt: new Date().toISOString() } },
    })),
    reset: () => setState(emptyState()),
  };

  return <LogContext.Provider value={api}>{children}</LogContext.Provider>;
}

export function useLog() {
  const value = useContext(LogContext);
  if (!value) throw new Error("useLog must be used within LogProvider");
  return value;
}
