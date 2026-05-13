"use client";

import { useState, useEffect } from "react";
import {
  allRules,
  mustHaveRules,
  shouldHaveRules,
  couldHaveRules,
  wontHaveRules,
  top7,
} from "@/data/salesToServiceAutomations";
import type { AutomationRule, AutomationPriority } from "@/data/salesToServiceAutomations";
import {
  ChevronDown,
  ShieldAlert,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  ListChecks,
  ChevronsUpDown,
} from "lucide-react";

// ── Priority config ───────────────────────────────────────────

const PRIORITY_CONFIG: Record<
  AutomationPriority,
  { label: string; badgeClass: string; borderClass: string; dotClass: string }
> = {
  must: {
    label: "Must Have",
    badgeClass: "bg-red-50 text-red-700 ring-red-700/10",
    borderClass: "border-l-red-400",
    dotClass: "bg-red-400",
  },
  should: {
    label: "Should Have",
    badgeClass: "bg-amber-50 text-amber-700 ring-amber-700/10",
    borderClass: "border-l-amber-400",
    dotClass: "bg-amber-400",
  },
  could: {
    label: "Could Have",
    badgeClass: "bg-gray-100 text-gray-600 ring-gray-500/10",
    borderClass: "border-l-gray-300",
    dotClass: "bg-gray-300",
  },
};

type FilterTab = "all" | AutomationPriority;

const FILTER_TABS: { value: FilterTab; label: string; count: number }[] = [
  { value: "all", label: "Alle", count: allRules.length },
  { value: "must", label: "Must Have", count: mustHaveRules.length },
  { value: "should", label: "Should Have", count: shouldHaveRules.length },
  { value: "could", label: "Could Have", count: couldHaveRules.length },
];

// Top-7 lookup by rule ID
const top7Map = Object.fromEntries(top7.map((t) => [t.ruleId, t]));

// ── Component ─────────────────────────────────────────────────

