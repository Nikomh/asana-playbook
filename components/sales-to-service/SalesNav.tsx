"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const BASE = "/playbooks/sales-to-service";

const navItems = [
  { label: "Überblick",    href: BASE },
  { label: "Workflow",     href: `${BASE}/workflow` },
  { label: "Routinen",     href: `${BASE}/routines` },
  { label: "Prompts",      href: `${BASE}/prompts` },
  { label: "Übergaben",    href: `${BASE}/handoffs` },
  { label: "Automationen", href: `${BASE}/automations` },
  { label: "FAQ",          href: `${BASE}/faq` },
];

export function SalesNav() {
  const pathname = usePathname();
  const isSearchActive = pathname === `${BASE}/search`;

  return (
    <nav
      aria-label="Sales-to-Service Unterseiten"
      className="sticky top-0 z-30 -mx-4 lg:-mx-8 bg-white border-b border-gray-200 mb-8"
    >
      <div className="flex items-center px-4 lg:px-8">
        {/* Scrollable nav items */}
        <div className="flex overflow-x-auto flex-1">
          {navItems.map((item) => {
            const isActive =
              item.href === BASE
                ? pathname === BASE
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isActive
                    ? "border-amber-500 text-amber-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Persistent search icon — always visible */}
        <Link
          href={`${BASE}/search`}
          aria-label="Suche"
          aria-current={isSearchActive ? "page" : undefined}
          className={`ml-2 shrink-0 rounded-lg p-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
            isSearchActive
              ? "bg-amber-50 text-amber-600"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          }`}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
