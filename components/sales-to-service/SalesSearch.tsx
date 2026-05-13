"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  salesSearchIndex,
  workflowPhases,
} from "@/data/sales-to-service";
import type { SearchItemType, SalesSearchItem } from "@/data/sales-to-service";
import { Search, X } from "lucide-react";

// ── Type display config ───────────────────────────────────────

const TYPE_CONFIG: Record<
  SearchItemType,
  { label: string; badgeClass: string }
> = {
  phase: {
    label: "Phase",
    badgeClass: "bg-amber-50 text-amber-700 ring-amber-700/10",
  },
  routine: {
    label: "Routine",
    badgeClass: "bg-green-50 text-green-700 ring-green-700/10",
  },
  prompt: {
    label: "Prompt",
    badgeClass: "bg-purple-50 text-purple-700 ring-purple-700/10",
  },
  gate: {
    label: "Übergabe",
    badgeClass: "bg-red-50 text-red-700 ring-red-700/10",
  },
  automation: {
    label: "Automation",
    badgeClass: "bg-blue-50 text-blue-700 ring-blue-700/10",
  },
  faq: {
    label: "FAQ",
    badgeClass: "bg-gray-50 text-gray-600 ring-gray-500/10",
  },
  quickAction: {
    label: "Quick Action",
    badgeClass: "bg-orange-50 text-orange-700 ring-orange-700/10",
  },
};

const TYPE_ORDER: SearchItemType[] = [
  "phase",
  "prompt",
  "routine",
  "gate",
  "automation",
  "quickAction",
  "faq",
];

// ── Filter types ──────────────────────────────────────────────

type AudienceFilter = "all" | "management" | "trainer";
type PriorityFilter = "all" | "must-have" | "should-have";

const phasesWithContent = workflowPhases.filter((p) =>
  salesSearchIndex.some(
    (item) => item.phase === p.id && item.type !== "phase"
  )
);

// ── Component ─────────────────────────────────────────────────

export function SalesSearch() {
  const [query, setQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>("all");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const filtersActive =
    audienceFilter !== "all" ||
    phaseFilter !== "all" ||
    priorityFilter !== "all";
  const hasInput = query.trim() !== "" || filtersActive;

  const results = useMemo<SalesSearchItem[] | null>(() => {
    if (!hasInput) return null;
    const q = query.trim().toLowerCase();

    return salesSearchIndex.filter((item) => {
      // Text match
      if (q && !item.searchText.includes(q)) return false;

      // Audience: only filter items that have an explicit audience
      if (audienceFilter !== "all" && item.audience !== null) {
        if (item.audience !== audienceFilter && item.audience !== "both")
          return false;
      }

      // Phase: only filter items that have an explicit phase
      if (phaseFilter !== "all" && item.phase !== null) {
        if (item.phase !== phaseFilter) return false;
      }

      // Priority: only meaningful for prompts
      if (priorityFilter !== "all" && item.type === "prompt") {
        if (item.priority !== priorityFilter) return false;
      }

      return true;
    });
  }, [query, audienceFilter, phaseFilter, priorityFilter, hasInput]);

  const grouped = useMemo(() => {
    if (!results) return null;
    return TYPE_ORDER.map((type) => ({
      type,
      items: results.filter((r) => r.type === type),
    })).filter((g) => g.items.length > 0);
  }, [results]);

  function clearAll() {
    setQuery("");
    setAudienceFilter("all");
    setPhaseFilter("all");
    setPriorityFilter("all");
  }

  return (
    <div className="space-y-5">
      {/* Search input */}
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Phasen, Prompts, Routinen, FAQs, Automationen durchsuchen …"
          autoFocus
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Suche leeren"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 space-y-3">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Audience */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-xs text-gray-500">Zielgruppe:</span>
            {(
              [
                { v: "all" as AudienceFilter, label: "Alle" },
                { v: "management" as AudienceFilter, label: "Geschäftsführung" },
                { v: "trainer" as AudienceFilter, label: "Trainer" },
              ] as const
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
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Priority */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-xs text-gray-500">Priorität:</span>
            {(
              [
                { v: "all" as PriorityFilter, label: "Alle" },
                { v: "must-have" as PriorityFilter, label: "Must-have" },
                { v: "should-have" as PriorityFilter, label: "Should-have" },
              ] as const
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
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Phase */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-gray-500">Phase:</span>
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Alle</option>
              {phasesWithContent.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.order}. {p.title}
                </option>
              ))}
            </select>
          </div>

          {filtersActive && (
            <button
              onClick={clearAll}
              className="ml-auto inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 transition"
            >
              <X className="h-3 w-3" aria-hidden="true" />
              Zurücksetzen
            </button>
          )}
        </div>

        {priorityFilter !== "all" && (
          <p className="text-[10px] text-gray-400">
            Priorität-Filter gilt nur für Prompts.
          </p>
        )}
      </div>

      {/* Results */}
      {hasInput && grouped !== null && (
        <div>
          {/* Count */}
          <p className="mb-4 text-xs text-gray-500">
            <span className="font-semibold text-gray-700">
              {results?.length ?? 0}
            </span>{" "}
            Treffer
            {query.trim() && (
              <>
                {" "}
                für „<em>{query.trim()}</em>"
              </>
            )}
            {results !== null && results.length > 0 && (
              <button
                onClick={clearAll}
                className="ml-3 text-amber-700 underline underline-offset-2 hover:text-amber-900"
              >
                Alle anzeigen
              </button>
            )}
          </p>

          {grouped.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-10 text-center">
              <p className="text-sm text-gray-500">
                Keine Treffer gefunden.
              </p>
              <button
                onClick={clearAll}
                className="mt-2 text-xs text-amber-700 underline underline-offset-2"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {grouped.map(({ type, items }) => (
                <section key={type} aria-labelledby={`search-group-${type}`}>
                  <h2
                    id={`search-group-${type}`}
                    className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400"
                  >
                    {TYPE_CONFIG[type].label}
                    <span className="font-normal">({items.length})</span>
                  </h2>
                  <div className="space-y-1.5">
                    {items.map((item) => (
                      <ResultRow
                        key={item.id}
                        item={item}
                        query={query.trim()}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Initial state */}
      {!hasInput && (
        <div className="rounded-xl border border-dashed border-gray-200 px-5 py-12 text-center">
          <Search
            className="mx-auto mb-3 h-8 w-8 text-gray-300"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-gray-500">
            {salesSearchIndex.length} Einträge durchsuchbar
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Phasen · Prompts · Routinen · Übergaben · Automationen · FAQs ·
            Quick Actions
          </p>
        </div>
      )}
    </div>
  );
}

// ── Result row ────────────────────────────────────────────────

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-amber-100 px-0.5 text-amber-900 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function ResultRow({
  item,
  query,
}: {
  item: SalesSearchItem;
  query: string;
}) {
  const { label, badgeClass } = TYPE_CONFIG[item.type];
  return (
    <Link
      href={item.url}
      className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-amber-200 hover:bg-amber-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-gray-900 transition group-hover:text-amber-700">
          {highlight(item.title, query)}
        </p>
        <p className="mt-0.5 truncate text-xs text-gray-500">
          {highlight(item.subtitle, query)}
        </p>
      </div>
      <span
        className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${badgeClass}`}
      >
        {label}
      </span>
    </Link>
  );
}
