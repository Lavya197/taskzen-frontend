"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { apiPatch } from "@/lib/api";
import type { TaskType } from "@/types/task";

type TaskStatusModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  task: TaskType;
  refresh: () => void;
};

export default function TaskStatusModal({
  open,
  setOpen,
  task,
  refresh,
}: TaskStatusModalProps) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function markAsCompleted() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id;
      if (!userId) {
        alert("Not authenticated");
        setLoading(false);
        return;
      }

      const json = await apiPatch(
        `/tasks/${task.id}`,
        { status: "completed" },
        { "x-user-id": userId }
      );

      if (json.success) {
        refresh();
        setOpen(false);
      } else {
        console.error("Failed to update task status", json);
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status", err);
      alert("Error updating status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold">Change Task Status</h3>
        <p className="text-sm text-gray-500 mt-2">Task: {task.title}</p>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={markAsCompleted}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Updating…" : "Mark as Completed"}
          </button>
        </div>
      </div>
    </div>
  );
}
