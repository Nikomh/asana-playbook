"use client";

import { useState, useEffect } from "react";
import { salesToServiceV2 } from "@/data/salesToServiceV2";
import {
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Link2,
  Database,
  ListChecks,
  ChevronsUpDown,
} from "lucide-react";

const steps = salesToServiceV2.workflow;
const CRITICAL_STEP = 9;

export function WorkflowStepsV2() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [allOpen, setAllOpen] = useState(false);

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
      setOpenIds(new Set(steps.map((s) => s.id)));
      setAllOpen(true);
    }
  }

  // Auto-open step from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    setOpenIds((prev) => new Set([...prev, hash]));
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* Controls */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{steps.length}</span>{" "}
          Schritte — klicke eine Karte, um Details zu sehen.
        </p>
        <button
          onClick={toggleAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          <ChevronsUpDown className="h-3.5 w-3.5" aria-hidden="true" />
          {allOpen ? "Alle schließen" : "Alle öffnen"}
        </button>
      </div>

      {/* Step cards */}
      <div className="space-y-2">
        {steps.map((step) => {
          const isOpen = openIds.has(step.id);
          const isCritical = step.step === CRITICAL_STEP;

          return (
            <article
              key={step.id}
              id={step.id}
              className={`rounded-xl border overflow-hidden transition-shadow ${
                isCritical
                  ? "border-amber-400 shadow-sm shadow-amber-100/50"
                  : "border-gray-200"
              }`}
            >
              {/* Card header — always visible, click to expand */}
              <button
                onClick={() => toggle(step.id)}
                aria-expanded={isOpen}
                className={`w-full flex items-start gap-3 px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                  isCritical
                    ? isOpen
                      ? "bg-amber-50"
                      : "bg-amber-50/60 hover:bg-amber-50"
                    : isOpen
                    ? "bg-gray-50"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {/* Step number */}
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCritical
                      ? "bg-amber-500 text-white"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {step.step}
                </span>

                {/* Main content */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">
                      {step.title}
                    </p>
                    {isCritical && (
                      <span className="inline-flex items-center rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white tracking-wide">
                        Kritischer Schritt
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 leading-snug">
                    {step.shortDescription}
                  </p>

                  {/* Main pain point — always visible as quick signal */}
                  <div className="flex items-start gap-1.5">
                    <AlertTriangle
                      className="mt-0.5 h-3 w-3 shrink-0 text-amber-500"
                      aria-hidden="true"
                    />
                    <p className="text-[10px] text-amber-800 leading-snug">
                      {step.mainPainPoint}
                    </p>
                  </div>
                </div>

                {/* Roles + chevron */}
                <div className="flex shrink-0 items-center gap-2">
                  <div className="hidden sm:flex gap-1">
                    {step.roles.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500"
                      >
                        {role === "Geschäftsführung" ? "GF" : "T"}
                      </span>
                    ))}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div className="border-t border-gray-100 bg-white">
                  {/* Section grid: Pain + Steps | Asana + Links | AI + Done */}
                  <div className="divide-y divide-gray-100">

                    {/* Row 1: Pain Points + Workflow Steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-gray-100">
                      <div className="px-4 py-4 space-y-2">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          <AlertTriangle className="h-3 w-3 text-red-400" aria-hidden="true" />
                          Pain Points
                        </p>
                        <ul className="space-y-1.5">
                          {step.painPoints.map((pain, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" aria-hidden="true" />
                              {pain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-4 py-4 space-y-2">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          <ListChecks className="h-3 w-3" aria-hidden="true" />
                          Workflow
                        </p>
                        <ol className="space-y-1.5">
                          {step.workflowSteps.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[9px] font-bold text-amber-700">
                                {i + 1}
                              </span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Row 2: Asana Fields + Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-gray-100">
                      <div className="px-4 py-3 space-y-2">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          <Database className="h-3 w-3" aria-hidden="true" />
                          Was in Asana pflegen
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.asanaFields.map((field, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="px-4 py-3 space-y-2">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          <Link2 className="h-3 w-3" aria-hidden="true" />
                          Links &amp; Dokumente
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.linksAndAssets.map((link, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-2 py-0.5 text-[10px] text-green-700"
                            >
                              {link}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: AI Support + Done When */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-gray-100">
                      <div className="px-4 py-3 space-y-2">
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          <Sparkles className="h-3 w-3 text-amber-400" aria-hidden="true" />
                          KI-Unterstützung
                        </p>
                        <ul className="space-y-1">
                          {step.aiSupport.map((tip, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="px-4 py-3">
                        <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
                          <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-green-600">
                            <CheckCircle className="h-3 w-3" aria-hidden="true" />
                            Schritt erledigt wenn
                          </p>
                          <p className="text-xs text-green-800">{step.doneWhen}</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Typical Mistakes — full width */}
                    <div className="flex items-start gap-2 bg-red-50 px-4 py-3">
                      <AlertTriangle
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red-500">
                          Typische Fehler
                        </p>
                        <p className="text-xs text-red-700">
                          {step.commonMistakes.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
