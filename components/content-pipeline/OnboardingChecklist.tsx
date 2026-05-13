"use client";

import { useState } from "react";
import { cpOnboarding } from "@/data/contentPipeline";
import { CheckCircle, Circle } from "lucide-react";

const STORAGE_KEY = "agile-x-cp-onboarding";

const phases = ["Tag 1–2", "Woche 1", "Woche 2", "Danach"] as const;

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function OnboardingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const reset = () => {
    setChecked({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const total = cpOnboarding.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {done} von {total} erledigt
            </p>
            <p className="text-xs text-gray-500">Fortschritt wird im Browser gespeichert</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-blue-600">{pct}%</span>
            {done > 0 && (
              <button
                onClick={reset}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Zurücksetzen
              </button>
            )}
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="mt-3 text-sm font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
            Onboarding abgeschlossen — willkommen im Board!
          </p>
        )}
      </div>

      {/* Phases */}
      {phases.map((phase) => {
        const items = cpOnboarding.filter((i) => i.phase === phase);
        const phaseDone = items.filter((i) => checked[i.id]).length;

        return (
          <section key={phase} aria-labelledby={`phase-${phase}`}>
            <div className="flex items-center justify-between mb-3">
              <h2 id={`phase-${phase}`} className="text-sm font-semibold text-gray-900">
                {phase}
              </h2>
              <span className="text-xs text-gray-400">
                {phaseDone}/{items.length}
              </span>
            </div>
            <ul className="space-y-2" role="list">
              {items.map((item) => {
                const isChecked = !!checked[item.id];
                return (
                  <li key={item.id}>
                    <label className="flex items-start gap-3 cursor-pointer group rounded-lg border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(item.id)}
                        className="sr-only"
                        aria-label={item.aufgabe}
                      />
                      {isChecked ? (
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                      ) : (
                        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 group-hover:text-gray-400" aria-hidden="true" />
                      )}
                      <span className={`text-sm leading-relaxed ${isChecked ? "text-gray-400 line-through" : "text-gray-800"}`}>
                        {item.aufgabe}
                        {item.hinweis && (
                          <span className="ml-1 text-xs text-blue-500 no-underline not-italic">
                            → {item.hinweis}
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
