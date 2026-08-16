"use client";

import { useId } from "react";
import { Project } from "@/lib/project-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RenameProjectDialogProps {
  open: boolean;
  project: Project | null;
  projectName: string;
  isLoading: boolean;
  onProjectNameChange: (name: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function RenameProjectDialog({
  open,
  project,
  projectName,
  isLoading,
  onProjectNameChange,
  onConfirm,
  onClose,
}: RenameProjectDialogProps) {
  const nameId = useId();

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          {project && (
            <DialogDescription>
              Renaming <span className="font-medium text-text-secondary">{project.name}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="text-xs font-medium text-text-secondary">
            New name
          </label>
          <Input
            id={nameId}
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onConfirm();
            }}
            autoFocus
          />
        </div>

        <DialogFooter showCloseButton={false}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Saving…" : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
