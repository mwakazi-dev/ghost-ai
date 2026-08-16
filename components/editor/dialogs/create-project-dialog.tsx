"use client";

import { useId } from "react";
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

interface CreateProjectDialogProps {
  open: boolean;
  projectName: string;
  roomIdPreview: string;
  isLoading: boolean;
  onProjectNameChange: (name: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function CreateProjectDialog({
  open,
  projectName,
  roomIdPreview,
  isLoading,
  onProjectNameChange,
  onConfirm,
  onClose,
}: CreateProjectDialogProps) {
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
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Name your project. You can rename it later.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={nameId}
              className="text-xs font-medium text-text-secondary"
            >
              Project name
            </label>
            <Input
              id={nameId}
              placeholder="My Architecture"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onConfirm();
              }}
              autoFocus
            />
          </div>

          {roomIdPreview && (
            <p className="text-xs text-text-muted">
              Room ID:{" "}
              <span className="font-mono text-text-secondary">
                {roomIdPreview}
              </span>
            </p>
          )}
        </div>

        <DialogFooter showCloseButton={false}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!projectName.trim() || isLoading}
          >
            {isLoading ? "Creating…" : "Create project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
