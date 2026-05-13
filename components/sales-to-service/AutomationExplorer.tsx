"use client";

import { useState, useEffect } from "react";
import { automations, workflowPhases } from "@/data/sales-to-service";
import type { Stage } from "@/data/sales-to-service";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/data/types";
import { Zap, ShieldAlert, ChevronDown, User, Settings } from "lucide-react";

// ── Config ────────────────────────────────────────────────────

type View = "user" | "admin";

const stageConfig: Record<Stage, { label: string; variant: BadgeVariant; desc: string }> = {
  sofort: {
    label: "Sofort einrichten",
    variant: "green",
    desc: "Direkt aktivieren — stabiler Nutzen ohne Pilotierungsrisiko.",
  },
  nachPilot: {
    label: "Nach Pilot",
    variant: "amber",
    desc: "Erst nach 4–6 Wochen Erfahrung mit dem Board aktivieren.",
  },
};

const STAGE_ORDER: Stage[] = ["sofort", "nachPilot"];

const phaseLabels = Object.fromEntries(
  workflowPhases.map((p) => [p.id, p.title])
);

const phaseFields = Object.fromEntries(
  workflowPhases.map((p) => [p.id, p.fields])
);

// ── Component ─────────────────────────────────────────────────

export function AutomationExplorer() {
  const [view, setView] = useState<View>("user");
  const [openAdminIds, setOpenAdminIds] = useState<Set<string>>(new Set());

  function toggleAdmin(id: string) {
    setOpenAdminIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Pre-seed admin accordion + scroll when navigated via hash link (e.g. from Workflow or Search).
  // User view cards are always fully visible, so only admin view needs the open state.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    setOpenAdminIds((prev) => new Set([...prev, hash]));
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  const grouped = STAGE_ORDER.map((stage) => ({
    stage,
    items: automations.filter((a) => a.recommendedStage === stage),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      {/* View toggle */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1 max-w-xs">
        <button
          onClick={() => setView("user")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
            view === "user"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <User className="h-3.5 w-3.5" aria-hidden="true" />
          Nutzeransicht
        </button>
        <button
          onClick={() => setView("admin")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
            view === "admin"
              ? "bg-white text-gray-800 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Settings className="h-3.5 w-3.5" aria-hidden="true" />
          Adminansicht
        </button>
      </div>

      {/* Stage groups */}
      <div className="space-y-8">
        {grouped.map(({ stage, items }) => {
          const { label, variant, desc } = stageConfig[stage];
          return (
            <section key={stage}>
              <div className="mb-4 flex items-center gap-3">
                <Badge label={label} variant={variant} />
                <p className="text-xs text-gray-500">{desc}</p>
              </div>

              {view === "user" ? (
                /* ── Nutzeransicht ── */
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {items.map((auto) => (
                    <div
                      key={auto.id}
                      id={auto.id}
                      className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                    >
                      {/* Card header */}
                      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                        <Zap
                          className="h-3.5 w-3.5 shrink-0 text-amber-400"
                          aria-hidden="true"
                        />
                        <p className="text-sm font-semibold text-gray-900 leading-snug">
                          {auto.title}
                        </p>
                        <span className="ml-auto text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 hidden sm:block">
                          {phaseLabels[auto.phase] ?? auto.phase}
                        </span>
                      </div>

                      {/* Card body */}
                      <div className="divide-y divide-gray-100">
                        <div className="grid grid-cols-2 gap-0 divide-x divide-gray-100">
                          <div className="px-3 py-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                              Wann
                            </p>
                            <p className="text-xs text-gray-700">
                              {auto.trigger}
                            </p>
                          </div>
                          <div className="px-3 py-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                              Was passiert
                            </p>
                            <p className="text-xs text-gray-700">
                              {auto.action}
                            </p>
                          </div>
                        </div>

                        {auto.condition !== "immer" && (
                          <div className="px-3 py-2.5">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                              Damit aktiv — Nutzer müssen sicherstellen
                            </p>
                            <p className="text-xs text-gray-600">
                              {auto.condition}
                            </p>
                          </div>
                        )}

                        <div className="px-3 py-2 bg-green-50">
                          <p className="text-xs text-green-800">
                            <span className="font-semibold text-green-700">
                              Warum:{" "}
                            </span>
                            {auto.benefit}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* ── Adminansicht ── */
                <div className="space-y-2">
                  {items.map((auto) => {
                    const isOpen = openAdminIds.has(auto.id);
                    const fields = phaseFields[auto.phase] ?? [];

                    return (
                      <div
                        key={auto.id}
                        id={auto.id}
                        className={`rounded-xl border overflow-hidden ${
                          isOpen ? "border-amber-200" : "border-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => toggleAdmin(auto.id)}
                          aria-expanded={isOpen}
                          className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                            isOpen ? "bg-amber-50/50" : "bg-white hover:bg-gray-50"
                          }`}
                        >
                          <Zap
                            className="h-4 w-4 shrink-0 text-amber-400"
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {auto.title}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              <span className="font-medium text-gray-700">
                                Trigger:{" "}
                              </span>
                              {auto.trigger}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span className="hidden sm:block rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400">
                              {phaseLabels[auto.phase] ?? auto.phase}
                            </span>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t border-gray-100 bg-white">
                            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:divide-x sm:divide-gray-100">
                              {/* Left */}
                              <div className="space-y-3 px-4 py-4 sm:pr-4">
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Bedingung
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {auto.condition}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Aktion
                                  </p>
                                  <p className="text-xs text-gray-700">
                                    {auto.action}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Nutzen
                                  </p>
                                  <p className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">
                                    {auto.benefit}
                                  </p>
                                </div>
                              </div>

                              {/* Right */}
                              <div className="space-y-3 border-t border-gray-100 px-4 py-4 sm:border-t-0 sm:pl-4">
                                {fields.length > 0 && (
                                  <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">
                                      Benötigte Asana-Felder
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {fields.map((f) => (
                                        <code
                                          key={f}
                                          className="rounded bg-gray-100 border border-gray-200 px-1.5 py-0.5 text-[10px] font-mono text-gray-600"
                                        >
                                          {f}
                                        </code>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                                    Priorität
                                  </p>
                                  <Badge
                                    label={stageConfig[auto.recommendedStage].label}
                                    variant={stageConfig[auto.recommendedStage].variant}
                                    size="sm"
                                  />
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5">
                                  <ShieldAlert
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600"
                                    aria-hidden="true"
                                  />
                                  <div>
                                    <p className="text-[10px] font-semibold text-amber-700 mb-0.5">
                                      Guardrail
                                    </p>
                                    <p className="text-xs text-amber-800">
                                      {auto.guardrail}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
