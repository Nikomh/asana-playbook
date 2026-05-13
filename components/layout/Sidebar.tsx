"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Zap,
  ArrowRightLeft,
  BookMarked,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/navigation";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Zap,
  ArrowRightLeft,
  BookMarked,
};

const boardColorDot: Record<string, string> = {
  "content-pipeline": "bg-blue-400",
  "sales-to-service": "bg-amber-400",
  "client-delivery": "bg-green-400",
  "ausbildung-training": "bg-purple-400",
  "internal-operations": "bg-gray-400",
};

export function Sidebar() {
  const pathname = usePathname();
  const [playbooksOpen, setPlaybooksOpen] = useState(
    pathname.startsWith("/playbooks")
  );

  return (
    <nav
      className="flex h-full flex-col gap-1 px-3 py-4"
      aria-label="Hauptnavigation"
    >
      <div className="mb-4 px-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Agile X Playbooks
        </p>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon ? iconMap[item.icon] : null;
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        const hasChildren = item.children && item.children.length > 0;

        if (hasChildren) {
          return (
            <div key={item.href}>
              <button
                onClick={() => setPlaybooksOpen((v) => !v)}
                className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                aria-expanded={playbooksOpen}
                aria-controls="playbooks-submenu"
              >
                <span className="flex items-center gap-2.5">
                  {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  {item.label}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    playbooksOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              {playbooksOpen && (
                <ul id="playbooks-submenu" className="ml-6 mt-1 space-y-0.5">
                  {item.children!.map((child) => {
                    const slug = child.href.split("/").pop() ?? "";
                    const childActive = pathname === child.href;
                    return (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                            childActive
                              ? "bg-gray-100 font-medium text-gray-900"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                          }`}
                          aria-current={childActive ? "page" : undefined}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              boardColorDot[slug] ?? "bg-gray-300"
                            }`}
                            aria-hidden="true"
                          />
                          {child.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
