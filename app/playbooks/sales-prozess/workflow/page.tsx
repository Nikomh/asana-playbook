import type { Metadata } from "next";
import { salesToServiceV2 } from "@/data/salesToServiceV2";
import { Callout } from "@/components/ui/Callout";
import { WorkflowStepsV2 } from "@/components/sales-prozess/WorkflowStepsV2";

export const metadata: Metadata = { title: "Sales-Prozess — Workflow" };

export default function SalesProzessWorkflowPage() {
  const { workflow } = salesToServiceV2;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Workflow — {workflow.length} Schritte
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Vom ersten Lead bis zur Archivierung. Jede Karte aufklappen für
          konkrete Schritte, Asana-Felder, KI-Unterstützung und typische Fehler.
        </p>
      </div>

      <Callout variant="warning" title="Schritt 9 — Angebot angenommen">
        Gewonnen ist nicht erledigt. Erst wenn Projektanlage, Delivery und
        Rechnung/Admin geprüft sind, gilt eine Karte als abgeschlossen.
      </Callout>

      <WorkflowStepsV2 />
    </div>
  );
}
