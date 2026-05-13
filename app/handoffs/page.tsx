import type { Metadata } from "next";
import { handoffs, knowledgeManagementRules } from "@/data/handoffs";
import { Callout } from "@/components/ui/Callout";
import { ArrowRightLeft, CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "Board-Übergaben" };

export default function HandoffsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ArrowRightLeft className="h-5 w-5 text-blue-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900">Board-Übergaben</h1>
        </div>
        <p className="text-sm text-gray-500">
          Wann wechselt ein Thema von einem Board in ein anderes — und was muss dabei übergeben werden?
        </p>
      </div>

      <Callout variant="info" title="Grundsatz">
        Board-Wechsel ist immer eine strukturierte Übergabe. Kein mündliches Weiterleiten — alle nötigen Infos sind im Asana-Task dokumentiert.
      </Callout>

      <div className="space-y-5">
        {handoffs.map((handoff, i) => (
          <div
            key={i}
            id={`${handoff.von.toLowerCase().replace(/\s+/g, "-")}-${handoff.nach.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">{handoff.von}</span>
                <ArrowRightLeft className="h-4 w-4 text-gray-400 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-gray-900">{handoff.nach}</span>
              </div>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Auslöser */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Auslöser</p>
                <p className="text-sm text-gray-700">{handoff.ausloeser}</p>
              </div>

              {/* Mindestinfos */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  Mindest-Informationen bei Übergabe
                </p>
                <ul className="space-y-1.5">
                  {handoff.mindestInfos.map((info, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" aria-hidden="true" />
                      {info}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meta-Row */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Verantwortlich</p>
                  <p className="text-sm text-gray-700 mt-0.5">{handoff.verantwortlich}</p>
                </div>
                {handoff.pflichtFelder.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Pflicht-Custom-Fields</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {handoff.pflichtFelder.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hinweis */}
              {handoff.hinweis && (
                <Callout variant="warning">{handoff.hinweis}</Callout>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Knowledge Management */}
      <section aria-labelledby="knowledge-management-heading">
        <h2
          id="knowledge-management"
          className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2"
        >
          Knowledge Management — Was gehört wohin?
        </h2>
        <ul className="space-y-2">
          {knowledgeManagementRules.map((rule, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg border border-gray-100 px-4 py-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
