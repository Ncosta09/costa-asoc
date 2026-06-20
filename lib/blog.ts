import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/content/site";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, ej. "2026-06-20" */
  date: string;
  author: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostMeta & { content: string };

function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? site.name),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    content,
  };
}

function readRaw(slug: string): string | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf8");
}

/** En producción se ocultan los drafts; en dev se ven. */
function isVisible(post: PostMeta): boolean {
  return process.env.NODE_ENV !== "production" || !post.draft;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = readRaw(slug);
      return raw ? parsePost(slug, raw) : null;
    })
    .filter((p): p is Post => p !== null)
    .filter(isVisible)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const raw = readRaw(slug);
  if (!raw) return null;
  const post = parsePost(slug, raw);
  return isVisible(post) ? post : null;
}

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-06-20" → "20 de junio de 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
}
