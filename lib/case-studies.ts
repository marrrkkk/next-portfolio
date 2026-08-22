import fs from "node:fs";
import path from "node:path";

export type CaseStudyBlock =
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const FILES: Record<string, string> = {
  requo: "requo-case-study.md",
  upclass: "portfolio-case-study.md",
  "freshstart-ph": "freshstart-case-study.md",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function clean(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/&middot;/g, "·")
    .replace(/Â·/g, "·");
}

export function getCaseStudy(id: string): CaseStudyBlock[] {
  const filename = FILES[id];
  if (!filename) return [];
  const source = fs.readFileSync(path.join(process.cwd(), "public", "case-study", filename), "utf8");
  const lines = source.split(/\r?\n/);
  const blocks: CaseStudyBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    if (list.length) blocks.push({ type: "list", items: [...list] });
    paragraph = [];
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#\s+/.test(trimmed)) continue;
    const heading = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flush();
      const level = heading[1].length as 2 | 3;
      blocks.push({ type: "heading", level, text: clean(heading[2]), id: slugify(heading[2]) });
    } else if (trimmed.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(clean(trimmed.slice(2)));
    } else if (trimmed) {
      if (list.length) flush();
      paragraph.push(clean(trimmed));
    } else {
      flush();
    }
  }
  flush();
  return blocks;
}
