import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function sanitizeSegment(segment: string) {
  return segment.replace(/[^a-zA-Z0-9-_]/g, "-").toLowerCase();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const target = String(formData.get("target") || "");
  const slug = formData.get("slug") ? sanitizeSegment(String(formData.get("slug"))) : null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File exceeds 2MB limit." }, { status: 400 });
  }

  let folder = "";
  if (target === "general") {
    folder = path.join(UPLOAD_DIR, "general");
  } else if (target === "partner") {
    folder = path.join(UPLOAD_DIR, "partners");
  } else if (target === "project") {
    if (!slug) {
      return NextResponse.json({ error: "Project slug is required." }, { status: 400 });
    }
    folder = path.join(UPLOAD_DIR, "projects", slug);
  } else {
    return NextResponse.json({ error: "Invalid target." }, { status: 400 });
  }

  await ensureDir(folder);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const fileName = `${sanitizeSegment(baseName)}-${Date.now()}.webp`;
  const outputPath = path.join(folder, fileName);

  await sharp(buffer).webp({ quality: 80 }).toFile(outputPath);

  const publicPath = `/uploads/${folder.split("uploads/")[1]}/${fileName}`.replace(/\\/g, "/");

  return NextResponse.json({ url: publicPath });
}
