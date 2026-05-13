"use client";

import { useState } from "react";
import { cpTaskTemplates } from "@/data/contentPipeline";
import { CopyButton } from "@/components/ui/CopyButton";
import { CheckCircle } from "lucide-react";

export function TaskTemplateBuilder() {
  const [selected, setSelected] = useState<string>("tmpl-linkedin");
  const template = cpTaskTemplates.find((t) => t.id === selected)!;

  const taskText = `Task-Titel: ${template.titelVorlage}
Section: ${template.section}

Pflichtinformationen:
${template.pflichtInfos.map((f) => `- ${f}`).join("\n")}`;

  const subtaskText = template.subtasks.map((s) => `☐ ${s}`).join("\n");

  return (
    <div className="space-y-4">
      {/* Type-Selector */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Content-Typ wählen"
      >
        {cpTaskTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            aria-pressed={selected === t.id}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
              selected === t.id
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
            }`}
          >
            <span aria-hidden="true">{t.emoji}</span>
            {t.typ}
          </button>
        ))}
      </div>

      {/* Template Detail */}
      {template && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="border-b border-gray-100 bg-blue-50 px-5 py-4">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">{template.typ}</p>
            <p className="text-sm text-gray-700">{template.beschreibung}</p>
          </div>

          <div className="grid grid-cols-1 gap-0 divide-y divide-gray-100 md:grid-cols-2 md:divide-y-0 md:divide-x">
            {/* Task-Vorlage */}
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Task-Vorlage</h3>
                <CopyButton text={taskText} label="Vorlage kopieren" />
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                <p className="text-xs font-mono text-gray-700 mb-2">
                  <span className="text-gray-400">Titel: </span>
                  {template.titelVorlage}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  <span className="font-medium">Section: </span>{template.section}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Pflichtinformationen:</p>
                <ul className="space-y-1">
                  {template.pflichtInfos.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subtasks */}
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">Subtasks</h3>
                <CopyButton text={subtaskText} label="Subtasks kopieren" />
              </div>
              <ul className="space-y-1.5">
                {template.subtasks.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-300" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              {template.canvaHinweis && (
                <p className="text-xs text-blue-600 bg-blue-50 rounded-md px-2.5 py-2">
                  Canva: {template.canvaHinweis}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
