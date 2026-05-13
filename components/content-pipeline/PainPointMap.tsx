"use client";

import { useState } from "react";
import { cpPainPoints, type CPPainCategory } from "@/data/contentPipeline";
import { AlertTriangle, ArrowRight, Zap } from "lucide-react";

const categories: { label: string; value: CPPainCategory | "alle" }[] = [
  { label: "Alle", value: "alle" },
  { label: "Strategie", value: "Strategie" },
  { label: "Qualität", value: "Qualität" },
  { label: "Prozess", value: "Prozess" },
  { label: "Assets", value: "Assets" },
  { label: "Daten", value: "Daten" },
  { label: "Übergaben", value: "Übergaben" },
];

const categoryColor: Record<CPPainCategory, string> = {
  Strategie: "bg-purple-50 text-purple-700 border-purple-200",
  Qualität: "bg-blue-50 text-blue-700 border-blue-200",
  Prozess: "bg-amber-50 text-amber-700 border-amber-200",
  Assets: "bg-orange-50 text-orange-700 border-orange-200",
  Daten: "bg-green-50 text-green-700 border-green-200",
  Übergaben: "bg-gray-50 text-gray-700 border-gray-200",
};

export function PainPointMap() {
  const [filter, setFilter] = useState<CPPainCategory | "alle">("alle");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "alle" ? cpPainPoints : cpPainPoints.filter((p) => p.kategorie === filter);

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div role="group" aria-label="Filter nach Kategorie" className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setFilter(cat.value);
              setExpanded(null);
            }}
            aria-pressed={filter === cat.value}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              filter === cat.value
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {cat.label}
            <span className="ml-1.5 text-[10px] opacity-60">
              {cat.value === "alle"
                ? cpPainPoints.length
                : cpPainPoints.filter((p) => p.kategorie === cat.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-2">
        {filtered.map((item) => {
          const isExpanded = expanded === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              {/* Summary row */}
              <button
                className="w-full flex items-start justify-between gap-4 px-4 py-4 text-left hover:bg-gray-50 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => setExpanded(isExpanded ? null : item.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-semibold rounded border px-1.5 py-0.5 ${categoryColor[item.kategorie]}`}>
                        {item.kategorie}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.phase}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{item.painPoint}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.wasPassiert}</p>
                  </div>
                </div>
                <ArrowRight
                  className={`mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3 bg-gray-50">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Was passiert ohne Lösung</p>
                    <p className="text-sm text-gray-700">{item.wasPassiert}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Need</p>
                    <p className="text-sm text-gray-700">{item.need}</p>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-white px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-green-600 mb-1">Neue Arbeitsregel</p>
                    <p className="text-sm text-gray-700 font-medium">{item.regel}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Asana-Hebel</p>
                      <p className="text-xs text-gray-600">{item.asanaHebel}</p>
                    </div>
                    {item.kiHebel && (
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">KI-Hebel</p>
                        <p className="text-xs text-gray-600">{item.kiHebel}</p>
                      </div>
                    )}
                  </div>
                  {item.automation && (
                    <div className="flex items-start gap-2 rounded-md bg-green-50 border border-green-100 px-3 py-2">
                      <Zap className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-green-800">
                        <span className="font-semibold">Automation: </span>
                        {item.automation}
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
