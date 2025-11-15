"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/tasks/TaskCard";
import { apiGet } from "@/lib/api";
import type { TaskType } from "@/types/task";   // ⭐ CORRECT TYPE

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const json = await apiGet("/tasks");

      if (json.success) setTasks(json.data as TaskType[]);
      else setTasks([]);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">All Tasks</h1>

      {tasks.length === 0 && (
        <p className="text-gray-600">No tasks available.</p>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
