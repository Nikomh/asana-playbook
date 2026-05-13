import type { Metadata } from "next";
import { LifecycleExplorer } from "@/components/content-pipeline/LifecycleExplorer";
import { cpLifecycle } from "@/data/contentPipeline";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = { title: "Lifecycle" };

export default function LifecyclePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Lifecycle Explorer</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {cpLifecycle.length} Phasen — von der ersten Idee bis zur Wiederverwertung. Klicke eine Phase um Details, Pain Points und die Definition of Done zu sehen.
        </p>
      </div>

      <LifecycleExplorer />

      <Callout variant="info" title="Lifecycle ≠ Sections">
        Der Lifecycle beschreibt den <em>inhaltlichen</em> Prozess. Die Asana-Sections im Board sind eine operative Abbildung davon — nicht 1:1 identisch. Mehr dazu auf der Workflow-Seite.
      </Callout>

      {/* Kompakte Übersicht zum Ausdrucken */}
      <section aria-labelledby="kompakt-heading" className="print:block">
        <h2 id="kompakt-heading" className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
          Kompaktübersicht (druckbar)
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-gray-700 w-8">#</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Phase</th>
                <th className="hidden sm:table-cell px-4 py-3 font-semibold text-gray-700">Owner</th>
                <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-700">Section</th>
                <th className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-700">Definition of Done (Kurzfassung)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cpLifecycle.map((p) => (
                <tr key={p.nr} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs font-bold text-gray-400">{p.nr}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{p.label}</p>
                    <p className="text-xs text-gray-500">{p.kurzbe}</p>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3 text-xs text-gray-500">
                    {p.owner.join(", ")}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3 text-xs text-gray-500">{p.section}</td>
                  <td className="hidden lg:table-cell px-4 py-3 text-xs text-gray-500">
                    {p.definitionOfDone[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
