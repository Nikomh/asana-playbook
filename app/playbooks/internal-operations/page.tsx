import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlaybookBySlug } from "@/data/playbooks";
import { PlaybookPage } from "@/components/playbook/PlaybookPage";

export const metadata: Metadata = { title: "Internal Operations" };

export default function InternalOperationsPage() {
  const playbook = getPlaybookBySlug("internal-operations");
  if (!playbook) return notFound();
  return <PlaybookPage playbook={playbook} />;
}
