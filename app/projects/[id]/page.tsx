"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import TaskCard from "@/components/tasks/TaskCard";
import { apiGet } from "@/lib/api"; // ✅ use API helper

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProject();
      fetchTasks();
    }
  }, [id]);

  // ----------------------------
  // FETCH PROJECT
  // ----------------------------
  async function fetchProject() {
    try {
      const json = await apiGet(`/projects/${id}`);

      if (json.success) {
        setProject(json.data);
      } else {
        console.error("API error:", json.message);
      }
    } catch (e) {
      console.error("Failed to fetch project", e);
    }
  }

  // ----------------------------
  // FETCH PROJECT TASKS
  // ----------------------------
  async function fetchTasks() {
    try {
      const json = await apiGet(`/tasks?project_id=${id}`);

      if (json.success) {
        setTasks(json.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Failed to fetch project tasks", err);
    }
  }

  if (!project)
    return <div className="p-6">Loading project...</div>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{project.name}</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + New Task
        </button>
      </div>

      <p className="text-gray-600">{project.description}</p>

      {/* ANALYTICS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          Open: {tasks.length}
        </div>

        <div className="p-4 bg-white rounded shadow">
          Completed: {tasks.filter((t) => t.status === "completed").length}
        </div>

        <div className="p-4 bg-white rounded shadow">
          Progress:{" "}
          {tasks.length
            ? Math.round(
                (tasks.filter((t) => t.status === "completed").length /
                  tasks.length) *
                  100
              )
            : 0}
          %
        </div>
      </div>

      {/* TASK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>

      {/* CREATE TASK MODAL */}
      <CreateTaskModal
        open={open}
        setOpen={setOpen}
        refresh={fetchTasks}
        projectId={id}
      />
    </div>
  );
}
