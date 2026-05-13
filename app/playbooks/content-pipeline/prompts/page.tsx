import type { Metadata } from "next";
import { PromptStudio } from "@/components/content-pipeline/PromptStudio";
import { Callout } from "@/components/ui/Callout";
import { cpPrompts } from "@/data/contentPipeline";

export const metadata: Metadata = { title: "Prompts" };

const datenschutz = [
  "Kundennamen, Firmennamen, Ansprechpartner",
  "Angebotspreise und Vertragsinhalte",
  "Persönliche Mitarbeiterdaten",
  "Steuernummern, Kontodaten, Rechnungsdaten",
  "Interne strategische Entscheidungen (nicht anonymisiert)",
];

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Prompt Studio</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {cpPrompts.length} getestete Prompts — nach Situation sortiert. Situation wählen, Prompt kopieren, Variablen ersetzen, Qualitätscheck ausführen.
        </p>
      </div>

      <Callout variant="warning" title="Was nicht in externe KI-Tools gehört">
        <ul className="mt-2 space-y-1">
          {datenschutz.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </Callout>

      <PromptStudio />

      <section aria-labelledby="ki-regeln-heading">
        <h2 id="ki-regeln-heading" className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">
          KI-Regeln für die Content-Pipeline
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { regel: "KI liefert Rohmaterial — Mensch ist Autor.", farbe: "green" },
            { regel: "Jeder KI-Draft wird auf Brand Voice geprüft.", farbe: "green" },
            { regel: "Kein unveränderter KI-Text geht in Review.", farbe: "red" },
            { regel: "Kundendaten immer anonymisieren bevor KI-Nutzung.", farbe: "red" },
            { regel: "Prompts aus der Bibliothek nutzen — eigene erst nach Teamabstimmung ergänzen.", farbe: "green" },
            { regel: "KI hilft bei Struktur, Hook und Formulierungsalternativen — nicht bei Strategie.", farbe: "green" },
          ].map((r, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm ${
                r.farbe === "red"
                  ? "bg-red-50 text-red-800 border border-red-100"
                  : "bg-green-50 text-green-800 border border-green-100"
              }`}
            >
              <span className="font-bold">{r.farbe === "red" ? "✗" : "✓"}</span>
              {r.regel}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
