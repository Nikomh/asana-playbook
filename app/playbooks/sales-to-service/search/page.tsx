import type { Metadata } from "next";
import { salesSearchIndex } from "@/data/sales-to-service";
import { SalesSearch } from "@/components/sales-to-service/SalesSearch";

export const metadata: Metadata = { title: "Suche" };

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Suche</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Durchsuche alle {salesSearchIndex.length} Einträge des
          Sales-to-Service-Playbooks — Phasen, Prompts, Routinen, Übergaben,
          Automationen, FAQs und Quick Actions.
        </p>
      </div>
      <SalesSearch />
    </div>
  );
}
