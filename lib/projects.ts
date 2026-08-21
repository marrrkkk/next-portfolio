import data from "@/data.json";

export type Work = (typeof data.work.items)[number];

export const WORK: Work[] = data.work.items;

export function getWork(id: string): Work | undefined {
  return WORK.find((work) => work.id === id);
}
