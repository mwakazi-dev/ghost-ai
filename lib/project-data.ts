import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
  updatedAt: string;
}

function toUiProject(
  p: { id: string; name: string; updatedAt: Date },
  owned: boolean
): Project {
  return {
    id: p.id,
    name: p.name,
    slug: p.id,
    owned,
    updatedAt: p.updatedAt.toISOString().split("T")[0],
  };
}

export async function getProjectsForUser(
  userId: string
): Promise<{ owned: Project[]; shared: Project[] }> {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? null;

  const ownedRaw = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  const sharedRaw = email
    ? await prisma.project.findMany({
        where: {
          collaborators: { some: { email } },
          NOT: { ownerId: userId },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return {
    owned: ownedRaw.map((p) => toUiProject(p, true)),
    shared: sharedRaw.map((p) => toUiProject(p, false)),
  };
}
