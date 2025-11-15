"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { ProjectType } from "@/types/project";

type CreateProjectModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  refresh?: (newProject: ProjectType | null) => void;
};

export default function CreateProjectModal({
  open,
  setOpen,
  refresh,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  if (!open) return null;

  async function createProject() {
    if (!name.trim()) return alert("Project name is required");

    try {
      const json = await apiPost("/projects", {
        name,
        description: desc,
      });

      if (json.success) {
        setName("");
        setDesc("");
        setOpen(false);

        if (refresh) refresh(json.data ?? null);
      } else {
        console.error("Create project failed:", json);
        alert("Failed to create project");
      }
    } catch (err) {
      console.error("Project creation error:", err);
      alert("Error creating project");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Create New Project</h2>

        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="flex justify-end space-x-3">
          <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded-md">
            Cancel
          </button>

          <button onClick={createProject} className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
