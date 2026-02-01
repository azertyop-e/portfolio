"use client";

import {
  createContext,
  useCallback,
  useRef,
  useContext,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  PageTransitionOverlay,
  type PageTransitionOverlayHandle,
} from "@/components/PageTransitionOverlay";

type StartTransition = (url: string) => void;

const PageTransitionContext = createContext<StartTransition | null>(null);

export function usePageTransition(): StartTransition | null {
  return useContext(PageTransitionContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<PageTransitionOverlayHandle>(null);
  const pendingUrlRef = useRef<string | null>(null);

  const startTransition = useCallback((url: string) => {
    pendingUrlRef.current = url;
    overlayRef.current?.start();
  }, []);

  const handleRayCenter = useCallback(() => {
    const url = pendingUrlRef.current;
    if (url) {
      router.push(url);
    }
  }, [router]);

  const handleComplete = useCallback(() => {
    pendingUrlRef.current = null;
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const id = hash.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }, []);

  return (
    <PageTransitionContext.Provider value={startTransition}>
      {children}
      <PageTransitionOverlay
        ref={overlayRef}
        onRayCenter={handleRayCenter}
        onComplete={handleComplete}
      />
    </PageTransitionContext.Provider>
  );
}
