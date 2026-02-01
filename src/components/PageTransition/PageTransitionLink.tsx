"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransitionContext";
import type { ComponentProps } from "react";

type PageTransitionLinkProps = ComponentProps<typeof Link>;

export function PageTransitionLink({
  href,
  onClick,
  ...rest
}: PageTransitionLinkProps) {
  const pathname = usePathname();
  const startTransition = usePageTransition();

  const targetPath =
    typeof href === "string" && href.startsWith("/")
      ? href.split("#")[0] || "/"
      : typeof href === "object" && "pathname" in href
        ? href.pathname || "/"
        : "/";

  const hasHash =
    (typeof href === "string" && href.includes("#")) ||
    (typeof href === "object" && "hash" in href && href.hash);

  const shouldTransition =
    targetPath !== pathname || (hasHash && targetPath === pathname);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      startTransition &&
      shouldTransition &&
      !(e.ctrlKey || e.metaKey || e.shiftKey)
    ) {
      e.preventDefault();
      const url =
        typeof href === "string" && href.startsWith("#")
          ? pathname + href
          : typeof href === "string"
            ? href
            : (href.pathname ?? "/") + (href.hash ? "#" + href.hash : "");
      startTransition(url);
    }
    onClick?.(e);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
