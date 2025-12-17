import { NextResponse } from "next/server";
import { listMediaFiles } from "../../../../lib/media";

export async function GET() {
  try {
    const files = await listMediaFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to list media files", error);
    return NextResponse.json({ error: "Unable to load media files." }, { status: 500 });
  }
}
