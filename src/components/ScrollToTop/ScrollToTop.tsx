"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) {
        const id = hash.slice(1);
        const el = id ? document.getElementById(id) : null;
        if (el) {
          requestAnimationFrame(() => {
            el.scrollIntoView({ behavior: "smooth" });
            if (typeof window !== "undefined" && window.history.replaceState) {
              window.history.replaceState(null, "", pathname + hash);
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }
          });
          return;
        }
      }
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
