"use client";

import { useState } from "react";
import { cpLifecycle } from "@/data/contentPipeline";
import { ChevronRight, ChevronLeft, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

export function LifecycleExplorer() {
  const [active, setActive] = useState(0);
  const phase = cpLifecycle[active];

  return (
    <div className="space-y-6">
      {/* Phase-Stepper */}
      <div
        className="flex overflow-x-auto pb-2 gap-0"
        role="tablist"
        aria-label="Lifecycle-Phasen"
      >
        {cpLifecycle.map((p, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={p.nr}
              role="tab"
              aria-selected={isActive}
              aria-controls={`phase-panel-${i}`}
              id={`phase-tab-${i}`}
              onClick={() => setActive(i)}
              className={`group flex flex-col items-center shrink-0 w-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded`}
            >
              {/* Connector + circle */}
              <div className="flex items-center w-full">
                <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : isPast || isActive ? "bg-blue-500" : "bg-gray-200"}`} />
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-md"
                      : isPast
                      ? "border-blue-400 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-white text-gray-400 group-hover:border-gray-400"
                  }`}
                >
                  {p.nr}
                </div>
                <div className={`h-0.5 flex-1 ${i === cpLifecycle.length - 1 ? "opacity-0" : isPast ? "bg-blue-500" : "bg-gray-200"}`} />
              </div>
              <p
                className={`mt-1.5 text-center text-[10px] leading-tight font-medium ${
                  isActive ? "text-blue-700" : "text-gray-400"
                }`}
              >
                {p.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div
        id={`phase-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`phase-tab-${active}`}
        className="rounded-xl border border-gray-200 bg-white overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 bg-blue-50 px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                Phase {phase.nr} / {cpLifecycle.length}
              </span>
              {phase.section && (
                <span className="text-xs text-blue-500 bg-blue-100 rounded-full px-2 py-0.5">
                  → {phase.section}
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mt-0.5">{phase.label}</h2>
            <p className="text-sm text-gray-600 mt-0.5">{phase.kurzbe}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Vorherige Phase"
              className="rounded-lg p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActive(Math.min(cpLifecycle.length - 1, active + 1))}
              disabled={active === cpLifecycle.length - 1}
              aria-label="Nächste Phase"
              className="rounded-lg p-2 text-gray-400 hover:bg-blue-100 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 gap-0 divide-y divide-gray-100 md:grid-cols-2 md:divide-y-0 md:divide-x">
          {/* Left */}
          <div className="px-5 py-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Was passiert hier?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{phase.wasPassiert}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Typische Owner</h3>
              <div className="flex flex-wrap gap-1.5">
                {phase.owner.map((o) => (
                  <span key={o} className="text-xs bg-gray-100 text-gray-700 rounded-full px-2.5 py-1 font-medium">
                    {o}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Needs in dieser Phase</h3>
              <ul className="space-y-1">
                {phase.needs.map((n, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="px-5 py-4 space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">Pain Points</h3>
              <ul className="space-y-1.5">
                {phase.painPoints.map((pp, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 rounded-md px-2.5 py-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                    {pp}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Empfohlene Arbeitsweise</h3>
              <ul className="space-y-1">
                {phase.arbeitsweise.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {phase.automation && (
              <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-100 px-3 py-2.5">
                <Zap className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0" aria-hidden="true" />
                <p className="text-xs text-green-800">
                  <span className="font-semibold">Automation: </span>
                  {phase.automation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Definition of Done */}
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
            Definition of Done
          </h3>
          <ul className="flex flex-wrap gap-2">
            {phase.definitionOfDone.map((d, i) => (
              <li
                key={i}
                className="text-xs bg-white border border-gray-200 text-gray-700 rounded-full px-2.5 py-1"
              >
                ✓ {d}
              </li>
            ))}
          </ul>
          {phase.promptId && (
            <Link
              href={`/playbooks/content-pipeline/prompts#${phase.promptId}`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              Passenden Prompt öffnen
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
