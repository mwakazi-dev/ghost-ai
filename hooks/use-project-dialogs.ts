"use client";

import { useState } from "react";
import { Project } from "@/lib/mock-projects";

type DialogKind = "none" | "create" | "rename" | "delete";

export interface ProjectDialogsState {
  dialogOpen: DialogKind;
  selectedProject: Project | null;
  projectName: string;
  isLoading: boolean;
  openCreateDialog: () => void;
  openRenameDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
  closeDialog: () => void;
  setProjectName: (name: string) => void;
  handleCreate: () => void;
  handleRename: () => void;
  handleDelete: () => void;
}

export function useProjectDialogs(): ProjectDialogsState {
  const [dialogOpen, setDialogOpen] = useState<DialogKind>("none");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openCreateDialog() {
    setProjectName("");
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

  function handleCreate() {
    if (!projectName.trim()) return;
    setIsLoading(true);
    // No-op for now — no persistence yet
    setTimeout(() => {
      setIsLoading(false);
      closeDialog();
    }, 300);
  }

  function handleRename() {
    if (!projectName.trim() || !selectedProject) return;
    setIsLoading(true);
    // No-op for now — no persistence yet
    setTimeout(() => {
      setIsLoading(false);
      closeDialog();
    }, 300);
  }

  function handleDelete() {
    if (!selectedProject) return;
    setIsLoading(true);
    // No-op for now — no persistence yet
    setTimeout(() => {
      setIsLoading(false);
      closeDialog();
    }, 300);
  }

  return {
    dialogOpen,
    selectedProject,
    projectName,
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
