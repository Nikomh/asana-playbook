import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlaybookBySlug } from "@/data/playbooks";
import { PlaybookPage } from "@/components/playbook/PlaybookPage";

export const metadata: Metadata = { title: "Client Delivery" };

export default function ClientDeliveryPage() {
  const playbook = getPlaybookBySlug("client-delivery");
  if (!playbook) return notFound();
  return <PlaybookPage playbook={playbook} />;
}
