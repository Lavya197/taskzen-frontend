"use client";

import { useState } from "react";

export default function CreateProjectModal({ open, setOpen, refresh }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  if (!open) return null;

  async function createProject() {
    try {
      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc }),
      });

      const data = await res.json();
      if (data.success) {
        refresh();
        setOpen(false);
      }
    } catch (err) {
      console.error("Failed to create project", err);
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
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={createProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
