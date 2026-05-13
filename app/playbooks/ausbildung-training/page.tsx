import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlaybookBySlug } from "@/data/playbooks";
import { PlaybookPage } from "@/components/playbook/PlaybookPage";

export const metadata: Metadata = { title: "Ausbildung & Training" };

export default function AusbildungTrainingPage() {
  const playbook = getPlaybookBySlug("ausbildung-training");
  if (!playbook) return notFound();
  return <PlaybookPage playbook={playbook} />;
}
