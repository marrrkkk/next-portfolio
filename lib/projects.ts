import data from "@/data.json";

export type Project = (typeof data.projects.items)[number];

export const PROJECTS: Project[] = data.projects.items;

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