export function AutomationsV2() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [allOpen, setAllOpen] = useState(false);

  const visibleRules =
    activeFilter === "all"
      ? allRules
      : allRules.filter((r) => r.priority === activeFilter);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allOpen) {
      setOpenIds(new Set());
      setAllOpen(false);
    } else {
      setOpenIds(new Set(visibleRules.map((r) => r.id)));
      setAllOpen(true);
    }
  }

  // Close all when filter changes
  useEffect(() => {
    setOpenIds(new Set());
    setAllOpen(false);
  }, [activeFilter]);

  return (
    <div className="space-y-8">
      {/* ── Top-7 card ── */}
      {activeFilter === "all" && (
        <section
          aria-labelledby="top7-heading"
          className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden"
        >
          <div className="flex items-center gap-2 border-b border-amber-100 px-5 py-3.5">
            <Star className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
            <h2 id="top7-heading" className="text-sm font-semibold text-amber-900">
              Top 7 — sofort einrichten
            </h2>
            <span className="ml-auto text-[10px] text-amber-600">
              Workshop-Empfehlung: erst diese 7, dann 2 Wochen testen.
            </span>
          </div>
          <ol className="divide-y divide-amber-100">
            {top7.map(({ rank, ruleId, why }) => {
              const rule = allRules.find((r) => r.id === ruleId);
              if (!rule) return null;
              return (
                <li
                  key={ruleId}
                  className="flex items-start gap-3 px-5 py-3 hover:bg-amber-100/40 transition cursor-pointer"
                  onClick={() => {
                    setOpenIds((prev) => new Set([...prev, ruleId]));
                    setTimeout(() => {
                      document
                        .getElementById(ruleId)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[11px] font-bold text-white">
                    {rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {rule.title}
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">{why}</p>
                  </div>
                  <span className="shrink-0 self-center text-[10px] text-gray-400 hidden sm:block">
                    #{rule.number}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {/* ── Filter + controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTER_TABS.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                activeFilter === value
                  ? value === "must"
                    ? "bg-red-500 text-white shadow-sm"
                    : value === "should"
                    ? "bg-amber-500 text-white shadow-sm"
                    : value === "could"
                    ? "bg-gray-500 text-white shadow-sm"
                    : "bg-gray-800 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-800"
              }`}
            >
              {label}
              <span
                className={`ml-1.5 text-[10px] ${
                  activeFilter === value ? "opacity-70" : "text-gray-400"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden="true" />
          {allOpen ? "Alle schließen" : "Alle öffnen"}
        </button>
      </div>

      {/* ── Rule cards ── */}
      <div className="space-y-2">
        {visibleRules.map((rule) => {
          const isOpen = openIds.has(rule.id);
          const prio = PRIORITY_CONFIG[rule.priority];
          const topEntry = top7Map[rule.id];

          return (
            <article
              key={rule.id}
              id={rule.id}
              className={`rounded-xl border-l-4 border border-gray-200 overflow-hidden ${prio.borderClass}`}
            >
              {/* Header */}
              <button
                onClick={() => toggle(rule.id)}
                aria-expanded={isOpen}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* Rule number */}
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-500">
                  {rule.number}
                </span>

                {/* Title + meta */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {rule.title}
                    </p>
                    {topEntry && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        <Star className="h-2.5 w-2.5" aria-hidden="true" />
                        Top {topEntry.rank}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <span
                      className={`inline-flex items-center rounded-full ring-1 ring-inset px-2 py-0.5 text-[10px] font-medium ${prio.badgeClass}`}
                    >
                      {prio.label}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {rule.lifecycle}
                    </span>
                  </div>
                  {/* Pain point — quick signal, always visible */}
                  <div className="flex items-start gap-1">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${prio.dotClass}`} aria-hidden="true" />
                    <p className="text-[10px] text-gray-500 leading-snug">{rule.painPoint}</p>
                  </div>
                </div>

                <ChevronDown
                  className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div className="border-t border-gray-100 bg-white divide-y divide-gray-100">
                  {/* Trigger / Condition / Action */}
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
                    <div className="px-4 py-3">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Trigger
                      </p>
                      <p className="text-xs text-gray-700">{rule.trigger}</p>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100 sm:border-t-0">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Bedingung
                      </p>
                      <p className="text-xs text-gray-700">{rule.condition}</p>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100 sm:border-t-0">
                      <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        <Zap className="h-3 w-3 text-amber-400" aria-hidden="true" />
                        Aktion
                      </p>
                      <p className="text-xs text-gray-700">{rule.action}</p>
                      {/* Subtasks for rule 8 */}
                      {rule.subtasks && rule.subtasks.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {rule.subtasks.map((task, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-gray-600"
                            >
                              <ListChecks
                                className="mt-0.5 h-3 w-3 shrink-0 text-green-400"
                                aria-hidden="true"
                              />
                              {task}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Why + Guardrail */}
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:divide-x sm:divide-gray-100">
                    <div className="flex items-start gap-2 px-4 py-3">
                      <CheckCircle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-600">
                          Warum diese Priorität
                        </p>
                        <p className="text-xs text-gray-700">
                          {rule.whyThisPriority}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 border-t border-gray-100 bg-amber-50 px-4 py-3 sm:border-t-0">
                      <ShieldAlert
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                          Guardrail
                        </p>
                        <p className="text-xs text-amber-800">{rule.guardrail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Workshop note (where present) */}
                  {rule.workshopNote && (
                    <div className="flex items-start gap-2 bg-blue-50 px-4 py-2.5">
                      <AlertTriangle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-blue-800">
                        <span className="font-semibold">Workshop: </span>
                        {rule.workshopNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* ── Won't Have ── */}
      {(activeFilter === "all") && (
        <section aria-labelledby="wont-heading">
          <h2
            id="wont-heading"
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            <XCircle className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
            Won&apos;t Have — bewusst ausgeschlossen
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">
                    Automation
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-500">
                    Warum nicht
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {wontHaveRules.map((rule, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-500 line-through">
                      {rule.automation}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {rule.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
