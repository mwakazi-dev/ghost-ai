"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-bg-base">
      <main className="flex flex-1 items-center justify-center pt-12">
        <p className="text-text-muted text-sm">Ghost AI</p>
      </main>
    </div>
  );
}
