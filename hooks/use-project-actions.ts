"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/lib/project-data";

type DialogKind = "none" | "create" | "rename" | "delete";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

export interface ProjectActionsState {
  dialogOpen: DialogKind;
  selectedProject: Project | null;
  projectName: string;
  roomIdPreview: string;
  isLoading: boolean;
  openCreateDialog: () => void;
  openRenameDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
  closeDialog: () => void;
  setProjectName: (name: string) => void;
  handleCreate: () => Promise<void>;
  handleRename: () => Promise<void>;
  handleDelete: () => Promise<void>;
}

export function useProjectActions(): ProjectActionsState {
  const router = useRouter();
  const params = useParams();
  const activeProjectId =
    typeof params?.projectId === "string" ? params.projectId : null;

  const [dialogOpen, setDialogOpen] = useState<DialogKind>("none");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slugged = toSlug(projectName);
  const roomIdPreview = slugged ? `${slugged}-${suffix}` : "";

  function openCreateDialog() {
    setProjectName("");
    setSuffix(randomSuffix());
    setSelectedProject(null);
    setDialogOpen("create");
  }

  function openRenameDialog(project: Project) {
    setProjectName(project.name);
    setSelectedProject(project);
    setDialogOpen("rename");
  }

  function openDeleteDialog(project: Project) {
    setSelectedProject(project);
    setDialogOpen("delete");
  }

  function closeDialog() {
    setDialogOpen("none");
    setSelectedProject(null);
    setProjectName("");
    setIsLoading(false);
  }

  async function handleCreate() {
    if (!projectName.trim()) return;
    setIsLoading(true);

    const roomId = roomIdPreview || `project-${randomSuffix()}`;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName.trim(), id: roomId }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const { project } = await res.json();
      closeDialog();
      router.push(`/editor/${project.id}`);
    } catch {
      setIsLoading(false);
    }
  }

  async function handleRename() {
    if (!projectName.trim() || !selectedProject) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName.trim() }),
      });

      if (!res.ok) throw new Error("Failed to rename project");

      closeDialog();
      router.refresh();
    } catch {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedProject) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      closeDialog();

      if (activeProjectId === selectedProject.id) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch {
      setIsLoading(false);
    }
  }

  return {
    dialogOpen,
    selectedProject,
    projectName,
    roomIdPreview,
    isLoading,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    setProjectName,
    handleCreate,
    handleRename,
    handleDelete,
  };
}
