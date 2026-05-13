import type { BadgeVariant } from "@/data/types";

const variantClasses: Record<BadgeVariant, string> = {
  blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
  amber: "bg-amber-50 text-amber-700 ring-amber-700/10",
  green: "bg-green-50 text-green-700 ring-green-700/10",
  purple: "bg-purple-50 text-purple-700 ring-purple-700/10",
  gray: "bg-gray-50 text-gray-600 ring-gray-500/10",
  red: "bg-red-50 text-red-700 ring-red-700/10",
  orange: "bg-orange-50 text-orange-700 ring-orange-700/10",
};

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export function Badge({ label, variant = "gray", size = "md" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full ring-1 ring-inset font-medium ${variantClasses[variant]} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs"
      }`}
    >
      {label}
    </span>
  );
}
