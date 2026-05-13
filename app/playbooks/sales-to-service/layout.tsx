import type { Metadata } from "next";
import { SalesNav } from "@/components/sales-to-service/SalesNav";

export const metadata: Metadata = {
  title: {
    template: "%s · Sales to Service",
    default: "Sales to Service",
  },
};

export default function SalesToServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SalesNav />
      {children}
    </div>
  );
}
