"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";

export type CursorVariant = "default" | "action" | "hidden";

type CursorContextType = {
  variant: CursorVariant;
  actionText: string;
  setVariant: (variant: CursorVariant, text?: string) => void;
};

const CursorContext = createContext<CursorContextType | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>("default");
  const [actionText, setActionText] = useState<string>("VIEW");
  const pathname = usePathname();

  const setVariant = useCallback((newVariant: CursorVariant, text?: string) => {
    setVariantState(newVariant);
    if (text) {
      setActionText(text);
    }
  }, []);

  // Reset cursor state on route change
  useEffect(() => {
    setVariantState("default");
  }, [pathname]);

  return (
    <CursorContext.Provider value={{ variant, actionText, setVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return ctx;
}
