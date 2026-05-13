import type { Metadata } from "next";
import { cpAutomations } from "@/data/contentPipeline";
import { Badge } from "@/components/ui/Badge";
import { Callout } from "@/components/ui/Callout";
import type { BadgeVariant } from "@/data/types";
import { Zap, ChevronDown } from "lucide-react";

export const metadata: Metadata = { title: "Automations" };

const umsetzbarLabel: Record<string, string> = {
  sofort: "Sofort umsetzbar",
  spaeter: "Später",
  optional: "Optional",
};
const umsetzbarVariant: Record<string, BadgeVariant> = {
  sofort: "green",
  spaeter: "amber",
  optional: "gray",
};
const prioritaetVariant: Record<string, BadgeVariant> = {
  hoch: "red",
  mittel: "amber",
  niedrig: "gray",
};

export default function AutomationsPage() {
  const hoch = cpAutomations.filter((a) => a.prioritaet === "hoch");
  const rest = cpAutomations.filter((a) => a.prioritaet !== "hoch");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Automations &amp; Rules</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {cpAutomations.length} vorgeschlagene Asana-Rules — mit konkreten Setup-Schritten. Fokus: Klarheit schaffen, keine Notification-Flut erzeugen.
        </p>
      </div>

      <Callout variant="warning" title="Grundprinzip">
        Jede Automation wird vor Einrichtung auf diese Frage geprüft: <strong>Schafft das Klarheit oder erzeugt es Lärm?</strong> Im Zweifel: keine Rule einrichten.
      </Callout>

      <section aria-labelledby="hoch-heading">
        <h2 id="hoch-heading" className="mb-4 text-base font-semibold text-gray-800 flex items-center gap-2">
          <Badge label="Hoch" variant="red" />
          Sofort einrichten
        </h2>
        <div className="space-y-4">
          {hoch.map((a) => <AutomationCard key={a.id} automation={a} />)}
        </div>
      </section>

      {rest.length > 0 && (
        <section aria-labelledby="rest-heading">
          <h2 id="rest-heading" className="mb-4 text-base font-semibold text-gray-800 flex items-center gap-2">
            <Badge label="Mittel / Optional" variant="gray" />
            Später oder optional
          </h2>
          <div className="space-y-4">
            {rest.map((a) => <AutomationCard key={a.id} automation={a} />)}
          </div>
        </section>
      )}

      <section aria-labelledby="anti-heading">
        <h2 id="anti-heading" className="mb-4 text-base font-semibold text-gray-800">
          Anti-Pattern: Wie Automationen Lärm erzeugen
        </h2>
        <div className="space-y-2">
          {[
            "Alle Mitglieder bei jeder Status-Änderung benachrichtigen → führt zu ignoriertem Notification-Chaos",
            "Täglich wiederholende Erinnerungen für dieselbe Aufgabe → Reaktanz, werden abgestellt",
            "Automation ohne klaren Handlungsauftrag → niemand weiß was zu tun ist",
            "Zu viele Subtasks automatisch erstellen → Board wird unlesbar",
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-800">
              <span className="font-bold">✗</span>
              {a}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AutomationCard({ automation: a }: { automation: typeof cpAutomations[number] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-gray-900">{a.titel}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge label={a.prioritaet} variant={prioritaetVariant[a.prioritaet]} size="sm" />
          <Badge label={umsetzbarLabel[a.umsetzbar]} variant={umsetzbarVariant[a.umsetzbar]} size="sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-0 px-5 py-4 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
        <div className="pb-3 sm:pb-0 sm:pr-4 space-y-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Trigger</p>
            <p className="text-sm text-gray-700">{a.trigger}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Aktion</p>
            <p className="text-sm text-gray-700">{a.aktion}</p>
          </div>
        </div>
        <div className="pt-3 sm:pt-0 sm:pl-4 space-y-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Warum?</p>
            <p className="text-sm text-gray-700">{a.warum}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">Notification-Check</p>
            <p className="text-xs text-green-700 bg-green-50 rounded px-2 py-1">{a.notificationCheck}</p>
          </div>
        </div>
      </div>
      <details className="border-t border-gray-100">
        <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-xs font-semibold text-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <span>Setup-Schritte anzeigen</span>
          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
        </summary>
        <div className="px-5 pb-4 pt-1">
          <ol className="space-y-1.5">
            {a.setupSchritte.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </details>
    </div>
  );
}
