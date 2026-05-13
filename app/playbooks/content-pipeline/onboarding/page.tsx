import type { Metadata } from "next";
import { OnboardingChecklist } from "@/components/content-pipeline/OnboardingChecklist";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = { title: "Onboarding" };

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">14-Tage Onboarding</h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Strukturierter Einstieg als Board Owner — von Tag 1 bis zur laufenden Routine. Fortschritt wird im Browser gespeichert.
        </p>
      </div>

      <Callout variant="info" title="Hinweis">
        Der Fortschritt wird lokal in deinem Browser gespeichert (localStorage). Er ist nicht zwischen Geräten synchronisiert und nicht an Asana gekoppelt.
      </Callout>

      <OnboardingChecklist />
    </div>
  );
}
