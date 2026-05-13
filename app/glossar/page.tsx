import type { Metadata } from "next";
import { glossaryEntries, workingRules, toolMatrix } from "@/data/glossary";
import { BookMarked } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Glossar & Arbeitsregeln" };

export default function GlossarPage() {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <BookMarked className="h-5 w-5 text-gray-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900">Glossar & Arbeitsregeln</h1>
        </div>
        <p className="text-sm text-gray-500">
          Begriffe, Konzepte und die 10 wichtigsten Arbeitsregeln für alle Asana-Boards.
        </p>
      </div>

      {/* Glossar */}
      <section aria-labelledby="glossar-heading">
        <h2 id="glossar-heading" className="mb-5 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">
          Begriffe
        </h2>
        <dl className="space-y-4">
          {glossaryEntries.map((entry) => (
            <div
              key={entry.term}
              id={entry.term.toLowerCase().replace(/\s+/g, "-")}
              className="rounded-lg border border-gray-200 bg-white px-5 py-4"
            >
              <dt className="text-sm font-semibold text-gray-900 mb-1">{entry.term}</dt>
              <dd className="text-sm text-gray-600 leading-relaxed">{entry.definition}</dd>
              {entry.beispiel && (
                <dd className="mt-2 text-xs text-gray-400 italic">
                  Beispiel: {entry.beispiel}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      {/* Tool-Matrix */}
      <section aria-labelledby="tool-matrix-heading">
        <h2 id="tool-matrix-heading" className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">
          Was gehört in welches Tool?
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700">Tool</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Wofür</th>
                <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-700">Nicht wofür</th>
                <th className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-700">Beispiel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {toolMatrix.map((row, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.tool}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs leading-relaxed">{row.wofuer}</td>
                  <td className="hidden md:table-cell px-4 py-3 text-gray-500 text-xs">{row.nichtWofuer}</td>
                  <td className="hidden lg:table-cell px-4 py-3 text-gray-400 text-xs italic">{row.beispiel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Arbeitsregeln */}
      <section id="arbeitsregeln" aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="mb-5 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">
          10 wichtigste Arbeitsregeln
        </h2>
        <ol className="space-y-3">
          {workingRules.map((rule) => (
            <li
              key={rule.nr}
              className="rounded-lg border border-gray-200 bg-white overflow-hidden"
            >
              <div className="flex items-start gap-4 px-5 py-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">
                  {rule.nr}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{rule.regel}</p>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">{rule.begruendung}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Bereiche-Übersicht */}
      <section aria-labelledby="bereiche-heading">
        <h2 id="bereiche-heading" className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2">
          Bereiche & ihre Farben
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Marketing", variant: "blue" as const },
            { label: "Vertrieb", variant: "amber" as const },
            { label: "Beratung", variant: "green" as const },
            { label: "Bildung", variant: "purple" as const },
            { label: "Intern", variant: "gray" as const },
          ].map(({ label, variant }) => (
            <Badge key={label} label={label} variant={variant} />
          ))}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Die Farben entsprechen den Board-Farben in der Navigation und in allen Playbooks.
        </p>
      </section>
    </div>
  );
}
