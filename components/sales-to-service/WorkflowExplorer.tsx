"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  workflowPhases,
  getRelatedPromptsForPhase,
  getRelatedAutomationsForPhase,
} from "@/data/sales-to-service";
import {
  ChevronDown,
  AlertTriangle,
  Zap,
  Sparkles,
  Brain,
  CheckCircle,
} from "lucide-react";

const BASE = "/playbooks/sales-to-service";

type RoleFilter = "all" | "management" | "trainer";

const ROLE_FILTER_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "Alle Rollen" },
  { value: "management", label: "Geschäftsführung" },
  { value: "trainer", label: "Trainer / Berater" },
];

const ROLE_FILTER_ACTIVE: Record<RoleFilter, string> = {
  all: "bg-gray-800 text-white shadow-sm",
  management: "bg-amber-500 text-white shadow-sm",
  trainer: "bg-purple-600 text-white shadow-sm",
};

export function WorkflowExplorer() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [openPhases, setOpenPhases] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenPhases((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // Auto-open phase when navigated via hash link (e.g. #phase-won from Routinen or Search)
  useEffect(() => {
    const hash = window.location.hash; // e.g. "#phase-won"
    if (!hash.startsWith("#phase-")) return;
    const phaseId = hash.slice(7); // remove "#phase-"
    setOpenPhases((prev) => new Set([...prev, phaseId]));
    const t = setTimeout(() => {
      document.getElementById(`phase-${phaseId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* Role filter */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs text-gray-500 shrink-0">Rolle:</span>
        {ROLE_FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setRoleFilter(value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
              roleFilter === value
                ? ROLE_FILTER_ACTIVE[value]
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            {label}
          </button>
        ))}
        {roleFilter !== "all" && (
          <span className="text-[10px] text-gray-400 ml-1">
            Relevante Abschnitte hervorgehoben
          </span>
        )}
      </div>

      {/* Phase list */}
      <div className="space-y-2">
        {workflowPhases.map((phase) => {
          const isOpen = openPhases.has(phase.id);
          const isCritical = phase.id === "won";
          const relatedAutomations = getRelatedAutomationsForPhase(phase.id);
          const relatedPrompts = getRelatedPromptsForPhase(phase.id);

          return (
            <div
              key={phase.id}
              id={`phase-${phase.id}`}
              className={`rounded-xl border overflow-hidden ${
                isCritical
                  ? "border-amber-400 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              {/* Phase header — always visible */}
              <button
                onClick={() => toggle(phase.id)}
                aria-expanded={isOpen}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isCritical
                    ? "bg-amber-50 hover:bg-amber-100/60"
                    : isOpen
                    ? "bg-gray-50"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* Order badge */}
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    isCritical
                      ? "bg-amber-500 text-white"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {phase.order}
                </span>

                {/* Title + meta row */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {phase.title}
                    </p>
                    {isCritical && (
                      <span className="inline-flex items-center rounded-full bg-amber-500 text-white px-2 py-0.5 text-[10px] font-bold tracking-wide">
                        Kritische Phase
                      </span>
                    )}
                    {relatedPrompts.length > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 rounded-full bg-amber-50 ring-1 ring-inset ring-amber-700/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                        <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                        {relatedPrompts.length} Prompt
                        {relatedPrompts.length > 1 ? "s" : ""}
                      </span>
                    )}
                    {relatedAutomations.length > 0 && (
                      <span className="hidden sm:inline-flex items-center gap-0.5 rounded-full bg-green-50 ring-1 ring-inset ring-green-700/10 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                        <Zap className="h-2.5 w-2.5" aria-hidden="true" />
                        {relatedAutomations.length} Rule
                        {relatedAutomations.length > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Purpose */}
                  <p className="text-xs text-gray-500 leading-snug">
                    {phase.purpose}
                  </p>

                  {/* Entry + exit criteria */}
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 pt-0.5">
                    <p className="text-[10px] text-gray-500">
                      <span className="font-semibold text-gray-600">
                        Einstieg:{" "}
                      </span>
                      {phase.entryCriteria}
                    </p>
                    <p className="text-[10px] text-green-700">
                      <span className="font-semibold">Done: </span>
                      {phase.exitCriteria}
                    </p>
                  </div>
                </div>

                {/* Chevron */}
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
                  {/* Section 1: Mindest-Infos + Was passiert konkret */}
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:divide-x sm:divide-gray-100 px-4 py-4">
                    <div className="pb-4 sm:pb-0 sm:pr-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Mindest-Informationen
                      </p>
                      <ul className="space-y-1">
                        {phase.minimumInfo.map((info, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-gray-700"
                          >
                            <CheckCircle
                              className="mt-0.5 h-3 w-3 shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            {info}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 sm:pt-0 sm:pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Was passiert konkret
                      </p>
                      <ol className="space-y-1">
                        {phase.checklist.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-700"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                              {i + 1}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Section 2: Rollenhinweise */}
                  <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:divide-x sm:divide-gray-100 px-4 py-4">
                    {/* Management */}
                    <div
                      className={`pb-3 sm:pb-0 sm:pr-4 rounded-lg p-2.5 transition-all ${
                        roleFilter === "management"
                          ? "bg-amber-50 ring-1 ring-amber-200"
                          : roleFilter === "trainer"
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${
                          roleFilter === "management"
                            ? "text-amber-700"
                            : "text-gray-400"
                        }`}
                      >
                        Geschäftsführung
                      </p>
                      <p className="text-xs text-gray-700">
                        {phase.roleHints.management}
                      </p>
                    </div>

                    {/* Trainer */}
                    <div
                      className={`pt-3 sm:pt-0 sm:pl-4 rounded-lg p-2.5 transition-all ${
                        roleFilter === "trainer"
                          ? "bg-purple-50 ring-1 ring-purple-200"
                          : roleFilter === "management"
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-wide mb-1.5 ${
                          roleFilter === "trainer"
                            ? "text-purple-700"
                            : "text-gray-400"
                        }`}
                      >
                        Trainer / Berater
                      </p>
                      <p className="text-xs text-gray-700">
                        {phase.roleHints.trainer}
                      </p>
                    </div>
                  </div>

                  {/* Section 3: KI-Unterstützung */}
                  {phase.aiHelp.length > 0 && (
                    <div className="px-4 py-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1">
                        <Brain className="h-3 w-3" aria-hidden="true" />
                        KI-Unterstützung
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.aiHelp.map((help, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-blue-50 border border-blue-100 px-2 py-0.5 text-[10px] text-blue-700"
                          >
                            {help}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section 4: Automationen + Prompts */}
                  {(relatedAutomations.length > 0 ||
                    relatedPrompts.length > 0) && (
                    <div className="flex flex-wrap gap-2 px-4 py-3">
                      {relatedPrompts.map((p) => (
                        <Link
                          key={p.id}
                          href={`${BASE}/prompts#${p.id}`}
                          className="inline-flex items-center gap-1 rounded-full bg-white border border-amber-200 px-2.5 py-1 text-[10px] font-medium text-amber-700 hover:bg-amber-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        >
                          <Sparkles
                            className="h-2.5 w-2.5"
                            aria-hidden="true"
                          />
                          {p.title}
                        </Link>
                      ))}
                      {relatedAutomations.map((a) => (
                        <Link
                          key={a.id}
                          href={`${BASE}/automations#${a.id}`}
                          className="inline-flex items-center gap-1 rounded-full bg-white border border-green-200 px-2.5 py-1 text-[10px] font-medium text-green-700 hover:bg-green-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          <Zap className="h-2.5 w-2.5" aria-hidden="true" />
                          {a.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Section 5: Typische Fehler */}
                  {phase.commonMistakes.length > 0 && (
                    <div className="flex items-start gap-2 bg-red-50 border-t border-red-100 px-4 py-3">
                      <AlertTriangle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-red-700">
                        <span className="font-semibold">
                          Typische Fehler:{" "}
                        </span>
                        {phase.commonMistakes.join(" · ")}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
