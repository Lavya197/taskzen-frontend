"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StatusBadge from "@/components/tasks/StatusBadge";
import TaskStatusModal from "@/components/tasks/TaskStatusModal";
import { apiGet, apiPost } from "@/lib/api";

export default function TaskDetailPage() {
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [activityText, setActivityText] = useState("");

  useEffect(() => {
    if (id) {
      fetchTask();
      fetchActivity();
    }
  }, [id]);

  // ------------------------------
  // FETCH TASK
  // ------------------------------
  async function fetchTask() {
    try {
      const json = await apiGet(`/tasks/${id}`);
      if (json.success) setTask(json.data);
    } catch (err) {
      console.error("Failed to load task", err);
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------
  // FETCH ACTIVITY
  // ------------------------------
  async function fetchActivity() {
    try {
      const json = await apiGet(`/activity?task_id=${id}`);
      if (json.success) setActivity(json.data);
    } catch (err) {
      console.error("Failed to load activity", err);
    }
  }

  // ------------------------------
  // ADD ACTIVITY
  // ------------------------------
  async function logActivity() {
    if (!activityText.trim()) return;

    try {
      const json = await apiPost("/activity", {
        task_id: id,
        message: activityText,
      });

      if (json.success) {
        setActivityText("");
        fetchActivity();
      }
    } catch (err) {
      console.error("Failed to log activity", err);
    }
  }

  // ------------------------------
  // UI
  // ------------------------------
  if (loading) return <p>Loading task...</p>;
  if (!task) return <p className="text-red-500">Task not found.</p>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <p className="text-gray-600 mt-1">{task.description}</p>

          <p className="mt-2">
            <span className="font-medium">Project:</span>{" "}
            {task.projects?.name || "—"}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <StatusBadge status={task.status} />
          <button
            onClick={() => setOpenStatusModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Change Status
          </button>
        </div>
      </div>

      <hr />

      {/* ACTIVITY LOG */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Activity Log</h2>

        {activity.length === 0 && (
          <p className="text-gray-600">No activity yet.</p>
        )}

        <ul className="space-y-2">
          {activity.map((item) => (
            <li
              key={item.id}
              className="border p-3 rounded bg-gray-50 flex justify-between"
            >
              <span>{item.message}</span>
              <span className="text-gray-400 text-sm">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ADD ACTIVITY */}
      <div className="mt-6 p-4 border rounded">
        <h3 className="font-semibold text-lg">Add Activity</h3>

        <textarea
          className="w-full border p-2 rounded mt-2"
          placeholder="Write activity note..."
          rows={3}
          value={activityText}
          onChange={(e) => setActivityText(e.target.value)}
        />

        <button
          onClick={logActivity}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Log Activity
        </button>
      </div>

      {/* STATUS MODAL */}
      <TaskStatusModal
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        task={task}
        refresh={() => {
          fetchTask();
          fetchActivity();
        }}
      />
    </div>
  );
}
