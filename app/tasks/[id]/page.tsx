"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/tasks/StatusBadge";
import TaskStatusModal from "@/components/tasks/TaskStatusModal";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();

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
  // FETCH TASK DETAILS
  // ------------------------------
  async function fetchTask() {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const json = await res.json();

      if (json.success) setTask(json.data);
    } catch (err) {
      console.error("Failed to fetch task", err);
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------
  // FETCH ACTIVITY LOGS
  // ------------------------------
  async function fetchActivity() {
    try {
      const res = await fetch(`http://localhost:5000/activity?task_id=${id}`);
      const json = await res.json();

      if (json.success) setActivity(json.data);
    } catch (err) {
      console.error("Failed to load activity log", err);
    }
  }

  // ------------------------------
  // ADD ACTIVITY
  // ------------------------------
  async function logActivity() {
    if (!activityText.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: id,
          message: activityText,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setActivityText("");
        fetchActivity(); // refresh logs
      }
    } catch (err) {
      console.error("Failed to log activity", err);
    }
  }

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

      {/* ADD NEW ACTIVITY */}
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
