import type { Metadata } from "next";
import { cpSections } from "@/data/contentPipeline";
import { TaskTemplateBuilder } from "@/components/content-pipeline/TaskTemplateBuilder";
import { Callout } from "@/components/ui/Callout";
import { AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "Workflow" };

export default function WorkflowPage() {
  return (
    <div className="space-y-10">
      {/* Section Guide */}
      <section aria-labelledby="sections-heading">
        <div className="mb-1">
          <h1 className="text-xl font-bold text-gray-900">Workflow &amp; Sections</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wie fließt ein Task durch das Board? Was bedeutet jede Section?
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {cpSections.map((section, i) => (
            <div
              key={section.name}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-gray-900">{section.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-0 px-5 py-4 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="pb-3 sm:pb-0 sm:pr-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Bedeutung</p>
                  <p className="text-xs text-gray-700">{section.bedeutung}</p>
                </div>
                <div className="py-3 sm:py-0 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Kommt hinein wenn</p>
                  <p className="text-xs text-gray-700">{section.kommtHinein}</p>
                </div>
                <div className="py-3 sm:py-0 sm:px-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Weiter wenn</p>
                  <p className="text-xs text-gray-700">{section.wirdWeitergeschoben}</p>
                </div>
                <div className="pt-3 sm:pt-0 sm:pl-4 space-y-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Owner</p>
                    <p className="text-xs text-gray-700">{section.owner}</p>
                  </div>
                </div>
              </div>
              {/* Fehler + DoD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                <div className="flex items-start gap-2 px-5 py-3 bg-amber-50">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-semibold text-amber-700">Typischer Fehler</p>
                    <p className="text-xs text-amber-800 mt-0.5">{section.typischerFehler}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 px-5 py-3 bg-green-50">
                  <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-semibold text-green-700">Definition of Done</p>
                    <p className="text-xs text-green-800 mt-0.5">{section.definitionOfDone}</p>
                  </div>
                </div>
              </div>
              {/* Beispiel-Task */}
              <div className="border-t border-gray-100 px-5 py-2 bg-gray-50">
                <p className="text-[10px] text-gray-400">
                  <span className="font-semibold">Beispiel-Task: </span>
                  {section.beispielTask}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Task Builder */}
      <section aria-labelledby="task-builder-heading">
        <div className="mb-4">
          <h2 id="task-builder-heading" className="text-lg font-bold text-gray-900">Task Builder</h2>
          <p className="text-sm text-gray-500 mt-1">
            Wähle einen Content-Typ — du bekommst sofort Titel-Vorlage, Pflichtinfos und Subtask-Liste zum Kopieren.
          </p>
        </div>

        <Callout variant="info">
          Die Titel-Vorlage und Subtask-Liste per Button kopieren und direkt in Asana einfügen. Platzhalter in eckigen Klammern ersetzen.
        </Callout>

        <div className="mt-4">
          <TaskTemplateBuilder />
        </div>
      </section>
    </div>
  );
}
