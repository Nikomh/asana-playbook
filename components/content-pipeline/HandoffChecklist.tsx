import { cpHandoffs } from "@/data/contentPipeline";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";

export function HandoffChecklist() {
  const ausgehend = cpHandoffs.filter((h) => h.richtung === "ausgehend");
  const eingehend = cpHandoffs.filter((h) => h.richtung === "eingehend");

  return (
    <div className="space-y-8">
      <section aria-labelledby="ausgehend-heading">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <h2 id="ausgehend-heading" className="text-base font-semibold text-gray-900">
            Ausgehende Übergaben
          </h2>
        </div>
        <div className="space-y-4">
          {ausgehend.map((h) => (
            <HandoffCard key={h.id} handoff={h} />
          ))}
        </div>
      </section>

      <section aria-labelledby="eingehend-heading">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeft className="h-4 w-4 text-gray-500" aria-hidden="true" />
          <h2 id="eingehend-heading" className="text-base font-semibold text-gray-900">
            Eingehende Übergaben (von anderen Boards)
          </h2>
        </div>
        <div className="space-y-4">
          {eingehend.map((h) => (
            <HandoffCard key={h.id} handoff={h} />
          ))}
        </div>
      </section>
    </div>
  );
}

function HandoffCard({ handoff }: { handoff: typeof cpHandoffs[number] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">{handoff.von}</span>
          {handoff.richtung === "ausgehend" ? (
            <ArrowRight className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
          ) : (
            <ArrowLeft className="h-4 w-4 text-purple-400 shrink-0" aria-hidden="true" />
          )}
          <span className="text-sm font-semibold text-gray-900">{handoff.nach}</span>
          <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${
            handoff.richtung === "ausgehend"
              ? "bg-blue-50 text-blue-700"
              : "bg-purple-50 text-purple-700"
          }`}>
            {handoff.richtung === "ausgehend" ? "Ausgehend" : "Eingehend"}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Auslöser */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Auslöser</p>
          <p className="text-sm text-gray-700">{handoff.ausloeser}</p>
        </div>

        {/* Mindest-Infos */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
            Mindest-Informationen bei Übergabe
          </p>
          <ul className="space-y-1.5">
            {handoff.mindestInfos.map((info, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" aria-hidden="true" />
                {info}
              </li>
            ))}
          </ul>
        </div>

        {/* Fehler */}
        {handoff.typischeFehler.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">Typische Fehler</p>
            <ul className="space-y-1">
              {handoff.typischeFehler.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 rounded-md px-2.5 py-1.5">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-4 pt-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Verantwortlich</p>
            <p className="text-sm text-gray-700">{handoff.verantwortlich}</p>
          </div>
          {handoff.pflichtFelder.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Pflicht-Custom-Fields</p>
              <div className="flex flex-wrap gap-1">
                {handoff.pflichtFelder.map((f) => (
                  <span key={f} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkliste kopieren */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Übergabe-Checkliste</p>
            <CopyButton text={handoff.checklisteText} label="Checkliste kopieren" />
          </div>
          <pre className="whitespace-pre-wrap text-xs font-mono text-gray-600 bg-gray-50 rounded-lg border border-gray-100 p-3">
            {handoff.checklisteText}
          </pre>
        </div>
      </div>
    </div>
  );
}
