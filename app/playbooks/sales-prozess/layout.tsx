import { SalesProzessNav } from "@/components/sales-prozess/SalesProzessNav";

export default function SalesProzessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SalesProzessNav />
      {children}
    </>
  );
}
