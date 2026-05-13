import type { LifecycleStep } from "@/data/types";
import { ArrowRight } from "lucide-react";

export function Lifecycle({ steps }: { steps: LifecycleStep[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-0 py-2">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start">
            <div className="flex flex-col items-center w-36">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">
                {i + 1}
              </div>
              <div className="mt-2 text-center px-1">
                <p className="text-xs font-semibold text-gray-900">{step.label}</p>
                <p className="mt-0.5 text-xs text-gray-500 leading-snug">{step.description}</p>
                {step.asanaSection && (
                  <p className="mt-1 text-[10px] text-gray-400 italic">→ {step.asanaSection}</p>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="mt-3.5 flex items-center px-1 text-gray-300">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
