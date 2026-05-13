import type { Metadata } from "next";
import { ContentPipelineNav } from "@/components/content-pipeline/ContentPipelineNav";

export const metadata: Metadata = {
  title: {
    template: "%s · Content-Pipeline",
    default: "Content-Pipeline",
  },
};

export default function ContentPipelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ContentPipelineNav />
      {children}
    </div>
  );
}
