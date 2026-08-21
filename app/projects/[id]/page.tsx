import { ProjectDetail } from "@/components/project-detail";
import { getProject, PROJECTS } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/data.json";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return { title: data.site.title };
  }

  return {
    title: `${project.name} — ${data.site.name}`,
    description: project.longDescription ?? project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
