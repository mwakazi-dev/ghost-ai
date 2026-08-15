"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dialogs = useProjectDialogs();

  return (
    <div className="flex h-screen flex-col bg-bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        dialogs={dialogs}
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 pt-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-text-muted">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
        </div>

        <Button
          onClick={dialogs.openCreateDialog}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </main>

      <CreateProjectDialog
        open={dialogs.dialogOpen === "create"}
        projectName={dialogs.projectName}
        isLoading={dialogs.isLoading}
        onProjectNameChange={dialogs.setProjectName}
        onConfirm={dialogs.handleCreate}
        onClose={dialogs.closeDialog}
      />

      <RenameProjectDialog
        open={dialogs.dialogOpen === "rename"}
        project={dialogs.selectedProject}
        projectName={dialogs.projectName}
        isLoading={dialogs.isLoading}
        onProjectNameChange={dialogs.setProjectName}
        onConfirm={dialogs.handleRename}
        onClose={dialogs.closeDialog}
      />

      <DeleteProjectDialog
        open={dialogs.dialogOpen === "delete"}
        project={dialogs.selectedProject}
        isLoading={dialogs.isLoading}
        onConfirm={dialogs.handleDelete}
        onClose={dialogs.closeDialog}
      />
    </div>
  );
}
