import type { Metadata } from "next";
import { handoverGates, getPromptById } from "@/data/sales-to-service";
import { CopyButton } from "@/components/ui/CopyButton";
import { Callout } from "@/components/ui/Callout";
import { CheckCircle, XCircle, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Übergaben" };

const BASE = "/playbooks/sales-to-service";

// Prompt IDs linked to each gate
const GATE_PROMPT: Record<string, string> = {
  "project-setup": "project-setup-briefing",
  delivery: "delivery-briefing",
  "invoice-admin": "invoice-check",
  "archive-reactivation": "archive-reactivation-note",
};

export default function HandoffsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Übergabe-Gates
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Nach einer Annahme entstehen je nach Auftrag bis zu drei Gates. Jedes
          Gate definiert was, wohin und durch wen übergeben wird — und wann es
          als erledigt gilt.
        </p>
      </div>

      <Callout variant="warning" title="Grundsatz">
        Gewonnen ist nicht erledigt. Eine Karte gilt erst als abgeschlossen,
        wenn alle relevanten Gates abgehakt oder bewusst als nicht nötig markiert
        wurden.
      </Callout>

      <div className="space-y-6">
        {handoverGates.map((gate) => {
          const relatedPrompt = getPromptById(GATE_PROMPT[gate.id] ?? "");

          const checklistText = `${gate.title} — Übergabe-Checkliste\n${"─".repeat(40)}\n${gate.checklist.map((item, i) => `${i + 1}. ☐ ${item}`).join("\n")}\n\nMindest-Infos:\n${gate.minimumInfo.map((info) => `  • ${info}`).join("\n")}\n\nErledigt wenn:\n${gate.doneWhen}`;

          return (
            <article
              key={gate.id}
              id={gate.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              {/* Gate header */}
              <div className="border-b border-gray-100 bg-amber-50 px-5 py-4">
                <h2 className="text-base font-semibold text-gray-900">
                  {gate.title}
                </h2>
                <p className="mt-0.5 text-xs text-amber-700">
                  <span className="font-medium">Auslöser: </span>
                  {gate.trigger}
                </p>
              </div>

              {/* Gate body */}
              <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                {/* Left: what to hand over */}
                <div className="space-y-4 px-5 py-4">
                  {/* Mindest-Informationen */}
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Mindest-Informationen
                    </p>
                    <ul className="space-y-1.5">
                      {gate.minimumInfo.map((info, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-700"
                        >
                          <CheckCircle
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400"
                            aria-hidden="true"
                          />
                          {info}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Was übergeben wird */}
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Was übergeben wird
                    </p>
                    <ul className="space-y-1">
                      {gate.checklist.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-700"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: who + guardrails + done */}
                <div className="space-y-4 px-5 py-4">
                  {/* Verantwortlich + Empfänger */}
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                      Verantwortlich &amp; Empfänger
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-gray-700">
                        <User
                          className="h-3 w-3 shrink-0 text-amber-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">Owner:</span> {gate.owner}
                      </div>
                      {gate.participants.map((p, i) => (
                        <p key={i} className="pl-4 text-xs text-gray-600">
                          <span className="text-gray-400">→ </span>
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Grenzen & Fehlerquellen */}
                  {gate.notAutomatic.length > 0 && (
                    <div>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-red-400">
                        Grenzen &amp; Fehlerquellen
                      </p>
                      <ul className="space-y-1">
                        {gate.notAutomatic.map((rule, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-1.5 text-xs text-red-700"
                          >
                            <XCircle
                              className="mt-0.5 h-3 w-3 shrink-0 text-red-400"
                              aria-hidden="true"
                            />
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Abschlusskriterium */}
                  <div className="rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-green-600">
                      Abschlusskriterium
                    </p>
                    <p className="text-xs text-green-800">{gate.doneWhen}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3">
                <div className="flex flex-wrap gap-2">
                  <CopyButton text={checklistText} label="Checkliste kopieren" />
                  {relatedPrompt && (
                    <Link
                      href={`${BASE}/prompts#${relatedPrompt.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm ring-1 ring-inset ring-amber-200 transition hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      KI-Prompt: {relatedPrompt.title}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
                <p className="text-[10px] text-gray-400">
                  KI-Unterstützung: {gate.aiSupport}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
