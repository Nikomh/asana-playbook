import type { Metadata } from "next";
import { workflowPhases } from "@/data/sales-to-service";
import { Callout } from "@/components/ui/Callout";
import { WorkflowExplorer } from "@/components/sales-to-service/WorkflowExplorer";

export const metadata: Metadata = { title: "Workflow" };

export default function WorkflowPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Workflow — {workflowPhases.length} Phasen
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Der vollständige Sales-Prozess von der Templatenutzung bis zur
          Archivierung. Phase aufklappen für Details, Checkliste und
          Rollenhinweise.
        </p>
      </div>

      <Callout variant="warning" title="Kritische Phase">
        Phase 9 — <strong>Angebot angenommen</strong> — ist der häufigste
        Übergabefehler. Gewonnen ist nicht erledigt: erst wenn alle relevanten
        Gates abgehakt sind, gilt die Karte als abgeschlossen.
      </Callout>

      <WorkflowExplorer />
    </div>
  );
}
