import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import prisma from "./prisma";

const SESSION_COOKIE = "ic-admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret() {
  return process.env.AUTH_SECRET || "ironcastle-secret-key";
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function encodeToken(adminId: number) {
  const timestamp = Date.now();
  const payload = `${adminId}:${timestamp}`;
  const signature = sign(payload);
  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

function decodeToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [adminId, timestamp, signature] = decoded.split(":");
    if (!adminId || !timestamp || !signature) return null;
    const payload = `${adminId}:${timestamp}`;
    if (sign(payload) !== signature) return null;
    const age = Date.now() - Number(timestamp);
    if (Number.isNaN(age) || age > SESSION_MAX_AGE * 1000) return null;
    return Number(adminId);
  } catch {
    return null;
  }
}

async function getCookieStore() {
  return (await cookies()) as {
    get: (name: string) => { value: string } | undefined;
    set: (
      name: string,
      value: string,
      options: { httpOnly: boolean; sameSite: "lax"; maxAge: number; path: string }
    ) => void;
    delete: (name: string) => void;
  };
}

export async function createSession(adminId: number) {
  const token = encodeToken(adminId);
  const cookieStore = await getCookieStore();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/"
  });
}

export async function destroySession() {
  const cookieStore = await getCookieStore();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionAdmin() {
  const cookieStore = await getCookieStore();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const adminId = decodeToken(token);
  if (!adminId) return null;

  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true }
  });

  if (!admin) return null;

  return admin;
}
