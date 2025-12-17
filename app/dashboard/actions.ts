"use server";

import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import path from "path";
import prisma from "../../lib/prisma";
import { UPLOAD_ROOT } from "../../lib/media";

const DEFAULT_SETTING_ID = 1;

function toStringValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toNumber(value: FormDataEntryValue | null) {
  const asNumber = Number(value);
  return Number.isFinite(asNumber) ? asNumber : undefined;
}

function toList(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return [];
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const dashboardPaths = [
  "/dashboard",
  "/dashboard/overview",
  "/dashboard/settings",
  "/dashboard/seo",
  "/dashboard/media",
  "/dashboard/contact",
  "/dashboard/projects",
  "/dashboard/services",
  "/dashboard/partners",
  "/dashboard/admins"
];

function triggerRevalidations(paths: string[] = []) {
  const uniquePaths = Array.from(new Set(["/", ...dashboardPaths, ...paths]));
  uniquePaths.forEach((path) => revalidatePath(path));
}

function resolveUploadRelativePath(value: string) {
  if (!value) return null;
  const normalized = path
    .normalize(value)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/\\/g, "/");
  if (!normalized) return null;
  const absolute = path.join(UPLOAD_ROOT, normalized);
  if (!absolute.startsWith(UPLOAD_ROOT)) {
    return null;
  }
  return { normalized, absolute };
}

export async function saveProject(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const previousSlug = toStringValue(formData.get("previousSlug"));
  const slug = toStringValue(formData.get("slug"));
  const title = toStringValue(formData.get("title"));
  const categoryLabel = toStringValue(formData.get("categoryLabel"));
  const mainImage = toStringValue(formData.get("mainImage"));

  if (!slug || !title || !mainImage) {
    throw new Error("Project slug, title, and main image are required.");
  }

  const data = {
    slug,
    title,
    categoryLabel,
    mainImage,
    overview: toStringValue(formData.get("overview")) || null,
    description: toStringValue(formData.get("description")) || null,
    location: toStringValue(formData.get("location")) || null,
    categories: toList(formData.get("categories")),
    gallery: toList(formData.get("gallery"))
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data
    });
  } else {
    await prisma.project.create({ data });
  }

  const dynamicPaths = [`/projects/${slug}`];
  if (previousSlug && previousSlug !== slug) {
    dynamicPaths.push(`/projects/${previousSlug}`);
  }
  triggerRevalidations(dynamicPaths);
}

export async function deleteProject(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const slug = toStringValue(formData.get("slug"));
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  const paths = slug ? [`/projects/${slug}`] : [];
  triggerRevalidations(paths);
}

export async function saveService(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const title = toStringValue(formData.get("title"));
  const description = toStringValue(formData.get("description"));
  const icon = toStringValue(formData.get("icon"));
  const order = toNumber(formData.get("order")) ?? 1;

  if (!title || !description) {
    throw new Error("Service title and description are required.");
  }

  const data = { title, description, icon: icon || null, order };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }

  triggerRevalidations();
}

export async function deleteService(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  triggerRevalidations();
}

export async function savePartner(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const name = toStringValue(formData.get("name"));
  const logoUrl = toStringValue(formData.get("logoUrl"));
  const url = toStringValue(formData.get("url"));

  if (!name || !logoUrl) {
    throw new Error("Partner name and logo URL are required.");
  }

  const data = {
    name,
    logoUrl,
    url: url || null
  };

  if (id) {
    await prisma.partner.update({ where: { id }, data });
  } else {
    await prisma.partner.create({ data });
  }

  triggerRevalidations();
}

export async function deletePartner(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await prisma.partner.delete({ where: { id } });
  triggerRevalidations();
}

