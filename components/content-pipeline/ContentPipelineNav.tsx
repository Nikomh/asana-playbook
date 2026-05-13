"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Überblick", href: "/playbooks/content-pipeline" },
  { label: "Lifecycle", href: "/playbooks/content-pipeline/lifecycle" },
  { label: "Pain Points", href: "/playbooks/content-pipeline/pain-points" },
  { label: "Workflow", href: "/playbooks/content-pipeline/workflow" },
  { label: "Prompts", href: "/playbooks/content-pipeline/prompts" },
  { label: "Automations", href: "/playbooks/content-pipeline/automations" },
  { label: "Übergaben", href: "/playbooks/content-pipeline/handoffs" },
  { label: "Onboarding", href: "/playbooks/content-pipeline/onboarding" },
];

export function ContentPipelineNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Content-Pipeline Unterseiten"
      className="sticky top-0 z-30 -mx-4 lg:-mx-8 bg-white border-b border-gray-200 mb-8"
    >
      <div className="flex overflow-x-auto scrollbar-hide px-4 lg:px-8">
        {navItems.map((item) => {
          const isActive =
            item.href === "/playbooks/content-pipeline"
              ? pathname === "/playbooks/content-pipeline"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isActive
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
