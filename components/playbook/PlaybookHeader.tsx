import type { BoardColor } from "@/data/types";
import { Badge } from "@/components/ui/Badge";

const colorBorder: Record<BoardColor, string> = {
  blue: "border-l-blue-500",
  amber: "border-l-amber-500",
  green: "border-l-green-500",
  purple: "border-l-purple-500",
  gray: "border-l-gray-400",
};

const colorBg: Record<BoardColor, string> = {
  blue: "bg-blue-50",
  amber: "bg-amber-50",
  green: "bg-green-50",
  purple: "bg-purple-50",
  gray: "bg-gray-50",
};

interface PlaybookHeaderProps {
  titel: string;
  board: string;
  bereich: string;
  farbe: BoardColor;
  kurzfassung: string;
}

export function PlaybookHeader({ titel, board, bereich, farbe, kurzfassung }: PlaybookHeaderProps) {
  return (
    <div className={`rounded-xl border-l-4 p-6 ${colorBorder[farbe]} ${colorBg[farbe]} mb-8`}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge label={bereich} variant={farbe} />
        <span className="text-xs text-gray-500">{board}</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{titel}</h1>
      <p className="text-gray-600 leading-relaxed">{kurzfassung}</p>
    </div>
  );
}
