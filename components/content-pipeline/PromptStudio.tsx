"use client";

import { useState } from "react";
import { cpPrompts, type CPPrompt } from "@/data/contentPipeline";
import { CopyButton } from "@/components/ui/CopyButton";
import { Callout } from "@/components/ui/Callout";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export function PromptStudio() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPrompt = cpPrompts.find((p) => p.id === selected);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Situation List */}
      <div className="lg:col-span-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Wähle deine Situation</p>
        <ul className="space-y-1.5" role="listbox" aria-label="Prompt-Situationen">
          {cpPrompts.map((p) => (
            <li key={p.id}>
              <button
                role="option"
                aria-selected={selected === p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                className={`w-full flex items-center justify-between rounded-lg border px-3 py-3 text-left text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  selected === p.id
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                <span className="font-medium leading-snug">{p.situation}</span>
                {selected === p.id ? (
                  <ChevronUp className="h-3.5 w-3.5 shrink-0 text-blue-400" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-300" aria-hidden="true" />
                )}
              </button>

              {/* Mobile: Inline expansion */}
              {selected === p.id && (
                <div className="lg:hidden mt-2">
                  <PromptDetail prompt={p} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Prompt Detail */}
      <div className="hidden lg:block lg:col-span-2">
        {selectedPrompt ? (
          <PromptDetail prompt={selectedPrompt} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12">
            <p className="text-sm text-gray-400 text-center">
              Situation links auswählen um den Prompt zu sehen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PromptDetail({ prompt }: { prompt: CPPrompt }) {
  return (
    <div id={prompt.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b border-gray-100 px-5 py-4">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Prompt</p>
        <h3 className="text-base font-semibold text-gray-900">{prompt.situation}</h3>
        <p className="mt-1 text-sm text-gray-500">{prompt.wann}</p>
      </div>

      {/* Prompt text */}
      <div className="px-5 py-4 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Prompt</p>
          <CopyButton text={prompt.promptText} />
        </div>
        <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono leading-relaxed bg-white border border-gray-200 rounded-lg p-3">
          {prompt.promptText}
        </pre>
        {prompt.variablen.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[10px] text-gray-400 font-medium mr-1">Variablen:</span>
            {prompt.variablen.map((v: string) => (
              <span key={v} className="text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 rounded px-1.5 py-0.5">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quality check */}
      <div className="border-t border-gray-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-green-500" aria-hidden="true" />
          Qualitätscheck vor Weitergabe
        </p>
        <ul className="space-y-1.5">
          {prompt.qualitaetscheck.map((q: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-300" aria-hidden="true" />
              {q}
            </li>
          ))}
        </ul>
      </div>

      {/* Datenschutz */}
      {prompt.datenschutzHinweis && (
        <div className="border-t border-gray-100 px-5 py-4">
          <Callout variant="warning">{prompt.datenschutzHinweis}</Callout>
        </div>
      )}
    </div>
  );
}
