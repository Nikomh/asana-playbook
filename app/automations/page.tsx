import type { Metadata } from "next";
import { automations, automationBoards, automationAntiPatterns } from "@/data/automations";
import { AutomationTable } from "@/components/playbook/AutomationTable";
import { Callout } from "@/components/ui/Callout";
import { Zap, XCircle } from "lucide-react";

export const metadata: Metadata = { title: "Automations & Rules" };

export default function AutomationsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-amber-500" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-gray-900">Automations & Rules</h1>
        </div>
        <p className="text-sm text-gray-500">
          Alle vorgeschlagenen Asana-Regeln nach Board. Jede Rule hat einen klaren Trigger, eine Aktion und den Pain Point den sie löst.
        </p>
      </div>

      <Callout variant="info" title="Asana-Pläne">
        Einige Rules benötigen Asana Business oder Enterprise. Rules markiert mit &quot;Plan-abhängig&quot; prüfen bevor Einrichtung.
      </Callout>

      {automationBoards.map((board) => {
        const boardAutomations = automations.filter((a) => a.board === board);
        return (
          <section key={board} aria-labelledby={`automation-${board}`}>
            <h2
              id={`automation-${board}`}
              className="mb-4 text-base font-semibold text-gray-800 border-b border-gray-100 pb-2"
            >
              {board}
            </h2>
            <AutomationTable items={boardAutomations} />
          </section>
        );
      })}

      <section aria-labelledby="anti-patterns-heading">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
          <h2 id="anti-patterns-heading" className="text-base font-semibold text-gray-800">
            Anti-Patterns: Wie Automationen die Notification-Flut erhöhen
          </h2>
        </div>
        <div className="space-y-3">
          {automationAntiPatterns.map((ap, i) => (
            <div key={i} className="rounded-lg border border-red-100 bg-red-50 overflow-hidden">
              <div className="border-b border-red-100 px-4 py-2.5">
                <p className="text-sm font-semibold text-red-800">❌ {ap.antiPattern}</p>
                <p className="text-xs text-red-600 mt-0.5">{ap.problem}</p>
              </div>
              <div className="px-4 py-2.5">
                <p className="text-sm text-green-700">
                  <span className="font-medium">✓ Besser: </span>
                  {ap.besser}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
