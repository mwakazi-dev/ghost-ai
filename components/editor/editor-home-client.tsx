"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/dialogs/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/dialogs/delete-project-dialog";
import { useProjectActions } from "@/hooks/use-project-actions";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/project-data";

interface EditorHomeClientProps {
  ownedProjects: Project[];
  sharedProjects: Project[];
}

export function EditorHomeClient({
  ownedProjects,
  sharedProjects,
}: EditorHomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const actions = useProjectActions();

  return (
    <div className="flex h-screen flex-col bg-bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        actions={actions}
      />

      <main className="flex flex-1 flex-col items-center justify-center gap-4 pt-12">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-text-muted">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
        </div>

        <Button onClick={actions.openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </main>

      <CreateProjectDialog
        open={actions.dialogOpen === "create"}
        projectName={actions.projectName}
        roomIdPreview={actions.roomIdPreview}
        isLoading={actions.isLoading}
        onProjectNameChange={actions.setProjectName}
        onConfirm={actions.handleCreate}
        onClose={actions.closeDialog}
      />

      <RenameProjectDialog
        open={actions.dialogOpen === "rename"}
        project={actions.selectedProject}
        projectName={actions.projectName}
        isLoading={actions.isLoading}
        onProjectNameChange={actions.setProjectName}
        onConfirm={actions.handleRename}
        onClose={actions.closeDialog}
      />

      <DeleteProjectDialog
        open={actions.dialogOpen === "delete"}
        project={actions.selectedProject}
        isLoading={actions.isLoading}
        onConfirm={actions.handleDelete}
        onClose={actions.closeDialog}
      />
    </div>
  );
}
