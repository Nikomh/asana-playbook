"use client";

import { useState, useMemo, useEffect } from "react";
import { prompts, workflowPhases } from "@/data/sales-to-service";
import type { Audience, Priority } from "@/data/sales-to-service";
import { CopyButton } from "@/components/ui/CopyButton";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/data/types";
import { CheckCircle, ChevronDown, ShieldAlert, Star, X } from "lucide-react";

// ── Lookup tables ─────────────────────────────────────────────

const audienceConfig: Record<Audience, { label: string; variant: BadgeVariant }> = {
  management: { label: "Geschäftsführung", variant: "amber" },
  trainer: { label: "Trainer / Berater", variant: "purple" },
  both: { label: "Beide Rollen", variant: "gray" },
};

const priorityConfig: Record<Priority, { label: string; variant: BadgeVariant }> = {
  "must-have": { label: "Must-have", variant: "red" },
  "should-have": { label: "Should-have", variant: "amber" },
  "nice-to-have": { label: "Nice-to-have", variant: "gray" },
};

const PRIORITY_RANK: Record<Priority, number> = {
  "must-have": 0,
  "should-have": 1,
  "nice-to-have": 2,
};

const sensitivityText: Record<string, string | null> = {
  high: "Sensitivität hoch — keine Kundendaten oder Preisinfos ohne Anonymisierung eingeben.",
  medium: "Keine Echtdaten (Kundennamen, Preise) in externe KI-Tools.",
  low: null,
};

const phaseLabel = Object.fromEntries(workflowPhases.map((p) => [p.id, p.title]));
const phaseOrderNum = Object.fromEntries(workflowPhases.map((p) => [p.id, p.order]));

// ── Top-5 derivation ──────────────────────────────────────────

const phasesWithPrompts = workflowPhases.filter((phase) =>
  prompts.some((p) => p.phase === phase.id)
);

function top5For(role: "management" | "trainer") {
  return prompts
    .filter((p) => p.audience === role || p.audience === "both")
    .slice()
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    .slice(0, 5);
}

const TOP5_MANAGEMENT = top5For("management");
const TOP5_TRAINER = top5For("trainer");

// ── Filter types ──────────────────────────────────────────────

type AudienceFilter = "all" | "management" | "trainer";
type PriorityFilter = "all" | "must-have" | "should-have";

// ── Component ─────────────────────────────────────────────────

