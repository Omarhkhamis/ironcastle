import prisma from "./prisma";

export async function getSiteData() {
  const [projects, services, partners, setting] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" }
    }),
    prisma.service.findMany({
      orderBy: { order: "asc" }
    }),
    prisma.partner.findMany({
      orderBy: { name: "asc" }
    }),
    prisma.setting.findFirst({
      include: { socials: { orderBy: { platform: "asc" } } }
    })
  ]);

  const admins = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" }
  });

  return {
    projects,
    services,
    partners,
    setting,
    admins
  };
}

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;
