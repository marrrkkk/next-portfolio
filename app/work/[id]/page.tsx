import { ProjectDetail } from "@/components/project-detail";
import { getWork, WORK } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/data.json";

export function generateStaticParams() {
  return WORK.map((work) => ({ id: work.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const work = getWork(id);

  if (!work) {
    return { title: data.site.title };
  }

  return {
    title: `${work.name} — ${data.site.name}`,
    description: work.longDescription ?? work.description,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const work = getWork(id);

  if (!work) {
    notFound();
  }

  return <ProjectDetail project={work} />;
}
