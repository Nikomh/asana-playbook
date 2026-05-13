import type { Metadata } from "next";
import { routines } from "@/data/sales-to-service";
import { RoutineBoard } from "@/components/sales-to-service/RoutineBoard";

export const metadata: Metadata = { title: "Routinen" };

export default function RoutinesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Routinen</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          {routines.length} wiederkehrende Abläufe nach Rolle und Rhythmus.
          Schalte zwischen Geschäftsführung, Trainer und gemeinsamen
          Teamroutinen um.
        </p>
      </div>
      <RoutineBoard />
    </div>
  );
}
