"use client";

import { useState } from "react";
import Link from "next/link";
import {
  routines,
  workflowPhases,
  getPromptById,
} from "@/data/sales-to-service";
import type { Cadence } from "@/data/sales-to-service";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/data/types";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

const BASE = "/playbooks/sales-to-service";

type Tab = "management" | "trainer" | "both";

const TABS: { value: Tab; label: string }[] = [
  { value: "management", label: "Geschäftsführung" },
  { value: "trainer", label: "Trainer / Berater" },
  { value: "both", label: "Teamroutinen" },
];

const cadenceConfig: Record<Cadence, { label: string; variant: BadgeVariant }> = {
  daily: { label: "Täglich", variant: "red" },
  weekly: { label: "Wöchentlich", variant: "green" },
  biweekly: { label: "Zweiwöchentlich", variant: "blue" },
  monthly: { label: "Monatlich", variant: "purple" },
  adHoc: { label: "Ad hoc", variant: "gray" },
};

const CADENCE_ORDER: Cadence[] = [
  "daily",
  "weekly",
  "biweekly",
  "monthly",
  "adHoc",
];

const phaseLabels = Object.fromEntries(
  workflowPhases.map((p) => [p.id, p.title])
);

const TAB_ACTIVE: Record<Tab, string> = {
  management: "bg-white text-amber-700 shadow-sm",
  trainer: "bg-white text-purple-700 shadow-sm",
  both: "bg-white text-gray-700 shadow-sm",
};

export function RoutineBoard() {
  const [activeTab, setActiveTab] = useState<Tab>("management");

  const tabRoutines = routines.filter((r) => r.audience === activeTab);

  const grouped = CADENCE_ORDER.map((cadence) => ({
    cadence,
    items: tabRoutines.filter((r) => r.cadence === cadence),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveTab(value)}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
              activeTab === value
                ? TAB_ACTIVE[value]
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Cadence groups */}
      <div className="space-y-6">
        {grouped.map(({ cadence, items }) => {
          const { label, variant } = cadenceConfig[cadence];
          return (
            <section key={cadence}>
              <div className="mb-3 flex items-center gap-2">
                <Badge label={label} variant={variant} size="sm" />
                <span className="text-xs text-gray-400">
                  {items.length} Routine{items.length > 1 ? "n" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((routine) => {
                  const relatedPromptItems = routine.relatedPrompts
                    .map((id) => getPromptById(id))
                    .filter((p): p is NonNullable<typeof p> => p !== undefined);

                  return (
                    <article
                      key={routine.id}
                      id={routine.id}
                      className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">
                            {routine.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {routine.purpose}
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-500">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {routine.durationMinutes} Min.
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex-1 space-y-3 px-4 py-3">
                        {/* Concrete steps */}
                        <div>
                          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            Konkrete Schritte
                          </p>
                          <ol className="space-y-1">
                            {routine.steps.map((step, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-gray-700"
                              >
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Output in Asana */}
                        <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2">
                          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-600">
                            Output in Asana
                          </p>
                          <p className="text-xs text-green-800">{routine.output}</p>
                        </div>

                        {/* Related phases */}
                        {routine.relatedPhases.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {routine.relatedPhases.map((phaseId) => (
                              <Link
                                key={phaseId}
                                href={`${BASE}/workflow#phase-${phaseId}`}
                                className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] text-gray-600 transition hover:border-amber-300 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                              >
                                <ArrowRight
                                  className="h-2.5 w-2.5"
                                  aria-hidden="true"
                                />
                                {phaseLabels[phaseId] ?? phaseId}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* KI footer */}
                      {relatedPromptItems.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 border-t border-gray-100 bg-amber-50/40 px-4 py-2">
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                            KI-Unterstützung:
                          </span>
                          {relatedPromptItems.map((p) => (
                            <Link
                              key={p.id}
                              href={`${BASE}/prompts#${p.id}`}
                              className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white px-2 py-0.5 text-[10px] font-medium text-amber-700 transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            >
                              {p.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