export async function saveSetting(formData: FormData) {
  const id = toNumber(formData.get("id")) ?? DEFAULT_SETTING_ID;
  const data = {
    siteName: toStringValue(formData.get("siteName")) || null,
    faviconUrl: toStringValue(formData.get("faviconUrl")) || null,
    logoUrl: toStringValue(formData.get("logoUrl")) || null,
    heroImageUrl: toStringValue(formData.get("heroImageUrl")) || null
  };

  await prisma.setting.upsert({
    where: { id },
    update: data,
    create: data
  });

  triggerRevalidations();
}

export async function saveContact(formData: FormData) {
  const id = toNumber(formData.get("id")) ?? DEFAULT_SETTING_ID;
  const data = {
    contactEmail: toStringValue(formData.get("contactEmail")) || null,
    phone: toStringValue(formData.get("phone")) || null,
    address: toStringValue(formData.get("address")) || null,
    businessHours: toStringValue(formData.get("businessHours")) || null,
    mapEmbed: toStringValue(formData.get("mapEmbed")) || null
  };

  await prisma.setting.upsert({
    where: { id },
    update: data,
    create: data
  });

  triggerRevalidations();
}

export async function saveSeoSettings(formData: FormData) {
  const id = toNumber(formData.get("id")) ?? DEFAULT_SETTING_ID;
  const data = {
    seoTitle: toStringValue(formData.get("seoTitle")) || null,
    seoDescription: toStringValue(formData.get("seoDescription")) || null,
    seoKeywords: toStringValue(formData.get("seoKeywords")) || null,
    seoImageUrl: toStringValue(formData.get("seoImageUrl")) || null,
    seoJsonLd: toStringValue(formData.get("seoJsonLd")) || null
  };

  await prisma.setting.upsert({
    where: { id },
    update: data,
    create: data
  });

  triggerRevalidations();
}

export async function saveSocialLink(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const platform = toStringValue(formData.get("platform"));
  const url = toStringValue(formData.get("url"));
  const settingId = toNumber(formData.get("settingId")) ?? DEFAULT_SETTING_ID;

  if (!platform || !url) {
    throw new Error("Platform and URL are required for social links.");
  }

  const data = { platform, url, settingId };

  if (id) {
    await prisma.socialLink.update({ where: { id }, data });
  } else {
    await prisma.socialLink.create({ data });
  }

  triggerRevalidations();
}

export async function deleteSocialLink(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await prisma.socialLink.delete({ where: { id } });
  triggerRevalidations();
}

export async function deleteMediaFile(formData: FormData) {
  const relativePath = toStringValue(formData.get("path"));
  const resolved = resolveUploadRelativePath(relativePath);
  if (!resolved) {
    throw new Error("Invalid file path.");
  }

  try {
    await fs.unlink(resolved.absolute);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }

  // Attempt to clean empty directories up the tree (optional)
  let currentDir = path.dirname(resolved.absolute);
  while (currentDir.startsWith(UPLOAD_ROOT) && currentDir !== UPLOAD_ROOT) {
    try {
      await fs.rmdir(currentDir);
      currentDir = path.dirname(currentDir);
    } catch {
      break;
    }
  }

  triggerRevalidations();
}

export async function saveAdmin(formData: FormData) {
  const id = toNumber(formData.get("id"));
  const email = toStringValue(formData.get("email"));
  const name = toStringValue(formData.get("name"));
  const password = toStringValue(formData.get("password"));

  if (!email) {
    throw new Error("Admin email is required.");
  }

  const data: {
    email: string;
    name?: string | null;
    passwordHash?: string;
  } = { email, name: name || null };

  if (password) {
    data.passwordHash = await bcrypt.hash(password, 10);
  }

  if (id) {
    await prisma.admin.update({ where: { id }, data });
  } else {
    if (!password) {
      throw new Error("Password is required when creating a new admin.");
    }
    await prisma.admin.create({ data: data as { email: string; passwordHash: string; name?: string | null } });
  }

  triggerRevalidations();
}

export async function deleteAdmin(formData: FormData) {
  const id = toNumber(formData.get("id"));
  if (!id) return;
  await prisma.admin.delete({ where: { id } });
  triggerRevalidations();
}
