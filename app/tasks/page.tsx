"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/tasks/TaskCard";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const json = await res.json();
      if (json.success) setTasks(json.data);
      else setTasks([]);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">All Tasks</h1>

      {tasks.length === 0 && <p className="text-gray-600">No tasks available.</p>}

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  );
}
