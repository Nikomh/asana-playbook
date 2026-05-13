import { CheckCircle, XCircle } from "lucide-react";

interface DoDontTableProps {
  dos: string[];
  donts: string[];
}

export function DoDontTable({ dos, donts }: DoDontTableProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-green-800">Do</h4>
        </div>
        <ul className="space-y-2">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
          <h4 className="text-sm font-semibold text-red-800">Don&apos;t</h4>
        </div>
        <ul className="space-y-2">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
