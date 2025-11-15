"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import TaskStatusModal from "./TaskStatusModal";
import { useState } from "react";
import type { TaskType } from "@/types/task";

type TaskCardProps = {
  task: TaskType;
  refresh: () => void;
};

export default function TaskCard({ task, refresh }: TaskCardProps) {
  const [open, setOpen] = useState(false);

  const projectName = task.projects?.name ?? task.project_name ?? "—";

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          <div className="mt-2 text-xs text-gray-400">
            Project: {projectName}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={task.status} />
          <div className="flex space-x-2">
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-1 bg-gray-100 rounded text-sm"
            >
              Change status
            </button>

            <Link
              href={`/tasks/${task.id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Open
            </Link>
          </div>
        </div>
      </div>

      <TaskStatusModal
        open={open}
        setOpen={setOpen}
        task={task}
        refresh={refresh}
      />
    </div>
  );
}
