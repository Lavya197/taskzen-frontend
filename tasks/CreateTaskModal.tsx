"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { apiPost } from "@/lib/api";

type CreateTaskModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  projectId: string;
  refresh?: () => void;
};

export default function CreateTaskModal({
  open,
  setOpen,
  projectId,
  refresh,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function createTask() {
    if (!title.trim()) return alert("Title required");
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id;
      if (!userId) return alert("User not authenticated");

      const json = await apiPost(
        "/tasks",
        {
          project_id: projectId,
          title,
          description: desc,
        },
        {
          "x-user-id": userId,
        }
      );

      if (json.success) {
        setTitle("");
        setDesc("");
        setOpen(false);

        if (typeof refresh === "function") refresh();
      } else {
        console.error("Create task failed", json);
        alert("Failed to create task");
      }
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Error creating task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-30">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">Create New Task</h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
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
            onClick={createTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Creating…" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
