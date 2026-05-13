"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE = "/playbooks/sales-prozess";

const tabs = [
  { label: "Übersicht", href: BASE },
  { label: "Workflow", href: `${BASE}/workflow` },
];

export function SalesProzessNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Sales-Prozess Bereiche"
      className="sticky top-0 z-30 -mx-4 lg:-mx-8 bg-white border-b border-gray-200 mb-8"
    >
      <div className="flex px-4 lg:px-8">
        {tabs.map((tab) => {
          const isActive =
            tab.href === BASE
              ? pathname === BASE
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                isActive
                  ? "border-amber-500 text-amber-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
