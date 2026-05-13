import type { Metadata } from "next";
import { faqs } from "@/data/sales-to-service";
import { FaqAccordion } from "@/components/sales-to-service/FaqAccordion";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          FAQ — Häufige Fragen
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {faqs.length} Antworten auf die häufigsten Fragen rund ums
          Sales-to-Service-Board. Nach Kategorie filterbar.
        </p>
      </div>
      <FaqAccordion />
    </div>
  );
}
