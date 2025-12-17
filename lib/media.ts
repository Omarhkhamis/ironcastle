import { promises as fs } from "fs";
import path from "path";

export const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

export type MediaFile = {
  relativePath: string;
  folderLabel: string;
  url: string;
  sizeKB: number;
};

async function readDirSafe(directory: string) {
  try {
    return await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }
}

export async function listMediaFiles(dir: string = UPLOAD_ROOT, relative = ""): Promise<MediaFile[]> {
  const entries = await readDirSafe(dir);
  const files: MediaFile[] = [];

  for (const entry of entries) {
    const entryRelative = relative ? `${relative}/${entry.name}` : entry.name;
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listMediaFiles(absolutePath, entryRelative)));
      continue;
    }
    if (!entry.isFile()) continue;

    const stats = await fs.stat(absolutePath).catch(() => null);
    const folderLabel = relative ? relative.replace(/\\/g, "/") : "root";

    files.push({
      relativePath: entryRelative.replace(/\\/g, "/"),
      folderLabel,
      url: `/uploads/${entryRelative.replace(/\\/g, "/")}`,
      sizeKB: stats ? Math.max(1, Math.round(stats.size / 1024)) : 0
    });
  }

  return files;
}
