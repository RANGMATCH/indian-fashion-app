"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Shirt, User } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search },
  { href: "/outfit-builder", label: "Outfit", icon: Shirt },
  { href: "/profile", label: "Profile", icon: User },
];

/**
 * Mobile-only bottom navigation (320px–768px per prompt).
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-primary-navy/20 bg-neutral-cream/98 backdrop-blur md:hidden"
      aria-label="Bottom navigation"
    >
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 px-3 py-2 text-xs transition",
              active ? "text-primary-navy font-semibold" : "text-neutral-grey"
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
