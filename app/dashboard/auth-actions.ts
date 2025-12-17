"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import prisma from "../../lib/prisma";
import { createSession, destroySession } from "../../lib/auth";

type State = {
  error?: string;
};

const DEFAULT_ADMIN_EMAIL = "admin@admin.com";
const DEFAULT_ADMIN_PASSWORD = "123456";

async function ensureDefaultAdmin() {
  const existing = await prisma.admin.findUnique({
    where: { email: DEFAULT_ADMIN_EMAIL }
  });

  if (existing) return existing;

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
  return prisma.admin.create({
    data: {
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash,
      name: "Administrator"
    }
  });
}

export async function login(_: State | undefined, formData: FormData): Promise<State> {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  if (email === DEFAULT_ADMIN_EMAIL) {
    await ensureDefaultAdmin();
  }

  const admin = await prisma.admin.findUnique({
    where: { email }
  });

  if (!admin) {
    return { error: "Invalid credentials." };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return { error: "Invalid credentials." };
  }

  await createSession(admin.id);
  redirect("/dashboard/overview");
}

export async function logout() {
  await destroySession();
  redirect("/dashboard/login");
}