export function PromptLibrary() {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>("all");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggleCard(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function openAndScrollTo(id: string) {
    setOpenIds((prev) => new Set([...prev, id]));
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // Auto-open card when page is loaded with a URL hash (e.g. from Quick Actions or cross-page links)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    setOpenIds((prev) => new Set([...prev, hash]));
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  function clearFilters() {
    setAudienceFilter("all");
    setPhaseFilter("all");
    setPriorityFilter("all");
  }

  const filtersActive =
    audienceFilter !== "all" || phaseFilter !== "all" || priorityFilter !== "all";

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      if (audienceFilter === "management" && p.audience === "trainer") return false;
      if (audienceFilter === "trainer" && p.audience === "management") return false;
      if (phaseFilter !== "all" && p.phase !== phaseFilter) return false;
      if (priorityFilter !== "all" && p.priority !== priorityFilter) return false;
      return true;
    });
  }, [audienceFilter, phaseFilter, priorityFilter]);

  return (
    <div className="space-y-6">
      {/* ── Filter bar ── */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 space-y-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {/* Audience */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 shrink-0">Zielgruppe:</span>
            {(
              [
                { v: "all", label: "Alle" },
                { v: "management", label: "Geschäftsführung" },
                { v: "trainer", label: "Trainer / Berater" },
              ] as { v: AudienceFilter; label: string }[]
            ).map(({ v, label }) => (
              <button
                key={v}
                onClick={() => setAudienceFilter(v)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  audienceFilter === v
                    ? v === "management"
                      ? "bg-amber-500 text-white shadow-sm"
                      : v === "trainer"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-gray-800 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Priority */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 shrink-0">Priorität:</span>
            {(
              [
                { v: "all", label: "Alle" },
                { v: "must-have", label: "Must-have" },
                { v: "should-have", label: "Should-have" },
              ] as { v: PriorityFilter; label: string }[]
            ).map(({ v, label }) => (
              <button
                key={v}
                onClick={() => setPriorityFilter(v)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  priorityFilter === v
                    ? v === "must-have"
                      ? "bg-red-500 text-white shadow-sm"
                      : v === "should-have"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "bg-gray-800 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Phase */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 shrink-0">Phase:</span>
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Alle Phasen</option>
              {phasesWithPrompts.map((phase) => (
                <option key={phase.id} value={phase.id}>
                  {phase.order}. {phase.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter result + clear */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-gray-700">{filtered.length}</span> von{" "}
            {prompts.length} Prompts
          </p>
          {filtersActive && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 transition"
            >
              <X className="h-3 w-3" aria-hidden="true" />
              Filter zurücksetzen
            </button>
          )}
        </div>
      </div>

      {/* ── Top-5 Schnelleinstieg (nur ohne aktiven Filter) ── */}
      {!filtersActive && (
        <section aria-labelledby="top5-heading">
          <h2
            id="top5-heading"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3"
          >
            <Star className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            Schnelleinstieg — Top 5 je Rolle
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Management */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700 mb-3">
                Geschäftsführung
              </p>
              <ol className="space-y-2">
                {TOP5_MANAGEMENT.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] font-bold text-amber-700">
                      {i + 1}
                    </span>
                    <button
                      onClick={() => openAndScrollTo(p.id)}
                      className="flex-1 min-w-0 text-left text-xs font-medium text-gray-800 hover:text-amber-700 truncate transition"
                    >
                      {p.title}
                    </button>
                    <Badge
                      label={priorityConfig[p.priority].label}
                      variant={priorityConfig[p.priority].variant}
                      size="sm"
                    />
                  </li>
                ))}
              </ol>
            </div>

            {/* Trainer */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-purple-700 mb-3">
                Trainer / Berater
              </p>
              <ol className="space-y-2">
                {TOP5_TRAINER.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[9px] font-bold text-purple-700">
                      {i + 1}
                    </span>
                    <button
                      onClick={() => openAndScrollTo(p.id)}
                      className="flex-1 min-w-0 text-left text-xs font-medium text-gray-800 hover:text-purple-700 truncate transition"
                    >
                      {p.title}
                    </button>
                    <Badge
                      label={priorityConfig[p.priority].label}
                      variant={priorityConfig[p.priority].variant}
                      size="sm"
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ── Prompt-Liste ── */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-10 text-center">
          <p className="text-sm text-gray-500">
            Keine Prompts mit diesen Filtern.
          </p>
          <button
            onClick={clearFilters}
            className="mt-3 text-xs text-amber-700 underline underline-offset-2 hover:text-amber-900"
          >
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((prompt) => {
            const isOpen = openIds.has(prompt.id);
            const audience = audienceConfig[prompt.audience];
            const priority = priorityConfig[prompt.priority];
            const warning = sensitivityText[prompt.sensitivity];
            const order = phaseOrderNum[prompt.phase];

            return (
              <article
                key={prompt.id}
                id={prompt.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                {/* Card header — expand/collapse trigger */}
                <button
                  onClick={() => toggleCard(prompt.id)}
                  aria-expanded={isOpen}
                  className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    isOpen ? "bg-gray-50" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    {/* Title + badges */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-semibold text-gray-900 leading-snug">
                        {prompt.title}
                      </p>
                      <Badge
                        label={audience.label}
                        variant={audience.variant}
                        size="sm"
                      />
                      <Badge
                        label={priority.label}
                        variant={priority.variant}
                        size="sm"
                      />
                    </div>

                    {/* Phase + Wann nutzen */}
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      <span className="inline-flex items-center gap-1 text-[10px] text-gray-500">
                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-100 text-[8px] font-bold text-amber-700">
                          {order}
                        </span>
                        {phaseLabel[prompt.phase] ?? prompt.phase}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        <span className="font-medium text-gray-600">Wann: </span>
                        {prompt.useWhen}
                      </span>
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
                  <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {/* Input needed */}
                    <div className="bg-gray-50 px-4 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                        Benötigter Input
                      </p>
                      <p className="text-xs text-gray-700">{prompt.inputNeeded}</p>
                    </div>

                    {/* Prompt text */}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          Prompt-Vorlage
                        </p>
                        <CopyButton text={prompt.prompt} label="Prompt kopieren" />
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-700 bg-gray-50 border border-gray-100 rounded-lg p-3 overflow-x-auto">
                        {prompt.prompt}
                      </pre>
                    </div>

                    {/* Expected output */}
                    <div className="px-4 py-2.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-0.5">
                        Erwarteter Output
                      </p>
                      <p className="text-xs text-gray-700">{prompt.expectedOutput}</p>
                    </div>

                    {/* Quality check */}
                    {prompt.qualityCheck.length > 0 && (
                      <div className="px-4 py-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 flex items-center gap-1">
                          <CheckCircle
                            className="h-3 w-3 text-green-500"
                            aria-hidden="true"
                          />
                          Qualitätscheck vor Weitergabe
                        </p>
                        <ul className="space-y-1">
                          {prompt.qualityCheck.map((check, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-xs text-gray-600"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-300"
                                aria-hidden="true"
                              />
                              {check}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sensitivity / guardrail */}
                    {warning && (
                      <div className="flex items-start gap-2 bg-amber-50 px-4 py-2.5">
                        <ShieldAlert
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500"
                          aria-hidden="true"
                        />
                        <p className="text-xs text-amber-800">{warning}</p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
