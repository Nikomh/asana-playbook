export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    label: "Playbooks",
    href: "/playbooks",
    icon: "BookOpen",
    children: [
      {
        label: "Content-Pipeline",
        href: "/playbooks/content-pipeline",
        badge: "Marketing",
      },
      {
        label: "Sales to Service",
        href: "/playbooks/sales-to-service",
        badge: "Vertrieb",
      },
      {
        label: "Sales-Prozess Leitfaden",
        href: "/playbooks/sales-prozess",
        badge: "Vertrieb",
      },
      {
        label: "Client Delivery",
        href: "/playbooks/client-delivery",
        badge: "Beratung",
      },
      {
        label: "Ausbildung & Training",
        href: "/playbooks/ausbildung-training",
        badge: "Bildung",
      },
      {
        label: "Internal Operations",
        href: "/playbooks/internal-operations",
        badge: "Intern",
      },
    ],
  },
  {
    label: "Prompt-Bibliothek",
    href: "/prompts",
    icon: "Sparkles",
  },
  {
    label: "Automations & Rules",
    href: "/automations",
    icon: "Zap",
  },
  {
    label: "Board-Übergaben",
    href: "/handoffs",
    icon: "ArrowRightLeft",
  },
  {
    label: "Glossar & Regeln",
    href: "/glossar",
    icon: "BookMarked",
  },
];

export const boardColors: Record<string, string> = {
  "content-pipeline": "blue",
  "sales-to-service": "amber",
  "sales-prozess": "amber",
  "client-delivery": "green",
  "ausbildung-training": "purple",
  "internal-operations": "gray",
};
