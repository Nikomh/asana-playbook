import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

type CalloutVariant = "info" | "warning" | "success" | "error";

const config: Record<CalloutVariant, { icon: React.FC<{ className?: string }>; classes: string }> = {
  info: {
    icon: Info,
    classes: "bg-blue-50 border-blue-200 text-blue-800",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-50 border-amber-200 text-amber-800",
  },
  success: {
    icon: CheckCircle,
    classes: "bg-green-50 border-green-200 text-green-800",
  },
  error: {
    icon: XCircle,
    classes: "bg-red-50 border-red-200 text-red-800",
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const { icon: Icon, classes } = config[variant];
  return (
    <div className={`rounded-lg border p-4 ${classes}`} role="note">
      <div className="flex gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div className="text-sm leading-relaxed">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}
