import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProjectsForUser } from "@/lib/project-data";
import { EditorHomeClient } from "@/components/editor/editor-home-client";

export default async function EditorPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { owned, shared } = await getProjectsForUser(userId);

  return <EditorHomeClient ownedProjects={owned} sharedProjects={shared} />;
}
